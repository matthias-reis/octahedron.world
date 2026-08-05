import { A } from "@solidjs/router";
import type { Component, JSX } from "solid-js";
import { Show } from "solid-js";
import { cx } from "./cx";

export type LinkBoxVariant = "row" | "tile" | "card";

export type LinkBoxProps = {
  href: string;
  title: string;
  description?: string;
  /** Fully resolved image URL. Omit for a text-only box. */
  image?: string;
  imageAlt?: string;
  variant?: LinkBoxVariant;
  external?: boolean;
  /** Rendered above the title — badges, dates, category labels. */
  meta?: JSX.Element;
  class?: string;
  imageClass?: string;
  titleClass?: string;
  descriptionClass?: string;
};

// Both sites already signalled hover the same way — a 2px outline drawn inside
// the box — so that interaction becomes the shared one.
const shell =
  "block outline-2 -outline-offset-2 outline-transparent hover:outline-col-hi-bg focus:outline-col-hi-bg transition-all duration-200";

const layouts: Record<
  LinkBoxVariant,
  { box: string; image: string; body: string; title: string }
> = {
  row: {
    box: "bg-col-surface flex flex-col sm:flex-row justify-stretch gap-ssm",
    image: "aspect-image object-cover",
    body: "m-ssm flex flex-col flex-1",
    title: "font-display font-bold text-3xl",
  },
  tile: {
    box: "bg-col-surface flex flex-col justify-stretch gap-ssm",
    image: "aspect-image object-cover w-full",
    body: "m-ssm flex flex-col flex-1",
    title: "font-display font-bold text-3xl",
  },
  card: {
    box: "bg-col-surface border border-col-border rounded-lg overflow-hidden flex flex-col h-full",
    image: "aspect-image object-cover w-full",
    body: "p-slg flex flex-col flex-1",
    title: "font-bold text-xl",
  },
};

export const LinkBox: Component<LinkBoxProps> = (props) => {
  const layout = () => layouts[props.variant ?? "row"];

  const body = (
    <>
      <Show when={props.image}>
        {(src) => (
          <img
            src={src()}
            alt={props.imageAlt ?? props.title}
            loading="lazy"
            class={cx(layout().image, props.imageClass)}
          />
        )}
      </Show>
      <span class={layout().body}>
        <Show when={props.meta}>
          <span class="mb-ssm flex items-center justify-between gap-ssm">
            {props.meta}
          </span>
        </Show>
        <span
          class={cx(layout().title, "text-col-fg mb-ssm", props.titleClass)}
        >
          {props.title}
        </span>
        <Show when={props.description}>
          <span class={cx("text-lg text-col-fg-muted", props.descriptionClass)}>
            {props.description}
          </span>
        </Show>
      </span>
    </>
  );

  const cls = () => cx(shell, layout().box, props.class);

  return (
    <Show
      when={props.external || !props.href.startsWith("/")}
      fallback={
        <A href={props.href} class={cls()}>
          {body}
        </A>
      }
    >
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        class={cls()}
      >
        {body}
      </a>
    </Show>
  );
};
