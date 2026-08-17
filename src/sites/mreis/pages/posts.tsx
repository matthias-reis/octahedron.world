import { createAsync } from "@solidjs/router";
import dayjs from "dayjs";
import { For, Show } from "solid-js";
import { largeImageUrl } from "~/components/image-helpers";
import { Head } from "~/ui/head";
import { LinkBox } from "~/ui/link-box";
import { getMreisPosts } from "../posts";
import { H1 } from "../typography";

export default function MreisPosts() {
  const posts = createAsync(() => getMreisPosts());

  return (
    <main class="max-w-4xl mx-auto px-smd py-s2xl">
      <Head
        title="Posts"
        description="Writing on engineering, architecture and the way I work — by Matthias Reis."
      />

      <H1 class="mb-smd">Posts</H1>
      <p class="text-xl leading-relaxed text-col-fg-muted mb-s2xl max-w-2xl">
        Longer pieces on engineering practice, architecture and the tools I
        build for myself.
      </p>

      <Show
        when={posts()?.length}
        fallback={<p class="text-col-fg-muted">Nothing published yet.</p>}
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-sxl">
          <For each={posts()}>
            {(post) => (
              <LinkBox
                variant="card"
                href={`/${post.slug}`}
                title={post.title}
                description={
                  Array.isArray(post.description)
                    ? post.description.join(" ")
                    : post.description
                }
                image={post.image ? largeImageUrl(post.image) : undefined}
                meta={
                  <Show when={post.date}>
                    {(date) => (
                      <span class="text-col-fg-muted text-sm">
                        {dayjs(date()).format("D MMMM YYYY")}
                      </span>
                    )}
                  </Show>
                }
              />
            )}
          </For>
        </div>
      </Show>
    </main>
  );
}
