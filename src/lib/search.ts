import { CORPUS } from "@/data/corpus";
import { SLUGS_CON_PORTAL_LOCAL } from "@/data/transparencia";
import { fold } from "@/lib/utils";
import type {
  Categoria,
  Documento,
  Jurisdiccion,
  LinkStatus,
  Vigencia,
} from "@/data/types";

export type SearchFilters = {
  q: string;
  jur: Jurisdiccion | "";
  cat: Categoria | "";
  entidad: string;
  vigencia: Vigencia | "";
  pdf: boolean;
  apu: boolean;
  enlace?: LinkStatus | "";
};

export type Hit = {
  doc: Documento;
  score: number;
  snippet: string;
};

const EMPTY_FILTERS: SearchFilters = {
  q: "",
  jur: "",
  cat: "",
  entidad: "",
  vigencia: "",
  pdf: false,
  apu: false,
  enlace: "",
};

export function emptyFilters(): SearchFilters {
  return { ...EMPTY_FILTERS };
}

function snippet(doc: Documento, qFold: string): string {
  const hay = `${doc.extracto} ${doc.notas}`;
  if (!qFold) return doc.extracto.slice(0, 220);
  const first = qFold.split(" ")[0] ?? "";
  const foldedHay = fold(hay);
  const idx = first ? foldedHay.indexOf(first) : -1;
  if (idx < 0) return doc.extracto.slice(0, 220);
  const start = Math.max(0, idx - 40);
  return (start > 0 ? "…" : "") + hay.slice(start, start + 220);
}

function scoreDoc(doc: Documento, tokens: string[]): number {
  if (tokens.length === 0) return 1;
  let score = 0;
  const title = fold(doc.titulo);
  const corto = fold(doc.tituloCorto);
  const cortoWords = corto.split(" ").filter(Boolean);
  const titleWords = fold(`${doc.titulo} ${doc.tituloCorto}`).split(" ").filter(Boolean);

  for (const t of tokens) {
    if (corto === t) score += 160;
    else if (cortoWords.includes(t)) score += 110;
    else if (corto.startsWith(t)) score += 70;

    if (titleWords.includes(t)) score += 45;
    else if (title.includes(t)) score += 28;

    if (fold(doc.entidad) === t || fold(doc.municipio ?? "") === t) score += 50;
    else if (fold(doc.entidad).includes(t)) score += 18;

    if (doc.tags.some((tag) => fold(tag).split(" ").includes(t) || fold(tag) === t)) {
      score += 32;
    }
    if (fold(doc.id).includes(t)) score += 16;
    if (fold(doc.autoridad).includes(t)) score += 10;
    if (doc.searchText.includes(t)) score += 6;

    if (cortoWords.includes(t) && doc.categoria === "ley") score += 40;
  }
  return score;
}

export function searchCorpus(filters: SearchFilters): Hit[] {
  const qFold = fold(filters.q);
  const tokens = qFold.split(" ").filter((t) => t.length >= 2);

  const out: Hit[] = [];
  for (const doc of CORPUS) {
    if (filters.jur && doc.jurisdiccion !== filters.jur) continue;
    if (filters.cat && doc.categoria !== filters.cat) continue;
    if (filters.entidad && doc.entidadSlug !== filters.entidad) continue;
    if (filters.vigencia && doc.vigencia !== filters.vigencia) continue;
    if (filters.pdf && doc.formato !== "pdf") continue;
    if (filters.apu && !doc.contieneApu && doc.categoria !== "tabulador") continue;
    if (filters.enlace && doc.estadoEnlace !== filters.enlace) continue;

    const s = scoreDoc(doc, tokens);
    if (tokens.length && s <= 0) continue;
    out.push({ doc, score: s, snippet: snippet(doc, qFold) });
  }

  out.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const rank = (d: Documento) => {
      if (d.categoria === "vacio" || d.vigencia === "no_localizado") return 0;
      if (d.categoria === "ley") return 6;
      if (d.categoria === "tabulador") return 5;
      if (d.categoria === "reglamento" || d.categoria === "catalogo") return 4;
      return 3;
    };
    const ra = rank(a.doc);
    const rb = rank(b.doc);
    if (rb !== ra) return rb - ra;
    if ((b.doc.anio ?? 0) !== (a.doc.anio ?? 0)) return (b.doc.anio ?? 0) - (a.doc.anio ?? 0);
    return a.doc.titulo.localeCompare(b.doc.titulo, "es");
  });
  return out;
}

export function relatedDocs(doc: Documento, limit = 5): Documento[] {
  return CORPUS.filter(
    (d) =>
      d.id !== doc.id &&
      (d.entidadSlug === doc.entidadSlug ||
        (doc.municipio && d.municipio === doc.municipio)),
  ).slice(0, limit);
}

export function coverageFor(slug: string) {
  const docs = CORPUS.filter((d) => d.entidadSlug === slug);
  const has = (cat: Documento["categoria"]) =>
    docs.some((d) => d.categoria === cat && d.vigencia !== "no_localizado");
  return {
    docs,
    leyOp: docs.some(
      (d) =>
        d.categoria === "ley" &&
        /obra|obras/i.test(d.titulo + d.tags.join(" ")) &&
        d.vigencia === "vigente",
    ),
    leyAdq: docs.some(
      (d) =>
        d.categoria === "ley" &&
        /adq|compra|contrat/i.test(d.titulo + d.tags.join(" ")) &&
        d.vigencia === "vigente",
    ),
    reglamento: has("reglamento"),
    tabulador: docs.some(
      (d) =>
        (d.categoria === "tabulador" || d.categoria === "catalogo") &&
        d.vigencia === "vigente",
    ),
    municipal: docs.some((d) => d.jurisdiccion === "municipal"),
    vacio: docs.some((d) => d.categoria === "vacio"),
    transparenciaLocal: SLUGS_CON_PORTAL_LOCAL.has(slug),
  };
}
