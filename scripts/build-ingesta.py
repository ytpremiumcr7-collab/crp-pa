#!/usr/bin/env python3
"""Generador de src/data/ingesta.ts (corte 19-sep-2026).

El script original es de 645 líneas / 31 KB; GitHub se partió en:
  scripts/build-ingesta-a.py  (helpers + tabla ENTRA)
  scripts/build-ingesta-b.py  (FUERA_RULES + clasificación + emitter)

Reconstruir:
  cat scripts/build-ingesta-a.py scripts/build-ingesta-b.py > /tmp/build-ingesta.py
  python3 /tmp/build-ingesta.py

El corpus ya generado vive en src/data/ingesta.ts (160 URLs:
27 entra / 34 ya / 99 fuera). No hace falta volver a correrlo
para usar la app. Una base de licitación no se rebautiza como tabulador.
"""
raise SystemExit(
    "Este archivo es el índice. Concatena build-ingesta-a.py + "
    "build-ingesta-b.py para reconstruir el generador."
)
