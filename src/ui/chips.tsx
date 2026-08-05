import type { Component, ParentComponent } from "solid-js";
import { For, Show } from "solid-js";
import { cx } from "./cx";

export const Chip: ParentComponent<{ class?: string }> = (props) => (
  <span
    class={cx(
      "inline-block border border-col-border px-ssm py-sxs text-sm rounded",
      props.class,
    )}
  >
    {props.children}
  </span>
);

/** Dot-separated run of chips — a compact way to list skills, tags, topics. */
export const Chips: Component<{ items: string[]; class?: string }> = (
  props,
) => (
  <div class={cx("flex flex-wrap items-center gap-y-ssm", props.class)}>
    <For each={props.items}>
      {(item, i) => (
        <>
          <Chip>{item}</Chip>
          <Show when={i() < props.items.length - 1}>
            <span class="mx-ssm text-col-fg-muted font-bold">·</span>
          </Show>
        </>
      )}
    </For>
  </div>
);
