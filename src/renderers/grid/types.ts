export type GlobalScope = {
  title: string;
  description?: string | string[];
  image: string;
  colorSpace?: string;
  slug: string;
};

export type LocalScope = Record<string, never>;
