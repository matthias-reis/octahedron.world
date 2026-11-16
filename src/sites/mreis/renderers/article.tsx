import { A } from "@solidjs/router";
import dayjs from "dayjs";
import type { HastParseResult } from "hast-mds";
import { CalendarDays, ChevronLeft } from "lucide-solid";
import { For, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { transform } from "solid-mds";
import type { GlobalScope, ItemMeta } from "~/types";
import { Head } from "~/ui/head";
import { proseComponents } from "~/ui/prose";
import { mreisImageUrl } from "../posts";
import { H1 } from "../typography";

/**
 * The shared prose map, with inline images resolved like covers: editorial
 * asset slugs (`![…](_meetdown-fediverse)`) become bucket URLs, plain paths
 * and absolute URLs stay as they are.
 */
const articleComponents = {
  ...proseComponents,
  img: (props: { src?: string; alt?: string }) => (
    <img
      class="my-slg mx-auto rounded-lg shadow-md select-none"
      src={props.src ? mreisImageUrl(props.src) : undefined}
      alt={props.alt}
      draggable={false}
    />
  ),
};

/**
 * mreis.me's long-form renderer, registered for `type: article`.
 *
 * Deliberately not `~/renderers/default`: that one hard-codes octahedron's
 * `c*` palette, wraps everything in an `item.colorSpace` and pulls in
 * `Related`. This builds on the shared prose map, the shared `Head` and the
 * `col-*` semantic tokens only, so it themes with the rest of mreis.
 */
export default function ArticleRenderer(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, articleComponents);
  const item = parsed.global as ItemMeta;
  const description = Array.isArray(item?.description)
    ? item.description.join(" ")
    : item?.description;

  return (
    <main class="max-w-3xl mx-auto px-smd pb-s3xl">
      <Head
        title={item?.title}
        description={description}
        image={item?.image ? mreisImageUrl(item.image) : undefined}
      />

      <A
        href="/posts"
        class="inline-flex items-center gap-sxs mb-slg text-col-fg-muted hover:text-col-hi-bg outline-offset-2 outline-col-hi-bg focus:outline-2 rounded-sm transition-colors"
      >
        <ChevronLeft class="w-[1.25rem] h-[1.25rem]" />
        <span class="uppercase tracking-wide text-sm">All posts</span>
      </A>

      <Show when={item?.image}>
        {(image) => (
          <img
            src={mreisImageUrl(image())}
            alt={item?.title}
            class="aspect-square w-full max-w-md object-cover mb-sxl rounded-lg"
          />
        )}
      </Show>

      <H1 class="mb-smd">{item?.title}</H1>

      <Show when={description}>
        <p class="text-xl leading-relaxed text-col-fg-muted mb-smd">
          {description}
        </p>
      </Show>

      <Show when={item?.date}>
        {(date) => (
          <p class="flex items-center gap-sxs text-sm text-col-fg-muted mb-s2xl font-sans">
            <CalendarDays class="w-[1rem] h-[1rem]" />
            <span>{dayjs(date()).format("D MMMM YYYY")}</span>
          </p>
        )}
      </Show>

      <div class="text-lg">
        <For each={Object.values(parsed.steps)}>
          {(step) => (
            <section>
              <step.Body />
            </section>
          )}
        </For>
      </div>
    </main>
  );
}
