import type { JSX, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";
import { cx } from "./cx";

/** Titled, bordered block — a labelled container for a small list or blurb. */
export const Box: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & { title: string }
> = (props) => {
  const [local, rest] = splitProps(props, ["title", "class", "children"]);
  return (
    <div
      {...rest}
      class={cx("border border-col-border rounded-lg p-slg", local.class)}
    >
      <strong class="block text-lg font-bold mb-slg border-b-2 border-col-fg pb-sxs">
        {local.title}
      </strong>
      <div>{local.children}</div>
    </div>
  );
};
