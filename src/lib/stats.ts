import { CORPUS } from "@/data/corpus";
import { ENTIDADES } from "@/data/entidades";
import type { EntidadMeta } from "@/data/types";
import { LINK_CHECKS, tallyLinkChecks } from "@/data/link-check";
import { coverageFor } from "@/lib/search";

const ESTADOS = ENTIDADES.filter((e) => e.slug !== "federacion");

export function corpusStats() {
  const docs = CORPUS;
  const pdfDirectos = docs.filter((d) => d.formato === "pdf" && d.urlDirecta).length;
  const tabuladores = docs.filter(
    (d) =>
      (d.categoria === "tabulador" || d.categoria === "catalogo") &&
      d.vigencia === "vigente",
  ).length;
  const vacios = docs.filter((d) => d.categoria === "vacio").length;
  const municipales = docs.filter((d) => d.jurisdiccion === "municipal").length;
  const municipios = new Set(
    docs.filter((d) => d.municipio).map((d) => `${d.entidadSlug}::${d.municipio}`),
  ).size;
  const conTab = ESTADOS.filter((e) => coverageFor(e.slug).tabulador).length;
  const reformas2026 = docs.filter(
    (d) =>
      (d.ultimaReforma?.startsWith("2026") ||
        d.fechaPublicacion?.startsWith("2026") ||
        d.anio === 2026) &&
      d.categoria !== "vacio",
  ).length;
  const tally = tallyLinkChecks();
  const gaps = coverageGaps();
  return {
    total: docs.length,
    pdfDirectos,
    tabuladores,
    vacios,
    municipales,
    municipios,
    entidades: ESTADOS.length,
    conTab,
    reformas2026,
    federales: docs.filter((d) => d.jurisdiccion === "federal").length,
    urlsRevisadas: LINK_CHECKS.length,
    rotos: tally.roto,
    intermitentes: tally.intermitente,
    verificados: tally.ok,
    indexados: tally.ok_indexado,
    contenedoras: tally.contenedora,
    sinOp: gaps.sinOp.length,
    sinAdq: gaps.sinAdq.length,
    sinMun: gaps.sinMun.length,
  };
}

export type CoverageGaps = {
  sinOp: EntidadMeta[];
  sinAdq: EntidadMeta[];
  sinMun: EntidadMeta[];
  sinTab: EntidadMeta[];
};

export function coverageGaps(): CoverageGaps {
  const flag = (key: "leyOp" | "leyAdq" | "municipal" | "tabulador") =>
    ESTADOS.filter((e) => !coverageFor(e.slug)[key]);
  return {
    sinOp: flag("leyOp"),
    sinAdq: flag("leyAdq"),
    sinMun: flag("municipal"),
    sinTab: flag("tabulador"),
  };
}
