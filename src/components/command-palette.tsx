import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FileText, Landmark, MapPinned } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ENTIDADES } from "@/data/entidades";
import { searchCorpus } from "@/lib/search";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
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
      }).slice(0, 8),
    [q],
  );
  const ents = useMemo(() => {
    const f = q.trim().toLowerCase();
    return ENTIDADES.filter(
      (e) =>
        !f ||
        e.nombre.toLowerCase().includes(f) ||
        e.clave.toLowerCase().includes(f) ||
        e.slug.includes(f),
    ).slice(0, 6);
  }, [q]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0">
        <DialogTitle className="sr-only">Buscar en el corpus</DialogTitle>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ley, tabulador, Jalisco, SICT, LAASSP, PNT…"
          className="h-14 w-full rounded-t-xl border-b border-border bg-transparent px-5 text-base outline-none placeholder:text-muted-foreground"
        />
        <div className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
          {ents.length ? (
            <p className="px-3 py-2 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
              Entidades
            </p>
          ) : null}
          {ents.map((e) => (
            <button
              key={e.slug}
              type="button"
              onClick={() => {
                onOpenChange(false);
                void navigate({ to: "/entidad/$slug", params: { slug: e.slug } });
              }}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm hover:bg-accent"
            >
              {e.slug === "federacion" ? (
                <Landmark className="size-4 text-muted-foreground" />
              ) : (
                <MapPinned className="size-4 text-muted-foreground" />
              )}
              <span>{e.nombre}</span>
              <span className="ml-auto font-mono text-[0.65rem] text-muted-foreground">
                {e.clave}
              </span>
            </button>
          ))}
          <p className="px-3 py-2 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
            Documentos
          </p>
          {hits.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground">Sin coincidencias.</p>
          ) : (
            hits.map((h) => (
              <button
                key={h.doc.id}
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  void navigate({ to: "/doc/$id", params: { id: h.doc.id } });
                }}
                className="flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left hover:bg-accent"
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium leading-snug">
                    {h.doc.tituloCorto}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {h.doc.entidad}
                    {h.doc.municipio ? ` · ${h.doc.municipio}` : ""}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
