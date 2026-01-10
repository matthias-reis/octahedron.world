import { Options } from 'hast-util-to-jsx-runtime';
import { Component, JSX, ParentComponent } from 'solid-js';

export type FrontMatter = {
  title: string;
  superTitle?: string;
  subTitle?: string;
  group: string; // new grouping. E.g. 'hermetics'
  slug: string; // new url ${group}/${slug} - when slug = group then it's a root entry
  alias?: string; // old url
  layout?: string; // manual falls back to default, which we will have at first
  description?: string | string[];
  startDate?: string;
  date?: string;
  tags?: string[];
  related?: string[]; // careful they need to change as well
  ref?: string; // careful they need to change as well
  language?: 'en' | 'de'; // default en
  unfinished?: boolean;
  hidden?: boolean;
  root?: boolean;
  colorSpace?: string;
  image: string; // mandatory from now on
};

export type Sec = { type: string; payload?: string };

export type ItemMeta = {
  sections: Sec[];
  words: number;
  chars: number;
} & FrontMatter;

export type CompactItemMeta = Pick<
  ItemMeta,
  | 'slug'
  | 'title'
  | 'group'
  | 'layout'
  | 'image'
  | 'description'
  | 'superTitle'
  | 'subTitle'
>;

export type TagMeta = {
  name: string;
  slug: string;
  count?: number;
  items?: ItemMeta[];
};

export type DynamicPageProps = {
  params: Promise<{ slug?: string[]; tag?: string }>;
};

export type Plugin = Component<Sec & { wrapper?: ParentComponent }>;

export type HtmlComponents = Options['components'];

export type Layout = {
  main: Component<{
    item: ItemMeta;
    children: JSX.Element;
    categoryItems?: ItemMeta[];
    relatedItems?: ItemMeta[];
  }>;
  section?: Component<{ children: JSX.Element }>;
  plugins: Record<string, Plugin>;
};
