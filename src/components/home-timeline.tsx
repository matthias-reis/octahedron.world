import { A } from "@solidjs/router";
import dayjs from "dayjs";
import { type Component, For } from "solid-js";
import { smallImageUrl } from "~/components/image-helpers";
import type { PostMeta } from "~/types";

const TILE_COLORS = ["bg-cad8", "bg-cas8", "bg-cbn8", "bg-can8"];

const groupLabel = (group?: string) => (group ?? "").replace(/-/g, " ");

const asText = (description?: string | string[]) =>
  Array.isArray(description) ? description.join(" ") : (description ?? "");

const TimelineEntry: Component<{ post: PostMeta; index: number }> = (props) => (
  <li>
    <A
      href={`/${props.post.slug}`}
      class={`flex items-start gap-3 p-4 outline-2 -outline-offset-2 outline-transparent hover:outline-cas4 focus-visible:outline-cas4 ${TILE_COLORS[props.index % TILE_COLORS.length]}`}
    >
      <img
        src={smallImageUrl(props.post.image)}
        alt=""
        loading="lazy"
        class="aspect-square w-28 shrink-0 object-cover"
      />
      <div class="min-w-0">
        <p class="flex items-center gap-1 font-sans text-[0.625rem] uppercase tracking-wide text-can5">
          <time datetime={props.post.date}>
            {dayjs(props.post.date).format("YYYY-MM-DD")}
          </time>
          <span aria-hidden="true">·</span>
          <span class="truncate">{groupLabel(props.post.group)}</span>
        </p>
        <h3 class="line-clamp-1 font-octa text-2xl font-bold leading-tight text-can2 xl:line-clamp-2">
          {props.post.title}
        </h3>
        <p class="mt-1 font-sans text-base text-can4">
          {asText(props.post.description)}
        </p>
      </div>
    </A>
  </li>
);

/** Five recent entries in the latest-changes area. */
export const HomeTimeline: Component<{ posts: PostMeta[] }> = (props) => (
  <aside class="h-full border-4 border-can9 bg-cas7 p-3">
    <h2 class="mb-2 px-1 font-octa text-2xl font-bold text-can2">
      Latest changes
    </h2>
    <ol class="grid gap-1">
      <For each={props.posts.slice(0, 5)}>
        {(post, index) => <TimelineEntry post={post} index={index()} />}
      </For>
    </ol>
  </aside>
);
