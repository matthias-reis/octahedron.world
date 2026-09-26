import { createContext, useContext } from "solid-js";
import { getRequestEvent, isServer } from "solid-js/web";

/**
 * Microsite images live next to their page — `_content/seiten/<page>/` — and
 * are served through the access-checked `/asset/<slug>/<file>` route (see
 * src/routes/asset/). Produce them with `pnpm ms-image`.
 *
 * When the page was opened with a `?k=` code, asset URLs carry it too: a
 * link-preview crawler fetches og:image without the page cookie.
 */
export function assetUrl(
  slug: string,
  file: string,
  code?: string,
): string | undefined {
  if (!slug || !/^[\w.-]+$/.test(file)) return undefined;
  const query = code ? `?k=${encodeURIComponent(code)}` : "";
  return `/asset/${slug}/${file}${query}`;
}

/** `hero.webp` → `hero-800.webp`, the small variant `ms-image` writes. */
export function smallVariant(file: string): string {
  return file.replace(/\.webp$/, "-800.webp");
}

/**
 * Absolute URL for crawlers (og:image must be absolute). On the server it
 * comes from the request's host, in the browser from the location.
 */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const host = isServer
    ? (getRequestEvent()?.request.headers.get("host") ?? "seiten.mreis.me")
    : window.location.host;
  const local = /localhost|127\.0\.0\.1/.test(host);
  return `${local ? "http" : "https"}://${host}${path}`;
}

/** The page being rendered, so blocks can resolve their own assets. */
export const PageContext = createContext<{ slug: string; code?: string }>({
  slug: "",
});

export function usePageAsset(file: () => string | undefined) {
  const page = useContext(PageContext);
  return () => {
    const name = file();
    return name ? assetUrl(page.slug, name, page.code) : undefined;
  };
}
