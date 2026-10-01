import type { HastParseResult } from "hast-mds";
import type { Options } from "hast-util-to-jsx-runtime";
import type { Site } from "./site/context";

export type ItemMeta = {
  slug: string; // the route — `publishedAs` in the unified schema
  site: Site; // which site serves this item — from its parent chain (mreis-home) or the seiten/ folder
  alias?: string | string[]; // old urls, redirected to the slug
  group: string; // the series — slug of the primary `parent` relation. E.g. 'hermetics'
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
  language?: "en" | "de"; // default en
  ref?: string; // careful they need to change as well
  related?: string[]; // careful they need to change as well
  // flags //
  unfinished?: boolean;
  root?: boolean; // primary parent is a site homepage anchor
  hidden?: boolean;
  colorSpace?: string;
  weight?: number;
  words?: number;
  chars?: number;
  mds: HastParseResult; // Parsed MDS structure for rendering
  // seiten (client previews) — set by getRoute, never by content //
  locked?: boolean; // no access: render the code form instead of the page
  lockReason?: "missing" | "invalid" | "expired";
  accessCode?: string; // the ?k= code that opened the page, for asset URLs
};

export type GlobalScope = Omit<ItemMeta, "mds">;

export type LocalScope = Record<string, never>;

export type CompactItemMeta = Pick<
  ItemMeta,
  | "slug"
  | "site"
  | "title"
  | "group"
  | "type"
  | "image"
  | "description"
  | "superTitle"
  | "subTitle"
  | "weight"
  | "date"
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

export type HtmlComponents = Options["components"];

export type PostMeta = Pick<
  ItemMeta,
  "slug" | "title" | "group" | "image" | "description" | "date" | "language"
>;
