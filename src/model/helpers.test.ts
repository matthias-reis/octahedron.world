import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import type { CompactItemMeta } from "~/types";
import { chooseStampSlots } from "./helpers";

const stamp = (index: number, date?: string): CompactItemMeta => ({
  slug: `stamp-${index}`,
  site: "octahedron",
  title: `Stamp ${index}`,
  group: "stamps",
  type: "lightbox",
  image: `stamp-${index}`,
  date,
});

describe("homepage stamp selection", () => {
  it("selects seven distinct stamps regardless of input order or dates", () => {
    const items = Array.from({ length: 20 }, (_, index) => stamp(index));
    const selected = chooseStampSlots(items, "2026-11-12");
    const slugs = selected.flatMap((item) => (item ? [item.slug] : []));

    assert.equal(selected.length, 7);
    assert.equal(new Set(slugs).size, 7);
    assert.deepEqual(
      chooseStampSlots(
        items.map((item) => ({ ...item, date: item.slug })).reverse(),
        "2026-11-12",
      ).map((item) => item?.slug),
      selected.map((item) => item?.slug),
    );
  });

  it("spreads a small collection across different slots over time", () => {
    const items = [stamp(1), stamp(2)];
    const layouts = Array.from({ length: 20 }, (_, day) =>
      chooseStampSlots(items, `2026-11-${String(day + 1).padStart(2, "0")}`),
    );

    assert.ok(layouts.every((layout) => layout.filter(Boolean).length === 2));
    assert.ok(
      new Set(
        layouts.map((layout) => layout.map((item) => item?.slug).join("|")),
      ).size > 1,
    );
  });
});
