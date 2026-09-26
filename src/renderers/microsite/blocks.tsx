/** biome-ignore-all lint/suspicious/noExplicitAny: HAST passes untyped props */

import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import type { ComponentMap, CustomBlockProps } from "solid-mds";
import { smallVariant, usePageAsset } from "./assets";
import { Palette } from "./palette";
import { ButtonLink, Card, Icon, type IconName, isIconName } from "./ui";

type Data = Record<string, unknown> | undefined;

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function list(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.filter(
        (v): v is Record<string, unknown> =>
          typeof v === "object" && v !== null,
      )
    : [];
}

function strings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

function icon(value: unknown): IconName | undefined {
  return isIconName(value) ? value : undefined;
}

type Link = { text: string; url: string; icon?: IconName };

function link(value: unknown): Link | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const v = value as Record<string, unknown>;
  const text = str(v.text);
  const url = str(v.url);
  return text && url ? { text, url, icon: icon(v.icon) } : undefined;
}

/** `tel:` href from a human-readable number (`04943 91940` → `tel:0494391940`). */
function tel(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/**
 * ```yaml cards
 * columns: 3            # optional, 2 or 3
 * icons: tile           # optional: icons in a tinted tile instead of bare
 * items:
 *   - icon: leaf        # optional, see `icons` in ui.tsx
 *     label: Neubau     # optional, small label top right
 *     title: …
 *     text: …           # optional
 *     tags: [a, b]      # optional chips below the title
 * ```
 */
const Cards: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () => list(data()?.items);
  const twoColumns = () => data()?.columns === 2;
  const tiles = () => data()?.icons === "tile";

  return (
    <div
      class={`ms-block grid gap-smd my-sxl sm:grid-cols-2 ${twoColumns() ? "" : "lg:grid-cols-3"}`}
    >
      <For each={items()}>
        {(item) => (
          <Card class="gap-0">
            <Show when={icon(item.icon) || str(item.label)}>
              <div class="flex items-start justify-between gap-smd mb-slg">
                <Show when={icon(item.icon)}>
                  {(name) => (
                    <span
                      class={
                        tiles()
                          ? "w-[3.25rem] h-[3.25rem] rounded-ms bg-tint text-link flex items-center justify-center"
                          : ""
                      }
                    >
                      <Icon
                        name={name()}
                        class={
                          tiles()
                            ? "w-[1.5rem] h-[1.5rem]"
                            : "w-[1.75rem] h-[1.75rem] stroke-[1.5]"
                        }
                      />
                    </span>
                  )}
                </Show>
                <Show when={str(item.label)}>
                  {(label) => (
                    <span class="text-sm font-semibold text-copy-soft">
                      {label()}
                    </span>
                  )}
                </Show>
              </div>
            </Show>
            {/* Without body text (reference cards) the title sits at the bottom. */}
            <h3
              class={`font-ms-display text-2xl font-semibold leading-tight text-copy-strong ${str(item.text) ? "" : "mt-auto"}`}
            >
              {str(item.title)}
            </h3>
            <Show when={str(item.text)}>
              {(text) => (
                <p class="mt-ssm text-copy leading-relaxed">{text()}</p>
              )}
            </Show>
            <Show when={strings(item.tags).length > 0}>
              <ul class="mt-smd flex flex-wrap gap-ssm">
                <For each={strings(item.tags)}>
                  {(tag) => (
                    <li class="rounded-full bg-tint px-ssm py-[0.3rem] text-sm font-semibold text-copy-strong">
                      {tag}
                    </li>
                  )}
                </For>
              </ul>
            </Show>
          </Card>
        )}
      </For>
    </div>
  );
};

/**
 * ```yaml features
 * style: plain          # plain | tiles | chips
 * columns: 4            # plain/tiles: 1–4 on wide screens
 * items:
 *   - { icon: clock, text: Notdienst rund um die Uhr }
 * ```
 * plain — icon + text in a row, e.g. a trust strip in a `band` section;
 * tiles — the same on card tiles; chips — a wrapping row of small pills.
 */
const Features: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () =>
    list(data()?.items).flatMap((item) => {
      const text = str(item.text);
      return text ? [{ text, icon: icon(item.icon) }] : [];
    });
  const style = () =>
    data()?.style === "tiles" || data()?.style === "chips"
      ? (data()?.style as "tiles" | "chips")
      : "plain";
  const columns = () =>
    ({
      1: "",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    })[Number(data()?.columns ?? 4)] ?? "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <Show
      when={style() !== "chips"}
      fallback={
        <ul class="ms-block flex flex-wrap gap-ssm mt-sxl">
          <For each={items()}>
            {(item) => (
              <li class="inline-flex items-center gap-ssm rounded-full bg-card border border-line py-ssm pl-ssm pr-smd font-semibold text-copy-strong">
                <Show when={item.icon}>
                  {(name) => (
                    <span class="w-[2rem] h-[2rem] rounded-full bg-tint text-link flex items-center justify-center">
                      <Icon name={name()} class="w-[1.05rem] h-[1.05rem]" />
                    </span>
                  )}
                </Show>
                {item.text}
              </li>
            )}
          </For>
        </ul>
      }
    >
      <ul class={`ms-block grid gap-smd ${columns()}`}>
        <For each={items()}>
          {(item) => (
            <li
              class={`flex items-center gap-smd font-semibold ${style() === "tiles" ? "rounded-ms bg-card p-smd text-lg text-copy-strong" : "text-copy-strong"}`}
            >
              <Show when={item.icon}>
                {(name) => (
                  <span
                    class={`w-[2.75rem] h-[2.75rem] shrink-0 rounded-ms flex items-center justify-center ${style() === "tiles" ? "bg-tint text-link" : "bg-card text-button"}`}
                  >
                    <Icon name={name()} class="w-[1.25rem] h-[1.25rem]" />
                  </span>
                )}
              </Show>
              {item.text}
            </li>
          )}
        </For>
      </ul>
    </Show>
  );
};

/**
 * ```yaml rating
 * score: 4.2             # out of 5
 * text: bei 22 Google-Bewertungen
 * date: "Stand: August 2026"
 * ```
 * Only real, sourced ratings — never invent one.
 */
const Rating: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const score = () => Math.max(0, Math.min(5, Number(data()?.score ?? 0)));
  const label = () =>
    score().toLocaleString("de-DE", { maximumFractionDigits: 1 });
  const stars = [1, 2, 3, 4, 5];

  return (
    <div class="ms-block mt-sxl flex flex-wrap items-center gap-x-slg gap-y-ssm rounded-ms bg-card px-slg py-slg">
      <strong class="font-ms-display text-4xl font-bold text-copy-strong">
        {label()}
      </strong>
      <span
        class="relative inline-flex gap-[3px] text-line"
        role="img"
        aria-label={`${label()} von 5 Sternen`}
      >
        <For each={stars}>
          {() => (
            <Icon
              name="star"
              class="w-[1.4rem] h-[1.4rem] fill-current stroke-none"
            />
          )}
        </For>
        <span
          class="absolute inset-y-0 left-0 inline-flex gap-[3px] overflow-hidden whitespace-nowrap text-button"
          style={{ width: `${(score() / 5) * 100}%` }}
        >
          <For each={stars}>
            {() => (
              <Icon
                name="star"
                class="w-[1.4rem] h-[1.4rem] shrink-0 fill-current stroke-none"
              />
            )}
          </For>
        </span>
      </span>
      <Show when={str(data()?.text)}>
        {(text) => <span class="font-medium text-copy-strong">{text()}</span>}
      </Show>
      <Show when={str(data()?.date)}>
        {(date) => (
          <span class="md:ml-auto w-full md:w-auto text-sm text-copy-soft">
            {date()}
          </span>
        )}
      </Show>
    </div>
  );
};

/**
 * ```yaml cta
 * primary: { text: …, url: …, icon: phone }   # icon optional
 * secondary: { text: …, url: … }               # optional
 * ```
 */
const Cta: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const primary = () => link(data()?.primary);
  const secondary = () => link(data()?.secondary);

  return (
    <div class="ms-block flex flex-col sm:flex-row flex-wrap gap-ssm mt-slg">
      <Show when={primary()}>
        {(l) => (
          <ButtonLink href={l().url} icon={l().icon}>
            {l().text}
          </ButtonLink>
        )}
      </Show>
      <Show when={secondary()}>
        {(l) => (
          <ButtonLink href={l().url} variant="secondary" icon={l().icon}>
            {l().text}
          </ButtonLink>
        )}
      </Show>
    </div>
  );
};

/**
 * ```yaml contact
 * name: …                       # optional heading line of the address
 * address: [Street 1, 12345 City]
 * phone: 04943 91940
 * email: …
 * hours: [Mo–Fr 9–18, Sa 10–14]
 * route: https://www.google.com/maps/dir/?api=1&destination=…   # optional
 * ```
 * Rows with a label; phone, mail and route are links.
 */
const Contact: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const phone = () => str(data()?.phone);
  const email = () => str(data()?.email);
  const route = () => str(data()?.route);
  const address = () =>
    [str(data()?.name), ...strings(data()?.address)].filter(Boolean);

  const Row: Component<{
    icon: IconName;
    label: string;
    href?: string;
    external?: boolean;
    children: any;
  }> = (row) => {
    const body = (
      <>
        <span class="w-[2.75rem] h-[2.75rem] shrink-0 rounded-ms bg-tint text-button flex items-center justify-center">
          <Icon name={row.icon} class="w-[1.25rem] h-[1.25rem]" />
        </span>
        <span class="min-w-0">
          <small class="block text-sm text-copy-soft">{row.label}</small>
          <span class="block font-semibold leading-snug text-copy-strong break-words">
            {row.children}
          </span>
        </span>
      </>
    );
    return (
      <Show
        when={row.href}
        fallback={<div class="flex gap-smd items-start p-smd">{body}</div>}
      >
        {(href) => (
          <a
            href={href()}
            target={row.external ? "_blank" : undefined}
            rel={row.external ? "noopener" : undefined}
            class="flex gap-smd items-start p-smd rounded-ms transition-colors hover:bg-tint"
          >
            {body}
            <Icon
              name="arrow-up-right"
              class="ml-auto self-center w-[1.1rem] h-[1.1rem] text-copy-soft"
            />
          </a>
        )}
      </Show>
    );
  };

  return (
    <address class="ms-block not-italic my-sxl rounded-[calc(var(--ms-radius)*2)] bg-card border border-line p-ssm flex flex-col divide-y divide-line max-w-xl">
      <Show when={address().length > 0}>
        <Row icon="map-pin" label="Adresse">
          <For each={address()}>
            {(line) => <span class="block">{line}</span>}
          </For>
        </Row>
      </Show>
      <Show when={phone()}>
        {(p) => (
          <Row icon="phone" label="Telefon" href={tel(p())}>
            {p()}
          </Row>
        )}
      </Show>
      <Show when={email()}>
        {(e) => (
          <Row icon="mail" label="E-Mail" href={`mailto:${e()}`}>
            {e()}
          </Row>
        )}
      </Show>
      <Show when={strings(data()?.hours).length > 0}>
        <Row icon="clock" label="Öffnungszeiten">
          <For each={strings(data()?.hours)}>
            {(line) => <span class="block">{line}</span>}
          </For>
        </Row>
      </Show>
      <Show when={route()}>
        {(r) => (
          <Row icon="route" label="Anfahrt" href={r()} external>
            Route planen
          </Row>
        )}
      </Show>
    </address>
  );
};

/**
 * ```yaml image
 * src: backstube.webp      # file in _content/mreis/p/<page>/, via pnpm ms-image
 * alt: Beschreibung         # required — describe the image, not "Bild von"
 * ratio: 3/2                # optional, aspect ratio of the frame
 * caption: …                # optional
 * eager: true               # optional, for the first visible image
 * ```
 */
const Image: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const file = () => str(data()?.src);
  const src = usePageAsset(file);
  const small = usePageAsset(() => {
    const f = file();
    return f ? smallVariant(f) : undefined;
  });
  const caption = () => str(data()?.caption);
  const ratio = () => str(String(data()?.ratio ?? "")) ?? "3/2";

  return (
    <Show
      when={src()}
      fallback={
        <p class="my-slg text-copy-soft">
          Bild fehlt: {file() ?? "(kein src)"}
        </p>
      }
    >
      {(url) => (
        <figure class="ms-block my-sxl">
          <img
            src={url()}
            srcset={small() ? `${small()} 800w, ${url()} 1600w` : undefined}
            sizes="(min-width: 72rem) 72rem, 100vw"
            alt={str(data()?.alt) ?? ""}
            loading={data()?.eager === true ? "eager" : "lazy"}
            decoding="async"
            class="w-full rounded-ms object-cover"
            style={{ "aspect-ratio": ratio() }}
          />
          <Show when={caption()}>
            {(c) => (
              <figcaption class="mt-ssm text-sm text-copy-soft">
                {c()}
              </figcaption>
            )}
          </Show>
        </figure>
      )}
    </Show>
  );
};

/** Prose + blocks for a microsite section body. */
export const micrositeComponents: ComponentMap = {
  h1: (props: any) => (
    <h1
      class="font-ms-display text-[clamp(2.4rem,5.4vw,4.75rem)] leading-[1.02] tracking-tight text-copy-strong max-w-4xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      class="font-ms-display text-[clamp(2.1rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-copy-strong max-w-3xl mb-smd"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      class="font-ms-display text-2xl font-semibold mt-slg mb-ssm"
      {...props}
    />
  ),
  p: (props: any) => (
    <p class="text-lg leading-relaxed text-copy max-w-2xl my-ssm" {...props} />
  ),
  ul: (props: any) => (
    <ul class="list-disc ml-slg text-lg text-copy max-w-2xl" {...props} />
  ),
  li: (props: any) => <li class="my-sxs leading-relaxed" {...props} />,
  strong: (props: any) => (
    <strong class="font-semibold text-copy-strong" {...props} />
  ),
  a: (props: any) => (
    <a class="text-link underline underline-offset-4" {...props} />
  ),
  cards: Cards,
  cta: Cta,
  contact: Contact,
  features: Features,
  rating: Rating,
  palette: Palette,
  image: Image,
};
