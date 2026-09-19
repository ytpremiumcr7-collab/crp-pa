import { Badge } from "@/components/ui/badge";
import {
  CATEGORIA_LABEL,
  JURISDICCION_LABEL,
  LINK_LABEL,
  VIGENCIA_LABEL,
} from "@/data/labels";
import type { Documento } from "@/data/types";
import { linkVariant, vigenciaVariant } from "@/lib/docs";

export function DocPills({ doc }: { doc: Documento }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <Badge variant="outline">{JURISDICCION_LABEL[doc.jurisdiccion]}</Badge>
      <Badge variant="secondary">{CATEGORIA_LABEL[doc.categoria]}</Badge>
      <Badge variant={vigenciaVariant(doc.vigencia)}>
        {VIGENCIA_LABEL[doc.vigencia]}
      </Badge>
      <Badge variant={linkVariant(doc.estadoEnlace)}>
        {LINK_LABEL[doc.estadoEnlace]}
      </Badge>
      {doc.formato === "pdf" ? <Badge variant="outline">PDF</Badge> : null}
      {doc.contieneApu ? <Badge variant="info">APU</Badge> : null}
      {doc.municipio ? <Badge variant="outline">{doc.municipio}</Badge> : null}
    </div>
  );
}
