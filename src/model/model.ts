import { query } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
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
  const site = getSite();
  if (site === "seiten" && item?.site !== "seiten") {
    // Unknown slug on seiten: the same locked page as a real one, so the
    // answer never tells whether a page exists.
    return {
      slug,
      site: "seiten",
      group: "seiten",
      title: "Geschützte Vorschau",
      image: "",
      type: "locked",
      locked: true,
      lockReason: "missing",
    } as unknown as ItemMeta;
  }
  if (!item || (item.site ?? "octahedron") !== site) {
    return null;
  }
  if (item.site === "seiten") {
    // Client previews: nothing of the page leaves the server without access.
    const { authorize } = await import("~/sites/seiten/server");
    const request = getRequestEvent()?.request;
    const access = request
      ? authorize(request, item)
      : ({ ok: false, reason: "missing" } as const);
    if (!access.ok) {
      return {
        slug,
        site: "seiten",
        group: "seiten",
        title: "Geschützte Vorschau",
        image: "",
        type: "locked",
        locked: true,
        lockReason: access.reason,
      } as unknown as ItemMeta;
    }
    return access.via === "code" ? { ...item, accessCode: access.code } : item;
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

/** Card data for the seiten overview — what a link preview would show: og
    title, description and the og image file. Admins only: null otherwise. */
export type MicrositeCard = {
  slug: string;
  title: string;
  description?: string;
  /** og.jpg (or whatever `og.image` names) next to the page. */
  ogImage?: string;
  public: boolean;
};

export const getMicrosites = query(async () => {
  "use server";
  const { allSeitenItems, isAdmin } = await import("~/sites/seiten/server");
  const request = getRequestEvent()?.request;
  if (!request || !isAdmin(request)) return null;

  return (await allSeitenItems())
    .filter((item) => item.type === "microsite")
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
        public: item.public === true,
      };
    });
}, "microsites");

/** A client link for one page, valid `hours` from now. Admins only. */
export const getAccessLink = query(async (slug: string, hours: number) => {
  "use server";
  const { seitenItem, isAdmin, accessVersion } = await import(
    "~/sites/seiten/server"
  );
  const { createPageCode } = await import("~/sites/seiten/access");
  const request = getRequestEvent()?.request;
  if (!request || !isAdmin(request)) return null;
  const item = await seitenItem(slug);
  if (!item) return null;
  const code = createPageCode(slug, accessVersion(item), hours);
  if (!code) return null;
  const origin = new URL(request.url).origin.replace(
    /^http:\/\/(?!.*localhost)/,
    "https://",
  );
  return {
    slug,
    code: code.code,
    expires: code.expires.toISOString(),
    url: `${origin}/${slug}?k=${code.code}`,
  };
}, "access-link");
