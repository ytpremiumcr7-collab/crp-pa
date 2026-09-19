import { ENTIDAD_BY_SLUG } from "@/data/entidades";
import type { Documento, LinkStatus, Vigencia } from "@/data/types";

export function officialUrl(doc: Documento): string | undefined {
  return doc.urlDirecta ?? doc.urlContenedora;
}

export function documentUrl(doc: Documento): string | undefined {
  return doc.urlDirecta;
}

export function portalUrl(doc: Documento): string | undefined {
  if (doc.urlContenedora) return doc.urlContenedora;
  const lawLike =
    doc.categoria === "ley" ||
    doc.categoria === "reglamento" ||
    doc.categoria === "lineamiento" ||
    doc.categoria === "vacio";
  if (lawLike) return ENTIDAD_BY_SLUG[doc.entidadSlug]?.portalLeyes;
  return doc.urlDirecta;
}

export function portalLabel(doc: Documento): string {
  if (doc.municipio) return `Portal ${doc.municipio}`;
  return ENTIDAD_BY_SLUG[doc.entidadSlug]?.portalNombre ?? "Portal oficial";
}

export function vigenciaVariant(
  v: Vigencia,
): "ok" | "warn" | "danger" | "muted" {
  if (v === "vigente") return "ok";
  if (v === "pendiente") return "warn";
  if (v === "historico") return "muted";
  return "danger";
}

export function linkVariant(
  s: LinkStatus,
): "ok" | "info" | "warn" | "muted" | "danger" {
  if (s === "ok") return "ok";
  if (s === "ok_indexado") return "info";
  if (s === "intermitente") return "warn";
  if (s === "roto") return "danger";
  return "muted";
}
