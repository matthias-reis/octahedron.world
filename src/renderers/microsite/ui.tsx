import {
  AlarmSmoke,
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  Briefcase,
  Building,
  Cable,
  CakeSlice,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Coffee,
  Compass,
  Cpu,
  Croissant,
  Droplets,
  EvCharger,
  Flame,
  GraduationCap,
  Hammer,
  Heart,
  Heater,
  House,
  HouseWifi,
  Landmark,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Network,
  PaintRoller,
  Phone,
  Play,
  Printer,
  Route,
  SatelliteDish,
  Scissors,
  Shield,
  ShieldCheck,
  Siren,
  Sparkles,
  Star,
  Sun,
  ThermometerSun,
  Truck,
  Users,
  Wheat,
  Wind,
  Wrench,
  Zap,
} from "lucide-solid";
import {
  type Component,
  children,
  type JSX,
  type ParentComponent,
  Show,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { cx } from "~/ui/cx";

/**
 * Icons addressable by name from MDS. A curated set on purpose: importing
 * lucide by dynamic name would pull the whole library into the bundle.
 */
const icons = {
  "alarm-smoke": AlarmSmoke,
  "arrow-down-right": ArrowDownRight,
  "arrow-up-right": ArrowUpRight,
  "badge-check": BadgeCheck,
  "bell-ring": BellRing,
  briefcase: Briefcase,
  building: Building,
  cable: Cable,
  "cake-slice": CakeSlice,
  "calendar-check": CalendarCheck,
  "clipboard-check": ClipboardCheck,
  clock: Clock,
  coffee: Coffee,
  compass: Compass,
  cpu: Cpu,
  croissant: Croissant,
  droplets: Droplets,
  "ev-charger": EvCharger,
  flame: Flame,
  "graduation-cap": GraduationCap,
  hammer: Hammer,
  heart: Heart,
  heater: Heater,
  house: House,
  "house-wifi": HouseWifi,
  landmark: Landmark,
  leaf: Leaf,
  lightbulb: Lightbulb,
  mail: Mail,
  "map-pin": MapPin,
  network: Network,
  "paint-roller": PaintRoller,
  phone: Phone,
  play: Play,
  printer: Printer,
  route: Route,
  "satellite-dish": SatelliteDish,
  scissors: Scissors,
  shield: Shield,
  "shield-check": ShieldCheck,
  siren: Siren,
  sparkles: Sparkles,
  star: Star,
  sun: Sun,
  "thermometer-sun": ThermometerSun,
  truck: Truck,
  users: Users,
  wheat: Wheat,
  wind: Wind,
  wrench: Wrench,
  zap: Zap,
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
  icon?: IconName;
  class?: string;
}> = (props) => (
  <a
    href={props.href}
    class={cx(
      "inline-flex items-center justify-center gap-ssm px-slg py-ssm min-h-[2.75rem]",
      "rounded-ms font-semibold transition-colors",
      "outline-offset-2 focus-visible:outline-2 outline-button",
      props.variant === "secondary"
        ? "border-2 border-button text-copy-strong hover:bg-button hover:text-button-copy"
        : "bg-button text-button-copy hover:bg-button-hover",
      props.class,
    )}
  >
    <Show when={props.icon}>
      {(name) => <Icon name={name()} class="w-[1.2rem] h-[1.2rem]" />}
    </Show>
    {props.children}
  </a>
);

export const Card: ParentComponent<{ class?: string }> = (props) => (
  <div
    class={cx("rounded-ms bg-card p-slg flex flex-col gap-ssm", props.class)}
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

export type SectionVariant = "plain" | "surface" | "tint" | "inverted";

const variants: readonly SectionVariant[] = [
  "plain",
  "surface",
  "tint",
  "inverted",
];

export function toVariant(value: unknown): SectionVariant {
  return variants.includes(value as SectionVariant)
    ? (value as SectionVariant)
    : "plain";
}

export type Kicker = { text: string; icon?: IconName };

/**
 * The small label above a headline. With an icon it becomes a pill (hero),
 * without one it gets a square dot.
 */
export const KickerLabel: Component<{ kicker: Kicker }> = (props) => (
  <Show
    when={props.kicker.icon}
    fallback={
      <p class="ms-kicker flex items-center gap-ssm text-sm font-semibold tracking-wide text-button">
        <span
          aria-hidden="true"
          class="w-[0.5rem] h-[0.5rem] rounded-[3px] bg-button"
        />
        {props.kicker.text}
      </p>
    }
  >
    {(icon) => (
      <p class="ms-kicker inline-flex items-center gap-ssm self-start rounded-full bg-tint px-smd py-[0.375rem] text-sm font-semibold text-button">
        <Icon name={icon()} class="w-[1.1rem] h-[1.1rem]" />
        {props.kicker.text}
      </p>
    )}
  </Show>
);

/** `hero` · `split` · `side` · `band` (compact strip, e.g. a trust bar). */
export type SectionLayout = "default" | "hero" | "split" | "side" | "band";

const layouts: readonly SectionLayout[] = ["hero", "split", "side", "band"];

export function toLayout(value: unknown): SectionLayout {
  return layouts.includes(value as SectionLayout)
    ? (value as SectionLayout)
    : "default";
}

export const Section: ParentComponent<{
  id: string;
  variant: SectionVariant;
  layout: SectionLayout;
  label?: string;
  kicker?: Kicker;
  /** Right-hand column of a hero (see `HeroVisual`). */
  visual?: JSX.Element;
  /** Full-bleed background image (see `Backdrop`); copy goes on a panel. */
  backdrop?: JSX.Element;
  /** `.ms-<group>-<palette>` classes for a section-level override. */
  colors?: string[];
}> = (props) => {
  const kicker = () =>
    props.kicker ? <KickerLabel kicker={props.kicker} /> : null;
  // JSX props are getters: reading `props.visual` twice would build it twice.
  const visual = children(() => props.visual);
  const backdrop = children(() => props.backdrop);

  return (
    <section
      id={props.id}
      aria-label={props.label}
      class={cx(
        "ms-section",
        backdrop() && "relative isolate overflow-hidden",
        props.variant !== "plain" && `ms-${props.variant}`,
        props.colors,
        props.layout === "hero"
          ? "py-s2xl md:py-s3xl"
          : props.layout === "band"
            ? "py-slg md:py-sxl"
            : "py-s2xl md:py-[7rem]",
      )}
    >
      <Show
        when={backdrop()}
        fallback={
          <Show
            when={props.layout === "hero" && visual()}
            fallback={
              <Container
                class={cx(
                  props.layout === "hero" && "ms-hero",
                  props.layout === "split" && "ms-layout-split",
                  props.layout === "side" && "ms-layout-side",
                  "[&>.ms-kicker]:mb-smd",
                )}
              >
                {kicker()}
                {props.children}
              </Container>
            }
          >
            <Container class="grid lg:grid-cols-[1.05fr_1fr] gap-sxl lg:gap-[4rem] items-center">
              <div class="ms-hero flex flex-col [&>.ms-kicker]:mb-slg">
                {kicker()}
                {props.children}
              </div>
              {visual()}
            </Container>
          </Show>
        }
      >
        {backdrop()}
        <Container
          class={cx(
            "flex items-center",
            props.layout === "hero" && "min-h-[min(86vh,50rem)]",
          )}
        >
          <div
            class={cx(
              "flex flex-col max-w-[38rem] rounded-[calc(var(--ms-radius)*3)] border border-line/40 bg-page/55 p-slg md:p-sxl shadow-2xl backdrop-blur-xl [&>.ms-kicker]:mb-slg",
              props.layout === "hero" && "ms-hero",
            )}
          >
            {kicker()}
            {props.children}
          </div>
        </Container>
      </Show>
    </section>
  );
};
