import type { LinkStatus } from "./types";
import { LINK_CHECKS_A } from "./link-check-a";
import { LINK_CHECKS_B } from "./link-check-b";

export const LINK_CHECKED_AT = "2026-09-19T12:40:00-06:00";
export const LINK_CHECKED_LABEL = "19 sep 2026 · 12:40 CST";

export type LinkCheck = {
  id: string;
  url: string;
  http: string;
  sniff: string;
  status: LinkStatus;
  note: string;
};

export const SUSTITUCIONES_404: {
  id: string;
  before: string;
  after: string;
}[] = [
  {
    id: "bcs-compranet",
    before: "https://compranet.bcs.gob.mx/",
    after: "http://compranet.bcs.gob.mx/",
  },
  {
    id: "mor-ley-op",
    before: "https://marcojuridico.morelos.gob.mx/archivos/leyes/pdf/LOBRAPUBEM.pdf",
    after: "https://marcojuridico.morelos.gob.mx/buscar/resultados?documento=2801",
  },
  {
    id: "mor-ley-adq",
    before: "https://marcojuridico.morelos.gob.mx/documentos/2826",
    after: "https://marcojuridico.morelos.gob.mx/buscar/resultados?documento=2826",
  },
  {
    id: "mor-reg-adq",
    before: "https://marcojuridico.morelos.gob.mx/documentos/3047",
    after: "https://marcojuridico.morelos.gob.mx/buscar/resultados?documento=3047",
  },
  {
    id: "tam-ley-op-2026",
    before:
      "https://www.congresotamaulipas.gob.mx/Parlamentario/Archivos/Leyes/Ley%20de%20Obras%20Publicas%20y%20Servicios%20Relacionados%20con%20las%20mismas%2012-02-2026.pdf",
    after:
      "https://www.congresotamaulipas.gob.mx/Parlamentario/Archivos/Leyes/Ley%20de%20Obras%20P%C3%BAblicas%201.pdf",
  },
  {
    id: "culiacan-normatividad",
    before: "https://www.culiacan.gob.mx/transparencia/normatividad",
    after: "https://transparencia.culiacan.gob.mx/",
  },
];

export const LINK_CHECKS: LinkCheck[] = [...LINK_CHECKS_A, ...LINK_CHECKS_B];

export const LINK_CHECK_BY_ID: Record<string, LinkCheck> = Object.fromEntries(
  LINK_CHECKS.map((c) => [c.id, c]),
);

const EMPTY_TALLY: Record<LinkStatus, number> = {
  ok: 0,
  ok_indexado: 0,
  contenedora: 0,
  intermitente: 0,
  pendiente: 0,
  roto: 0,
};

export function tallyLinkChecks() {
  const t = { ...EMPTY_TALLY };
  for (const c of LINK_CHECKS) t[c.status] += 1;
  return t;
}

export const ATTENTION_CHECKS = LINK_CHECKS.filter(
  (c) =>
    c.status === "intermitente" ||
    c.status === "roto" ||
    c.status === "ok_indexado" ||
    c.status === "contenedora",
);
