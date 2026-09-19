import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DocPills } from "@/components/status-pills";
import { SourceLinks } from "@/components/source-links";
import type { Documento } from "@/data/types";
import { useLibrary } from "@/lib/bookmarks";
import { formatFecha } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function DocCard({
  doc,
  snippet,
  compact = false,
}: {
  doc: Documento;
  snippet?: string;
  compact?: boolean;
}) {
  const saved = useLibrary((s) => s.ids.includes(doc.id));
  const toggle = useLibrary((s) => s.toggle);
  const fecha = doc.ultimaReforma ?? doc.fechaPublicacion ?? doc.fechaAplicacion;

  return (
    <Card className="group relative overflow-hidden p-0">
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {doc.entidad}
              {doc.municipio ? ` · ${doc.municipio}` : ""}
            </p>
            <Link
              to="/doc/$id"
              params={{ id: doc.id }}
              className="mt-1 block font-display text-lg font-medium leading-snug tracking-tight text-foreground hover:text-primary"
            >
              {doc.tituloCorto}
            </Link>
          </div>
          <button
            type="button"
            aria-label={saved ? "Quitar de guardados" : "Guardar"}
            onClick={() => toggle(doc.id)}
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground",
              saved && "text-primary",
            )}
          >
            {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
          </button>
        </div>
        {!compact ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {snippet ?? doc.extracto}
          </p>
        ) : null}
        <DocPills doc={doc} />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span>{doc.autoridad}</span>
          {fecha ? <span>Reforma / fecha · {formatFecha(fecha)}</span> : null}
          <SourceLinks doc={doc} />
        </div>
      </div>
    </Card>
  );
}
