import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBox({
  value,
  onChange,
  onSubmit,
  autoFocus = false,
  size = "lg",
  id = "corpus-search",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  size?: "lg" | "md";
  id?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={cn(
        "flex items-center gap-2 rounded-xl border border-border bg-card text-foreground shadow-card",
        size === "lg" ? "h-14 px-4" : "h-11 px-3",
      )}
    >
      <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <input
        id={id}
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar ley, tabulador, entidad, APU, reforma…"
        className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        autoComplete="off"
        spellCheck={false}
      />
      {value ? (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          onClick={() => onChange("")}
        >
          <X className="size-4" />
        </button>
      ) : (
        <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground sm:inline">
          /
        </kbd>
      )}
    </form>
  );
}
