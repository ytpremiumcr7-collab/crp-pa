import { ArrowUpRight } from "lucide-react";
import {
  COMPRASMX_URL,
  PNT_NOMBRE,
  PNT_URL,
  TPP_NOMBRE,
  TPP_URL,
  portalesEstatalesDe,
} from "@/data/transparencia";

export function TransparencySources({ slug }: { slug: string }) {
  const locales = portalesEstatalesDe(slug);
  const federal = slug === "federacion";

  return (
    <section className="mt-8 rounded-xl border border-border bg-card p-5">
      <h2 className="font-display text-lg font-medium">Transparencia</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        La PNT es el canal unificado. Un portal estatal se lista solo si el
        host respondió y sirve contratos, padrones o licitaciones — nunca como
        texto de la ley. Los órganos INFO* no se tratan como garante vigente.
      </p>
      <ul className="mt-4 grid gap-3">
        <Fuente
          href={PNT_URL}
          nombre={PNT_NOMBRE}
          uso="Obligaciones, contratos y padrones. No sustituye al Congreso."
        />
        {federal ? (
          <>
            <Fuente
              href={TPP_URL}
              nombre={TPP_NOMBRE}
              uso="Autoridad garante federal (SAyBG). Sustituye al INAI."
            />
            <Fuente
              href={COMPRASMX_URL}
              nombre="ComprasMX"
              uso="Contratos y licitaciones federales."
            />
          </>
        ) : null}
        {locales.map((p) => (
          <Fuente key={p.url} href={p.url} nombre={p.nombre} uso={p.uso} />
        ))}
      </ul>
    </section>
  );
}

function Fuente({
  href,
  nombre,
  uso,
}: {
  href: string;
  nombre: string;
  uso: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {nombre}
        <ArrowUpRight className="size-3.5" />
      </a>
      <p className="text-xs leading-relaxed text-muted-foreground">{uso}</p>
    </li>
  );
}
