import { query } from "@solidjs/router";
import { getSite } from "~/site/context";
import type { CompactItemMeta, ItemMeta } from "~/types";

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
