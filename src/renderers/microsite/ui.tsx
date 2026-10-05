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
        ? // Half-opaque fill: stays readable on photos and tinted backdrops.
          "border-2 border-button bg-page/75 backdrop-blur-sm text-copy-strong hover:bg-button hover:text-button-copy"
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

/** `tone: copy` sets the kicker in the text color instead of the button's. */
export type Kicker = { text: string; icon?: IconName; tone?: "copy" };

/**
 * The small label above a headline. With an icon it becomes a pill (hero),
 * without one it gets a square dot.
 */
export const KickerLabel: Component<{ kicker: Kicker }> = (props) => (
  <Show
    when={props.kicker.icon}
    fallback={
      <p
        class={`ms-kicker flex items-center gap-ssm text-sm font-semibold tracking-wide ${props.kicker.tone === "copy" ? "text-copy-strong" : "text-button"}`}
      >
        <span
          aria-hidden="true"
          class={`w-[0.5rem] h-[0.5rem] rounded-[3px] ${props.kicker.tone === "copy" ? "bg-copy-soft" : "bg-button"}`}
        />
        {props.kicker.text}
      </p>
    }
  >
    {(icon) => (
      <p
        class={`ms-kicker inline-flex items-center gap-ssm self-start rounded-full bg-tint px-smd py-[0.375rem] text-sm font-semibold ${props.kicker.tone === "copy" ? "text-copy-strong" : "text-button"}`}
      >
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
  /** `cover`: copy sits on the backdrop photo itself, no panel. */
  backdropStyle?: "panel" | "cover";
  /** Where the copy sits on the backdrop (see `BackdropData`). */
  backdropAlign?: "left" | "right";
  backdropValign?: "top" | "bottom";
  /** `bleed`: the hero visual fills the right half, edge to edge. */
  visualStyle?: "card" | "bleed";
  /** CSS mask for a repeating motif, drawn in the section's text color. */
  pattern?: JSX.CSSProperties;
  /** `center`: everything on the vertical axis (no visual, no backdrop). */
  align?: "center";
}> = (props) => {
  const kicker = () =>
    props.kicker ? <KickerLabel kicker={props.kicker} /> : null;
  // JSX props are getters: reading `props.visual` twice would build it twice.
  const visual = children(() => props.visual);
  const backdrop = children(() => props.backdrop);
  const bleed = () =>
    props.layout === "hero" && props.visualStyle === "bleed" && !!visual();
  const cover = () => props.backdropStyle === "cover";
  const top = () => cover() && props.backdropValign === "top";

  return (
    <section
      id={props.id}
      aria-label={props.label}
      class={cx(
        "ms-section",
        (backdrop() || props.pattern) && "relative isolate overflow-hidden",
        bleed() &&
          "relative lg:min-h-[min(88vh,50rem)] lg:flex lg:items-center pb-0 lg:pb-s3xl",
        props.variant !== "plain" && `ms-${props.variant}`,
        props.colors,
        props.layout === "hero"
          ? "py-s2xl md:py-s3xl"
          : props.layout === "band"
            ? "py-slg md:py-sxl"
            : "py-s2xl md:py-[7rem]",
      )}
    >
      <Show when={props.pattern}>
        {(mask) => (
          <div
            aria-hidden="true"
            class="absolute inset-0 -z-10 bg-copy-strong opacity-[0.06] pointer-events-none"
            style={mask()}
          />
        )}
      </Show>
      <Show
        when={backdrop()}
        fallback={
          <Show
            when={!bleed()}
            fallback={
              <>
                <Container class="lg:grid lg:grid-cols-2">
                  <div class="ms-hero flex flex-col lg:pr-[4rem] [&>.ms-kicker]:mb-slg">
                    {kicker()}
                    {props.children}
                  </div>
                </Container>
                {visual()}
              </>
            }
          >
            <Show
              when={props.layout === "hero" && visual()}
              fallback={
                <Container
                  class={cx(
                    props.layout === "hero" && "ms-hero",
                    props.layout === "split" && "ms-layout-split",
                    props.layout === "side" && "ms-layout-side",
                    props.align === "center" && "ms-center",
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
          </Show>
        }
      >
        {backdrop()}
        <Container
          class={cx(
            "flex",
            top() ? "items-start" : cover() ? "items-end" : "items-center",
            props.backdropAlign === "right" && "justify-end",
            props.layout === "hero" &&
              (top()
                ? "min-h-[min(92vh,54rem)] pb-[16rem]"
                : cover()
                  ? "min-h-[min(92vh,54rem)] pt-[14rem]"
                  : "min-h-[min(86vh,50rem)]"),
          )}
        >
          <div
            class={cx(
              "flex flex-col [&>.ms-kicker]:mb-slg",
              top()
                ? "max-w-[60rem]"
                : cover()
                  ? "max-w-[50rem]"
                  : "ms-panel max-w-[38rem] min-w-0 rounded-[calc(var(--ms-radius)*3)] border border-line/40 bg-page/40 p-slg md:p-sxl shadow-2xl backdrop-blur-2xl backdrop-saturate-150",
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
