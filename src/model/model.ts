import { query } from "@solidjs/router";
import { getSite } from "~/site/context";
import type { CompactItemMeta, ItemMeta, PostMeta } from "~/types";

let cachedData: Record<string, ItemMeta> | null = null;

async function getData() {
  "use server";
  // Bypass cache in development mode for hot reloading
  if (cachedData && process.env.NODE_ENV !== "development") {
    return cachedData;
  }

  const { readFile } = await import("fs/promises");
  const { join } = await import("path");

  const dataPath = join(process.cwd(), "data.json");
  const fileContent = await readFile(dataPath, "utf-8");
  cachedData = JSON.parse(fileContent) as Record<string, ItemMeta>;

  return cachedData;
}

export const getRoute = query(async (slug: string) => {
  "use server";
  const data = await getData();
  const item = data[slug];
  if (!item || (item.site ?? "octahedron") !== getSite()) {
    return null;
  }
  return item;
}, "route");

export async function getRedirect(slug: string) {
  "use server";
  const data = await getData();

  const redirects = Object.fromEntries(
    Object.values(data).map((item) => [item.alias, item.slug]),
  );

  return redirects[slug] || null;
}

export async function getAllRoutes() {
  "use server";
  const data = await getData();
  return Object.values(data);
}

export const getAllCompactRoutes: () => Promise<
  Record<string, CompactItemMeta>
> = query(async () => {
  "use server";
  const data = await getData();
  const site = getSite();

  return Object.fromEntries(
    Object.entries(data)
      .filter(([_key, item]) => (item.site ?? "octahedron") === site)
      .map(
        ([
          _key,
          {
            slug,
            site: itemSite,
            title,
            group,
            type,
            image,
            description,
            superTitle,
            subTitle,
            date,
            weight,
          },
        ]) => {
          return [
            slug,
            {
              slug,
              site: itemSite,
              title,
              group,
              type,
              image,
              description,
              superTitle,
              subTitle,
              date,
              weight,
            },
          ];
        },
      ),
  );
}, "all-routes-overview");

export const getAllRootRoutes = query(async () => {
  "use server";
  const data = await getData();
  const site = getSite();

  const availableItems = Object.values(data)
    .filter((item) => item.root && (item.site ?? "octahedron") === site)
    .map(
      ({ slug, site: itemSite, title, image, description, group, weight }) => ({
        slug,
        site: itemSite,
        title,
        group,
        image,
        description,
        weight: weight ?? 0,
      }),
    );
  return availableItems as CompactItemMeta[];
}, "all-root-routes");

/** All published posts of the current site, newest first.

    Feeds the homepage timeline. Language is carried through untouched so the
    caller can narrow to the reader's locale — a post without `language` is
    English by convention and shows up everywhere. */
export const getAllPosts = query(async () => {
  "use server";
  const data = await getData();
  const site = getSite();

  return Object.values(data)
    .filter(
      (item) =>
        (item.site ?? "octahedron") === site &&
        item.type === "post" &&
        !item.hidden &&
        !!item.date,
    )
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .map(
      ({
        slug,
        title,
        group,
        image,
        description,
        date,
        language,
      }): PostMeta => ({
        slug,
        title,
        group,
        image,
        description,
        date,
        language,
      }),
    );
}, "all-posts");

/** Card data for the microsite overview at mreis.me/p — what a link preview
    would show: og title, description and the og image file. */
export type MicrositeCard = {
  slug: string;
  title: string;
  description?: string;
  /** og.jpg (or whatever `og.image` names) next to the page. */
  ogImage?: string;
};

export const getMicrosites = query(async () => {
  "use server";
  const data = await getData();

  return Object.values(data)
    .filter((item) => item.site === "mreis" && item.type === "microsite")
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((item): MicrositeCard => {
      const og = (item as unknown as { og?: Record<string, unknown> }).og;
      const description = og?.description ?? item.description;
      return {
        slug: item.slug,
        title: typeof og?.title === "string" ? og.title : item.title,
        description: Array.isArray(description)
          ? description.join(" ")
          : typeof description === "string"
            ? description
            : undefined,
        ogImage: typeof og?.image === "string" ? og.image : undefined,
      };
    });
}, "microsites");
