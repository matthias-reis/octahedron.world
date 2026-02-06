import { Options } from 'hast-util-to-jsx-runtime';
import { HastParseResult } from 'hast-mds';

export type ItemMeta = {
  slug: string; // new url ${group}/${slug} - when slug = group then it's a root entry
  alias?: string; // old url
  group: string; // new grouping. E.g. 'hermetics'
  type?: string; // MDS renderer type
  // titles //
  superTitle?: string;
  title: string;
  subTitle?: string;
  description?: string | string[];
  image: string; // mandatory from now on
  // dates //
  startDate?: string;
  date?: string;
  // references //
  tags?: string[];
  language?: 'en' | 'de'; // default en
  ref?: string; // careful they need to change as well
  related?: string[]; // careful they need to change as well
  // flags //
  unfinished?: boolean;
  root?: boolean;
  hidden?: boolean;
  colorSpace?: string;
  weight?: number;
  words?: number;
  chars?: number;
  mds: HastParseResult; // Parsed MDS structure for rendering
};

export type GlobalScope = Omit<ItemMeta, 'mds'>;

export type LocalScope = Record<string, never>;

export type CompactItemMeta = Pick<
  ItemMeta,
  | 'slug'
  | 'title'
  | 'group'
  | 'type'
  | 'image'
  | 'description'
  | 'superTitle'
  | 'subTitle'
  | 'weight'
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

export type HtmlComponents = Options['components'];
