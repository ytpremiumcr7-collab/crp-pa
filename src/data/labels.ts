import type {
  Categoria,
  Confianza,
  Formato,
  Jurisdiccion,
  LinkStatus,
  Vigencia,
} from "./types";

export const CATEGORIA_LABEL: Record<Categoria, string> = {
  ley: "Ley",
  reglamento: "Reglamento",
  lineamiento: "Lineamiento",
  tabulador: "Tabulador",
  catalogo: "Catálogo",
  manual: "Manual",
  portal: "Portal",
  padron: "Padrón",
  expediente: "Expediente",
  vacio: "Vacío técnico",
};

export const JURISDICCION_LABEL: Record<Jurisdiccion, string> = {
  federal: "Federal",
  estatal: "Estatal",
  municipal: "Municipal",
};

export const VIGENCIA_LABEL: Record<Vigencia, string> = {
  vigente: "Vigente",
  historico: "Histórico",
  pendiente: "Pendiente",
  no_localizado: "No localizado",
};

export const LINK_LABEL: Record<LinkStatus, string> = {
  ok: "URL verificada",
  ok_indexado: "Indexado oficial",
  contenedora: "Página contenedora",
  intermitente: "Intermitente",
  pendiente: "Pendiente",
  roto: "Enlace roto",
};

export const FORMATO_LABEL: Record<Formato, string> = {
  pdf: "PDF",
  html: "HTML",
  xlsx: "Excel",
  portal: "Portal",
  desconocido: "—",
};

export const CONFIANZA_LABEL: Record<Confianza, string> = {
  alto: "Alta",
  medio: "Media",
  bajo: "Baja",
};
