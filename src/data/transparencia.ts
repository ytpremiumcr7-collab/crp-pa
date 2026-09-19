/**
 * Transparencia: la PNT es el canal unificado.
 * Un portal estatal se lista solo si el host respondió en el corte
 * y sirve contratos, padrones, licitaciones u obligaciones —
 * nunca como fuente del texto de una ley.
 */

export const PNT_URL = "https://www.plataformadetransparencia.org.mx/";
export const PNT_NOMBRE = "Plataforma Nacional de Transparencia";

export const TPP_URL = "https://www.transparencia.gob.mx/";
export const TPP_NOMBRE = "Transparencia para el Pueblo";

export const SAYBG_URL = "https://www.gob.mx/buengobierno";
export const COMPRASMX_URL = "https://comprasmx.buengobierno.gob.mx/";

export const REVISION_SEMANAL = {
  corte: "2026-09-18",
  rrule: "RRULE:FREQ=WEEKLY;BYDAY=MO",
  timezone: "America/Mexico_City",
  hora: "09:00",
  etiqueta: "Lunes 09:00 · Ciudad de México",
  siguiente: "2026-09-21",
  siguienteEtiqueta: "lunes 21 de septiembre de 2026",
};

export type PortalEstatal = {
  slug: string;
  url: string;
  nombre: string;
  uso: string;
  http: "200";
};

export const PORTALES_ESTATALES: PortalEstatal[] = [
  {
    slug: "baja-california-sur",
    url: "https://transparencia.bcs.gob.mx/",
    nombre: "Transparencia B.C.S.",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "chihuahua",
    url: "https://transparencia.chihuahua.gob.mx/",
    nombre: "Transparencia Chihuahua",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "durango",
    url: "https://transparencia.durango.gob.mx/",
    nombre: "Transparencia Durango",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "guanajuato",
    url: "https://transparencia.guanajuato.gob.mx/",
    nombre: "Transparencia Guanajuato",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "guerrero",
    url: "https://transparencia.guerrero.gob.mx/",
    nombre: "Transparencia Guerrero",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "hidalgo",
    url: "https://transparencia.hidalgo.gob.mx/",
    nombre: "Transparencia Hidalgo",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "jalisco",
    url: "https://transparencia.jalisco.gob.mx/",
    nombre: "Transparencia Jalisco",
    uso: "Obligaciones de transparencia. No es la ley de obra ni la de compras.",
    http: "200",
  },
  {
    slug: "jalisco",
    url: "https://compras.jalisco.gob.mx/",
    nombre: "Compras Jalisco",
    uso: "Contratos y licitaciones estatales.",
    http: "200",
  },
  {
    slug: "nayarit",
    url: "https://transparencia.nayarit.gob.mx/",
    nombre: "Transparencia Nayarit",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "nuevo-leon",
    url: "https://transparencia.nl.gob.mx/",
    nombre: "Transparencia N.L.",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "puebla",
    url: "https://transparencia.puebla.gob.mx/",
    nombre: "Transparencia Puebla",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "sinaloa",
    url: "https://transparencia.sinaloa.gob.mx/",
    nombre: "Transparencia Sinaloa",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
  {
    slug: "yucatan",
    url: "https://transparencia.yucatan.gob.mx/",
    nombre: "Transparencia Yucatán",
    uso: "Obligaciones y contratos estatales. No es el texto de la ley.",
    http: "200",
  },
];

export function portalesEstatalesDe(slug: string): PortalEstatal[] {
  return PORTALES_ESTATALES.filter((p) => p.slug === slug);
}

export const SLUGS_CON_PORTAL_LOCAL = new Set(
  PORTALES_ESTATALES.map((p) => p.slug),
);
