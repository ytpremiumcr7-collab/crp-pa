# Fuentes del corte de costos · 18–19 sep 2026

Inventario crudo contra el que se clasificó la capa COSTOS.
La app no lee estos archivos en runtime: la verdad operativa está en `src/data/costos.ts` e `src/data/ingesta.ts`.

| Archivo | Qué es |
|---|---|
| `costos_obra_32_estados_sep2026_mapeado.txt` | 32 entidades: portal vs binario, con huecos honestos |
| `costos_obra_municipios_sep2026_mapeado.txt` | Muestra municipal (no es el padrón de 2,478) |
| `costos_obra_sep2026_solo_urls.txt` | 160 URLs únicas del corte |
| `costos_obra_sep2026_urls_directas_prioridad.txt` | Subconjunto con APU / bases / tabulador |
| `deep-research-report-1.md` | Informe jurídico previo, parte 1: federal y 32 leyes de OP |
| `deep-research-report-2.md` | Parte 2: ADQ, muestra municipal, brechas y PDFs directos |

Regla aplicada: una base de licitación no se rebautiza como tabulador. Una serie (regiones, números de procedimiento) ocupa una sola ficha.

El informe se partió en dos por tamaño. Se omitieron marcadores internos de citas del motor de investigación; el texto y las URLs oficiales se conservan.
