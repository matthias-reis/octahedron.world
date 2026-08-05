import { A } from "@solidjs/router";
import type { JSX, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";
import { cx } from "./cx";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex justify-center items-center gap-ssm px-slg py-ssm text-xl font-black font-display rounded-lg transition-all duration-100 outline-offset-2 outline-col-hi-bg hover:outline-2 focus:outline-2 cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-2 border-col-hi-bg bg-col-hi-bg text-col-hi-fg shadow-sm hover:shadow",
  secondary: "border-2 border-col-fg text-col-fg shadow-sm hover:shadow",
  ghost: "border-2 border-transparent text-col-fg hover:text-col-hi-bg",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  extra?: string,
) {
  return cx(base, variants[variant], extra);
}

export const Button: ParentComponent<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }
> = (props) => {
  const [local, rest] = splitProps(props, ["variant", "class", "children"]);
  return (
    <button
      type="button"
      {...rest}
      class={buttonClass(local.variant, local.class)}
    >
      {local.children}
    </button>
  );
};

/**
 * Link-shaped button. Internal targets go through the router `A` so client-side
 * navigation keeps working; everything else stays a plain anchor.
 */
export const ButtonLink: ParentComponent<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    variant?: ButtonVariant;
  }
> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "class",
    "children",
    "href",
  ]);
  const cls = () => buttonClass(local.variant, local.class);
  const isInternal = () =>
    local.href.startsWith("/") && !local.href.startsWith("//");

  return (
    <>
      {isInternal() ? (
        <A {...rest} href={local.href} class={cls()}>
          {local.children}
        </A>
      ) : (
        <a {...rest} href={local.href} class={cls()}>
          {local.children}
        </a>
      )}
    </>
  );
};

/** Row of buttons — stacks on small screens, lines up from md up. */
export const Buttons: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div {...rest} class={cx("flex flex-col md:flex-row gap-ssm", local.class)}>
      {local.children}
    </div>
  );
};
