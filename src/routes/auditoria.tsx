import { createFileRoute, Link } from "@tanstack/react-router";
import { ALERTAS } from "@/data/alertas";
import { CORPUS_BY_ID } from "@/data/corpus";
import {
  PORTALES_ESTATALES,
  REVISION_SEMANAL,
  SLUGS_CON_PORTAL_LOCAL,
} from "@/data/transparencia";
import { corpusStats } from "@/lib/stats";
import { CoverageGrid } from "@/components/coverage-grid";
import { CoverageGaps } from "@/components/coverage-gaps";
import { LinkReview } from "@/components/link-review";
import { TransparencySources } from "@/components/transparency-sources";
import { IngestReview } from "@/components/ingest-review";

export const Route = createFileRoute("/auditoria")({
  component: AuditoriaPage,
});

function AuditoriaPage() {
  const stats = corpusStats();
  const locales = SLUGS_CON_PORTAL_LOCAL.size;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
        Auditoría de fuentes
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Corte 19 de septiembre de 2026. Un PDF que todavía responde no es, por
        eso, el texto vigente. La auditoría marca sustituidos, intermitentes y
        vacíos técnicos. {stats.urlsRevisadas} URLs se barrieron de verdad en
        este corte. El mapeo de costos se clasificó completo: entra, ya estaba o
        fuera.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat k="Registros" v={stats.total} />
        <Stat k="PDF directos" v={stats.pdfDirectos} />
        <Stat k="URLs revisadas" v={stats.urlsRevisadas} />
        <Stat k="Intermitentes" v={stats.intermitentes} />
      </dl>

      <IngestReview />

      <section className="mt-10 rounded-xl border border-border bg-card p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          Rutina semanal
        </p>
        <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
          Portales oficiales, cada lunes
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {REVISION_SEMANAL.etiqueta}. Último corte {REVISION_SEMANAL.corte}.
          Siguiente pasada: {REVISION_SEMANAL.siguienteEtiqueta}. Si una alerta
          de vigencia se dispara, se revisa ese documento sin esperar al lunes.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            Verificar fuentes gubernamentales y legislativas (.gob.mx, congresos,
            DOF, periódicos oficiales). Nada de agregadores privados.
          </li>
          <li>
            Consultar portales de transparencia estatal solo si aplica: contratos,
            padrones, licitaciones u obligaciones. Nunca como texto de la ley.
          </li>
          <li>
            Buscar consolidado o reforma más reciente que la ficha, y sustituir
            URLs muertas.
          </li>
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">
          {locales} entidades tienen portal local vivo en este corte; el resto
          se consulta por la PNT. {PORTALES_ESTATALES.length} hosts estatales
          respondieron HTTP 200.
        </p>
      </section>

      <div className="mt-8">
        <TransparencySources slug="federacion" />
      </div>

      <LinkReview />

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Alertas de vigencia
        </h2>
        <div className="mt-4 grid gap-3">
          {ALERTAS.map((a) => (
            <article
              key={a.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-warn">
                {a.severidad}
              </p>
              <h3 className="mt-1 font-display text-lg font-medium">{a.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {a.detalle}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {a.docIds.map((id) => {
                  const d = CORPUS_BY_ID[id];
                  if (!d) return null;
                  return (
                    <li key={id}>
                      <Link
                        to="/doc/$id"
                        params={{ id }}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {d.tituloCorto}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Matriz de cobertura
        </h2>
        <p className="mt-1 mb-4 text-sm text-muted-foreground">
          Puntos: obra · adquisiciones · reglamento · tabulador · municipal.
          Un punto apagado es un hueco de fuente, no un estado fuera del archivo.
        </p>
        <CoverageGrid />
      </section>

      <div className="mt-10">
        <CoverageGaps />
      </div>

      <section className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
          Criterios
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Sólo fuentes gubernamentales o legislativas.</li>
          <li>
            Portales de transparencia estatal: solo si el host responde y para
            contratos, padrones, licitaciones u obligaciones. Nunca como fuente
            de la ley.
          </li>
          <li>
            La PNT es el canal unificado. SIPOT es su módulo de obligaciones; no
            es tabulador de obra ni APU.
          </li>
          <li>
            El INAI y los órganos INFO* no se tratan como garantes vigentes. La
            autoridad garante federal es Transparencia para el Pueblo (SAyBG).
          </li>
          <li>
            Si no hay binario estable, se guarda la página contenedora y se marca
            pendiente.
          </li>
          <li>
            Manual de organización ≠ reglamento. Acta de apertura ≠ norma.
            Catálogo municipal ≠ tabulador estatal.
          </li>
          <li>
            Tabuladores catastrales no se confunden con precios unitarios de obra.
          </li>
          <li>
            «No localizado» no afirma inexistencia. Los vacíos forman parte del
            dataset.
          </li>
          <li>
            Accesible no equivale a vigente. Un 404 sustituido tampoco convalida
            el texto.
          </li>
        </ul>
      </section>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: number }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
      <dd className="mt-1 font-display text-3xl font-medium tabular-nums">{v}</dd>
    </div>
  );
}
