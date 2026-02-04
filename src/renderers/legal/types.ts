export type GlobalScope = {
  title: string;
  superTitle?: string;
  subTitle?: string;
  colorSpace?: string;
};

export type LocalScope = Record<string, never>;
