import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { DocCard } from "@/components/doc-card";
import { TransparencySources } from "@/components/transparency-sources";
import { ENTIDAD_BY_SLUG } from "@/data/entidades";
import { coverageFor } from "@/lib/search";

export const Route = createFileRoute("/entidad/$slug")({
  component: EntidadPage,
});

export function EntidadPage() {
  const { slug } = Route.useParams();
  const meta = ENTIDAD_BY_SLUG[slug];
  if (!meta) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-3xl font-medium">Entidad no encontrada</h1>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
          Volver
        </Link>
      </div>
    );
  }
  const cov = coverageFor(slug);
  const flags = [
    ["Obra pública", cov.leyOp],
    ["Adquisiciones", cov.leyAdq],
    ["Reglamento", cov.reglamento],
    ["Tabulador", cov.tabulador],
    ["Municipal", cov.municipal],
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <p className="font-mono text-xs text-muted-foreground">{meta.clave}</p>
      <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">{meta.nombre}</h1>
      <a
        href={meta.portalLeyes}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {meta.portalNombre}
        <ArrowUpRight className="size-3.5" />
      </a>
      <ul className="mt-4 flex flex-wrap gap-2">
        {flags.map(([label, on]) => (
          <li
            key={label}
            className={
              on
                ? "rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                : "rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            }
          >
            {label}
            {on ? "" : " · no localizado"}
          </li>
        ))}
        {cov.transparenciaLocal ? (
          <li className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Portal de contratos vivo
          </li>
        ) : null}
      </ul>
      {!cov.municipal ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          En este corte no hay muestra municipal con host .gob.mx vivo. No se
          inventa el ayuntamiento: México tiene cerca de 2,478 municipios y
          aquí sólo entra el que responde.
        </p>
      ) : null}
      <p className="mt-6 text-sm text-muted-foreground">
        {cov.docs.length} registros en el corpus
      </p>
      <TransparencySources slug={slug} />
      <div className="mt-4 grid gap-3">
        {cov.docs.map((d) => (
          <DocCard key={d.id} doc={d} />
        ))}
      </div>
    </div>
  );
}
