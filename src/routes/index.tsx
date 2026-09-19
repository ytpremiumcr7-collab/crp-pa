import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CoverageGrid } from "@/components/coverage-grid";
import { CoverageGaps } from "@/components/coverage-gaps";
import { DocCard } from "@/components/doc-card";
import { SearchBox } from "@/components/search-box";
import { CORPUS_BY_ID } from "@/data/corpus";
import type { Documento } from "@/data/types";
import { searchCorpus } from "@/lib/search";
import { corpusStats } from "@/lib/stats";

export const Route = createFileRoute("/")({ component: Home });

const FEATURED = [
  "fed-laassp",
  "fed-lopsrm",
  "fed-sict-obra-2026",
  "cdmx-tabulador-2026",
  "chis-tabulador-2025",
  "jal-ley-op-2026",
];

function Home() {
  const [q, setQ] = useState("");
  const stats = corpusStats();
  const hits = useMemo(
    () =>
      searchCorpus({
        q,
        jur: "",
        cat: "",
        entidad: "",
        vigencia: "",
        pdf: false,
        apu: false,
      }),
    [q],
  );
  const featured = FEATURED.map((id) => CORPUS_BY_ID[id]).filter(
    (d): d is Documento => Boolean(d),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <section className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Contratación y obra pública · México
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          El archivo de leyes, reglamentos y tabuladores vigentes.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Corpus oficial con corte al 19 de septiembre de 2026. Federación, las 32
          entidades y una muestra municipal de capitales con host vivo — no los
          2,478 ayuntamientos del país. Un documento viejo que todavía abre no
          vence a uno nuevo que lo abroga.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {stats.urlsRevisadas} URLs oficiales se barrieron en este corte. El
          mapeo de costos (160 URLs) ya está clasificado: entra, ya estaba o
          fuera a propósito. Cinco 404 del inventario original tienen ruta viva.{" "}
          {stats.intermitentes} hosts siguen intermitentes.{" "}
          <Link to="/auditoria" className="font-medium text-primary hover:underline">
            Ver qué entra y qué no
          </Link>
          .
        </p>
      </section>

      <div className="mt-8 max-w-3xl">
        <SearchBox value={q} onChange={setQ} autoFocus />
        <p className="mt-2 text-xs text-muted-foreground">
          Prueba LAASSP, LGTAIP, PNT, SICT, Chihuahua 2026, tabulador CDMX.
        </p>
      </div>

      {q.trim() ? (
        <section className="mt-8">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl font-medium tracking-tight">
              {hits.length} resultado{hits.length === 1 ? "" : "s"}
            </h2>
            <Link
              to="/corpus"
              search={{ q }}
              className="text-sm font-medium text-primary hover:underline"
            >
              Abrir en el catálogo
            </Link>
          </div>
          <div className="grid gap-3">
            {hits.slice(0, 12).map((h) => (
              <DocCard key={h.doc.id} doc={h.doc} snippet={h.snippet} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Registros", v: stats.total },
              { k: "PDF directos", v: stats.pdfDirectos },
              { k: "URLs vivas", v: stats.verificados },
              { k: "Intermitentes", v: stats.intermitentes },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl border border-border bg-card px-4 py-4"
              >
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.k}
                </dt>
                <dd className="mt-1 font-display text-3xl font-medium tabular-nums tracking-tight">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>

          <section className="mt-12">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="font-display text-2xl font-medium tracking-tight">
                Piezas prioritarias
              </h2>
              <Link
                to="/corpus"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Ver todo <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {featured.map((doc) => (
                <DocCard key={doc.id} doc={doc} compact />
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-medium tracking-tight">
                  Cobertura de las 32 entidades
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Puntos: obra · adquisiciones · reglamento · tabulador ·
                  municipal. {stats.municipios} municipios o alcaldías con host
                  vivo; {stats.sinMun} entidades siguen sin muestra municipal.
                </p>
              </div>
              <Link
                to="/auditoria"
                className="text-sm font-medium text-primary hover:underline"
              >
                Ver huecos
              </Link>
            </div>
            <CoverageGrid />
            <div className="mt-8">
              <CoverageGaps />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
