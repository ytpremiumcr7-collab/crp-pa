import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPalette } from "@/components/command-palette";
import { corpusStats } from "@/lib/stats";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/corpus", label: "Corpus" },
  { to: "/tabuladores", label: "Tabuladores" },
  { to: "/auditoria", label: "Auditoría" },
  { to: "/guardados", label: "Guardados" },
] as const;

function NavLinks({
  pathname,
  onClick,
}: {
  pathname: string;
  onClick?: () => void;
}) {
  return (
    <>
      {NAV.map((item) => {
        const active =
          item.to === "/"
            ? pathname === "/"
            : pathname === item.to || pathname.startsWith(`${item.to}/`);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClick}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [palette, setPalette] = useState(false);
  const [menu, setMenu] = useState(false);
  const stats = corpusStats();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette(true);
        return;
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        const el = document.getElementById("corpus-search") as HTMLInputElement | null;
        if (el) el.focus();
        else setPalette(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <TooltipProvider>
      <div className="flex min-h-dvh flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary font-display text-sm font-semibold text-primary-foreground">
                P
              </span>
              <span className="leading-tight">
                <span className="block font-display text-base font-semibold tracking-tight">
                  Piedra Angular
                </span>
                <span className="hidden text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground sm:block">
                  Corpus MX · 2026
                </span>
              </span>
            </Link>
            <nav className="ml-4 hidden items-center gap-0.5 md:flex">
              <NavLinks pathname={pathname} />
            </nav>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPalette(true)}
                className="flex h-11 items-center gap-2 rounded-md px-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Buscar"
              >
                <Search className="size-4" />
                <span className="hidden text-sm lg:inline">Buscar</span>
                <kbd className="hidden rounded border border-border bg-muted px-1.5 font-mono text-[0.65rem] lg:inline">
                  ⌘K
                </kbd>
              </button>
              <Sheet open={menu} onOpenChange={setMenu}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-md md:hidden"
                    aria-label="Menú"
                  >
                    <Menu className="size-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetTitle>Navegar</SheetTitle>
                  <nav className="mt-6 flex flex-col gap-1">
                    <NavLinks pathname={pathname} onClick={() => setMenu(false)} />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Corte 18 de septiembre de 2026 · {stats.urlsRevisadas} URLs
              barridas · accesible no equivale a vigente.
            </p>
            <p>32 entidades · Federación · capa municipal localizada.</p>
          </div>
        </footer>
        <CommandPalette open={palette} onOpenChange={setPalette} />
      </div>
    </TooltipProvider>
  );
}
