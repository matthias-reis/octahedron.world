/** biome-ignore-all lint/suspicious/noExplicitAny: HAST passes untyped props */

import type { Component } from "solid-js";
import { createUniqueId, For, onMount, Show } from "solid-js";
import type { ComponentMap, CustomBlockProps } from "solid-mds";
import { smallVariant, usePageAsset } from "./assets";
import { Palette } from "./palette";
import { colorClasses, depthClass } from "./theme";
import {
  ButtonLink,
  Card,
  Icon,
  type IconName,
  isIconName,
  Swoosh,
} from "./ui";
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
 *     image: foto.webp  # optional photo on top of the card (4:3, cropped)
 *     alt: …            # required with image
 * ```
 * With photos, a list of services stays visible at once — every item a
 * card with its picture — instead of folding into a `reveal`.
 */
/** The photo on top of a card, edge to edge over the card's padding. */
const CardPhoto: Component<{ file?: string; alt: string }> = (photo) => {
  const src = usePageAsset(() => photo.file);
  const small = usePageAsset(() =>
    photo.file ? smallVariant(photo.file) : undefined,
  );
  return (
    <Show when={src()}>
      {(url) => (
        <img
          src={url()}
          srcset={small() ? `${small()} 800w, ${url()} 1600w` : undefined}
          sizes="(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw"
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          class="-mx-slg -mt-slg mb-slg max-w-none aspect-[4/3] object-cover bg-tint"
        />
      )}
    </Show>
  );
};

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
          <Card class="gap-0 overflow-hidden">
            <CardPhoto file={str(item.image)} alt={str(item.alt) ?? ""} />
            <Show when={icon(item.icon) || str(item.label)}>
              <div class="flex items-start justify-between gap-smd mb-slg">
                <Show when={icon(item.icon)}>
                  {(name) => (
                    <span
                      class={
                        tiles()
                          ? "w-[3.25rem] h-[3.25rem] rounded-ms bg-icon-tile text-icon flex items-center justify-center"
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
                    <span class="w-[2rem] h-[2rem] rounded-full bg-icon-tile text-icon flex items-center justify-center">
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
                    class={`w-[2.75rem] h-[2.75rem] shrink-0 rounded-ms flex items-center justify-center ${style() === "tiles" ? "bg-icon-tile text-icon" : "bg-icon-tile text-icon"}`}
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
 *     mark: "1984"       # optional: set in place of the number (a year in a timeline)
 * ```
 * A numbered list (01, 02, …) in two columns on wide screens — for a longer
 * list of services that deserves real text instead of card blurbs.
 * `numbers: plain` counts 1., 2., 3. in large figures — for steps a
 * reader follows in order (what to do in a bereavement). A `mark` on every
 * item turns the list into a timeline: the year stands where the number was.
 */
const IndexList: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () => list(data()?.items);
  const icons = () => data()?.style === "icons";
  const plain = () => data()?.numbers === "plain";

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
            class={`grid gap-x-smd border-t border-line py-slg ${str(item.image) ? "grid-cols-[minmax(3.5rem,auto)_1fr] sm:grid-cols-[minmax(3.5rem,auto)_1fr_auto] md:grid-cols-[minmax(4.5rem,auto)_1fr_auto]" : "grid-cols-[minmax(3.5rem,auto)_1fr] md:grid-cols-[minmax(4.5rem,auto)_1fr]"}`}
          >
            <Show
              when={icons() && icon(item.icon)}
              fallback={
                <span
                  aria-hidden="true"
                  class={`font-ms-display font-extrabold leading-none text-button tabular-nums ${plain() ? "text-6xl md:text-7xl" : "text-4xl md:text-5xl"}`}
                >
                  {str(item.mark) ??
                    (plain()
                      ? `${index() + 1}.`
                      : String(index() + 1).padStart(2, "0"))}
                </span>
              }
            >
              {(name) => (
                <span
                  aria-hidden="true"
                  class="w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem] rounded-ms bg-icon-tile text-icon flex items-center justify-center"
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
 * face: hand                     # optional — the pairing's hand face (brush script)
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
  // The hand face runs a size smaller and never breaks a phone number.
  const lineClass = `inline-flex items-center gap-[0.25em] leading-[0.95] text-copy-strong ${data()?.face === "hand" ? "font-ms-hand font-normal tracking-normal whitespace-nowrap text-[clamp(2.6rem,10vw,5.25rem)]" : "font-ms-display font-black text-[clamp(2.8rem,9vw,7.5rem)]"}`;

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
 * mobile: 0172 1234567           # optional, a second phone row
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
  const mobile = () => str(data()?.mobile);
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
        <span class="w-[2.75rem] h-[2.75rem] shrink-0 rounded-ms bg-icon-tile text-icon flex items-center justify-center">
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
      <Show when={mobile()}>
        {(m) => (
          <Row icon="phone" label="Mobil" href={tel(m())}>
            {m()}
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

/** The asymmetric photo mosaic shared by `gallery` and `reveal` items. */
const Mosaic: Component<{
  items: Record<string, unknown>[];
  class?: string;
}> = (props) => {
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
    <div
      class={`grid grid-cols-2 lg:grid-cols-12 auto-rows-[9.5rem] sm:auto-rows-[13rem] lg:auto-rows-[15rem] gap-ssm md:gap-smd ${props.class ?? ""}`}
    >
      <For each={props.items.filter((item) => str(item.src))}>
        {(item, index) => <Tile item={item} index={index()} />}
      </For>
    </div>
  );
};

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
  return <Mosaic items={list(data()?.items)} class="ms-block my-sxl" />;
};

/**
 * ```yaml reveal
 * items:
 *   - title: …
 *     text: …              # a few sentences
 *     icon: hammer         # optional
 *     image: foto.webp     # optional single photo beside the text
 *     alt: …               # required with image
 *     caption: …           # optional line under the photo (e.g. Symbolbild (KI-generiert))
 *     gallery:             # optional: the item's own photo mosaic below the text
 *       - { src: a.webp, alt: …, caption: … }
 * photos: natural          # optional: photos at their own size (small originals), not cropped to 3:2
 * ```
 * Titles that open in place, one at a time. Without JavaScript it is a
 * native exclusive accordion (`<details name>`); with it, the chapter
 * grows and fades in (Web Animations API, height + opacity, honouring
 * reduced motion) and the previously open one folds away. Each item is a
 * whole chapter — text and its photos — so a service list needs no
 * sections of its own and no numbers. The first item starts open.
 */
const Reveal: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  // Small originals (old websites) stay at their own size, never upscaled.
  const natural = () => data()?.photos === "natural";
  const items = () => list(data()?.items).filter((item) => str(item.title));
  const group = createUniqueId();
  let root!: HTMLDivElement;

  const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const bodyOf = (d: HTMLDetailsElement) =>
    d.querySelector<HTMLElement>(".ms-reveal-body");

  const fold = (d: HTMLDetailsElement) => {
    const body = bodyOf(d);
    if (!body || reduced()) {
      d.open = false;
      return;
    }
    body.getAnimations().forEach((a) => a.cancel());
    body.style.overflow = "hidden";
    const a = body.animate(
      [
        { height: `${body.offsetHeight}px`, opacity: 1 },
        { height: "0px", opacity: 0 },
      ],
      { duration: 320, easing: EASE, fill: "forwards" },
    );
    a.onfinish = () => {
      d.open = false;
      a.cancel();
      body.style.overflow = "";
    };
  };

  const unfold = (d: HTMLDetailsElement) => {
    for (const other of root.querySelectorAll<HTMLDetailsElement>(
      "details[open]",
    ))
      if (other !== d) fold(other);
    d.open = true;
    const body = bodyOf(d);
    if (!body || reduced()) return;
    body.getAnimations().forEach((a) => a.cancel());
    body.style.overflow = "hidden";
    const a = body.animate(
      [
        { height: "0px", opacity: 0, translate: "0 0.5rem" },
        { height: `${body.offsetHeight}px`, opacity: 1, translate: "0 0" },
      ],
      { duration: 450, easing: EASE },
    );
    a.onfinish = () => {
      body.style.overflow = "";
    };
  };

  const toggle = (event: MouseEvent) => {
    const d = (event.currentTarget as HTMLElement)
      .parentElement as HTMLDetailsElement;
    event.preventDefault();
    if (d.open) fold(d);
    else unfold(d);
  };

  // With JavaScript the script keeps the group exclusive (animated); the
  // native `name` would snap the others shut before they can fold.
  onMount(() => {
    for (const d of root.querySelectorAll("details")) d.removeAttribute("name");
  });

  const Photo: Component<{ file?: string; alt: string }> = (photo) => {
    const src = usePageAsset(() => photo.file);
    const small = usePageAsset(() => {
      const f = photo.file;
      return f ? smallVariant(f) : undefined;
    });
    return (
      <Show when={src()}>
        {(url) => (
          <img
            src={url()}
            srcset={small() ? `${small()} 800w, ${url()} 1600w` : undefined}
            sizes="(min-width: 1024px) 24rem, 100vw"
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            class={
              natural()
                ? "w-auto max-w-full h-auto rounded-ms"
                : "w-full h-auto aspect-[3/2] rounded-ms bg-card object-cover"
            }
          />
        )}
      </Show>
    );
  };

  const Figure: Component<{ file?: string; alt: string; caption?: string }> = (
    figure,
  ) => (
    <Show
      when={figure.caption}
      fallback={<Photo file={figure.file} alt={figure.alt} />}
    >
      {(caption) => (
        <figure class="m-0">
          <Photo file={figure.file} alt={figure.alt} />
          <figcaption class="mt-sxs text-xs text-copy-soft">
            {caption()}
          </figcaption>
        </figure>
      )}
    </Show>
  );

  return (
    <div ref={root} class="ms-block ms-reveal mt-sxl border-t border-line">
      <For each={items()}>
        {(item, index) => (
          <details
            name={group}
            open={index() === 0}
            class="border-b border-line"
          >
            <summary
              onClick={toggle}
              class="flex items-center gap-smd py-smd md:py-slg cursor-pointer list-none select-none text-copy-strong transition-colors hover:text-button"
            >
              <Show when={icon(item.icon)}>
                {(name) => (
                  <span class="w-[2.75rem] h-[2.75rem] shrink-0 rounded-ms bg-icon-tile text-icon flex items-center justify-center">
                    <Icon name={name()} class="w-[1.4rem] h-[1.4rem]" />
                  </span>
                )}
              </Show>
              <h3 class="flex-1 font-ms-display text-2xl md:text-3xl leading-tight">
                {str(item.title)}
              </h3>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                class="ms-reveal-mark w-[1.6rem] h-[1.6rem] shrink-0 text-button transition-transform duration-300"
              >
                <path d="M5 12h14M12 5v14" />
              </svg>
            </summary>
            <div
              class={`ms-reveal-body pb-slg md:pb-sxl ${icon(item.icon) ? "md:pl-[3.5rem]" : ""}`}
            >
              <div
                class={`grid gap-slg ${str(item.image) ? "lg:grid-cols-[minmax(0,1fr)_24rem]" : ""}`}
              >
                <p class="max-w-prose leading-relaxed text-copy">
                  {str(item.text)}
                </p>
                <Figure
                  file={str(item.image)}
                  alt={str(item.alt) ?? ""}
                  caption={str(item.caption)}
                />
              </div>
              <Show when={list(item.gallery).length > 0}>
                <Mosaic items={list(item.gallery)} class="mt-slg" />
              </Show>
            </div>
          </details>
        )}
      </For>
    </div>
  );
};

/** A product cut-out on the tile's card: white grounds melt into it. */
const CatalogPicture: Component<{ item: Record<string, unknown> }> = (
  props,
) => {
  // No srcset: product shots are small originals, and the browser must see
  // their true width so `max-w-full` never blows a 240 px cut-out up.
  const src = usePageAsset(() => str(props.item.src));
  const cover = () => props.item.fit === "cover";
  return (
    <Show when={src()}>
      {(url) => (
        <img
          src={url()}
          alt={str(props.item.alt) ?? ""}
          loading="lazy"
          decoding="async"
          class={
            cover()
              ? "absolute inset-0 w-full h-full object-cover"
              : "relative min-w-0 max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.04]"
          }
        />
      )}
    </Show>
  );
};

/**
 * ```yaml catalog
 * link: { text: Gesamtkatalog öffnen, url: "#katalog" }   # optional bar above the grid
 * note: 14 Warengruppen …     # optional line beside the bar's link
 * items:
 *   - title: Reinigungstechnik   # long names: a soft hyphen (U+00AD) marks where they may break
 *     text: …                 # optional, one line: what the group covers
 *     url: "#katalog"         # the group's entry in the catalog
 *     feature: true           # optional: a wide tile (two columns)
 *     images:                 # 1 (2 on a feature tile), pnpm ms-image …
 *       - src: sauger.webp
 *         alt: …              # required
 *         fit: cover          # optional: fill the plate (photos), default contain (cut-outs)
 * ```
 * The opening spread of a product catalog: one tile per product group, each
 * a product on the card, the group's name and one line, all linking into the
 * catalog. Groups only — never the level below. Feature tiles (the groups the
 * business leads with) span two columns; the grid packs densely, so any mix
 * fills it. On hover the swoosh under the name sweeps out. Light sections
 * only: the cut-outs blend into the plate with `multiply`.
 */
const Catalog: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () => list(data()?.items);
  return (
    <div class="ms-block my-sxl">
      <Show when={link(data()?.link)}>
        {(l) => (
          <div class="mb-smd flex flex-wrap items-center justify-between gap-smd rounded-ms bg-tint px-slg py-smd">
            <Show when={str(data()?.note)}>
              {(note) => (
                <p class="min-w-0 font-semibold text-copy-strong">{note()}</p>
              )}
            </Show>
            <ButtonLink href={l().url} icon={l().icon ?? "book-open"}>
              {l().text}
            </ButtonLink>
          </div>
        )}
      </Show>
      <ul class="grid grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-ssm md:gap-smd">
        <For each={items()}>
          {(item) => {
            const feature = () => item.feature === true;
            const pictures = () =>
              list(item.images).slice(0, feature() ? 2 : 1);
            return (
              <li class={feature() ? "col-span-2" : ""}>
                <a
                  href={str(item.url) ?? "#"}
                  class="group flex h-full flex-col rounded-ms bg-card overflow-hidden outline-offset-2 focus-visible:outline-2 outline-button"
                >
                  <div
                    class={`relative flex items-center justify-center gap-smd overflow-hidden p-smd ${feature() ? "aspect-[8/3]" : "aspect-[4/3]"}`}
                  >
                    <For each={pictures()}>
                      {(picture) => <CatalogPicture item={picture} />}
                    </For>
                  </div>
                  <div class="flex flex-1 flex-col px-smd pt-smd pb-slg">
                    <div class="flex items-start justify-between gap-ssm">
                      <h3 class="font-ms-display text-lg sm:text-xl font-bold leading-tight text-balance hyphens-manual text-copy-strong">
                        {str(item.title)}
                      </h3>
                      <Icon
                        name="arrow-up-right"
                        class="mt-[0.15rem] w-[1.1rem] h-[1.1rem] shrink-0 text-icon transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                      />
                    </div>
                    <Swoosh class="mt-sxs w-[3rem] h-[0.6rem] origin-left text-icon transition-transform duration-300 group-hover:scale-x-[2.2]" />
                    <Show when={str(item.text)}>
                      {(text) => (
                        <p class="mt-ssm text-sm leading-snug text-copy-soft">
                          {text()}
                        </p>
                      )}
                    </Show>
                  </div>
                </a>
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
};

/**
 * ```yaml logos
 * label: Marken im Sortiment   # optional, small line above
 * items:
 *   - { src: marke-tork.webp, alt: Tork }   # pnpm ms-image … --logo
 * ```
 * A strip of partner or manufacturer marks at one height, toned down to
 * grey so no brand outshouts the page; full color on hover.
 */
const Logos: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const Mark: Component<{ item: Record<string, unknown> }> = (mark) => {
    const src = usePageAsset(() => str(mark.item.src));
    return (
      <Show when={src()}>
        {(url) => (
          <li class="flex items-center justify-center rounded-ms bg-page px-smd py-ssm">
            <img
              src={url()}
              alt={str(mark.item.alt) ?? ""}
              loading="lazy"
              decoding="async"
              class="h-[2.4rem] w-auto max-w-[8.5rem] object-contain mix-blend-multiply grayscale opacity-75 transition hover:grayscale-0 hover:opacity-100"
            />
          </li>
        )}
      </Show>
    );
  };
  return (
    <div class="ms-block my-slg">
      <Show when={str(data()?.label)}>
        {(label) => (
          <p class="mb-smd text-sm font-semibold uppercase tracking-wider text-copy-soft">
            {label()}
          </p>
        )}
      </Show>
      <ul class="flex flex-wrap gap-ssm">
        <For each={list(data()?.items)}>{(item) => <Mark item={item} />}</For>
      </ul>
    </div>
  );
};

/**
 * ```yaml doors
 * items:
 *   - kicker: { text: Tischlerei, icon: hammer }    # or a plain string
 *     title: Sie planen etwas aus Holz              # h2 of the door
 *     text: …                                       # one or two sentences
 *     image: werkbank.webp                          # pnpm ms-image …
 *     alt: …                                        # required with image
 *     position: 50% 40%                             # optional object-position
 *     caption: Symbolbild (KI-generiert)            # optional, on the photo
 *     primary: { text: Zur Tischlerei, url: /…, icon: arrow-up-right }
 *     secondary: { text: …, url: … }                # optional
 *     note: { icon: clock, text: Mo–Do 7:30–17:00 } # optional small line
 *     variant: inverted                             # optional: a dark door, or `tint`
 *     depth: 2                                      # optional, inverted on d1/d2 (see theme.css)
 *     colors: { copy: adjacent-right, background: adjacent-right }   # optional
 * ```
 * A start page that sends two (or three) audiences their own way: big
 * doors side by side, each a photo, a headline in the visitor's own words
 * and the one action that door is for. Every door is a section in
 * miniature (`ms-section`), so a dark door follows the page's color groups
 * like an inverted section. Two doors fill the row, three run in thirds.
 */
const Doors: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () => list(data()?.items);

  const Door: Component<{ item: Record<string, unknown> }> = (door) => {
    const file = () => str(door.item.image);
    const src = usePageAsset(file);
    const small = usePageAsset(() => {
      const f = file();
      return f ? smallVariant(f) : undefined;
    });
    const kicker = () => {
      const k = door.item.kicker;
      if (typeof k === "string") return { text: k, icon: undefined };
      const v = (k ?? {}) as Record<string, unknown>;
      return str(v.text)
        ? { text: str(v.text), icon: icon(v.icon) }
        : undefined;
    };
    const note = () => {
      const n = door.item.note;
      if (typeof n === "string") return { text: n, icon: undefined };
      const v = (n ?? {}) as Record<string, unknown>;
      return str(v.text)
        ? { text: str(v.text), icon: icon(v.icon) }
        : undefined;
    };
    const primary = () => link(door.item.primary);
    const secondary = () => link(door.item.secondary);
    const dark = () => door.item.variant === "inverted";
    const tint = () => door.item.variant === "tint";

    return (
      <article
        class={[
          "ms-section flex flex-col rounded-[calc(var(--ms-radius)*2)] overflow-hidden border border-line",
          dark() ? "ms-inverted" : tint() ? "ms-tint" : "ms-surface",
          depthClass(door.item.depth),
          ...colorClasses(door.item.colors),
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Show when={src()}>
          {(url) => (
            <div class="relative aspect-[16/9] lg:aspect-auto lg:min-h-[14rem] lg:flex-1">
              <img
                src={url()}
                srcset={small() ? `${small()} 800w, ${url()} 1600w` : undefined}
                sizes="(min-width: 64rem) 36rem, 100vw"
                alt={str(door.item.alt) ?? ""}
                loading="eager"
                decoding="async"
                class="absolute inset-0 w-full h-full object-cover"
                style={{
                  "object-position": str(door.item.position) ?? "50% 50%",
                }}
              />
              <Show when={str(door.item.caption)}>
                {(c) => (
                  <span class="absolute right-ssm bottom-ssm rounded-[calc(var(--ms-radius)*0.5)] bg-page/85 px-ssm py-[0.15rem] text-[0.7rem] text-copy-soft">
                    {c()}
                  </span>
                )}
              </Show>
            </div>
          )}
        </Show>
        <div class="flex flex-col gap-ssm p-slg md:p-sxl">
          <Show when={kicker()}>
            {(k) => (
              <p class="flex items-center gap-ssm text-sm font-semibold uppercase tracking-[0.14em] text-copy-soft">
                <Show when={k().icon}>
                  {(name) => (
                    <Icon
                      name={name()}
                      class="w-[1.1rem] h-[1.1rem] text-icon"
                    />
                  )}
                </Show>
                {k().text}
              </p>
            )}
          </Show>
          <h2 class="font-ms-display text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.08] tracking-tight text-copy-strong">
            {str(door.item.title)}
          </h2>
          <Show when={str(door.item.text)}>
            {(text) => (
              <p class="text-lg leading-relaxed text-copy max-w-xl">{text()}</p>
            )}
          </Show>
          <div class="flex flex-col sm:flex-row flex-wrap gap-ssm mt-ssm">
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
          <Show when={note()}>
            {(n) => (
              <p class="mt-ssm flex items-center gap-ssm text-sm text-copy-soft">
                <Show when={n().icon}>
                  {(name) => <Icon name={name()} class="w-[1rem] h-[1rem]" />}
                </Show>
                {n().text}
              </p>
            )}
          </Show>
        </div>
      </article>
    );
  };

  return (
    <div
      class={`ms-block grid gap-smd mt-slg items-stretch ${items().length > 2 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}
    >
      <For each={items()}>{(item) => <Door item={item} />}</For>
    </div>
  );
};

/**
 * ```yaml carousel
 * label: Innenräume            # optional, small line above the strip
 * items:
 *   - src: flur.webp           # pnpm ms-image …
 *     alt: …                   # required
 *     ratio: 4/3               # optional width/height of the photo (default 4/3)
 *     title: Altenzentrum, Syke   # optional caption headline
 *     text: …                  # optional, one or two sentences
 * ```
 * Big photos in one row at one height, uncropped (each keeps its `ratio`),
 * spanning the whole screen width: the first photo starts at the
 * container's edge, scrolled ones pass into the margins on both sides, and
 * every photo snaps to the container's left edge. Works without JavaScript (scroll
 * snap); with it, two arrow buttons page through the strip. For a
 * portfolio that should be seen big rather than as a mosaic.
 */
const Carousel: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () => list(data()?.items).filter((item) => str(item.src));
  let track!: HTMLDivElement;
  let controls!: HTMLDivElement;

  const ratio = (value: unknown) => {
    const m =
      typeof value === "string" &&
      /^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(value.trim());
    return m
      ? `${m[1]} / ${m[2]}`
      : typeof value === "number" && value > 0
        ? String(value)
        : "4 / 3";
  };

  const page = (direction: 1 | -1) => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollBy({
      left: direction * Math.max(track.clientWidth * 0.8, 240),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  // The arrows only make sense with JavaScript: shown once mounted.
  onMount(() => controls.removeAttribute("hidden"));

  const Slide: Component<{ item: Record<string, unknown>; index: number }> = (
    slide,
  ) => {
    const src = usePageAsset(() => str(slide.item.src));
    const small = usePageAsset(() => {
      const f = str(slide.item.src);
      return f ? smallVariant(f) : undefined;
    });
    return (
      <figure class="shrink-0 snap-start flex flex-col gap-ssm">
        <div
          class="h-[clamp(15rem,58vw,22rem)] md:h-[clamp(20rem,52vh,32rem)] rounded-ms bg-card overflow-hidden"
          style={{ "aspect-ratio": ratio(slide.item.ratio) }}
        >
          <Show when={src()}>
            {(url) => (
              <img
                src={url()}
                srcset={small() ? `${small()} 800w, ${url()} 1600w` : undefined}
                sizes="(min-width: 768px) 48rem, 90vw"
                alt={str(slide.item.alt) ?? ""}
                loading={slide.index < 2 ? "eager" : "lazy"}
                decoding="async"
                class="w-full h-full object-cover"
              />
            )}
          </Show>
        </div>
        <Show when={str(slide.item.title) || str(slide.item.text)}>
          {/* As wide as its photo, never wider: w-0 + min-w-full. */}
          <figcaption class="w-0 min-w-full pr-ssm">
            <Show when={str(slide.item.title)}>
              {(title) => (
                <span class="block font-semibold text-copy-strong leading-snug">
                  {title()}
                </span>
              )}
            </Show>
            <Show when={str(slide.item.text)}>
              {(text) => (
                <span class="block text-sm leading-relaxed text-copy-soft mt-[0.15rem]">
                  {text()}
                </span>
              )}
            </Show>
          </figcaption>
        </Show>
      </figure>
    );
  };

  return (
    <div class="ms-block ms-carousel my-sxl">
      <div class="flex items-end justify-between gap-smd mb-smd">
        <Show when={str(data()?.label)} fallback={<span />}>
          {(label) => (
            <p class="text-sm font-semibold uppercase tracking-[0.12em] text-copy-soft">
              {label()}
            </p>
          )}
        </Show>
        <div ref={controls} hidden class="flex gap-ssm shrink-0">
          <For each={[-1, 1] as const}>
            {(direction) => (
              <button
                type="button"
                aria-label={direction < 0 ? "Zurück" : "Weiter"}
                onClick={() => page(direction)}
                class="w-[2.75rem] h-[2.75rem] rounded-full bg-button text-button-copy flex items-center justify-center transition-colors hover:bg-button-hover"
              >
                <Icon
                  name={direction < 0 ? "arrow-left" : "arrow-right"}
                  class="w-[1.2rem] h-[1.2rem]"
                />
              </button>
            )}
          </For>
        </div>
      </div>
      <div
        ref={track}
        class="ms-carousel-track flex gap-smd md:gap-slg overflow-x-auto snap-x snap-mandatory pb-smd"
      >
        <For each={items()}>
          {(item, index) => <Slide item={item} index={index()} />}
        </For>
      </div>
    </div>
  );
};

/**
 * ```yaml people
 * size: large               # optional: large (three per row, 3 or 6 fill it) or small (a dense wall of faces)
 * items:
 *   - src: thomas.webp      # square portrait, pnpm ms-image …
 *     alt: …                # required
 *     name: Thomas Vehrenkamp   # optional — only published names
 *     role: Geschäftsführer     # optional, one line
 *     roles: [Firmengründer, Maler- und Lackierermeister]   # optional extra lines
 * ```
 * Portraits of a team. `large` for the people a customer talks to (name and
 * roles under each photo), `small` for the whole crew as a wall of faces,
 * with or without names.
 */
const People: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const small = () => data()?.size === "small";
  const items = () => list(data()?.items).filter((item) => str(item.src));

  const Person: Component<{ item: Record<string, unknown> }> = (person) => {
    const src = usePageAsset(() => str(person.item.src));
    const thumb = usePageAsset(() => {
      const f = str(person.item.src);
      return f ? smallVariant(f) : undefined;
    });
    return (
      <figure class="flex flex-col gap-ssm min-w-0">
        <Show when={src()}>
          {(url) => (
            <img
              src={url()}
              srcset={thumb() ? `${thumb()} 800w, ${url()} 1600w` : undefined}
              sizes={
                small()
                  ? "(min-width: 64rem) 9rem, 30vw"
                  : "(min-width: 64rem) 16rem, 50vw"
              }
              alt={str(person.item.alt) ?? ""}
              loading="lazy"
              decoding="async"
              class={`w-full aspect-square object-cover bg-card ${small() ? "rounded-[calc(var(--ms-radius)*0.75)]" : "rounded-ms"}`}
            />
          )}
        </Show>
        <Show when={str(person.item.name) || str(person.item.role)}>
          <figcaption>
            <Show when={str(person.item.name)}>
              {(name) => (
                <span
                  class={`block font-ms-display text-copy-strong leading-tight ${small() ? "text-sm font-semibold" : "text-xl font-bold"}`}
                >
                  {name()}
                </span>
              )}
            </Show>
            <Show when={str(person.item.role)}>
              {(role) => (
                <span class="block text-sm font-semibold text-button mt-[0.2rem]">
                  {role()}
                </span>
              )}
            </Show>
            <For each={strings(person.item.roles)}>
              {(line) => (
                <span class="block text-sm text-copy-soft leading-snug">
                  {line}
                </span>
              )}
            </For>
          </figcaption>
        </Show>
      </figure>
    );
  };

  return (
    <div
      class={`ms-block my-sxl grid ${small() ? "grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-ssm md:gap-smd" : "grid-cols-2 md:grid-cols-3 gap-smd md:gap-slg"}`}
    >
      <For each={items()}>{(item) => <Person item={item} />}</For>
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
  carousel: Carousel,
  catalog: Catalog,
  cta: Cta,
  contact: Contact,
  doors: Doors,
  features: Features,
  rating: Rating,
  callout: Callout,
  index: IndexList,
  reveal: Reveal,
  stats: Stats,
  video: Video,
  palette: Palette,
  image: Image,
  gallery: Gallery,
  emblem: Emblem,
  logos: Logos,
  people: People,
};
