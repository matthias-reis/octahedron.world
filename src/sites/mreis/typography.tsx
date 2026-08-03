import type { JSX, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";
import { cx } from "~/ui/cx";

type HeadingProps = JSX.HTMLAttributes<HTMLHeadingElement>;

export const H1: ParentComponent<HeadingProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <h1
      {...rest}
      class={cx(
        "text-5xl md:text-[5rem] font-black font-display mb-ssm leading-none",
        local.class,
      )}
    >
      {local.children}
    </h1>
  );
};

export const H2: ParentComponent<HeadingProps & { noMargin?: boolean }> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "children", "noMargin"]);
  return (
    <h2
      {...rest}
      class={cx(
        "text-4xl font-black tracking-tight",
        local.noMargin ? "m-0" : "mb-slg mt-s2xl",
        local.class,
      )}
    >
      {local.children}
    </h2>
  );
};

export const H3: ParentComponent<HeadingProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <h3
      {...rest}
      class={cx(
        "text-2xl mb-ssm mt-slg font-black tracking-tight",
        local.class,
      )}
    >
      {local.children}
    </h3>
  );
};
