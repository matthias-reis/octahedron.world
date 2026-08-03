import { LoaderCircle } from "lucide-solid";
import type { Component } from "solid-js";
import { cx } from "./cx";

export const Loading: Component<{ class?: string; size?: number }> = (
  props,
) => (
  <div class={cx("flex items-center justify-center", props.class)}>
    <LoaderCircle
      class="text-col-fg-muted animate-spin"
      size={props.size ?? 36}
    />
  </div>
);
