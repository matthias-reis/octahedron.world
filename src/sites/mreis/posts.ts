import { largeImageUrl } from "~/components/image-helpers";
import { getAllCompactRoutes } from "~/model/model";
import type { CompactItemMeta } from "~/types";

/**
 * mreis.me's article list, newest first.
 *
 * Comes out of the build-time content pipeline like everything else —
 * `getAllCompactRoutes()` is already filtered to the requesting site, so this
 * only has to narrow to the `posts` group and sort. There is no runtime posts
 * API any more.
 */
export async function getMreisPosts(
  limit?: number,
): Promise<CompactItemMeta[]> {
  const routes = await getAllCompactRoutes();

  const posts = Object.values(routes)
    .filter((item) => item.group === "posts" || item.group === "work")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return limit ? posts.slice(0, limit) : posts;
}

/**
 * An item's image URL: editorial asset slugs resolve to their large size,
 * plain paths (`/reference/…`) and absolute URLs are used as they are.
 */
export function mreisImageUrl(image: string): string {
  return image.startsWith("/") || image.startsWith("http")
    ? image
    : largeImageUrl(image);
}
