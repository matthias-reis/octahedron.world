export type GlobalScope = {
  title: string;
  superTitle?: string;
  subTitle?: string;
  description?: string | string[];
  image: string;
  colorSpace?: string;
  slug: string;
  group?: string;
  date?: string;
  startDate?: string;
  words?: number;
  chars?: number;
  language?: string;
  ref?: string;
  related?: string[];
  tags?: string[];
};

export type LocalScope = Record<string, never>;
