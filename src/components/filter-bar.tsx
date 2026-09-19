import type { ReactNode } from "react";
import { ENTIDADES } from "@/data/entidades";
import { CATEGORIA_LABEL, JURISDICCION_LABEL } from "@/data/labels";
import type { Categoria, Jurisdiccion, LinkStatus } from "@/data/types";
import type { SearchFilters } from "@/lib/search";
import { cn } from "@/lib/utils";

const CATS: Categoria[] = [
  "ley",
  "reglamento",
  "lineamiento",
  "tabulador",
  "catalogo",
  "portal",
  "manual",
  "expediente",
  "vacio",
];

const JURS: Jurisdiccion[] = ["federal", "estatal", "municipal"];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 rounded-full border px-3 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-accent",
      )}
    >
      {children}
    </button>
  );
}

function toggleEnlace(current: LinkStatus | "" | undefined, next: LinkStatus) {
  return current === next ? "" : next;
}

export function FilterBar({
  filters,
  onChange,
}: {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {JURS.map((j) => (
          <Chip
            key={j}
            active={filters.jur === j}
            onClick={() => onChange({ ...filters, jur: filters.jur === j ? "" : j })}
          >
            {JURISDICCION_LABEL[j]}
          </Chip>
        ))}
        <span className="mx-1 w-px shrink-0 bg-border" />
        {CATS.map((c) => (
          <Chip
            key={c}
            active={filters.cat === c}
            onClick={() => onChange({ ...filters, cat: filters.cat === c ? "" : c })}
          >
            {CATEGORIA_LABEL[c]}
          </Chip>
        ))}
        <Chip
          active={filters.pdf}
          onClick={() => onChange({ ...filters, pdf: !filters.pdf })}
        >
          Solo PDF
        </Chip>
        <Chip
          active={filters.apu}
          onClick={() => onChange({ ...filters, apu: !filters.apu })}
        >
          APU / costos
        </Chip>
        <Chip
          active={filters.enlace === "intermitente"}
          onClick={() =>
            onChange({
              ...filters,
              enlace: toggleEnlace(filters.enlace, "intermitente"),
            })
          }
        >
          Intermitentes
        </Chip>
        <Chip
          active={filters.enlace === "roto"}
          onClick={() =>
            onChange({ ...filters, enlace: toggleEnlace(filters.enlace, "roto") })
          }
        >
          Enlaces rotos
        </Chip>
      </div>
      <label className="flex max-w-sm flex-col gap-1 text-xs font-medium text-muted-foreground">
        Entidad
        <select
          className="h-11 rounded-md border border-input bg-card px-3 text-sm text-foreground"
          value={filters.entidad}
          onChange={(e) => onChange({ ...filters, entidad: e.target.value })}
        >
          <option value="">Todas las entidades</option>
          {ENTIDADES.map((e) => (
            <option key={e.slug} value={e.slug}>
              {e.nombre}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
