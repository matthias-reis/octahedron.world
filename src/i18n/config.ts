import { en, type Dictionary } from './en';
import { de } from './de';

export type { Dictionary };

export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const dictionaries = {
  en,
  de,
};
