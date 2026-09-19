import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import {
  INGESTA,
  INGESTA_CORTE,
  INGESTA_TALLY,
  INGESTA_TOTAL,
  type DecisionIngesta,
  type ItemIngesta,
} from "@/data/ingesta";
import { CORPUS_BY_ID } from "@/data/corpus";
import { fold } from "@/lib/utils";
import { cn } from "@/lib/utils";

const DECISION_META: Record<
  DecisionIngesta,
  { label: string; variant: "ok" | "muted" | "warn"; blurb: string }
> = {
  entra: {
    label: "Entra",
    variant: "ok",
    blurb: "Ficha nueva en el corpus: portal de costos, binario con APU o norma que faltaba.",
  },
  ya_en_corpus: {
    label: "Ya estaba",
    variant: "muted",
    blurb: "URL ya catalogada o equivalente a una ficha existente. No se duplica.",
  },
  fuera: {
    label: "Fuera",
    variant: "warn",
    blurb: "Serie ya cubierta, visor de un ID, P.O. como si fuera tabulador, o no es capa de costos.",
  },
};

export function IngestReview() {
  const [q, setQ] = useState("");
  const [dec, setDec] = useState<DecisionIngesta | "">("entra");

  const rows = useMemo(() => {
    const tokens = fold(q).split(" ").filter((t) => t.length >= 2);
    return INGESTA.filter((item) => {
      if (dec && item.decision !== dec) return false;
      if (!tokens.length) return true;
      const hay = fold(
        `${item.titulo} ${item.entidad} ${item.municipio ?? ""} ${item.motivo} ${item.url} ${item.docId ?? ""}`,
      );
      return tokens.every((t) => hay.includes(t));
    });
  }, [q, dec]);

  return (
    <section className="mt-10">
      <p className="text-xs font-medium uppercase tracking-wider text-primary">
        Corte de costos · {INGESTA_CORTE}
      </p>
      <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
        Qué entra y qué se queda fuera
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {INGESTA_TOTAL} URLs únicas de los mapeos estatal y municipal. Una base de
        licitación no se rebautiza como tabulador. Una serie (regiones de
        Guanajuato, 001/005/008 de Puebla, 017/020/024 de Tlajomulco) ocupa una
        sola ficha. El informe jurídico previo ya era la columna vertebral de
        leyes; este corte cubre costos.
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-3">
        <Mini k="Entran" v={INGESTA_TALLY.entra} hint="fichas nuevas" />
        <Mini k="Ya estaban" v={INGESTA_TALLY.ya_en_corpus} hint="sin duplicar" />
        <Mini k="Fuera" v={INGESTA_TALLY.fuera} hint="a propósito" />
      </dl>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Chip active={dec === ""} onClick={() => setDec("")}>
            Todas
          </Chip>
          {(Object.keys(DECISION_META) as DecisionIngesta[]).map((d) => (
            <Chip key={d} active={dec === d} onClick={() => setDec(d)}>
              {DECISION_META[d].label}
            </Chip>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filtrar por estado, URL, motivo…"
          className="h-11 rounded-xl border border-border bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {dec ? (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {DECISION_META[dec].blurb}
        </p>
      ) : null}

      <p className="mt-4 text-xs text-muted-foreground">
        {rows.length} de {INGESTA_TOTAL}
      </p>

      <ul className="mt-3 grid gap-2">
        {rows.map((item) => (
          <IngestRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

function IngestRow({ item }: { item: ItemIngesta }) {
  const meta = DECISION_META[item.decision];
  const doc = item.docId ? CORPUS_BY_ID[item.docId] : undefined;
  return (
    <li className="min-w-0 overflow-hidden rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={meta.variant}>{meta.label}</Badge>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {item.entidad}
          {item.municipio ? ` · ${item.municipio}` : ""}
        </span>
      </div>
      <p className="mt-1 font-display text-base font-medium leading-snug">
        {doc ? (
          <Link
            to="/doc/$id"
            params={{ id: doc.id }}
            className="hover:text-primary"
          >
            {item.titulo}
          </Link>
        ) : (
          item.titulo
        )}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {item.motivo}
      </p>
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="mt-1 block max-w-full truncate text-xs text-primary hover:underline"
      >
        {item.url}
      </a>
    </li>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
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

function Mini({ k, v, hint }: { k: string; v: number; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-3 sm:px-4">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
      <dd className="mt-1 font-display text-2xl font-medium tabular-nums sm:text-3xl">
        {v}
      </dd>
      <p className="text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
