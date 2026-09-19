#!/usr/bin/env python3
"""Generate src/data/ingesta.ts from the Sep-2026 cost-layer mapping."""
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path("/workspace")
ATT = ROOT / "attachments"
OUT = ROOT / "src/data/ingesta.ts"

URL_RE = re.compile(r"https?://[^\s'\"<>\\]+")


def strip_url(u: str) -> str:
    return u.rstrip(".,);]")


def norm(u: str) -> str:
    u = unquote(strip_url(u)).strip().rstrip("/")
    u = u.replace("http://", "https://")
    u = re.sub(r"(?<!:)/{2,}", "/", u)
    p = urlparse(u.lower())
    host = p.netloc[4:] if p.netloc.startswith("www.") else p.netloc
    path = p.path.rstrip("/")
    q = f"?{p.query}" if p.query else ""
    return f"{host}{path}{q}".lower()


def load_user_urls() -> list[str]:
    seen: dict[str, str] = {}
    for name in [
        "costos_obra_sep2026_solo_urls.txt",
        "costos_obra_sep2026_urls_directas_prioridad.txt",
        "costos_obra_32_estados_sep2026_mapeado.txt",
        "costos_obra_municipios_sep2026_mapeado.txt",
    ]:
        text = (ATT / name).read_text(encoding="utf-8")
        for m in URL_RE.finditer(text):
            u = strip_url(m.group(0))
            seen.setdefault(norm(u), u)
    return list(seen.values())


def load_corpus() -> dict[str, tuple[str, str]]:
    """norm url -> (id, original url)"""
    text = ""
    for f in (ROOT / "src/data").glob("*.ts"):
        if f.name == "ingesta.ts":
            continue
        text += f.read_text(encoding="utf-8") + "\n"
    out: dict[str, tuple[str, str]] = {}
    blocks = re.split(r"\n  \{\n", text)
    for b in blocks:
        idm = re.search(r'id:\s*"([^"]+)"', b)
        urls = URL_RE.findall(b)
        if not idm:
            continue
        did = idm.group(1)
        for u in urls:
            u = strip_url(u)
            out.setdefault(norm(u), (did, u))
    return out


# Explicit entra: url-substring -> (docId, titulo, entidad, slug, mun, motivo)
ENTRA: list[tuple[str, str, str, str, str, str | None, str]] = [
    (
        "tramites.ebajacalifornia.gob.mx/compras/licitaciones/verdetalle",
        "bc-folio-2026",
        "Procedimiento 32065001-092-2026 — Baja California",
        "Baja California",
        "baja-california",
        None,
        "Expediente estatal 2026 con ficha viva. No se rebautiza como tabulador general.",
    ),
    (
        "tramites.ebajacalifornia.gob.mx/compras/licitaciones",
        "bc-compras-portal",
        "Compras y licitaciones estatales — Baja California",
        "Baja California",
        "baja-california",
        None,
        "Portal estatal 2026 vivo. No hay tabulador general gratuito; el procedimiento 2026 queda como capa de contratación.",
    ),
    (
        "sefircoahuila.gob.mx/wp-content/uploads/normatividad/convocatoria-bases-ope.pdf",
        "coah-bases-ope",
        "Convocatoria-bases de obra a precios unitarios — Coahuila",
        "Coahuila",
        "coahuila",
        None,
        "PDF oficial de bases de obra a precios unitarios. Estructura de PU, no tabla general de precios 2026.",
    ),
    (
        "admiweb.col.gob.mx/archivos_prensa/banco_img/file_69419453112f7_bases_lo_18_2025.pdf",
        "col-bases-lo18-2025",
        "Bases LO-18-2025 — Colima",
        "Colima",
        "colima",
        None,
        "Bases estatales 2025 con integración económica. El SECOP es el control de versión; esta ficha guarda el binario que sí abre.",
    ),
    (
        "cemer.edomex.gob.mx",
        "mex-cemer-portal",
        "CEMER — Comisión Estatal de Mejora Regulatoria (Edomex)",
        "Estado de México",
        "estado-de-mexico",
        None,
        "Área estatal que describe actualización de mano de obra, maquinaria y zonas de costo. El host respondió 503 en este corte: se guarda como portal intermitente, no como tabulador.",
    ),
    (
        "marcojuridico.morelos.gob.mx/archivos/reglamentos_estatales/pdf/rlobrapubem.pdf",
        "mor-reg-op",
        "Reglamento de la Ley de Obra Pública de Morelos",
        "Morelos",
        "morelos",
        None,
        "Reglamento estatal de obra. El PDF permanente redirige al visor de Marco Jurídico (documento 3117); se cataloga como contenedora, no como binario suelto.",
    ),
    (
        "sop.nayarit.gob.mx",
        "nay-sop-portal",
        "SOP Nayarit — concursos y precios unitarios",
        "Nayarit",
        "nayarit",
        None,
        "Departamento oficial de concursos y precios unitarios. Las bases se venden en ventanilla; no hay tabulador 2026 gratuito. Certificado SSL incompleto: el host abre con verificación relajada.",
    ),
    (
        "queretaro.gob.mx/web/sduop/licitaciones-por-anio",
        "qro-sduop-lic",
        "Licitaciones por año — SDUOP Querétaro",
        "Querétaro",
        "queretaro",
        None,
        "Listado estatal 2026. La convocatoria 035-2026 abre; no se localizaron bases económicas completas gratuitas.",
    ),
    (
        "licitaciones.apiqroo.com.mx/storage/documentos/2026/mayo",
        "qroo-bases-marina-2026",
        "Bases marina API-GI-006-2026-LPE — Quintana Roo",
        "Quintana Roo",
        "quintana-roo",
        None,
        "Bases 2026 de APIQROO con APU, salarios, FSR, maquinaria e indirectos. Expediente de organismo, no tabulador general del estado.",
    ),
    (
        "licitaciones.apiqroo.com.mx",
        "qroo-apiqroo-portal",
        "Licitaciones APIQROO",
        "Quintana Roo",
        "quintana-roo",
        None,
        "Portal 2026 del organismo portuario. Publica bases económicas directas; no sustituye un tabulador estatal de edificación.",
    ),
    (
        "seduvop.slp.gob.mx",
        "slp-seduvop",
        "SEDUVOP San Luis Potosí — obra pública",
        "San Luis Potosí",
        "san-luis-potosi",
        None,
        "Secretaría estatal de desarrollo urbano y obras. Sin tabulador general 2026 libre; es el módulo vivo de obra.",
    ),
    (
        "compranet.sinaloa.gob.mx/uploads/files/24f987d44590c424176fe82f36ef86bf.pdf",
        "sin-bases-fsr-2026",
        "Bases económicas CompraNet — Sinaloa (FSR y costos directos)",
        "Sinaloa",
        "sinaloa",
        None,
        "Un PDF representativo del expediente estatal: salario base, FSR, maquinaria, directos, indirectos, financiamiento y utilidad. Los otros dos hashes de la misma serie no se duplican.",
    ),
    (
        "compranet.sinaloa.gob.mx",
        "sin-compranet-portal",
        "CompraNet Sinaloa",
        "Sinaloa",
        "sinaloa",
        None,
        "Plataforma estatal de contrataciones. El listado respondió 500 en este corte; los PDFs de uploads sí abrieron. Control de versión, no tabulador.",
    ),
    (
        "compranet.sonora.gob.mx",
        "son-compranet-sistema",
        "CompraNet Sonora — sistema de anexos",
        "Sonora",
        "sonora",
        None,
        "Sistema de expedientes y anexos económicos. WAF 403 en la raíz; la ficha de normatividad en Buen Gobierno ya estaba en el corpus. No se ingieren GetAttachment sin sesión.",
    ),
    (
        "omg.tlaxcala.gob.mx",
        "tlax-omg-portal",
        "OMG Tlaxcala — contrataciones públicas",
        "Tlaxcala",
        "tlaxcala",
        None,
        "Portal estatal de bases y formatos económicos. Timeout en este corte: se guarda como intermitente. Última base detallada localizada: 2025.",
    ),
    (
        "veracruz.gob.mx/infraestructura",
        "ver-infra-portal",
        "Secretaría de Infraestructura y Obras — Veracruz",
        "Veracruz",
        "veracruz",
        None,
        "SIOP estatal. Certificado SSL incompleto y captcha Radware; las bases LPE 2025 no se aislaron como PDF estable. Portal, no tabulador 2026.",
    ),
    (
        "licitaciones.puebla.gob.mx/images/bases%20lpn202501.pdf",
        "pue-bases-lpn202501",
        "Bases LPN-2025-01 — Puebla estatal",
        "Puebla",
        "puebla",
        None,
        "Última base estatal detallada localizada (2025). El municipio capital sí tiene serie 2026. No se rebautiza como tabulador 2026.",
    ),
    (
        "japay.yucatan.gob.mx/pdf/licitacion/2025",
        "yuc-japay-n24",
        "Bases JAPAY N-24-2025 — Yucatán",
        "Yucatán",
        "yucatan",
        None,
        "Base 2025 con FSR, salarios, costo horario de maquinaria e indirectos. Expediente hidráulico, no tabulador general de edificación.",
    ),
    (
        "sair.municipiodequeretaro.gob.mx/documentos/formatos/30_590.pdf",
        "qro-mun-revision-pu",
        "Lineamientos de revisión de precios unitarios — Municipio de Querétaro",
        "Querétaro",
        "queretaro",
        "Querétaro",
        "Procedimiento municipal de revisión de PU. No publica una tabla de precios; sí fija cómo se analizan.",
    ),
    (
        "transparencia.cancun.gob.mx/uploads/24/38",
        "cancun-ley-op",
        "Ley de Obras Públicas y Servicios — Benito Juárez / Cancún",
        "Quintana Roo",
        "quintana-roo",
        "Benito Juárez",
        "Norma municipal de obra (2024). Marco jurídico, no base económica 2026.",
    ),
    (
        "huehuetla.hidalgo.gob.mx",
        "huehuetla-bases-2025",
        "Bases de invitación de obra estatal — Huehuetla",
        "Hidalgo",
        "hidalgo",
        "Huehuetla",
        "Base municipal 2025 alineada al modelo estatal. APU de un procedimiento, no tabulador del estado.",
    ),
    (
        "alcozauca.guerrero.gob.mx",
        "alcozauca-pobalines",
        "POBALINES de obra pública — Alcozauca",
        "Guerrero",
        "guerrero",
        "Alcozauca",
        "Políticas municipales que exigen análisis de materiales, mano de obra, herramienta y maquinaria. No publican precios.",
    ),
    (
        "comprasestatal.durango.gob.mx/procedimientosdecontratacion/descarga/anexo/37516",
        "dgo-mun-37516",
        "Anexo 37516 — base municipal de Durango 2026",
        "Durango",
        "durango",
        "Durango",
        "Binario municipal 2026 (3.0 MB). Los anexos 39394 y 37446 siguen como expedientes estatales no catalogados uno a uno.",
    ),
    (
        "siogdl.guadalajara.gob.mx/visor/obtenerdocumentoinlineconencabezadovisor/1002329",
        "gdl-visor-2026",
        "Documento municipal de obra 2026 — Guadalajara (visor 1002329)",
        "Jalisco",
        "jalisco",
        "Guadalajara",
        "PDF municipal 2026 servido por el visor oficial (15 MB). Expediente, no tabulador metropolitano.",
    ),
    (
        "www2.toluca.gob.mx/wp-content/uploads/2026/01/44-2025-gaceta",
        "toluca-gaceta-2026",
        "Gaceta municipal 15-dic-2025 — Toluca (funciones de precios unitarios)",
        "Estado de México",
        "estado-de-mexico",
        "Toluca",
        "Gaceta 2026 que describe funciones y procedimientos de PU. No es una tabla vigente de precios.",
    ),
    (
        "gobiernoabierto.veracruzmunicipio.gob.mx/wp-content/uploads/2025/06/0402-acta",
        "veracruz-mun-acta-2025",
        "Acta de adjudicación 0402 — Municipio de Veracruz",
        "Veracruz",
        "veracruz",
        "Veracruz",
        "Acta 2025 con revisión de APU, indirectos, salarios/FSR y maquinaria. La 0226 es la misma serie; no se duplica.",
    ),
    (
        "merida.gob.mx/gaceta/doc/2701-2800/gaceta_2746.pdf",
        "merida-gaceta-2026",
        "Gaceta municipal 2746 — Mérida",
        "Yucatán",
        "yucatan",
        "Mérida",
        "Gaceta 2026 con integración y contratos a precios unitarios. Complementa el portal de regulaciones; no es tabulador.",
    ),
]
