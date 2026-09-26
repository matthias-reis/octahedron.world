import { createContext, useContext } from "solid-js";
import { getRequestEvent, isServer } from "solid-js/web";

/**
 * Microsite images live next to their page — `_content/mreis/p/<page>/` —
 * and are pulled into the build here, so they ship with fingerprinted,
 * immutable URLs and disappear with the page. Produce them with
 * `pnpm ms-image` (scripts/microsite-image.ts).
 */
const files = import.meta.glob("/_content/mreis/p/**/*.{webp,jpg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/** `p/example` + `hero.webp` → the built URL, or undefined if missing. */
export function assetUrl(slug: string, file: string): string | undefined {
  return files[`/_content/mreis/${slug}/${file}`];
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
    ? (getRequestEvent()?.request.headers.get("host") ?? "mreis.me")
    : window.location.host;
  const local = /localhost|127\.0\.0\.1/.test(host);
  return `${local ? "http" : "https"}://${host}${path}`;
}

/** The page being rendered, so blocks can resolve their own assets. */
export const PageContext = createContext<{ slug: string }>({ slug: "" });

export function usePageAsset(file: () => string | undefined) {
  const page = useContext(PageContext);
  return () => {
    const name = file();
    return name ? assetUrl(page.slug, name) : undefined;
  };
}
