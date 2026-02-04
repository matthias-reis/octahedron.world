export type GlobalScope = {
  title: string;
  description?: string | string[];
  image: string;
  colorSpace?: string;
  slug: string;
  group?: string;
  date?: string;
};

export type LocalScope = Record<string, never>;
