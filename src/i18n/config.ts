import { de } from "./de";
import { type Dictionary, en } from "./en";

export type { Dictionary };

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

export const dictionaries = {
  en,
  de,
};
