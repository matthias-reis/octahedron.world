import {
  Clock,
  Coffee,
  Compass,
  Hammer,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Scissors,
  Shield,
  Sparkles,
  Star,
  Sun,
  Truck,
  Users,
} from "lucide-solid";
import type { Component, ParentComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cx } from "~/ui/cx";

/**
 * Icons addressable by name from MDS. A curated set on purpose: importing
 * lucide by dynamic name would pull the whole library into the bundle.
 */
const icons = {
  clock: Clock,
  coffee: Coffee,
  compass: Compass,
  hammer: Hammer,
  heart: Heart,
  leaf: Leaf,
  mail: Mail,
  "map-pin": MapPin,
  phone: Phone,
  scissors: Scissors,
  shield: Shield,
  sparkles: Sparkles,
  star: Star,
  sun: Sun,
  truck: Truck,
  users: Users,
} as const;

export type IconName = keyof typeof icons;

export function isIconName(name: unknown): name is IconName {
  return typeof name === "string" && name in icons;
}

export const Icon: Component<{ name: IconName; class?: string }> = (props) => (
  <Dynamic component={icons[props.name]} class={props.class} />
);

export type ButtonVariant = "primary" | "secondary";

export const ButtonLink: ParentComponent<{
  href: string;
  variant?: ButtonVariant;
  class?: string;
}> = (props) => (
  <a
    href={props.href}
    class={cx(
      "inline-flex items-center justify-center gap-ssm px-slg py-ssm min-h-[2.75rem]",
      "rounded-ms font-semibold transition-colors",
      "outline-offset-2 focus-visible:outline-2 outline-ms-primary",
      props.variant === "secondary"
        ? "border border-ms-border text-ms-fg hover:bg-ms-soft"
        : "bg-ms-primary text-ms-primary-fg hover:bg-ms-primary-hover",
      props.class,
    )}
  >
    {props.children}
  </a>
);

export const Card: ParentComponent<{ class?: string }> = (props) => (
  <div
    class={cx(
      "rounded-ms bg-ms-surface border border-ms-border p-slg flex flex-col gap-ssm",
      props.class,
    )}
  >
    {props.children}
  </div>
);

/** Horizontal page column shared by header, sections and footer. */
export const Container: ParentComponent<{ class?: string }> = (props) => (
  <div class={cx("w-full max-w-6xl mx-auto px-slg", props.class)}>
    {props.children}
  </div>
);

export type SectionVariant =
  | "plain"
  | "surface"
  | "tint"
  | "inverted"
  | "accent";

const variants: readonly SectionVariant[] = [
  "plain",
  "surface",
  "tint",
  "inverted",
  "accent",
];

export function toVariant(value: unknown): SectionVariant {
  return variants.includes(value as SectionVariant)
    ? (value as SectionVariant)
    : "plain";
}

export const Section: ParentComponent<{
  id: string;
  variant: SectionVariant;
  hero?: boolean;
  label?: string;
}> = (props) => (
  <section
    id={props.id}
    aria-label={props.label}
    class={cx(
      `ms-variant-${props.variant}`,
      props.hero ? "py-s3xl md:py-[8rem]" : "py-s2xl md:py-s3xl",
    )}
  >
    <Container class={props.hero ? "ms-hero" : undefined}>
      {props.children}
    </Container>
  </section>
);

export type SwatchProps = { color: string; label: string; dark?: boolean };

export const Swatch: Component<SwatchProps> = (props) => (
  <div
    class="h-[4.5rem] rounded-ms flex items-end p-ssm text-xs font-mono"
    style={{
      "background-color": props.color,
      color: props.dark ? "var(--ms-n1)" : "var(--ms-n9)",
    }}
  >
    {props.label}
  </div>
);
