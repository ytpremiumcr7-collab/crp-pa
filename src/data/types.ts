export type Jurisdiccion = "federal" | "estatal" | "municipal";

export type Categoria =
  | "ley"
  | "reglamento"
  | "lineamiento"
  | "tabulador"
  | "catalogo"
  | "manual"
  | "portal"
  | "padron"
  | "expediente"
  | "vacio";

export type Formato = "pdf" | "html" | "xlsx" | "portal" | "desconocido";

export type LinkStatus =
  | "ok"
  | "ok_indexado"
  | "contenedora"
  | "intermitente"
  | "pendiente"
  | "roto";

export type Vigencia =
  | "vigente"
  | "historico"
  | "pendiente"
  | "no_localizado";

export type Confianza = "alto" | "medio" | "bajo";

export type Documento = {
  id: string;
  titulo: string;
  tituloCorto: string;
  entidad: string;
  entidadSlug: string;
  municipio?: string;
  jurisdiccion: Jurisdiccion;
  categoria: Categoria;
  autoridad: string;
  anio?: number;
  fechaPublicacion?: string;
  ultimaReforma?: string;
  fechaAplicacion?: string;
  vigencia: Vigencia;
  urlDirecta?: string;
  urlContenedora?: string;
  formato: Formato;
  estadoEnlace: LinkStatus;
  notas: string;
  extracto: string;
  tags: string[];
  sustituyeA?: string;
  contieneApu?: boolean;
  contieneMaquinaria?: boolean;
  nivelConfianza: Confianza;
  searchText: string;
};

export type EntidadMeta = {
  slug: string;
  nombre: string;
  corto: string;
  clave: string;
  portalLeyes: string;
  portalNombre: string;
};

export type Alerta = {
  id: string;
  severidad: "critica" | "alta" | "media";
  titulo: string;
  detalle: string;
  docIds: string[];
};
