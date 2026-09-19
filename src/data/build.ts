import { fold } from "@/lib/utils";
import { ENTIDAD_BY_SLUG } from "./entidades";
import type {
  Categoria,
  Confianza,
  Documento,
  Formato,
  Jurisdiccion,
  LinkStatus,
  Vigencia,
} from "./types";

export type Row = {
  id: string;
  titulo: string;
  corto?: string;
  entidad: string;
  slug: string;
  mun?: string;
  jur: Jurisdiccion;
  cat: Categoria;
  aut: string;
  anio?: number;
  ref?: string;
  pub?: string;
  apl?: string;
  vig: Vigencia;
  url?: string;
  cont?: string;
  fmt?: Formato;
  link?: LinkStatus;
  conf?: Confianza;
  tags: string[];
  ext: string;
  notas?: string;
  apu?: boolean;
  maq?: boolean;
  sust?: string;
};

function fallbackPortal(r: Row): string | undefined {
  if (r.jur === "municipal" && r.url) {
    try {
      return `${new URL(r.url).origin}/`;
    } catch {
      return r.url;
    }
  }
  const lawLike =
    r.cat === "ley" ||
    r.cat === "reglamento" ||
    r.cat === "lineamiento" ||
    r.cat === "vacio";
  if (lawLike) return ENTIDAD_BY_SLUG[r.slug]?.portalLeyes;
  if (r.url?.toLowerCase().includes(".pdf")) {
    try {
      return `${new URL(r.url).origin}/`;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export function row(r: Row): Documento {
  const tituloCorto = r.corto ?? r.titulo;
  const notas = r.notas ?? "";
  const portal = r.cont ?? fallbackPortal(r);
  return {
    id: r.id,
    titulo: r.titulo,
    tituloCorto,
    entidad: r.entidad,
    entidadSlug: r.slug,
    municipio: r.mun,
    jurisdiccion: r.jur,
    categoria: r.cat,
    autoridad: r.aut,
    anio: r.anio,
    fechaPublicacion: r.pub,
    ultimaReforma: r.ref,
    fechaAplicacion: r.apl,
    vigencia: r.vig,
    urlDirecta: r.url,
    urlContenedora: r.cont ?? fallbackPortal(r),
    formato: r.fmt ?? (r.url?.toLowerCase().includes(".pdf") ? "pdf" : r.url ? "html" : "portal"),
    estadoEnlace: r.link ?? (r.url ? "ok" : "contenedora"),
    notas,
    extracto: r.ext,
    tags: r.tags,
    sustituyeA: r.sust,
    contieneApu: r.apu,
    contieneMaquinaria: r.maq,
    nivelConfianza: r.conf ?? "alto",
    searchText: fold(
      [
        r.id,
        r.titulo,
        tituloCorto,
        r.entidad,
        r.mun,
        r.aut,
        r.cat,
        r.jur,
        r.tags.join(" "),
        r.ext,
        notas,
        String(r.anio ?? ""),
        r.ref ?? "",
        r.apl ?? "",
        r.pub ?? "",
        portal ?? "",
      ].join(" "),
    ),
  };
}
