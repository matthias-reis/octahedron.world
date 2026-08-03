import { A } from "@solidjs/router";
import type { JSX, ParentComponent } from "solid-js";
import { For, Show } from "solid-js";
import { cx } from "./cx";

export type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type FooterLayout = "stacked" | "split";

export type FooterProps = {
  links: FooterLink[];
  copyright: JSX.Element;
  /**
   * `stacked` centres the copyright over the links, `split` puts them on
   * opposite ends of one row from md up.
   */
  layout?: FooterLayout;
  class?: string;
  linkClass?: string;
};

const layouts: Record<FooterLayout, { wrapper: string; list: string }> = {
  stacked: {
    wrapper: "flex flex-col items-center gap-sxs",
    list: "flex flex-wrap justify-center gap-smd",
  },
  split: {
    wrapper: "flex flex-col md:flex-row justify-between items-center gap-smd",
    list: "flex flex-wrap justify-center gap-slg",
  },
};

const FooterLinkItem: ParentComponent<{ link: FooterLink; class?: string }> = (
  props,
) => (
  <li>
    <Show
      when={props.link.external}
      fallback={
        <A href={props.link.href} class={props.class}>
          {props.link.label}
        </A>
      }
    >
      <a
        href={props.link.href}
        target="_blank"
        rel="noopener noreferrer"
        class={props.class}
      >
        {props.link.label}
      </a>
    </Show>
  </li>
);

/** Shared site footer. The `children` slot takes site-specific extras. */
export const Footer: ParentComponent<FooterProps> = (props) => {
  const layout = () => layouts[props.layout ?? "stacked"];

  return (
    <footer class={cx("w-full text-sm", props.class)}>
      <div class={layout().wrapper}>
        <p>{props.copyright}</p>
        <ul class={layout().list}>
          <For each={props.links}>
            {(link) => <FooterLinkItem link={link} class={props.linkClass} />}
          </For>
        </ul>
      </div>
      <Show when={props.children}>
        <div class="mt-smd flex justify-center">{props.children}</div>
      </Show>
    </footer>
  );
};
