# Fuentes del corte de costos · 18–19 sep 2026

Inventario crudo contra el que se clasificó la capa COSTOS.
La app no lee estos archivos en runtime: la verdad operativa está en `src/data/costos.ts` e `src/data/ingesta.ts`.

| Archivo | Qué es |
|---|---|
| `costos_obra_32_estados_sep2026_mapeado.txt` | 32 entidades: portal vs binario, con huecos honestos |
| `costos_obra_municipios_sep2026_mapeado.txt` | Muestra municipal (no es el padrón de 2,478) |
| `costos_obra_sep2026_solo_urls.txt` | 160 URLs únicas del corte |
| `costos_obra_sep2026_urls_directas_prioridad.txt` | Subconjunto con APU / bases / tabulador |
| `deep-research-report.md` | Informe jurídico previo (leyes OP/ADQ); no se rebautiza como tabulador |

Regla aplicada: una base de licitación no se rebautiza como tabulador. Una serie (regiones, números de procedimiento) ocupa una sola ficha.
