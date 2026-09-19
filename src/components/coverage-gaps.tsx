import { Link } from "@tanstack/react-router";
import { coverageGaps } from "@/lib/stats";
import type { EntidadMeta } from "@/data/types";

function ChipList({ items }: { items: EntidadMeta[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Ninguno en este corte.</p>;
  }
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {items.map((e) => (
        <li key={e.slug}>
          <Link
            to="/entidad/$slug"
            params={{ slug: e.slug }}
            className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:border-rule"
          >
            {e.nombre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CoverageGaps() {
  const g = coverageGaps();
  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-primary">
        Huecos de este corte
      </p>
      <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
        Qué falta, con nombre
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Las 32 entidades ya están en el archivo. Un punto apagado no es un estado
        ausente: es un documento que no se aisló en fuente oficial viva. México
        tiene cerca de 2,478 municipios; aquí hay una muestra de capitales y
        ayuntamientos cuyo host .gob.mx respondió. No se inventa el padrón.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium">
            Sin ley de obra pública aislada
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              {g.sinOp.length}
            </span>
          </h3>
          <ChipList items={g.sinOp} />
        </div>
        <div>
          <h3 className="text-sm font-medium">
            Sin ley de adquisiciones / compras aislada
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              {g.sinAdq.length}
            </span>
          </h3>
          <ChipList items={g.sinAdq} />
        </div>
        <div>
          <h3 className="text-sm font-medium">
            Sin muestra municipal con host vivo
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              {g.sinMun.length}
            </span>
          </h3>
          <ChipList items={g.sinMun} />
          {g.sinMun.length > 0 ? (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Solo entra un ayuntamiento si el host .gob.mx respondió. Un 403, un
              timeout o un portal estatal homónimo no se recicla como municipio.
            </p>
          ) : (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Cada entidad tiene al menos un ayuntamiento con host vivo. Chiapas
              entra por Tapachula (Tuxtla sigue en 403). No es el padrón de 2,478
              municipios.
            </p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium">
            Sin tabulador general estatal
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              {g.sinTab.length}
            </span>
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Vigentes: Chiapas y CDMX, más SICT y CONAGUA federales. Chihuahua
            tiene pista INIFECH sin año confirmado. El resto queda como vacío
            técnico: no implica que el estado no publique precios en
            licitaciones.
          </p>
        </div>
      </div>
    </section>
  );
}
