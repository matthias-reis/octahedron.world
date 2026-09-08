import { A } from "@solidjs/router";
import dayjs from "dayjs";
import { type Component, For } from "solid-js";
import { cx } from "~/components/cx";
import { smallImageUrl } from "~/components/image-helpers";
import type { PostMeta } from "~/types";

/** Tile colours, kept deliberately in the same family as the world grid so the
    two homepage columns read as one mosaic rather than two widgets. */
const TILE_COLORS = ["bg-cad8", "bg-cas8", "bg-cbn8", "bg-can8", "bg-cad7"];

const groupLabel = (group?: string) => (group ?? "").replace(/-/g, " ");

const asText = (description?: string | string[]) =>
  Array.isArray(description) ? description.join(" ") : (description ?? "");

const TimelineEntry: Component<{ post: PostMeta; index: number }> = (props) => (
  <li>
    <A
      href={`/${props.post.slug}`}
      class={cx(
        "block p-3 outline-2 -outline-offset-2 outline-transparent hover:outline-cas4 transition-all duration-200",
        TILE_COLORS[props.index % TILE_COLORS.length],
      )}
    >
      <p class="font-sans uppercase text-xs text-can5 flex items-center gap-2 mb-2">
        <time datetime={props.post.date}>
          {dayjs(props.post.date).format("YYYY-MM-DD")}
        </time>
        <span aria-hidden="true">·</span>
        <span>{groupLabel(props.post.group)}</span>
      </p>
      <div class="flex items-stretch gap-3">
        <img
          src={smallImageUrl(props.post.image)}
          alt=""
          class="w-24 shrink-0 aspect-image object-cover"
        />
        <div class="min-w-0">
          <h3 class="font-octa font-bold text-2xl/6 text-can2 text-balance">
            {props.post.title}
          </h3>
          <p class="font-sans text-sm text-can4 mt-1 line-clamp-3">
            {asText(props.post.description)}
          </p>
        </div>
      </div>
    </A>
  </li>
);

/** The time-based half of the homepage: the newest posts as a stack of
    colour tiles on a panel, balancing the world grid next to it. */
export const HomeTimeline: Component<{ posts: PostMeta[] }> = (props) => (
  <aside class="h-full bg-cad9 p-3">
    <ul class="flex flex-col gap-3">
      <For each={props.posts}>
        {(post, index) => <TimelineEntry post={post} index={index()} />}
      </For>
    </ul>
  </aside>
);
