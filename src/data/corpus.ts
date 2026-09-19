import { FEDERAL } from "./federal";
import { ESTATAL } from "./estatal";
import { MUNICIPAL } from "./municipal";
import { COSTOS } from "./costos";
import { ENTIDADES } from "./entidades";
import { row } from "./build";
import { LINK_CHECK_BY_ID } from "./link-check";
import { fold } from "@/lib/utils";
import type { Documento } from "./types";

const REAL: Documento[] = [...FEDERAL, ...ESTATAL, ...MUNICIPAL, ...COSTOS];

const tieneTabuladorEstatal = new Set(
  REAL.filter(
    (d) =>
      d.categoria === "tabulador" &&
      d.jurisdiccion === "estatal" &&
      d.vigencia !== "no_localizado" &&
      d.vigencia !== "pendiente",
  ).map((d) => d.entidadSlug),
);

const VACIOS: Documento[] = ENTIDADES.filter(
  (e) => e.slug !== "federacion" && !tieneTabuladorEstatal.has(e.slug),
).map((e) =>
  row({
    id: `vacio-tab-${e.slug}`,
    titulo: `Tabulador general estatal de precios unitarios — ${e.nombre} (no localizado)`,
    corto: `Vacío tabulador ${e.corto}`,
    entidad: e.nombre,
    slug: e.slug,
    jur: "estatal",
    cat: "vacio",
    aut: "Auditoría de fuentes oficiales · corte 18-sep-2026",
    anio: 2026,
    vig: "no_localizado",
    fmt: "desconocido",
    link: "pendiente",
    conf: "medio",
    tags: [
      "vacío",
      "tabulador",
      "APU",
      "precios unitarios",
      "no localizado",
      e.nombre,
    ],
    ext: `Después del rastreo en fuentes gubernamentales y legislativas, no se obtuvo una publicación oficial reciente que pudiera clasificarse inequívocamente como tabulador / APU / catálogo estatal general de ${e.nombre}. Eso no significa que el estado no tenga precios unitarios: algunos los publican en anexos de licitaciones o expedientes de proyecto. Fallback sugerido: SICT 2026, licitaciones estatales, presupuestos de obra específicos. Confianza: no implica inexistencia.`,
    notas: "resultado_busqueda = no_localizado_en_fuentes_oficiales. fecha_revision = 2026-09-18.",
  }),
);

function withLiveStatus(d: Documento): Documento {
  const check = LINK_CHECK_BY_ID[d.id];
  if (!check) return d;
  return {
    ...d,
    estadoEnlace: check.status,
    searchText: fold(
      `${d.searchText} ${check.status} ${check.note} enlace http ${check.http}`,
    ),
  };
}

export const CORPUS: Documento[] = [...REAL, ...VACIOS].map(withLiveStatus);

export const CORPUS_BY_ID: Record<string, Documento> = Object.fromEntries(
  CORPUS.map((d) => [d.id, d]),
);

export const CORTE = "2026-09-19";
