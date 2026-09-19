import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { CORPUS_BY_ID } from "@/data/corpus";
import { LINK_LABEL } from "@/data/labels";
import {
  ATTENTION_CHECKS,
  LINK_CHECKED_LABEL,
  LINK_CHECKS,
  SUSTITUCIONES_404,
  tallyLinkChecks,
} from "@/data/link-check";
import { linkVariant } from "@/lib/docs";

const ORDER: Record<string, number> = {
  roto: 0,
  intermitente: 1,
  ok_indexado: 2,
  contenedora: 3,
};

export function LinkReview() {
  const tally = tallyLinkChecks();
  const rows = [...ATTENTION_CHECKS].sort(
    (a, b) => (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9),
  );

  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Revisión de enlaces
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Barrido HTTP vivo de {LINK_CHECKS.length} URLs oficiales ·{" "}
        {LINK_CHECKED_LABEL}. Un 200 no convalida vigencia.
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Mini k="Verificados" v={tally.ok} />
        <Mini k="Indexados" v={tally.ok_indexado} />
        <Mini k="Contenedoras" v={tally.contenedora} />
        <Mini k="Intermitentes" v={tally.intermitente} />
        <Mini k="Rotos ahora" v={tally.roto} />
      </dl>

      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-warn">
          Sustituidos
        </p>
        <p className="mt-1 font-display text-lg font-medium">
          {SUSTITUCIONES_404.length} rutas del inventario se sustituyeron
        </p>
        <ul className="mt-3 grid gap-2 text-sm">
          {SUSTITUCIONES_404.map((s) => {
            const d = CORPUS_BY_ID[s.id];
            return (
              <li key={s.id} className="leading-relaxed">
                <Link
                  to="/doc/$id"
                  params={{ id: s.id }}
                  className="font-medium text-primary hover:underline"
                >
                  {d?.tituloCorto ?? s.id}
                </Link>
                <span className="text-muted-foreground">
                  {" "}
                  · se reemplazó la ruta muerta por la URL viva.
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 grid gap-3">
        {rows.map((c) => {
          const d = CORPUS_BY_ID[c.id];
          return (
            <article
              key={c.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  {d ? (
                    <Link
                      to="/doc/$id"
                      params={{ id: c.id }}
                      className="font-display text-lg font-medium leading-snug hover:text-primary"
                    >
                      {d.tituloCorto}
                    </Link>
                  ) : (
                    <p className="font-display text-lg font-medium">{c.id}</p>
                  )}
                  <p className="mt-1 font-mono text-[0.7rem] break-all text-muted-foreground">
                    {c.url}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline">HTTP {c.http}</Badge>
                  <Badge variant={linkVariant(c.status)}>
                    {LINK_LABEL[c.status]}
                  </Badge>
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.note}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Mini({ k, v }: { k: string; v: number }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
      <dd className="mt-1 font-display text-3xl font-medium tabular-nums">{v}</dd>
    </div>
  );
}
