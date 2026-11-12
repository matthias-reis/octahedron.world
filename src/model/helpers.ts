import type { CompactItemMeta } from "~/types";

function dailyScore(day: string, key: string): number {
  let hash = 2166136261;
  for (const char of `${day}:${key}`) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

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
  return [...items].sort(
    (a, b) =>
      dailyScore(day, a.slug) - dailyScore(day, b.slug) ||
      a.slug.localeCompare(b.slug),
  );
}

/** Pick up to seven stamps and spread them across independently shuffled slots. */
export function chooseStampSlots(
  items: CompactItemMeta[],
  day: string,
  slotCount = 7,
): Array<CompactItemMeta | null> {
  const selected = [...items]
    .sort(
      (a, b) =>
        dailyScore(`${day}:stamps`, a.slug) -
          dailyScore(`${day}:stamps`, b.slug) || a.slug.localeCompare(b.slug),
    )
    .slice(0, slotCount);
  const slots = Array.from({ length: slotCount }, (_, index) => index).sort(
    (a, b) =>
      dailyScore(`${day}:stamp-slot`, String(a)) -
        dailyScore(`${day}:stamp-slot`, String(b)) || a - b,
  );
  const placed: Array<CompactItemMeta | null> = Array(slotCount).fill(null);
  slots.slice(0, selected.length).forEach((slot, index) => {
    const item = selected[index];
    if (item) placed[slot] = item;
  });
  return placed;
}
