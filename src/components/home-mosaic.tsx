import { A } from "@solidjs/router";
import { type Component, For } from "solid-js";
import { smallImageUrl } from "~/components/image-helpers";
import type { CompactItemMeta, PostMeta } from "~/types";
import { HomeTimeline } from "./home-timeline";

type Slot = { column: number; row: number; width: number; height: number };

// Five square columns and fifteen square rows, following the editorial sketch.
// The five wide group slots take their subjects from the shuffled order.
const GROUP_SLOTS: readonly Slot[] = [
  { column: 1, row: 1, width: 2, height: 3 },
  { column: 3, row: 1, width: 1, height: 2 },
  { column: 3, row: 3, width: 1, height: 2 },
  { column: 1, row: 4, width: 1, height: 2 },
  { column: 2, row: 5, width: 1, height: 2 },
  { column: 3, row: 5, width: 1, height: 2 },
  { column: 5, row: 5, width: 1, height: 2 },
  { column: 1, row: 6, width: 1, height: 2 },
  { column: 4, row: 6, width: 1, height: 2 },
  { column: 2, row: 7, width: 2, height: 3 },
  { column: 4, row: 8, width: 2, height: 3 },
  { column: 1, row: 9, width: 1, height: 2 },
  { column: 3, row: 10, width: 1, height: 2 },
  { column: 1, row: 11, width: 2, height: 3 },
  { column: 4, row: 11, width: 1, height: 2 },
  { column: 5, row: 11, width: 1, height: 2 },
  { column: 3, row: 13, width: 1, height: 2 },
  { column: 4, row: 13, width: 2, height: 3 },
  { column: 1, row: 14, width: 1, height: 2 },
  { column: 2, row: 14, width: 1, height: 2 },
];

const STAMP_SLOTS: readonly Slot[] = [
  { column: 2, row: 4, width: 1, height: 1 },
  { column: 4, row: 5, width: 1, height: 1 },
  { column: 5, row: 7, width: 1, height: 1 },
  { column: 1, row: 8, width: 1, height: 1 },
  { column: 2, row: 10, width: 1, height: 1 },
  { column: 3, row: 12, width: 1, height: 1 },
  { column: 3, row: 15, width: 1, height: 1 },
];

type MosaicEntry =
  | { kind: "group"; slot: Slot; item: CompactItemMeta; index: number }
  | { kind: "stamp"; slot: Slot; item?: CompactItemMeta }
  | { kind: "posts"; slot: Slot };

function entries(
  items: CompactItemMeta[],
  stamps: CompactItemMeta[],
): MosaicEntry[] {
  const groups: MosaicEntry[] = GROUP_SLOTS.flatMap((slot, index) => {
    const item = items[index];
    return item ? [{ kind: "group", slot, item, index }] : [];
  });
  const stampTiles: MosaicEntry[] = STAMP_SLOTS.map((slot, index) => ({
    kind: "stamp",
    slot,
    item: stamps[index],
  }));
  const posts: MosaicEntry = {
    kind: "posts",
    slot: { column: 4, row: 1, width: 2, height: 4 },
  };
  return [...groups, ...stampTiles, posts].sort(
    (a, b) => a.slot.row - b.slot.row || a.slot.column - b.slot.column,
  );
}

function position(slot: Slot) {
  return {
    "--mosaic-column": `${slot.column} / span ${slot.width}`,
    "--mosaic-row": `${slot.row} / span ${slot.height}`,
  };
}

const COLORS = ["bg-cas7", "bg-cad7", "bg-cbn7", "bg-cad8", "bg-cas8"];

const GroupTile: Component<{
  item: CompactItemMeta;
  slot: Slot;
  index: number;
}> = (props) => {
  const wide = () => props.slot.width === 2;
  return (
    <li
      class={
        wide()
          ? "home-mosaic-item min-w-0 min-h-[28rem] lg:min-h-0"
          : "home-mosaic-item min-w-0 min-h-[22rem] lg:min-h-0"
      }
      style={position(props.slot)}
    >
      <A
        href={`/${props.item.slug}`}
        class={`group flex h-full min-h-0 flex-col overflow-hidden border border-can9 outline-2 -outline-offset-2 outline-transparent hover:outline-cas4 focus-visible:outline-cas4 transition-colors ${COLORS[props.index % COLORS.length]}`}
      >
        <div class="aspect-square w-full shrink-0">
          <img
            src={smallImageUrl(props.item.image)}
            alt=""
            loading={props.index < 3 ? "eager" : "lazy"}
            class={
              props.item.imageShape === "square"
                ? "h-full w-full object-contain"
                : "h-full w-full object-cover"
            }
          />
        </div>
        <div class={wide() ? "px-5 pb-5 pt-2 md:px-7" : "px-3 pb-3 pt-2"}>
          <h2
            class={
              wide()
                ? "font-octa text-5xl font-bold leading-none text-can2"
                : "font-octa text-3xl font-bold leading-tight text-can2"
            }
          >
            {props.item.title}
          </h2>
          <p
            class={
              wide()
                ? "mt-3 line-clamp-3 font-sans text-base text-can3"
                : "mt-2 line-clamp-3 font-sans text-base text-can3"
            }
          >
            {props.item.description}
          </p>
        </div>
      </A>
    </li>
  );
};

const StampTile: Component<{ item?: CompactItemMeta; slot: Slot }> = (
  props,
) => (
  <li
    class="home-mosaic-item min-w-0 min-h-0 aspect-square lg:aspect-auto"
    style={position(props.slot)}
  >
    {props.item ? (
      <A
        href={`/${props.item.slug}`}
        aria-label={`Stamp: ${props.item.title}`}
        class="block h-full overflow-hidden border border-can9 bg-cad7 outline-2 -outline-offset-2 outline-transparent hover:outline-cas4 focus-visible:outline-cas4"
      >
        <img
          src={smallImageUrl(props.item.image)}
          alt={props.item.title}
          loading="lazy"
          class="h-full w-full object-contain"
        />
      </A>
    ) : (
      <div class="h-full border border-can9 bg-can7" aria-hidden="true" />
    )}
  </li>
);

export const HomeMosaic: Component<{
  items: CompactItemMeta[];
  posts: PostMeta[];
  stamps: CompactItemMeta[];
}> = (props) => (
  <>
    <ul class="home-mosaic">
      <For each={entries(props.items, props.stamps)}>
        {(entry) =>
          entry.kind === "group" ? (
            <GroupTile
              item={entry.item}
              index={entry.index}
              slot={entry.slot}
            />
          ) : entry.kind === "stamp" ? (
            <StampTile item={entry.item} slot={entry.slot} />
          ) : (
            <li
              class="home-mosaic-item min-w-0 min-h-[34rem] sm:col-span-2 lg:min-h-0"
              style={position(entry.slot)}
            >
              <HomeTimeline posts={props.posts} />
            </li>
          )
        }
      </For>
    </ul>
    {props.items.length > GROUP_SLOTS.length && (
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <For each={props.items.slice(GROUP_SLOTS.length)}>
          {(item, index) => (
            <GroupTile
              item={item}
              index={index() + GROUP_SLOTS.length}
              slot={{ column: 1, row: 1, width: 1, height: 2 }}
            />
          )}
        </For>
      </ul>
    )}
  </>
);
