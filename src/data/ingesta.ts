/** Clasificación del corte de costos 19-sep-2026.
 *  160 URLs únicas de los mapeos estatal/municipal.
 *  Una base de licitación no se rebautiza como tabulador.
 *  Una serie (regiones, 001/005/008, 017/020/024) ocupa una ficha.
 */

import { INGESTA_A } from "./ingesta-a";
import { INGESTA_B } from "./ingesta-b";
import { INGESTA_C } from "./ingesta-c";

export type DecisionIngesta = "entra" | "ya_en_corpus" | "fuera";

export type ItemIngesta = {
  id: string;
  url: string;
  entidad: string;
  slug: string;
  municipio?: string;
  titulo: string;
  decision: DecisionIngesta;
  motivo: string;
  docId?: string;
};

export const INGESTA_CORTE = "2026-09-19";
export const INGESTA_TOTAL = 160;
export const INGESTA_TALLY = {
  entra: 27,
  ya_en_corpus: 34,
  fuera: 99,
} as const;

export const INGESTA: ItemIngesta[] = [...INGESTA_A, ...INGESTA_B, ...INGESTA_C];

export const INGESTA_NUEVOS = INGESTA.filter((i) => i.decision === "entra");
