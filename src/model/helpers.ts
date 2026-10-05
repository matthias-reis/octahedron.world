import type { CompactItemMeta } from "~/types";

/** Ascending `weight` (unset = 0), ties by title — the unified schema's order. */
export const sortRootItems = (items: CompactItemMeta[]) => {
  return items.sort(
    (a, b) =>
      (a.weight ?? 0) - (b.weight ?? 0) || a.title.localeCompare(b.title),
  );
};
