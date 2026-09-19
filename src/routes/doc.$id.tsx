import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Copy,
} from "lucide-react";
import { DocCard } from "@/components/doc-card";
import { DocPills } from "@/components/status-pills";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CORPUS_BY_ID } from "@/data/corpus";
import { ALERTAS } from "@/data/alertas";
import { CONFIANZA_LABEL, FORMATO_LABEL, LINK_LABEL } from "@/data/labels";
import { LINK_CHECK_BY_ID, LINK_CHECKED_LABEL } from "@/data/link-check";
import { useLibrary } from "@/lib/bookmarks";
import { documentUrl, linkVariant, portalLabel, portalUrl } from "@/lib/docs";
import { relatedDocs } from "@/lib/search";
import { formatFecha } from "@/lib/utils";

export const Route = createFileRoute("/doc/$id")({
  component: DocPage,
});

function DocPage() {
  const { id } = Route.useParams();
  const doc = CORPUS_BY_ID[id];
  const saved = useLibrary((s) => s.ids.includes(id));
  const toggle = useLibrary((s) => s.toggle);
  const touch = useLibrary((s) => s.touch);
  const check = LINK_CHECK_BY_ID[id];

  useEffect(() => {
    if (doc) touch(doc.id);
  }, [doc, touch]);

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-3xl font-medium">Documento no encontrado</h1>
        <p className="mt-2 text-muted-foreground">Ese identificador no está en el corpus.</p>
        <Link to="/corpus" className="mt-6 inline-block text-sm font-medium text-primary hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const file = documentUrl(doc);
  const portal = portalUrl(doc);
  const same = Boolean(file && portal && file === portal);
  const alerts = ALERTAS.filter((a) => a.docIds.includes(doc.id));
  const related = relatedDocs(doc, 4);
  const fileLabel = doc.formato === "pdf" ? "Abrir PDF" : "Abrir documento";

  async function copyCite() {
    const lines = [
      doc.titulo,
      doc.autoridad,
      doc.ultimaReforma
        ? `Última reforma: ${formatFecha(doc.ultimaReforma)}`
        : doc.fechaPublicacion
          ? `Publicación: ${formatFecha(doc.fechaPublicacion)}`
          : "",
      file ? `Documento: ${file}` : "",
      portal && portal !== file ? `Portal oficial: ${portal}` : "",
      `Piedra Angular · ${doc.id} · corte 18-sep-2026`,
    ].filter(Boolean);
    await navigator.clipboard.writeText(lines.join("\n"));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {doc.entidad}
            {doc.municipio ? ` · ${doc.municipio}` : ""}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            {doc.titulo}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{doc.autoridad}</p>
          <div className="mt-4">
            <DocPills doc={doc} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {file && !same ? (
              <Button asChild>
                <a href={file} target="_blank" rel="noreferrer">
                  {fileLabel}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : null}
            {portal ? (
              <Button asChild variant={file && !same ? "outline" : "default"}>
                <a href={portal} target="_blank" rel="noreferrer">
                  {portalLabel(doc)}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : null}
            <Button variant="outline" onClick={() => toggle(doc.id)}>
              {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
              {saved ? "Guardado" : "Guardar"}
            </Button>
            <Button variant="ghost" onClick={() => void copyCite()}>
              <Copy className="size-4" />
              Copiar ficha
            </Button>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-medium">Dónde encontrarlo</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              El PDF o la ficha, y el portal oficial donde se publica o versiona.
            </p>
            <dl className="mt-4 grid gap-4">
              {file && !same ? (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {doc.formato === "pdf" ? "PDF / documento" : "Documento"}
                  </dt>
                  <dd className="mt-1 break-all">
                    <a
                      href={file}
                      className="text-sm font-medium text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {file}
                    </a>
                  </dd>
                </div>
              ) : null}
              {portal ? (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Portal oficial
                  </dt>
                  <dd className="mt-1">
                    <p className="text-sm font-medium">{portalLabel(doc)}</p>
                    <a
                      href={portal}
                      className="mt-0.5 block break-all text-sm text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {portal}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-medium">Extracto de auditoría</h2>
            <p className="mt-2 text-sm leading-relaxed">{doc.extracto}</p>
            {doc.notas ? (
              <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
                {doc.notas}
              </p>
            ) : null}
          </div>

          {check ? (
            <div className="mt-4 rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-lg font-medium">Revisión de enlace</h2>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline">HTTP {check.http}</Badge>
                  <Badge variant={linkVariant(check.status)}>
                    {LINK_LABEL[check.status]}
                  </Badge>
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {check.note}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Barrido {LINK_CHECKED_LABEL} · {check.sniff}
              </p>
            </div>
          ) : null}

          {alerts.length ? (
            <div className="mt-4 grid gap-3">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-warn/30 bg-warn/8 p-5"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-warn">
                    {a.severidad === "critica" ? "Alerta crítica" : "Alerta"}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-medium">{a.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.detalle}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <Meta k="Identificador" v={doc.id} mono />
            <Meta k="Formato" v={FORMATO_LABEL[doc.formato]} />
            <Meta k="Confianza" v={CONFIANZA_LABEL[doc.nivelConfianza]} />
            {doc.anio ? <Meta k="Año" v={String(doc.anio)} /> : null}
            {doc.ultimaReforma ? (
              <Meta k="Última reforma" v={formatFecha(doc.ultimaReforma)} />
            ) : null}
            {doc.fechaPublicacion ? (
              <Meta k="Publicación" v={formatFecha(doc.fechaPublicacion)} />
            ) : null}
            {doc.fechaAplicacion ? (
              <Meta k="Aplicación" v={formatFecha(doc.fechaAplicacion)} />
            ) : null}
            {doc.sustituyeA ? <Meta k="Sustituye a" v={doc.sustituyeA} /> : null}
          </dl>

          {doc.tags.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {doc.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </article>

        <aside className="flex flex-col gap-3">
          <h2 className="font-display text-lg font-medium">Relacionados</h2>
          {related.map((d) => (
            <DocCard key={d.id} doc={d} compact />
          ))}
          <Link
            to="/entidad/$slug"
            params={{ slug: doc.entidadSlug }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Toda la entidad
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Meta({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
      <dd className={mono ? "mt-1 font-mono text-xs" : "mt-1"}>{v}</dd>
    </div>
  );
}
