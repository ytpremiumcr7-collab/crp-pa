# Piedra Angular

Corpus de **contratación y obra pública en México**: leyes, reglamentos, tabuladores y portales oficiales de la Federación, las 32 entidades y una muestra municipal.

Sólo fuentes gubernamentales o legislativas (`.gob.mx`, congresos, DOF, periódicos oficiales). Un PDF que todavía abre no es, por eso, el texto vigente.

Corte de fuentes: **19 septiembre 2026**.

## Qué hay aquí

- **215 documentos reales** — federal 18 · estatal 104 · municipal 49 · costos 44
- Las **32 entidades** con ley de obra pública y ley de adquisiciones
- Muestra municipal con host vivo en las 32 (México tiene ~2 478 municipios: esto no es el padrón)
- Ingesta de costos 19-sep-2026: 160 URLs únicas · 27 entran · 34 ya estaban · 99 fuera

Huecos que siguen: tabulador general estatal de **Chiapas** y **CDMX**. Detalle en [`LEEME.txt`](./LEEME.txt).

## App

TanStack Start + Vite + TypeScript. Páginas:

| Ruta | Qué ver |
|---|---|
| `/` | Cobertura, matriz, huecos |
| `/corpus` | Catálogo buscable |
| `/tabuladores` | Capa de costos / APU |
| `/auditoria` | Enlaces, ingesta (entra / ya estaban / fuera) |
| `/entidad/:slug` | Ficha por entidad |
| `/doc/:id` | Documento + portal oficial |

## Cómo correrlo

```bash
npm install
npm run dev
```

```bash
npm run typecheck
npm run build
```

## Dónde está el corpus

| Archivo | Capa |
|---|---|
| `src/data/federal.ts` | Federación |
| `src/data/estatal.ts` | 32 estados |
| `src/data/municipal.ts` | Muestra municipal |
| `src/data/costos.ts` | Tabuladores, UMA, portales de costos |
| `src/data/ingesta.ts` | Clasificación de las 160 URLs |
| `src/data/link-check.ts` | Verificación HTTP |
| `docs/fuentes/` | Mapeos e informe que alimentaron la ingesta |

Una base de licitación **no** se rebautiza como tabulador.

## Licencia de las fuentes

Los textos legales y tabuladores son de autoridades mexicanas. Este repositorio cataloga enlaces; no redistribuye los PDF.
