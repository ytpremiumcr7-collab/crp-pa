import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DocCard } from "@/components/doc-card";
import { FilterBar } from "@/components/filter-bar";
import { SearchBox } from "@/components/search-box";
import type { Categoria, Jurisdiccion, LinkStatus } from "@/data/types";
import { emptyFilters, searchCorpus, type SearchFilters } from "@/lib/search";

type CorpusSearch = {
  q?: string;
  jur?: string;
  cat?: string;
  entidad?: string;
  pdf?: boolean;
  apu?: boolean;
  enlace?: string;
};

export const Route = createFileRoute("/corpus")({
  validateSearch: (raw: Record<string, unknown>): CorpusSearch => ({
    q: typeof raw.q === "string" ? raw.q : undefined,
    jur: typeof raw.jur === "string" ? raw.jur : undefined,
    cat: typeof raw.cat === "string" ? raw.cat : undefined,
    entidad: typeof raw.entidad === "string" ? raw.entidad : undefined,
    pdf: raw.pdf === true || raw.pdf === "1" || raw.pdf === "true" ? true : undefined,
    apu: raw.apu === true || raw.apu === "1" || raw.apu === "true" ? true : undefined,
    enlace: typeof raw.enlace === "string" ? raw.enlace : undefined,
  }),
  component: CorpusPage,
});

function CorpusPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const filters: SearchFilters = {
    ...emptyFilters(),
    q: search.q ?? "",
    jur: (search.jur ?? "") as Jurisdiccion | "",
    cat: (search.cat ?? "") as Categoria | "",
    entidad: search.entidad ?? "",
    pdf: Boolean(search.pdf),
    apu: Boolean(search.apu),
    enlace: (search.enlace ?? "") as LinkStatus | "",
  };

  function setFilters(next: SearchFilters) {
    void navigate({
      search: {
        q: next.q || undefined,
        jur: next.jur || undefined,
        cat: next.cat || undefined,
        entidad: next.entidad || undefined,
        pdf: next.pdf || undefined,
        apu: next.apu || undefined,
        enlace: next.enlace || undefined,
      },
    });
  }

  const hits = useMemo(
    () => searchCorpus(filters),
    [
      filters.q,
      filters.jur,
      filters.cat,
      filters.entidad,
      filters.pdf,
      filters.apu,
      filters.enlace,
    ],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="font-display text-3xl font-medium tracking-tight">Corpus</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Catálogo faceted de fuentes oficiales. Los vacíos de tabulador están
        indexados a propósito: «no localizado» no es «no existe». El estado del
        enlace sale del barrido HTTP del 18-sep-2026.
      </p>
      <div className="mt-6 max-w-3xl">
        <SearchBox
          value={filters.q}
          onChange={(q) => setFilters({ ...filters, q })}
        />
      </div>
      <div className="mt-5">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        {hits.length} registro{hits.length === 1 ? "" : "s"}
      </p>
      <div className="mt-3 grid gap-3">
        {hits.map((h) => (
          <DocCard key={h.doc.id} doc={h.doc} snippet={h.snippet} />
        ))}
      </div>
    </div>
  );
}
