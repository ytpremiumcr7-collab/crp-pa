import { createFileRoute, Link } from "@tanstack/react-router";
import { DocCard } from "@/components/doc-card";
import { CORPUS } from "@/data/corpus";

export const Route = createFileRoute("/tabuladores")({
  component: TabuladoresPage,
});

function TabuladoresPage() {
  const docs = CORPUS.filter(
    (d) =>
      d.categoria === "tabulador" ||
      d.categoria === "catalogo" ||
      d.contieneApu ||
      d.contieneMaquinaria,
  ).filter((d) => d.categoria !== "vacio");
  const vacios = CORPUS.filter((d) => d.categoria === "vacio");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
        Capa técnica · APU y tabuladores
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        La ley fija la arquitectura jurídica; el reglamento desarrolla costos
        horarios, catálogo de conceptos y maquinaria; el tabulador parametriza
        recursos y rendimientos. No mezclar esas capas. El corte de costos del
        19-sep-2026 añadió portales y expedientes con APU; no convirtió bases de
        licitación en tabulador general.
      </p>
      <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed">
        <p className="font-medium">Familias SICT 2026</p>
        <p className="mt-2 text-muted-foreground">
          Obra carretera aplica desde el 1 de julio. Servicios, maquinaria y
          paramétricos, desde el 1 de febrero. El año del archivo no es la fecha
          de aplicación.
        </p>
      </div>
      <div className="mt-8 grid gap-3">
        {docs.map((d) => (
          <DocCard key={d.id} doc={d} />
        ))}
      </div>
      <section className="mt-12">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Vacíos estatales
          </h2>
          <Link to="/auditoria" className="text-sm font-medium text-primary hover:underline">
            Auditoría
          </Link>
        </div>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
          {vacios.length} entidades sin tabulador general reciente publicado de
          forma inequívoca. Fallback: SICT 2026, licitaciones, presupuestos de
          obra específicos.
        </p>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {vacios.map((d) => (
            <li key={d.id}>
              <Link
                to="/doc/$id"
                params={{ id: d.id }}
                className="block rounded-lg border border-border bg-card px-3 py-3 text-sm hover:border-rule"
              >
                {d.entidad}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
