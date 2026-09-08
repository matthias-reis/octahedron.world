import { A } from "@solidjs/router";
import { type Component, For } from "solid-js";
import { cx } from "~/components/cx";
import { smallImageUrl } from "~/components/image-helpers";
import type { CompactItemMeta } from "~/types";

const TILE_COLORS = ["bg-cas7", "bg-cad7", "bg-cbn7", "bg-cad8", "bg-cad7"];

/** Every fifth world gets a double-width tile; with three columns the 1-wide +
    2-normal / 3-normal pattern repeats every two rows and leaves no holes. */
const isWide = (index: number) => index % 5 === 0;
const isTextTop = (index: number) => index % 2 !== 0;

const WorldTile: Component<{ item: CompactItemMeta; index: number }> = (
  props,
) => (
  <li
    class={cx(
      "border border-transparent p-3 md:p-0",
      isWide(props.index) && "sm:col-span-2",
    )}
    data-weight={props.item.weight}
  >
    <A
      href={`/${props.item.slug}`}
      class={cx(
        "flex flex-col h-full outline-2 -outline-offset-2 outline-transparent hover:outline-cas4 transition-all duration-200",
        isTextTop(props.index) && "md:flex-col-reverse",
        TILE_COLORS[props.index % TILE_COLORS.length],
      )}
    >
      <img
        src={smallImageUrl(props.item.image)}
        alt="Reference"
        class={cx(
          "object-cover w-full",
          isWide(props.index) ? "aspect-double" : "aspect-square",
        )}
      />
      <div class="grow">
        <h3
          class={cx(
            "font-octa font-bold px-4 mt-4 mb-2 text-can2",
            isWide(props.index) ? "text-5xl" : "text-3xl",
          )}
        >
          {props.item.title}
        </h3>
        <p
          class={cx(
            "font-sans px-4 text-can3 mb-4",
            isWide(props.index) && "text-lg sm:mr-8",
          )}
        >
          {props.item.description}
        </p>
      </div>
    </A>
  </li>
);

/** The topic-based half of the homepage: one tile per world, unchanged in
    behaviour from before the timeline was added — only narrower. */
export const HomeWorlds: Component<{ items: CompactItemMeta[] }> = (props) => (
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
    <For each={props.items}>
      {(item, index) => <WorldTile item={item} index={index()} />}
    </For>
  </ul>
);
