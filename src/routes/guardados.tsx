import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DocCard } from "@/components/doc-card";
import { CORPUS_BY_ID } from "@/data/corpus";
import type { Documento } from "@/data/types";
import { useLibrary } from "@/lib/bookmarks";

export const Route = createFileRoute("/guardados")({
  component: GuardadosPage,
});

function GuardadosPage() {
  const [ready, setReady] = useState(false);
  const ids = useLibrary((s) => s.ids);
  const recent = useLibrary((s) => s.recent);
  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="font-display text-3xl font-medium tracking-tight">Guardados</h1>
        <p className="mt-2 text-sm text-muted-foreground">Cargando…</p>
      </div>
    );
  }

  const docs = ids
    .map((id) => CORPUS_BY_ID[id])
    .filter((d): d is Documento => Boolean(d));
  const recents = recent
    .map((id) => CORPUS_BY_ID[id])
    .filter((d): d is Documento => Boolean(d));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="font-display text-3xl font-medium tracking-tight">Guardados</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Quedan en este dispositivo. No hay cuentas.
      </p>
      {docs.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Aún no hay fichas guardadas.{" "}
          <Link to="/corpus" className="font-medium text-primary hover:underline">
            Abrir el corpus
          </Link>
        </p>
      ) : (
        <div className="mt-6 grid gap-3">
          {docs.map((d) => (
            <DocCard key={d.id} doc={d} />
          ))}
        </div>
      )}
      {recents.length ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-medium tracking-tight">Vistos</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {recents.map((d) => (
              <DocCard key={d.id} doc={d} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
