import { PropsWithChildren } from 'react';

export type FrontMatter = {
  title: string;
  superTitle?: string;
  subTitle?: string;
  description?: string | string[];
  startDate?: string;
  date?: string;
  weight?: number;
  tags?: string[];
  related?: string[];
  ref?: string;
  language?: 'en' | 'de';
  unfinished?: boolean;
  hidden?: boolean;
  colorSpace?: string;
};

export type Sec = string | { type: string; payload?: string };

export type ItemMeta = {
  slug: string;
  name: string;
  type: 'storyline' | 'post' | 'image';
  sections: Sec[];
  image?: string;
  category?: string;
  edition?: number;
  words: number;
  seed?: number;
} & FrontMatter;

export type TagMeta = {
  name: string;
  slug: string;
  count?: number;
  items?: ItemMeta[];
};

export type FCC<P = {}> = React.FC<
  PropsWithChildren<P> & { className?: string }
>;

export type DynamicPageProps = {
  params: Promise<{ slug?: string[]; tag?: string }>;
};
