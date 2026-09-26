/** biome-ignore-all lint/suspicious/noExplicitAny: HAST passes untyped props */

import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import type { ComponentMap, CustomBlockProps } from "solid-mds";
import { ButtonLink, Card, Icon, isIconName, Swatch } from "./ui";

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

type Link = { text: string; url: string };

function link(value: unknown): Link | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const v = value as Record<string, unknown>;
  const text = str(v.text);
  const url = str(v.url);
  return text && url ? { text, url } : undefined;
}

/**
 * ```yaml cards
 * columns: 3            # optional, 2 or 3
 * items:
 *   - icon: leaf        # optional, see `icons` in ui.tsx
 *     title: …
 *     text: …
 * ```
 */
const Cards: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const items = () => list(data()?.items);
  const twoColumns = () => data()?.columns === 2;

  return (
    <div
      class={`grid gap-smd my-sxl sm:grid-cols-2 ${twoColumns() ? "" : "lg:grid-cols-3"}`}
    >
      <For each={items()}>
        {(item) => (
          <Card>
            <Show when={isIconName(item.icon) && item.icon}>
              {(name) => (
                <div class="w-[2.75rem] h-[2.75rem] rounded-ms bg-ms-soft text-ms-primary flex items-center justify-center mb-sxs">
                  <Icon name={name()} class="w-[1.4rem] h-[1.4rem]" />
                </div>
              )}
            </Show>
            <h3 class="font-ms-display text-xl font-semibold">
              {str(item.title)}
            </h3>
            <Show when={str(item.text)}>
              {(text) => <p class="text-ms-muted leading-relaxed">{text()}</p>}
            </Show>
          </Card>
        )}
      </For>
    </div>
  );
};

/**
 * ```yaml cta
 * primary: { text: …, url: … }
 * secondary: { text: …, url: … }   # optional
 * ```
 */
const Cta: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const primary = () => link(data()?.primary);
  const secondary = () => link(data()?.secondary);

  return (
    <div class="flex flex-wrap gap-ssm mt-slg">
      <Show when={primary()}>
        {(l) => <ButtonLink href={l().url}>{l().text}</ButtonLink>}
      </Show>
      <Show when={secondary()}>
        {(l) => (
          <ButtonLink href={l().url} variant="secondary">
            {l().text}
          </ButtonLink>
        )}
      </Show>
    </div>
  );
};

/**
 * ```yaml contact
 * name: …
 * address: [Street 1, 12345 City]
 * phone: +49 …
 * email: …
 * hours: [Mo–Fr 9–18, Sa 10–14]
 * ```
 */
const Contact: Component<CustomBlockProps> = (props) => {
  const data = () => props.data as Data;
  const phone = () => str(data()?.phone);
  const email = () => str(data()?.email);

  const Row: Component<{
    icon: "map-pin" | "phone" | "mail" | "clock";
    children: any;
  }> = (row) => (
    <div class="flex gap-smd items-start">
      <div class="w-[2.5rem] h-[2.5rem] shrink-0 rounded-ms bg-ms-soft text-ms-primary flex items-center justify-center">
        <Icon name={row.icon} class="w-[1.2rem] h-[1.2rem]" />
      </div>
      <div class="pt-sxs leading-relaxed">{row.children}</div>
    </div>
  );

  return (
    <Card class="my-sxl gap-slg max-w-xl">
      <Show when={str(data()?.name)}>
        {(name) => (
          <h3 class="font-ms-display text-2xl font-semibold">{name()}</h3>
        )}
      </Show>
      <Show when={strings(data()?.address).length > 0}>
        <Row icon="map-pin">
          <For each={strings(data()?.address)}>
            {(line) => <div>{line}</div>}
          </For>
        </Row>
      </Show>
      <Show when={phone()}>
        {(p) => (
          <Row icon="phone">
            <a
              class="underline underline-offset-4"
              href={`tel:${p().replace(/[^+\d]/g, "")}`}
            >
              {p()}
            </a>
          </Row>
        )}
      </Show>
      <Show when={email()}>
        {(e) => (
          <Row icon="mail">
            <a class="underline underline-offset-4" href={`mailto:${e()}`}>
              {e()}
            </a>
          </Row>
        )}
      </Show>
      <Show when={strings(data()?.hours).length > 0}>
        <Row icon="clock">
          <For each={strings(data()?.hours)}>{(line) => <div>{line}</div>}</For>
        </Row>
      </Show>
    </Card>
  );
};

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const ramps = [
  { key: "p", label: "primary" },
  { key: "a", label: "accent" },
  { key: "n", label: "neutral" },
] as const;
const roles = [
  "bg",
  "surface",
  "soft",
  "fg",
  "muted",
  "border",
  "primary",
  "primary-fg",
  "accent",
  "accent-fg",
] as const;

/**
 * ```yaml palette
 * ```
 * Calibration view: the three ramps plus the role tokens as resolved in the
 * surrounding section.
 */
const Palette: Component<CustomBlockProps> = () => (
  <div class="my-sxl flex flex-col gap-slg">
    <For each={ramps}>
      {(ramp) => (
        <div>
          <p class="text-sm font-semibold uppercase tracking-wider text-ms-muted mb-ssm">
            {ramp.label}
          </p>
          <div class="grid grid-cols-3 sm:grid-cols-9 gap-sxs">
            <For each={steps}>
              {(step) => (
                <Swatch
                  color={`var(--ms-${ramp.key}${step})`}
                  label={`${ramp.key}${step}`}
                  dark={step >= 6}
                />
              )}
            </For>
          </div>
        </div>
      )}
    </For>
    <div>
      <p class="text-sm font-semibold uppercase tracking-wider text-ms-muted mb-ssm">
        roles
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-sxs">
        <For each={roles}>
          {(role) => (
            <div class="rounded-ms border border-ms-border overflow-hidden text-xs font-mono">
              <div
                class="h-[3rem]"
                style={{ "background-color": `var(--ms-${role})` }}
              />
              <div class="p-sxs">{role}</div>
            </div>
          )}
        </For>
      </div>
    </div>
  </div>
);

/** Prose + blocks for a microsite section body. */
export const micrositeComponents: ComponentMap = {
  h1: (props: any) => (
    <h1
      class="font-ms-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight max-w-4xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      class="font-ms-display text-3xl md:text-5xl font-semibold leading-tight tracking-tight max-w-3xl mb-smd"
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
    <p
      class="text-lg leading-relaxed text-ms-muted max-w-2xl my-ssm"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul class="list-disc ml-slg text-lg text-ms-muted max-w-2xl" {...props} />
  ),
  li: (props: any) => <li class="my-sxs leading-relaxed" {...props} />,
  strong: (props: any) => (
    <strong class="font-semibold text-ms-fg" {...props} />
  ),
  a: (props: any) => (
    <a class="text-ms-primary underline underline-offset-4" {...props} />
  ),
  cards: Cards,
  cta: Cta,
  contact: Contact,
  palette: Palette,
};
