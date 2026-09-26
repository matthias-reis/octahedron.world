import { type Component, createSignal, For, onMount } from "solid-js";
import type { CustomBlockProps } from "solid-mds";
import { type PaletteName, paletteNames } from "./theme";
import { ButtonLink } from "./ui";

/**
 * Calibration tool for the color system in theme.css. Everything shown here
 * reads the real CSS variables and classes; the slider rewrites `--ms-hue`
 * on `.ms-root`, so the whole page re-colors with it.
 */

/** Hue offsets, for the row labels only — the colors come from CSS. */
const offsets: Record<PaletteName, number> = {
  main: 0,
  "adjacent-left": -42.5,
  "adjacent-right": 42.5,
  "accent-left": -137.5,
  "accent-right": 137.5,
  complementary: 180,
};

const shades = [
  { name: "b1", desaturated: true },
  { name: "b2", desaturated: true },
  { name: "b3" },
  { name: "m1" },
  { name: "m2" },
  { name: "m3", desaturated: true },
  { name: "d1", desaturated: true },
  { name: "d2", desaturated: true },
  { name: "d3" },
] as const;

const wrap = (h: number) => ((h % 360) + 360) % 360;
const fmt = (n: number) => Number(n.toFixed(1)).toString();

const Row: Component<{ palette: PaletteName; hue: number }> = (props) => (
  <>
    <div class="font-mono text-xs self-center whitespace-nowrap">
      {props.palette} {fmt(wrap(props.hue + offsets[props.palette]))}
    </div>
    <For each={shades}>
      {(shade) => (
        <div
          class="h-[2.75rem] rounded-[0.25rem] border border-line"
          style={{
            "background-color": `var(--ms-${props.palette}-${shade.name})`,
          }}
          title={`--ms-${props.palette}-${shade.name}`}
        />
      )}
    </For>
  </>
);

/** A copy/background group assignment for one half of a preview. */
type Scheme = { copy: PaletteName; highlight: PaletteName };

/** Ways to split copy/background vs. the highlighted section. */
const schemes: Scheme[] = [
  { copy: "accent-left", highlight: "main" },
  { copy: "main", highlight: "accent-right" },
  { copy: "main", highlight: "accent-left" },
  { copy: "accent-right", highlight: "adjacent-right" },
  { copy: "accent-left", highlight: "adjacent-left" },
  { copy: "accent-left", highlight: "complementary" },
  { copy: "complementary", highlight: "accent-left" },
];

const groupClasses = (palette: PaletteName) =>
  `ms-copy-${palette} ms-background-${palette}`;

/**
 * One preview, built from the real semantic classes: a normal section with
 * a card, and a highlighted (inverted) section. Buttons keep the page's
 * button group.
 */
const SchemePreview: Component<{ scheme: Scheme }> = (props) => (
  <div class="flex flex-col gap-ssm">
    <p class="font-mono text-xs">
      copy + background {props.scheme.copy} · highlight {props.scheme.highlight}{" "}
      · button from page
    </p>
    <div class="grid md:grid-cols-2 rounded-ms overflow-hidden border border-line">
      <div
        class={`ms-section ${groupClasses(props.scheme.copy)} p-slg flex flex-col gap-smd`}
      >
        <span class="font-ms-display text-2xl font-semibold leading-tight text-copy-strong">
          Frisches Brot ab 7 Uhr
        </span>
        <span class="text-sm leading-relaxed">
          Sauerteig, Gebäck und Kaffee aus Plagwitz.{" "}
          <a href="#palette" class="underline text-link">
            Zum Sortiment
          </a>
        </span>
        <div class="rounded-ms p-smd flex flex-col gap-sxs bg-card">
          <span class="font-ms-display text-lg font-semibold text-copy-strong">
            Backkurse
          </span>
          <span class="text-sm leading-relaxed">
            Samstags, sechs Leute.{" "}
            <a href="#palette" class="underline text-link">
              Termine
            </a>
          </span>
        </div>
        <div class="flex flex-wrap gap-sxs">
          <ButtonLink href="#palette">Bestellen</ButtonLink>
          <ButtonLink href="#palette" variant="secondary">
            Anrufen
          </ButtonLink>
        </div>
      </div>
      <div
        class={`ms-section ms-inverted ${groupClasses(props.scheme.highlight)} p-slg flex flex-col gap-smd`}
      >
        <span class="font-ms-display text-2xl font-semibold leading-tight text-copy-strong">
          Mehl, Wasser, Salz und Geduld
        </span>
        <span class="text-sm leading-relaxed">
          Seit 2014 mit einem Sauerteig, der älter ist als der Laden.{" "}
          <a href="#palette" class="underline text-link">
            Über uns
          </a>
        </span>
        <div class="flex flex-wrap gap-sxs">
          <ButtonLink href="#palette">Bestellen</ButtonLink>
          <ButtonLink href="#palette" variant="secondary">
            Anrufen
          </ButtonLink>
        </div>
      </div>
    </div>
  </div>
);

/**
 * ```yaml palette
 * ```
 * The slider starts at the page's `theme.hue`.
 */
export const Palette: Component<CustomBlockProps> = () => {
  let el: HTMLDivElement | undefined;
  const [hue, setHue] = createSignal(30);

  const root = () => el?.closest<HTMLElement>(".ms-root");

  onMount(() => {
    const current = root()?.style.getPropertyValue("--ms-hue");
    const n = Number.parseFloat(current ?? "");
    if (Number.isFinite(n)) setHue(n);
  });

  const onInput = (value: string) => {
    const n = Number.parseFloat(value);
    if (!Number.isFinite(n)) return;
    setHue(wrap(n));
    root()?.style.setProperty("--ms-hue", String(wrap(n)));
  };

  return (
    <div ref={el} class="my-sxl flex flex-col gap-sxl">
      <label class="flex flex-wrap items-center gap-smd font-mono text-sm">
        <span>base hue</span>
        <input
          type="range"
          min="0"
          max="359.5"
          step="0.5"
          value={hue()}
          onInput={(e) => onInput(e.currentTarget.value)}
          class="w-full max-w-md"
        />
        <input
          type="number"
          min="0"
          max="359.5"
          step="0.5"
          value={hue()}
          onInput={(e) => onInput(e.currentTarget.value)}
          class="w-[5.5rem] px-ssm py-sxs rounded-ms border border-line bg-card"
        />
      </label>

      <div class="overflow-x-auto">
        <div class="grid grid-cols-[auto_repeat(9,minmax(2rem,1fr))] gap-[0.25rem] min-w-[30rem]">
          <div />
          <For each={shades}>
            {(shade) => (
              <div class="font-mono text-[0.65rem] text-center text-copy-soft">
                {shade.name}
                {"desaturated" in shade ? "°" : ""}
              </div>
            )}
          </For>
          <For each={[...paletteNames]}>
            {(palette) => <Row palette={palette} hue={hue()} />}
          </For>
        </div>
        <p class="font-mono text-xs text-copy-soft mt-ssm">
          b = bright (backgrounds) · m = mid (accents) · d = dark (text,
          inverted) · ° = desaturated · hover a swatch for its variable
        </p>
      </div>

      <div class="flex flex-col gap-sxl">
        <For each={schemes}>
          {(scheme) => <SchemePreview scheme={scheme} />}
        </For>
      </div>
    </div>
  );
};
