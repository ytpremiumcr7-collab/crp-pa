import { ArrowUpRight } from "lucide-react";
import type { Documento } from "@/data/types";
import { documentUrl, portalLabel, portalUrl } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function SourceLinks({
  doc,
  className,
}: {
  doc: Documento;
  className?: string;
}) {
  const file = documentUrl(doc);
  const portal = portalUrl(doc);
  const same = Boolean(file && portal && file === portal);
  const fileLabel = doc.formato === "pdf" ? "Abrir PDF" : "Abrir documento";

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1", className)}>
      {file && !same ? (
        <a
          href={file}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          {fileLabel}
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
      {portal ? (
        <a
          href={portal}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          {same || doc.categoria === "portal" ? "Portal oficial" : portalLabel(doc)}
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : file && same ? (
        <a
          href={file}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          Portal oficial
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
    </div>
  );
}
