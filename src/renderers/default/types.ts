export type GlobalScope = {
  title: string;
  description?: string | string[];
  image?: string;
  colorSpace?: string;
  slug: string;
  group: string;
  superTitle?: string;
  subTitle?: string;
  date?: string;
  words?: number;
  chars?: number;
  language?: string;
  ref?: string;
  related?: string[];
};

export type LocalScope = Record<string, never>;
