import type { ItemMeta } from "~/types";
import {
  ADMIN_COOKIE,
  checkAdminToken,
  checkPageCode,
  pageCookie,
  parseCookies,
} from "./access";

/**
 * Server-only helpers shared by the middleware, the /asset route and the
 * model. Deliberately not a "use server" module: nothing here may become an
 * RPC endpoint.
 */

type SeitenMeta = ItemMeta & {
  /** Open to everyone (the example page). */
  public?: boolean;
  /** Bump to invalidate every client code issued for this page. */
  access?: number;
};

let cache: Record<string, ItemMeta> | null = null;

async function data(): Promise<Record<string, ItemMeta>> {
  if (cache && process.env.NODE_ENV !== "development") return cache;
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  cache = JSON.parse(
    await readFile(join(process.cwd(), "data.json"), "utf-8"),
  ) as Record<string, ItemMeta>;
  return cache;
}

export async function seitenItem(
  slug: string,
): Promise<SeitenMeta | undefined> {
  const item = (await data())[slug];
  return item?.site === "seiten" ? (item as SeitenMeta) : undefined;
}

export async function allSeitenItems(): Promise<SeitenMeta[]> {
  return Object.values(await data()).filter(
    (item): item is SeitenMeta => item.site === "seiten",
  );
}

export const accessVersion = (item: SeitenMeta) =>
  typeof item.access === "number" ? item.access : 1;

export function isAdmin(request: Request): boolean {
  return checkAdminToken(
    parseCookies(request.headers.get("cookie"))[ADMIN_COOKIE],
  );
}

export type Access =
  | {
      ok: true;
      via: "public" | "admin" | "cookie" | "code";
      /** The code from the URL — carried into asset URLs for crawlers. */
      code?: string;
      expires?: Date;
    }
  | { ok: false; reason: "missing" | "invalid" | "expired" };

/**
 * May this request see `item`? Public pages and admins always; otherwise a
 * valid code from `?k=` (links, the code form, link-preview crawlers) or
 * from the page cookie the middleware sets after a valid `?k=`.
 */
export function authorize(request: Request, item: SeitenMeta): Access {
  if (item.public) return { ok: true, via: "public" };
  if (isAdmin(request)) return { ok: true, via: "admin" };

  const version = accessVersion(item);
  const fromUrl = new URL(request.url).searchParams.get("k");
  if (fromUrl) {
    const check = checkPageCode(fromUrl, item.slug, version);
    return check.ok
      ? { ok: true, via: "code", code: fromUrl, expires: check.expires }
      : { ok: false, reason: check.reason };
  }

  const fromCookie = parseCookies(request.headers.get("cookie"))[
    pageCookie(item.slug)
  ];
  if (fromCookie) {
    const check = checkPageCode(fromCookie, item.slug, version);
    return check.ok
      ? { ok: true, via: "cookie", expires: check.expires }
      : { ok: false, reason: check.reason };
  }
  return { ok: false, reason: "missing" };
}
