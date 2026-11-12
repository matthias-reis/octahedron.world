import type { CompactItemMeta } from "~/types";

/** Ascending `weight` (unset = 0), ties by title — the unified schema's order. */
export const sortRootItems = (items: CompactItemMeta[]) => {
  return items.sort(
    (a, b) =>
      (a.weight ?? 0) - (b.weight ?? 0) || a.title.localeCompare(b.title),
  );
};

/** A stable daily shuffle keeps server rendering and hydration in the same order. */
export function shuffleRootItems(
  items: CompactItemMeta[],
  day: string,
): CompactItemMeta[] {
  const score = (slug: string) => {
    let hash = 2166136261;
    for (const char of `${day}:${slug}`) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  };
  return [...items].sort(
    (a, b) => score(a.slug) - score(b.slug) || a.slug.localeCompare(b.slug),
  );
}
