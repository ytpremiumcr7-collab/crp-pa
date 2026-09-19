import type { Alerta } from "./types";

export const ALERTAS: Alerta[] = [
  {
    id: "laassp-nueva",
    severidad: "critica",
    titulo: "La LAASSP vigente es una ley nueva (16-abr-2025), no una reforma más",
    detalle:
      "Abroga expresamente la ley de 2000. Los transitorios mantienen CompraNet de forma temporal. Los procedimientos ya iniciados siguen la norma aplicable al momento de su inicio. Conservar la versión anterior como histórica, no como texto vigente.",
    docIds: ["fed-laassp", "fed-reg-laassp", "fed-laassp-historial"],
  },
  {
    id: "lopsrm-fecha",
    severidad: "alta",
    titulo: "LOPSRM: última reforma 14 de noviembre de 2025",
    detalle:
      "El consolidado de Cámara declara 14-11-2025. No usar 29-12-2025 ni copias históricas como fuente primaria. Emparejar siempre con su reglamento (costos horarios, PU, maquinaria).",
    docIds: ["fed-lopsrm", "fed-reg-lopsrm"],
  },
  {
    id: "veracruz-825",
    severidad: "critica",
    titulo: "Veracruz: no usar la Ley 825 como documento principal",
    detalle:
      "Existe una nueva Ley 233 de 2025. El PDF antiguo puede seguir abierto; accesible no significa vigente.",
    docIds: ["ver-ley-op-2025"],
  },
  {
    id: "enlaces-404",
    severidad: "alta",
    titulo: "Cinco URLs del inventario original respondían 404",
    detalle:
      "CompraNet BCS en HTTPS, dos rutas /documentos/ de Marco Jurídico Morelos, el PDF 12-02-2026 de Tamaulipas y la normatividad de Culiacán. El visor de la ley de obra de Morelos también se sustituyó: el PDF permanente redirige. El barrido del 18-sep-2026 dejó las URLs vivas. Un 404 sustituido no convalida vigencia.",
    docIds: [
      "bcs-compranet",
      "mor-ley-op",
      "mor-ley-adq",
      "mor-reg-adq",
      "tam-ley-op-2026",
      "culiacan-normatividad",
    ],
  },
  {
    id: "chihuahua-2019",
    severidad: "alta",
    titulo: "Chihuahua: consolidado 24-ene-2026 sustituye copias 2019",
    detalle:
      "Versionar el PDF 2019 como histórico. Emparejar la ley 2026 con el reglamento de 2020.",
    docIds: ["chih-ley-op-2026", "chih-reg-op"],
  },
  {
    id: "jalisco-compras-2026",
    severidad: "alta",
    titulo: "Jalisco: Ley de Compras reformada el 27-ago-2026",
    detalle:
      "Un PDF de compras de 2023 todavía indexado por buscadores no es la fuente vigente. El índice del Congreso es el control de versión.",
    docIds: ["jal-indice", "jal-ley-op-2026", "jal-ley-adq-2026"],
  },
  {
    id: "nayarit-2026",
    severidad: "alta",
    titulo: "Nayarit: nueva Ley de Obra Pública en 2026 (sustituye 1995)",
    detalle:
      "Publicación en el Periódico Oficial. Cualquier base que conserve sólo la ley de 1995 queda desactualizada.",
    docIds: ["nay-periodico", "nay-ley-op"],
  },
  {
    id: "tamaulipas-2026",
    severidad: "alta",
    titulo: "Tamaulipas: el PDF 12-02-2026 del Congreso no existe",
    detalle:
      "La consolidación del P.O. No. 19 (12-feb-2026) es real, pero el filename que circulaba responde 404. El Congreso sirve «Ley de Obras Públicas 1.pdf». El espejo Legismex/ITESM tiene el consolidado fechado; no es publicación oficial.",
    docIds: ["tam-ley-op-2026"],
  },
  {
    id: "oaxaca-adq-2026",
    severidad: "media",
    titulo: "Oaxaca: adquisiciones con reforma publicada 31-ene-2026",
    detalle: "Decreto 871 de la LXVI Legislatura. Usar el PDF que incorpora esa publicación.",
    docIds: ["oax-ley-adq-2026"],
  },
  {
    id: "morelos-compilacion",
    severidad: "media",
    titulo: "Morelos: la compilación electrónica no sustituye al Periódico Oficial",
    detalle:
      "Marco Jurídico lo advierte. Guardar texto consolidado de consulta y fuente de publicación jurídica como campos distintos.",
    docIds: ["mor-ley-op", "mor-ley-adq"],
  },
  {
    id: "sict-fechas",
    severidad: "media",
    titulo: "SICT 2026: el año del documento no es la fecha de aplicación",
    detalle:
      "Obra carretera aplica desde 1-jul-2026; servicios, maquinaria y paramétricos desde 1-feb-2026.",
    docIds: [
      "fed-sict-obra-2026",
      "fed-sict-servicios-2026",
      "fed-sict-maquinaria-2026",
      "fed-sict-parametricos-2026",
    ],
  },
  {
    id: "conagua-2026",
    severidad: "media",
    titulo: "CONAGUA: ya hay catálogo de precios unitarios 2026",
    detalle:
      "PDF oficial de marzo de 2026 (SGIH / PAIH). El 2025 queda histórico. No sustituye SICT ni el Tabulador General CDMX.",
    docIds: ["fed-conagua-catalogo-2026"],
  },
  {
    id: "sinaloa-2017",
    severidad: "media",
    titulo: "Sinaloa: el PDF del Congreso es 2017; las reformas son de 2020",
    detalle:
      "Decreto 456 (P.O. 108, 7-sep-2020) y consolidación citada al 23-oct-2020. El binario que sigue en línea no es la última palabra. Contrastar el índice IIP.",
    docIds: ["sin-ley-op", "sin-indice"],
  },
  {
    id: "cdmx-julio-2026",
    severidad: "media",
    titulo: "CDMX: el Tabulador General se actualiza por mes; julio 2026 es el último listado",
    detalle:
      "No usar un PDF de enero o marzo como si fuera el vigente. El control de versión es el portal de SOBSE.",
    docIds: ["cdmx-tabulador-2026", "cdmx-normas"],
  },
  {
    id: "lgtaip-2025",
    severidad: "critica",
    titulo: "La LGTAIP vigente es una ley nueva (20-mar-2025); el INAI ya no existe",
    detalle:
      "Abroga la LGTAIP de 2015 y la LFTAIP de 2016. La PNT sigue siendo el canal canónico de obligaciones, contratos y padrones. Transparencia para el Pueblo (SAyBG) es la autoridad garante federal. Los órganos INFO* están en transición: no usarlos como garante vigente. Un portal estatal de transparencia se consulta solo si el host responde y para contratos, padrones o licitaciones — nunca como texto de la ley. SIPOT no es un tabulador de APU.",
    docIds: ["fed-lgtaip", "fed-lftaip-abro", "fed-pnt", "fed-tpp", "fed-comprasmx"],
  },
  {
    id: "chiapas-op-2026",
    severidad: "alta",
    titulo: "Chiapas: Ley de Obra Pública con reforma 29-abr-2026",
    detalle:
      "PDF LEY_0044 del Congreso. Última reforma Periódico Oficial núm. 103, decreto 226. No se aisló la ley de adquisiciones ni un host municipal vivo (Tuxtla responde 403).",
    docIds: ["chis-ley-op", "chis-marco"],
  },
  {
    id: "chihuahua-adq-2026",
    severidad: "alta",
    titulo: "Chihuahua: adquisiciones reformada el 8-ago-2026",
    detalle:
      "PDF 1420 de la biblioteca legislativa. Emparejar con la ley de obras consolidada el 24-ene-2026. No usar copias 2018/2019 como texto principal.",
    docIds: ["chih-ley-adq", "chih-ley-op-2026"],
  },
  {
    id: "puebla-op-pdf",
    severidad: "media",
    titulo: "Puebla: el PDF de obra es 7-ago-2023; OJP cita reforma 15-mar-2026",
    detalle:
      "El binario T2 de Orden Jurídico Poblano abre. El índice del mismo portal declara una reforma posterior. Contrastar OJP antes de ingestión; no tratar el PDF como si ya incorporara marzo de 2026.",
    docIds: ["pue-ley-op", "pue-ojp"],
  },
  {
    id: "ingesta-costos-sep2026",
    severidad: "media",
    titulo: "Corte de costos 19-sep-2026: 27 fichas nuevas, 99 URLs fuera a propósito",
    detalle:
      "Se cruzaron 160 URLs de los mapeos estatal y municipal. Entran portales de costos que faltaban (Nayarit SOP, OMG Tlaxcala, CompraNet Sinaloa/Sonora, APIQROO, CEMER) y binarios con APU que sí abrieron. Fuera: series ya cubiertas (Guanajuato II–VI, Tlajomulco 017/020, Puebla 001/005), visores de un ID, periódicos oficiales como si fueran tabulador, organigramas, presupuestos de egresos y PDFs 404. Una base de licitación no se rebautiza como tabulador general.",
    docIds: [
      "nay-sop-portal",
      "qroo-bases-marina-2026",
      "sin-bases-fsr-2026",
      "mor-reg-op",
      "gto-tab-2026-t2",
      "cdmx-tabulador-2026",
    ],
  },
];
