# Patterns that must NOT enter (checked after entra, before auto-ya)
FUERA_RULES: list[tuple[str, str]] = [
    ("docs/8098/2026._t2._r_ii.pdf", "Serie UEC 2026 T2: la ficha de la región I cubre las seis regiones."),
    ("docs/8099/2026._t2._r_iii.pdf", "Serie UEC 2026 T2: no se duplican las regiones II–VI."),
    ("docs/8096/2026._t2._r_iv.pdf", "Serie UEC 2026 T2: no se duplican las regiones II–VI."),
    ("docs/8097/2026._t2._r_v.pdf", "Serie UEC 2026 T2: no se duplican las regiones II–VI."),
    ("docs/8100/2026._t2._r_vi.pdf", "Serie UEC 2026 T2: no se duplican las regiones II–VI."),
    ("tlajomulco.gob.mx/sites/default/files/020-26_bases.pdf", "Misma serie que 024-26, ya catalogada."),
    ("tlajomulco.gob.mx/sites/default/files/017-26_bases.pdf", "Misma serie que 024-26, ya catalogada."),
    ("lp-cmop-001-2026.pdf", "Misma serie municipal que LP-CMOP-008-2026."),
    ("lp-cmop-005-2026.pdf", "Misma serie municipal que LP-CMOP-008-2026."),
    ("tabulador%20general%20de%20precios%20unitarios%20enero%202026", "El control de versión es el portal SOBSE; julio 2026 desplaza a enero."),
    ("direcci%c3%b3n-de-precios-unitarios-y-concursos-de-obras.pdf", "Organigrama 2021. Metodología de oficina, no precios vigentes."),
    ("s-contraloria.hidalgo.gob.mx/interes/6._bases", "Los .docx de Contraloría Hidalgo respondieron 502; se conserva la ficha RUTS."),
    ("s-contraloria.hidalgo.gob.mx/interes/7._bases", "Los .docx de Contraloría Hidalgo respondieron 502; se conserva la ficha RUTS."),
    ("s-contraloria.hidalgo.gob.mx/interes/8._bases", "Los .docx de Contraloría Hidalgo respondieron 502; se conserva la ficha RUTS."),
    ("s-contraloria.hidalgo.gob.mx/interes/9._bases", "Los .docx de Contraloría Hidalgo respondieron 502; se conserva la ficha RUTS."),
    ("02._bases_obra_estatal_css-206-2023.pdf", "Base 2023 de estructura. No se usa como precios 2026."),
    ("mo-obra%20p%c3%9ablica%20pdf.pdf", "Manual CEMER 503 en este corte. El portal CEMER entra; el PDF no."),
    ("stcm_17_2025/20251216_bases_anexos.pdf", "Expediente Metrorrey, no tabulador municipal de Monterrey."),
    ("smpu.nl.gob.mx/concurso/1279", "Concurso puntual; el control es el portal SMPU."),
    ("licitacion-publica-de-metrorrey", "Ficha de organismo; no se toma como tabulador de Monterrey."),
    ("descarga/anexo/39394", "Anexo de expediente estatal. El portal Durango es el control de versión."),
    ("descarga/anexo/37446", "Anexo de expediente estatal. El portal Durango es el control de versión."),
    ("frmotros.aspx?iddocumento=41425", "Visor de un ID. El portal SOP Ags. es el control de versión."),
    ("frmotros.aspx?iddocumento=41424", "Visor de un ID. El portal SOP Ags. es el control de versión."),
    ("frmotros.aspx?iddocumento=41426", "Visor de un ID. El portal SOP Ags. es el control de versión."),
    ("contratosadm.chihuahua.gob.mx/descarga_portal.aspx", "Descarga tokenizada de un procedimiento. El portal de contrataciones es el control."),
    ("periodicos/2026-04/po29-2026.pdf", "Ejemplar del P.O. No se ingiere como tabulador."),
    ("periodicos/2026-02/po17-2026.pdf", "URL del P.O. respondió 404 en este corte."),
    ("periodicos/2026-01/po05-2026.pdf", "Ejemplar del P.O. No se ingiere como tabulador municipal."),
    ("periodicos/2026-03/po18-2026.pdf", "Ejemplar del P.O. No se ingiere como tabulador municipal."),
    ("periodicos/2026-03/po20-2026.pdf", "Ejemplar del P.O. No se ingiere como tabulador municipal."),
    ("p.o-11-alcance-vii-06-feb-2026.pdf", "Hermano del POBALINES ya catalogado (alcance IV)."),
    ("adminsecop.col.gob.mx/index.php/api", "Descarga de un anexo SECOP. El portal SECOP es el control."),
    ("secop.col.gob.mx/secop/detalle_licitacion", "Ficha de un procedimiento. El SECOP raíz ya está en el corpus."),
    ("lpe-044-2025-bases.pdf", "Host con captcha/SSL inestable. Se guarda el portal SIOP, no el PDF suelto."),
    ("lpe-051-2025-bases.pdf", "Segunda base 2025 del mismo portal; no se duplica."),
    ("invitacion-ad-021-25.pdf", "Host OMG en timeout. El portal entra como intermitente; el PDF suelto no."),
    ("funcionpublica.zacatecas.gob.mx/storage/app/uploads/public/67f/961", "PDF suelto del storage. El listado de Función Pública es el control de versión."),
    ("funcionpublica.zacatecas.gob.mx/storage/app/uploads/public/663/8e7", "PDF suelto del storage. El listado de Función Pública es el control de versión."),
    ("funcionpublica.zacatecas.gob.mx/storage/app/uploads/public/687/ab2", "PDF suelto del storage. El listado de Función Pública es el control de versión."),
    ("compranet.sinaloa.gob.mx/uploads/files/c3743b75", "Misma serie CompraNet que el PDF representativo ya admitido."),
    ("compranet.sinaloa.gob.mx/uploads/files/a17a3923", "Misma serie CompraNet que el PDF representativo ya admitido."),
    ("compranet.sinaloa.gob.mx/uploads/files/049e70bf", "PDF municipal de Culiacán: timeout al bajarlo. No se cataloga un binario inestable."),
    ("compranet.sonora.gob.mx/sistema/anexoes/getattachment", "Anexo que exige sesión. El sistema CompraNet entra; el GetAttachment no."),
    ("acta-de-presentacion-y-apertura-de-proposiciones-n001-26.pdf", "Acta de un procedimiento. El portal SOP Tamaulipas ya cubre la capa; el PDF timeout."),
    ("acta-de-presentacion-y-apertura-de-proposiciones-n002-26.pdf", "Segunda acta de la misma serie; no se duplica."),
    ("0226-acta-de-adjudicacion-o-fallo.pdf", "Misma serie que el acta 0402 admitida."),
    ("queretaro.gob.mx/documents/portlet_file_entry", "Convocatoria 035-2026 sin bases económicas completas. Queda el listado SDUOP."),
    ("sidof.segob.gob.mx/notas/docfuente/5796758", "Nota SIDOF de un procedimiento, no de costos."),
    ("periodicooficial.oaxaca.gob.mx/files/2026/03/ext-oaxcconv-2026-03-12.pdf", "Convocatoria en P.O., no tabulador ni APU."),
    ("morelos.gob.mx/sitios/obras-infraestructura", "Ruta 404 en este corte. No se cataloga un portal muerto."),
    ("dictamen-estructural-del-mercado-adolfo-lopez-mateos", "Dictamen estructural de un inmueble, no costos unitarios."),
    ("cuernavaca.gob.mx/contabilidad/wp-content/uploads/2026/03/ley-ingresos", "Ley de Ingresos 2026: no es tabulador municipal."),
    ("rcomprobagastocapsj.pdf", "Reglas de comprobación de gastos  (no 2026, no PU)."),
    ("presupuesto%20de%20egresos%20municipales.pdf", "Presupuesto de egresos de Ciudad Victoria, no catálogo de PU."),
    ("anteproyecto-del-manual-de-organizacion", "Manual de organización de Aculco: estructura administrativa, no precios."),
    ("sa-066%20dictamen%20de%20fallo.pdf", "Fallo de un procedimiento moreliano. No es norma ni tabulador."),
    ("io816053997e602016convocatoria.pdf", "Convocatoria 2016. Histórica, no aporta vigencia 2026."),
    ("docs.tepic.gob.mx/a4101393", "Contrato municipal puntual. El portal de Tepic ya cubre la muestra."),
    ("lapaz.gob.mx/storage/boletines", "Boletín municipal, no tabulador 2026."),
    ("municipiocampeche.gob.mx/registro-de-regulaciones", "Módulo regulatorio genérico. El ayuntamiento ya está como muestra."),
    ("municipiocampeche.gob.mx/estatal", "Índice estatal dentro del ayuntamiento; no es económico."),
    ("municipiocampeche.gob.mx/transparencia-proactiva", "Transparencia genérica. El portal capitalino ya cubre la muestra."),
    ("tuxtla.gob.mx/1normatividad-vigente", "Tuxtla responde 403 (Cloudflare). La muestra de Chiapas entra por Tapachula."),
    ("visoracta.aspx?acta=773", "Acta puntual de un contrato. El ayuntamiento de Ags. ya está como muestra."),
    ("h-ayuntamiento-de-el-rosario", "Módulo CompraNet de El Rosario sin archivo económico aislado."),
    ("transparencia.villahermosa.gob.mx", "Portal genérico. El reglamento del comité de obra ya está en el corpus."),
    ("publicacionperiodico.tabasco.gob.mx/documento/7949", "Ejemplar del P.O., no tabulador de precios."),
    ("publicacionperiodico.tabasco.gob.mx/documento/8432", "Ejemplar del P.O., no tabulador de precios."),
    ("publicacionperiodico.tabasco.gob.mx/documento/8069", "Ejemplar del P.O. municipal, no tabulador."),
    ("portal.capitaldezacatecas.gob.mx/normateca", "Normateca genérica. El portal capitalino ya cubre la muestra."),
    ("gaceta.capitaldezacatecas.gob.mx", "Gaceta municipal genérica, sin tabla de PU."),
    ("sop-2025-0015_censurado.pdf", "Expediente censurado de transparencia. No se cataloga un PDF tachado."),
    ("municipiodequeretaro.gob.mx/obras-publicas", "Página institucional 2021-2024. La SOP municipal y el PDF 30_590 cubren la capa."),
    ("portalciudadano.merida.gob.mx/regulacionesenlinea/detalle-regulacion/23", "Ficha regulatoria. La gaceta 2746 entra como documento 2026."),
    ("portalciudadano.merida.gob.mx/regulacionesenlinea/detalle-regulacion/148", "Segunda ficha regulatoria; no se duplica."),
    ("sepuimm.bcs.gob.mx/normatividad", "Normatividad genérica. La Dirección de PU ya está en el corpus."),
    ("cea.bcs.gob.mx/informacion-publica/articulo-75", "Obligación de transparencia de CEA, no tabulador."),
    ("transparencia.bcs.gob.mx/jec/informacion-publica/articulo-75", "Obligación de transparencia. El portal BCS ya está listado."),
    ("sedumop.campeche.gob.mx/licitacion-publica-estatal-no-sedumop", "Ficha de un procedimiento 2026. El listado SEDUMOP es el control."),
    ("seinfra.chiapas.gob.mx/ctapublica.php", "CTA pública. El catálogo de precios / tabuladores ya está en el corpus."),
    ("serape.chiapas.gob.mx/boletininf", "Boletín SERAPE, no archivo de costos."),
    ("chihuahua.gob.mx/scop", "SCOP genérico. El portal de contrataciones ya cubre Chihuahua."),
    ("sefincoahuila.gob.mx/sistemas/secop", "SECOP Coahuila. La normatividad SEFIR ya cubre la capa de obra."),
    ("guerrero.gob.mx/dependencia/sector-central/secretaria-de-desarrollo-urbano", "Ficha de dependencia. El POBALINES 2026 es el documento económico."),
    ("guerrero.gob.mx/articulo/politicas-bases-y-lineamientos", "Artículo de portal. El PDF del P.O. ya está catalogado."),
    ("sop.nayarit.gob.mx?stm_service=inscripcion", "Trámite de padrón. Cae bajo el portal SOP."),
    ("sop.nayarit.gob.mx?stm_service=venta-de-bases", "Venta de bases en ventanilla: confirma que no hay archivo gratuito."),
    ("=licitaciones.puebla.gob.mx", "Índice general. La ficha de obra pública y las bases LPN-2025-01 cubren la capa."),
    ("contraloria-seeipg.slp.gob.mx/procspublicosfin.php", "Listado de procedimientos. SEDUVOP entra como portal de obra."),
    ("tabasco.gob.mx/periodicooficial", "P.O. genérico. SOTOP ya cubre obras; no hay tabulador en el periódico."),
    ("swebrepo.tabasco.gob.mx", "Repositorio de componentes/contratos, no tabla de PU."),
    ("=tamaulipas.gob.mx/obraspublicas", "Portal SOP ya catalogado (timeout en este recorte)."),
    ("catalogoestatal.zacatecas.gob.mx/tramites/3194", "Ficha de trámite. El listado de licitaciones es el control."),
    ("www.ags.gob.mx/transparencia/contratosvisualizador", "Visor de un acta. El ayuntamiento ya es muestra municipal."),
]


def match_entra(n: str):
    for needle, doc_id, titulo, entidad, slug, mun, motivo in ENTRA:
        if unquote(needle).lower() in n:
            return doc_id, titulo, entidad, slug, mun, motivo
    return None


def match_fuera(n: str) -> str | None:
    for needle, motivo in FUERA_RULES:
        raw = unquote(needle).lower()
        if raw.startswith("="):
            if n == raw[1:]:
                return motivo
        elif raw in n:
            return motivo
    return None


META = {
    "aguascalientes": ("Aguascalientes", "aguascalientes"),
    "ebajacalifornia": ("Baja California", "baja-california"),
    "mexicali": ("Baja California", "baja-california"),
    "bcs.gob": ("Baja California Sur", "baja-california-sur"),
    "lapaz.gob": ("Baja California Sur", "baja-california-sur"),
    "campeche": ("Campeche", "campeche"),
    "chiapas": ("Chiapas", "chiapas"),
    "tuxtla": ("Chiapas", "chiapas"),
    "chihuahua": ("Chihuahua", "chihuahua"),
    "cdmx": ("Ciudad de México", "ciudad-de-mexico"),
    "obras.cdmx": ("Ciudad de México", "ciudad-de-mexico"),
    "coahuila": ("Coahuila", "coahuila"),
    "col.gob": ("Colima", "colima"),
    "durango": ("Durango", "durango"),
    "guanajuato": ("Guanajuato", "guanajuato"),
    "guerrero": ("Guerrero", "guerrero"),
    "hidalgo": ("Hidalgo", "hidalgo"),
    "jalisco": ("Jalisco", "jalisco"),
    "guadalajara": ("Jalisco", "jalisco"),
    "tlajomulco": ("Jalisco", "jalisco"),
    "zapopan": ("Jalisco", "jalisco"),
    "edomex": ("Estado de México", "estado-de-mexico"),
    "toluca": ("Estado de México", "estado-de-mexico"),
    "aculco": ("Estado de México", "estado-de-mexico"),
    "michoacan": ("Michoacán", "michoacan"),
    "morelia": ("Michoacán", "michoacan"),
    "morelos": ("Morelos", "morelos"),
    "cuernavaca": ("Morelos", "morelos"),
    "nayarit": ("Nayarit", "nayarit"),
    "tepic": ("Nayarit", "nayarit"),
    "nl.gob": ("Nuevo León", "nuevo-leon"),
    "oaxaca": ("Oaxaca", "oaxaca"),
    "puebla": ("Puebla", "puebla"),
    "pueblacapital": ("Puebla", "puebla"),
    "queretaro": ("Querétaro", "queretaro"),
    "apiqroo": ("Quintana Roo", "quintana-roo"),
    "cancun": ("Quintana Roo", "quintana-roo"),
    "slp.gob": ("San Luis Potosí", "san-luis-potosi"),
    "sanluis.gob": ("San Luis Potosí", "san-luis-potosi"),
    "sinaloa": ("Sinaloa", "sinaloa"),
    "sonora": ("Sonora", "sonora"),
    "tabasco": ("Tabasco", "tabasco"),
    "villahermosa": ("Tabasco", "tabasco"),
    "tamaulipas": ("Tamaulipas", "tamaulipas"),
    "ciudadvictoria": ("Tamaulipas", "tamaulipas"),
    "tlaxcala": ("Tlaxcala", "tlaxcala"),
    "veracruz": ("Veracruz", "veracruz"),
    "yucatan": ("Yucatán", "yucatan"),
    "merida": ("Yucatán", "yucatan"),
    "zacatecas": ("Zacatecas", "zacatecas"),
    "capitaldezacatecas": ("Zacatecas", "zacatecas"),
    "dof.gob": ("Federación", "federacion"),
    "inegi": ("Federación", "federacion"),
    "sidof.segob": ("Oaxaca", "oaxaca"),
}


def guess_ent(url: str) -> tuple[str, str]:
    n = url.lower()
    for needle, pair in META.items():
        if needle in n:
            return pair
    return ("México", "federacion")


def short_title(url: str) -> str:
    p = urlparse(url)
    path = unquote(p.path).rstrip("/")
    leaf = path.split("/")[-1] or p.netloc
    if len(leaf) > 70:
        leaf = leaf[:67] + "…"
    return leaf.replace("-", " ").replace("_", " ")


def js_str(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def main() -> None:
    corpus = load_corpus()
    urls = load_user_urls()
    items = []
    used_entra_ids: set[str] = set()

    for i, url in enumerate(urls, 1):
        n = norm(url)
        ent, slug = guess_ent(url)
        fuera = match_fuera(n)
        entra = match_entra(n)
        corpus_hit = corpus.get(n)
        if not corpus_hit:
            n_path = n.split("?", 1)[0]
            for cn, val in corpus.items():
                cn_path = cn.split("?", 1)[0]
                if n_path == cn_path:
                    corpus_hit = val
                    break
                # same PDF leaf on same host
                if "/" in n_path and n_path.split("/")[-1] == cn_path.split("/")[-1]:
                    if n_path.split("/")[0] == cn_path.split("/")[0] and n_path.split("/")[-1].endswith((".pdf", ".docx")):
                        corpus_hit = val
                        break

        decision = "fuera"
        motivo = "No aporta una capa (tabulador, APU, portal de costos o norma de obra) que el corpus no cubra ya."
        doc_id = None
        titulo = short_title(url)
        mun = None

        if fuera:
            decision = "fuera"
            motivo = fuera
            if corpus_hit:
                doc_id = corpus_hit[0]
        elif entra and entra[0] not in used_entra_ids:
            decision = "entra"
            doc_id, titulo, ent, slug, mun, motivo = entra
            used_entra_ids.add(doc_id)
        elif corpus_hit:
            decision = "ya_en_corpus"
            doc_id = corpus_hit[0]
            motivo = "URL ya catalogada o equivalente al documento " + doc_id + "."
        elif entra and entra[0] in used_entra_ids:
            decision = "fuera"
            doc_id, titulo2, ent, slug, mun, _ = entra
            titulo = titulo2
            motivo = "Misma ficha que " + doc_id + "; no se duplica la tarjeta."
        else:
            decision = "fuera"

        iid = f"ing-{i:03d}"
        items.append(
            {
                "id": iid,
                "url": url,
                "entidad": ent,
                "slug": slug,
                "mun": mun,
                "titulo": titulo,
                "decision": decision,
                "motivo": motivo,
                "docId": doc_id,
            }
        )

    # Sanity: all entra ids should appear
    got = {it["docId"] for it in items if it["decision"] == "entra"}
    missing = [e[1] for e in ENTRA if e[1] not in got]
    if missing:
        raise SystemExit(f"ENTRA ids not emitted: {missing}")

    counts = {k: sum(1 for it in items if it["decision"] == k) for k in ("entra", "ya_en_corpus", "fuera")}

    lines = [
        "/** Clasificación del corte de costos 19-sep-2026.",
        " *  160 URLs únicas de los mapeos estatal/municipal.",
        " *  Una base de licitación no se rebautiza como tabulador.",
        " *  Una serie (regiones, 001/005/008, 017/020/024) ocupa una ficha.",
        " */",
        "",
        'export type DecisionIngesta = "entra" | "ya_en_corpus" | "fuera";',
        "",
        "export type ItemIngesta = {",
        "  id: string;",
        "  url: string;",
        "  entidad: string;",
        "  slug: string;",
        "  municipio?: string;",
        "  titulo: string;",
        "  decision: DecisionIngesta;",
        "  motivo: string;",
        "  docId?: string;",
        "};",
        "",
        f'export const INGESTA_CORTE = "2026-09-19";',
        f"export const INGESTA_TOTAL = {len(items)};",
        "export const INGESTA_TALLY = {",
        f"  entra: {counts['entra']},",
        f"  ya_en_corpus: {counts['ya_en_corpus']},",
        f"  fuera: {counts['fuera']},",
        "} as const;",
        "",
        "export const INGESTA: ItemIngesta[] = [",
    ]
    for it in items:
        mun = f'    municipio: "{js_str(it["mun"])}",\n' if it["mun"] else ""
        doc = f'    docId: "{js_str(it["docId"])}",\n' if it["docId"] else ""
        lines.append(
            "  {\n"
            f'    id: "{it["id"]}",\n'
            f'    url: "{js_str(it["url"])}",\n'
            f'    entidad: "{js_str(it["entidad"])}",\n'
            f'    slug: "{js_str(it["slug"])}",\n'
            f"{mun}"
            f'    titulo: "{js_str(it["titulo"])}",\n'
            f'    decision: "{it["decision"]}",\n'
            f'    motivo: "{js_str(it["motivo"])}",\n'
            f"{doc}"
            "  },"
        )
    lines.append("];")
    lines.append("")
    lines.append(
        "export const INGESTA_NUEVOS = INGESTA.filter((i) => i.decision === \"entra\");"
    )
    lines.append("")

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {OUT}  n={len(items)}  {counts}  entra_ids={sorted(got)}")


if __name__ == "__main__":
    main()
