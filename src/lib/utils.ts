import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fold(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function formatFecha(iso?: string): string {
  if (!iso) return "Sin fecha";
  const [y, m, d] = iso.split("-");
  if (!y) return iso;
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  const month = m ? months[Number(m) - 1] : undefined;
  if (d && month) return `${Number(d)} ${month} ${y}`;
  if (month) return `${month} ${y}`;
  return y;
}
