/** biome-ignore-all lint/suspicious/noExplicitAny: HAST passes untyped props */

import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import type { ComponentMap, CustomBlockProps } from "solid-mds";
import { smallVariant, usePageAsset } from "./assets";
import { Palette } from "./palette";
import { ButtonLink, Card, Icon, type IconName, isIconName } from "./ui";
import { Video } from "./video";

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
 *     link: { text: …, url: … }   # optional link at the bottom
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
            <Show when={link(item.link)}>
              {(l) => (
                <a
                  href={l().url}
                  class="mt-auto pt-slg inline-flex items-center gap-sxs self-start font-semibold text-link underline underline-offset-4"
                >
                  {l().text}
                  <Icon name="arrow-up-right" class="w-[1rem] h-[1rem]" />
                </a>
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
      <ul
        class={`ms-block grid gap-smd ${columns()} ${style() === "tiles" ? "mt-sxl" : ""}`}
      >
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
 * ```yaml index
 * style: icons           # optional: big icon tiles instead of 01, 02, …
 * items:
 *   - icon: cable        # optional
 *     title: …
 *     text: …            # a few sentences
 *     image: foto.webp   # optional small photo, never shown above its own size
 * ```
 * A numbered list (01, 02, …) in two columns on wide screens — for a longer
 * list of services that deserves real text instead of card blurbs.
 */
const IndexList: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () => list(data()?.items);
  const icons = () => data()?.style === "icons";

  const Thumb: Component<{ file?: string; alt: string }> = (thumb) => {
    const src = usePageAsset(() => thumb.file);
    return (
      <Show when={src()}>
        {(url) => (
          // Small source photos: shown at most at their own width.
          <img
            src={url()}
            alt={thumb.alt}
            loading="lazy"
            decoding="async"
            class="col-start-2 sm:col-start-3 sm:row-start-1 mt-smd sm:mt-0 w-auto max-w-full h-auto rounded-ms"
          />
        )}
      </Show>
    );
  };

  return (
    <ol class="ms-block mt-sxl grid lg:grid-cols-2 gap-x-[4rem]">
      <For each={items()}>
        {(item, index) => (
          <li
            class={`grid gap-x-smd border-t border-line py-slg ${str(item.image) ? "grid-cols-[3.5rem_1fr] sm:grid-cols-[3.5rem_1fr_auto] md:grid-cols-[4.5rem_1fr_auto]" : "grid-cols-[3.5rem_1fr] md:grid-cols-[4.5rem_1fr]"}`}
          >
            <Show
              when={icons() && icon(item.icon)}
              fallback={
                <span
                  aria-hidden="true"
                  class="font-ms-display text-4xl md:text-5xl font-extrabold leading-none text-button tabular-nums"
                >
                  {String(index() + 1).padStart(2, "0")}
                </span>
              }
            >
              {(name) => (
                <span
                  aria-hidden="true"
                  class="w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem] rounded-ms bg-tint text-button flex items-center justify-center"
                >
                  <Icon
                    name={name()}
                    class="w-[1.9rem] h-[1.9rem] md:w-[2.4rem] md:h-[2.4rem]"
                  />
                </span>
              )}
            </Show>
            <div>
              <h3 class="font-ms-display text-2xl leading-tight text-copy-strong">
                {str(item.title)}
                <Show when={!icons() && icon(item.icon)}>
                  {(name) => (
                    <Icon
                      name={name() as IconName}
                      class="inline-block ml-ssm w-[1.25rem] h-[1.25rem] align-[-0.1em] text-copy-soft"
                    />
                  )}
                </Show>
              </h3>
              <Show when={str(item.text)}>
                {(text) => (
                  <p class="mt-ssm leading-relaxed text-copy">{text()}</p>
                )}
              </Show>
            </div>
            <Thumb file={str(item.image)} alt={str(item.alt) ?? ""} />
          </li>
        )}
      </For>
    </ol>
  );
};

/**
 * ```yaml stats
 * items:
 *   - { value: "4", text: Tage Woche }
 * ```
 * Big figures with a short line each — for the two or three numbers that
 * sell an offer. Only real numbers.
 */
const Stats: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () =>
    list(data()?.items).flatMap((item) => {
      const value = str(String(item.value ?? ""));
      const text = str(item.text);
      return value && text ? [{ value, text }] : [];
    });

  return (
    <dl class="ms-block my-sxl grid grid-cols-3 gap-smd sm:gap-slg [container-type:inline-size]">
      <For each={items()}>
        {(item) => (
          <div class="flex flex-col-reverse justify-end border-t-4 border-button pt-smd">
            <dt class="mt-ssm text-sm sm:text-lg font-semibold leading-snug text-copy-strong">
              {item.text}
            </dt>
            {/* Sized to the block, not the viewport: a figure never wraps. */}
            <dd class="font-ms-display text-[clamp(1.6rem,8.5cqi,8rem)] whitespace-nowrap font-black leading-[0.85] text-button">
              {item.value}
            </dd>
          </div>
        )}
      </For>
    </dl>
  );
};

/**
 * ```yaml callout
 * label: Direkt durchwählen      # optional, small line above
 * text: (02323) 23485
 * url: "tel:+49232323485"        # optional — makes it a link
 * icon: phone                    # optional
 * ```
 * One oversized line — the phone number, an address, a claim. Meant to be
 * the loudest thing in its section.
 */
const Callout: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const text = () => str(data()?.text);
  const url = () => str(data()?.url);
  const body = () => (
    <>
      <Show when={icon(data()?.icon)}>
        {(name) => (
          <Icon
            name={name()}
            class="w-[0.7em] h-[0.7em] shrink-0 text-button"
          />
        )}
      </Show>
      <span>{text()}</span>
    </>
  );
  const lineClass =
    "inline-flex items-center gap-[0.25em] font-ms-display font-black leading-[0.95] text-[clamp(2.8rem,9vw,7.5rem)] text-copy-strong";

  return (
    <Show when={text()}>
      <div class="ms-block my-sxl">
        <Show when={str(data()?.label)}>
          {(label) => (
            <p class="mb-ssm text-sm font-semibold uppercase tracking-[0.14em] text-copy-soft">
              {label()}
            </p>
          )}
        </Show>
        <Show when={url()} fallback={<p class={lineClass}>{body()}</p>}>
          {(href) => (
            <a
              href={href()}
              class={`${lineClass} decoration-button decoration-[0.06em] underline-offset-[0.12em] hover:underline`}
            >
              {body()}
            </a>
          )}
        </Show>
      </div>
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
 * fax: 02323 924109             # optional
 * email: …
 * hours: [Mo–Fr 9–18, Sa 10–14]
 * route: https://www.google.com/maps/dir/?api=1&destination=…   # optional
 * style: grid                   # optional: tiles side by side instead of a card
 * ```
 * Rows with a label; phone, mail and route are links.
 */
const Contact: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const phone = () => str(data()?.phone);
  const email = () => str(data()?.email);
  const fax = () => str(data()?.fax);
  const route = () => str(data()?.route);
  const grid = () => data()?.style === "grid";
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
        fallback={
          <div
            class={`flex gap-smd items-start p-smd ${grid() ? "rounded-ms bg-card" : ""}`}
          >
            {body}
          </div>
        }
      >
        {(href) => (
          <a
            href={href()}
            target={row.external ? "_blank" : undefined}
            rel={row.external ? "noopener" : undefined}
            class={`flex gap-smd items-start p-smd rounded-ms transition-colors hover:bg-tint ${grid() ? "bg-card" : ""}`}
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
    <address
      class={
        grid()
          ? "ms-block not-italic my-sxl grid gap-ssm sm:grid-cols-2 lg:grid-cols-4"
          : "ms-block not-italic my-sxl rounded-[calc(var(--ms-radius)*2)] bg-card border border-line p-ssm flex flex-col divide-y divide-line max-w-xl"
      }
    >
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
      <Show when={fax()}>
        {(f) => (
          <Row icon="printer" label="Fax">
            {f()}
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

/**
 * ```yaml emblem
 * src: logo-gross.webp     # pnpm ms-image … --logo (alpha kept)
 * alt: Logo von …          # required
 * size: 22                 # optional max width in rem (default 18)
 * ```
 * A logo or seal shown big and uncropped — no frame, no rounding. In a
 * centered section it sits on the axis.
 */
const Emblem: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const src = usePageAsset(() => str(data()?.src));
  const size = () => {
    const n = Number(data()?.size);
    return Number.isFinite(n) && n > 0 ? n : 18;
  };
  return (
    <Show when={src()}>
      {(url) => (
        <img
          src={url()}
          alt={str(data()?.alt) ?? ""}
          loading="eager"
          decoding="async"
          class="ms-block block w-full h-auto my-slg"
          style={{ "max-width": `${size()}rem` }}
        />
      )}
    </Show>
  );
};

/** Grid placement per mosaic slot: one large tile, two beside it, then thirds. */
const mosaicSlots = [
  "col-span-2 row-span-2 lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
];
const mosaicRest = "lg:col-span-4";

/**
 * ```yaml gallery
 * items:
 *   - src: rohbau.webp       # pnpm ms-image … — the first tile is the big one
 *     alt: Beschreibung      # required
 *     caption: Wohnhaus, Friesoythe   # optional, set on the photo
 * ```
 * An asymmetric photo mosaic: the first image large, two beside it, any
 * further ones in thirds below. Three or six items fill it cleanly.
 */
const Gallery: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () => list(data()?.items).filter((item) => str(item.src));

  const Tile: Component<{ item: Record<string, unknown>; index: number }> = (
    tile,
  ) => {
    const src = usePageAsset(() => str(tile.item.src));
    const small = usePageAsset(() => {
      const f = str(tile.item.src);
      return f ? smallVariant(f) : undefined;
    });
    return (
      <figure
        class={`relative overflow-hidden rounded-ms bg-card ${mosaicSlots[tile.index] ?? mosaicRest}`}
      >
        <Show when={src()}>
          {(url) => (
            <img
              src={url()}
              srcset={small() ? `${small()} 800w, ${url()} 1600w` : undefined}
              sizes={
                tile.index === 0
                  ? "(min-width: 64rem) 40rem, 100vw"
                  : "(min-width: 64rem) 28rem, 50vw"
              }
              alt={str(tile.item.alt) ?? ""}
              loading="lazy"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </Show>
        <Show when={str(tile.item.caption)}>
          {(caption) => (
            <figcaption class="ms-section ms-inverted absolute left-ssm bottom-ssm max-w-[calc(100%-1.5rem)] rounded-[calc(var(--ms-radius)*0.75)] px-ssm py-[0.3rem] text-xs sm:text-sm font-semibold text-copy-strong">
              {caption()}
            </figcaption>
          )}
        </Show>
      </figure>
    );
  };

  return (
    <div class="ms-block my-sxl grid grid-cols-2 lg:grid-cols-12 auto-rows-[9.5rem] sm:auto-rows-[13rem] lg:auto-rows-[15rem] gap-ssm md:gap-smd">
      <For each={items()}>
        {(item, index) => <Tile item={item} index={index()} />}
      </For>
    </div>
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
  callout: Callout,
  index: IndexList,
  stats: Stats,
  video: Video,
  palette: Palette,
  image: Image,
  gallery: Gallery,
  emblem: Emblem,
};
