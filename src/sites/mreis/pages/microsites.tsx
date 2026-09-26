import { Meta } from "@solidjs/meta";
import { A, createAsync } from "@solidjs/router";
import { For, Show } from "solid-js";
import { getMicrosites } from "~/model/model";
import { assetUrl } from "~/renderers/microsite/assets";
import { Head } from "~/ui/head";
import { H1 } from "../typography";

/**
 * mreis.me/p — every microsite as the card a link preview would show:
 * og image, og title, description.
 */
export default function MreisMicrosites() {
  const sites = createAsync(() => getMicrosites());

  return (
    <main class="max-w-5xl mx-auto px-smd py-s2xl">
      <Head
        title="Microsites"
        description="One-pager concepts for small businesses — built on one renderer, each with its own look."
      />
      <Meta name="robots" content="noindex,nofollow" />

      <H1 class="mb-smd">Microsites</H1>
      <p class="text-xl leading-relaxed text-col-fg-muted mb-s2xl max-w-2xl">
        One-pager concepts for small businesses. One renderer and one design
        system underneath, a different look on top.
      </p>

      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-sxl">
        <For each={sites()}>
          {(site) => {
            const image = site.ogImage
              ? assetUrl(site.slug, site.ogImage)
              : undefined;
            return (
              <li>
                <A
                  href={`/${site.slug}`}
                  class="group flex h-full flex-col overflow-hidden rounded-lg border border-col-border bg-col-surface transition-colors hover:border-col-hi-bg outline-offset-2 outline-col-hi-bg focus-visible:outline-2"
                >
                  <div class="aspect-[1200/630] bg-col-border overflow-hidden">
                    <Show when={image}>
                      {(src) => (
                        <img
                          src={src()}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      )}
                    </Show>
                  </div>
                  <div class="flex flex-1 flex-col gap-sxs p-slg">
                    <span class="font-sans text-xs uppercase tracking-wide text-col-fg-muted">
                      /{site.slug}
                    </span>
                    <span class="font-display text-2xl leading-tight text-col-fg">
                      {site.title}
                    </span>
                    <Show when={site.description}>
                      <span class="leading-relaxed text-col-fg-muted">
                        {site.description}
                      </span>
                    </Show>
                  </div>
                </A>
              </li>
            );
          }}
        </For>
      </ul>
    </main>
  );
}
