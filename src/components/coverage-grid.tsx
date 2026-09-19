import { Link } from "@tanstack/react-router";
import { ENTIDADES } from "@/data/entidades";
import { coverageFor } from "@/lib/search";
import { cn } from "@/lib/utils";

function Dot({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      title={label}
      className={cn("size-1.5 rounded-full", on ? "bg-primary" : "bg-border")}
    />
  );
}

export function CoverageGrid() {
  const states = ENTIDADES.filter((e) => e.slug !== "federacion");
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {states.map((e) => {
        const c = coverageFor(e.slug);
        return (
          <Link
            key={e.slug}
            to="/entidad/$slug"
            params={{ slug: e.slug }}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-rule"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium leading-tight">{e.nombre}</span>
              <span className="font-mono text-xs text-muted-foreground">{e.clave}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Dot on={c.leyOp} label="Ley de obra pública" />
              <Dot on={c.leyAdq} label="Ley de adquisiciones" />
              <Dot on={c.reglamento} label="Reglamento" />
              <Dot on={c.tabulador} label="Tabulador" />
              <Dot on={c.municipal} label="Municipal" />
              <span className="ml-auto font-mono text-xs text-muted-foreground">
                {c.docs.length}
              </span>
            </div>
            {!c.leyOp || !c.leyAdq || !c.municipal ? (
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {[
                  !c.leyOp ? "obra" : null,
                  !c.leyAdq ? "adq." : null,
                  !c.municipal ? "mun." : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}{" "}
                pendiente
              </p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
