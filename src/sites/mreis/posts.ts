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
    .filter((item) => item.group === "posts")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return limit ? posts.slice(0, limit) : posts;
}
