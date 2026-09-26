import { Meta, Title } from "@solidjs/meta";
import { createAsync, useSearchParams } from "@solidjs/router";
import { Copy, LockKeyhole, LogOut } from "lucide-solid";
import { For, Show } from "solid-js";
import { getAccessLink, getMicrosites } from "~/model/model";
import { assetUrl } from "~/renderers/microsite/assets";
import { H1 } from "~/sites/mreis/typography";

const DURATIONS = [
  { hours: 24, label: "24 Stunden" },
  { hours: 48, label: "48 Stunden" },
  { hours: 72, label: "3 Tage" },
  { hours: 168, label: "7 Tage" },
];

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Berlin",
});

/**
 * seiten.mreis.me — the overview of every microsite as its sharing card,
 * with a link generator per page. Admins only; everyone else gets a short
 * note and the login.
 */
export default function SeitenHome() {
  const sites = createAsync(() => getMicrosites(), { deferStream: true });
  const [params] = useSearchParams();
  const link = createAsync(async () => {
    const slug = typeof params.link === "string" ? params.link : undefined;
    const hours = Number(params.h ?? 48);
    return slug
      ? getAccessLink(slug, Number.isFinite(hours) ? hours : 48)
      : null;
  });

  return (
    <main class="max-w-5xl mx-auto px-smd py-s2xl">
      <Title>Seiten – Konzeptvorschauen</Title>
      <Meta name="robots" content="noindex,nofollow" />

      <Show
        when={sites()}
        fallback={
          <div class="max-w-xl">
            <H1 class="mb-smd">Seiten</H1>
            <p class="text-xl leading-relaxed text-col-fg-muted mb-slg">
              Persönliche Konzeptvorschauen. Jede Seite ist nur mit dem Link
              oder Code erreichbar, den Sie von mir bekommen haben.
            </p>
            <a
              href="/login"
              class="inline-flex items-center gap-ssm text-col-fg-muted hover:text-col-hi-bg"
            >
              <LockKeyhole class="w-[1rem] h-[1rem]" /> Interner Zugang
            </a>
          </div>
        }
      >
        {(list) => (
          <>
            <div class="flex items-start justify-between gap-smd mb-smd">
              <H1>Seiten</H1>
              <a
                href="/logout"
                class="mt-ssm inline-flex items-center gap-sxs text-sm text-col-fg-muted hover:text-col-hi-bg"
              >
                <LogOut class="w-[1rem] h-[1rem]" /> Abmelden
              </a>
            </div>
            <p class="text-xl leading-relaxed text-col-fg-muted mb-s2xl max-w-2xl">
              Onepager-Konzepte für kleine Unternehmen. Darunter ein Renderer
              und ein Designsystem, darüber jedes Mal ein anderer Auftritt.
            </p>

            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-sxl">
              <For each={list()}>
                {(site) => {
                  const image = site.ogImage
                    ? assetUrl(site.slug, site.ogImage)
                    : undefined;
                  return (
                    <li class="flex flex-col overflow-hidden rounded-lg border border-col-border bg-col-surface">
                      <a
                        href={`/${site.slug}`}
                        class="group flex flex-1 flex-col transition-colors hover:bg-col-bg outline-offset-2 outline-col-hi-bg focus-visible:outline-2"
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
                            {site.public ? " · öffentlich" : ""}
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
                      </a>

                      <Show when={!site.public}>
                        <form
                          method="get"
                          action="/"
                          class="flex flex-wrap items-center gap-ssm border-t border-col-border px-slg py-smd text-sm"
                        >
                          <input type="hidden" name="link" value={site.slug} />
                          <label class="flex items-center gap-ssm">
                            <span class="text-col-fg-muted">
                              Kundenlink für
                            </span>
                            <select
                              name="h"
                              class="rounded-md border border-col-border bg-col-bg px-ssm py-sxs"
                            >
                              <For each={DURATIONS}>
                                {(d) => (
                                  <option
                                    value={d.hours}
                                    selected={d.hours === 48}
                                  >
                                    {d.label}
                                  </option>
                                )}
                              </For>
                            </select>
                          </label>
                          <button
                            type="submit"
                            class="rounded-md bg-col-hi-bg text-col-hi-fg px-smd py-sxs font-semibold"
                          >
                            Erzeugen
                          </button>
                        </form>
                        <Show when={link()?.slug === site.slug && link()}>
                          {(l) => (
                            <div class="flex flex-col gap-sxs border-t border-col-border px-slg py-smd text-sm">
                              <div class="flex items-center gap-ssm">
                                <input
                                  readonly
                                  value={l().url}
                                  onFocus={(e) => e.currentTarget.select()}
                                  class="min-w-0 flex-1 rounded-md border border-col-border bg-col-bg px-ssm py-sxs font-mono text-xs"
                                />
                                <button
                                  type="button"
                                  aria-label="Link kopieren"
                                  onClick={() =>
                                    navigator.clipboard?.writeText(l().url)
                                  }
                                  class="rounded-md border border-col-border p-sxs hover:border-col-hi-bg"
                                >
                                  <Copy class="w-[1rem] h-[1rem]" />
                                </button>
                              </div>
                              <span class="text-col-fg-muted">
                                Code{" "}
                                <strong class="font-mono">{l().code}</strong> ·
                                gültig bis{" "}
                                {dateFormat.format(new Date(l().expires))}
                              </span>
                            </div>
                          )}
                        </Show>
                      </Show>
                    </li>
                  );
                }}
              </For>
            </ul>
          </>
        )}
      </Show>
    </main>
  );
}
