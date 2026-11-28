import { useSearchParams } from "@solidjs/router";
import { createMemo, createSignal, For, Show } from "solid-js";
import {
  CHROMA,
  CHROMA_LEVELS,
  type ChromaLevel,
  colorSpaceStyle,
  GOLDEN_ANGLE,
  HUE_SLOTS,
  type HueSlot,
  hexToOklch,
  hueString,
  LIGHTNESS,
  PRESETS,
  type PresetName,
  palette,
  parseColorSpace,
  STEPS,
  type Swatch,
  type Token,
  wrapHue,
} from "~/color/palette";

/**
 * The colour lab: pick a hue (or a preset), see the page theme it produces
 * and every palette token with its hex value. Uses the same palette function
 * as the renderers, so the hex values are exactly what pages render.
 * `?hue=170+` (or a preset name) preselects a colour space.
 */

const LEVEL_LABEL: Record<ChromaLevel, string> = {
  s: "saturated",
  d: "desaturated",
  n: "neutral",
};
const SLOT_LABEL: Record<HueSlot, string> = { a: "main", b: "counter" };

/** The hue string a preset is closest to: main hue, nearer golden side. */
function nearestHueString(name: PresetName): string {
  const [a, b] = PRESETS[name];
  const dist = (x: number) => Math.abs(((x - b + 540) % 360) - 180);
  return dist(a + GOLDEN_ANGLE) <= dist(a - GOLDEN_ANGLE)
    ? hueString(a, "+")
    : hueString(a, "-");
}

function hsb([r, g, b]: [number, number, number]): string {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const d = max - Math.min(R, G, B);
  let h = 0;
  if (d) {
    if (max === R) h = ((G - B) / d) % 6;
    else if (max === G) h = (B - R) / d + 2;
    else h = (R - G) / d + 4;
  }
  return `${Math.round(wrapHue(h * 60))}° ${Math.round(max ? (d / max) * 100 : 0)}% ${Math.round(max * 100)}%`;
}

const Example = () => (
  <div class="overflow-hidden rounded-lg bg-linear-to-b from-cbn9 to-cbs9">
    <div class="px-6 pt-8 pb-6 bg-cbn9">
      <div class="font-sans text-sm uppercase text-cbs4">Super title</div>
      <h1 class="font-octa text-5xl font-bold text-cad2 mt-1">
        A Page in this Colour Space
      </h1>
    </div>
    <div class="px-6 pb-8 font-serif text-lg">
      <p class="my-3 leading-relaxed text-can1">
        Body copy sits on the counter hue's dimmed background. It reads in the
        main hue's neutral bright, with{" "}
        <strong class="font-bold text-cw">strong words</strong> and a{" "}
        <a href="#example" class="text-cas4 underline hover:text-cas3">
          link in the saturated main hue
        </a>
        .
      </p>
      <h2 class="font-octa text-3xl font-bold text-cad2 mt-5 mb-3">
        A second-level heading
      </h2>
      <blockquote class="my-4 border-l-4 border-cas5 pl-4 italic text-cad3">
        A quote, set off by the main hue.
      </blockquote>
      <hr class="my-6 border-cad5" />
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-md bg-can8 border border-can7 p-4 font-sans text-base text-can2">
          A card on the main hue's neutral dark.
        </div>
        <div class="rounded-md bg-cad8 border border-cad7 p-4 font-sans text-base text-cad2">
          A card on the main hue's desaturated dark.
        </div>
      </div>
      <a href="#example" class="cta mt-6">
        Call to action
      </a>
    </div>
  </div>
);

const SwatchCell = (props: {
  token: Token;
  swatch: Swatch;
  requested: number;
  showRaw: boolean;
}) => {
  const fitted = () => props.swatch.c < props.requested - 1e-4;
  const ink = () => (props.swatch.l > 0.65 ? "#000000cc" : "#ffffffdd");
  return (
    <div class="min-w-0 font-mono text-[0.6rem] leading-tight">
      <div
        class="h-14 rounded-t-sm p-1 flex flex-col justify-between"
        style={{ "background-color": props.swatch.hex, color: ink() }}
      >
        <span>{props.token}</span>
        <Show when={fitted()}>
          <span title="chroma lowered to stay inside sRGB">
            C {props.swatch.c.toFixed(3)}
          </span>
        </Show>
      </div>
      <Show when={props.showRaw}>
        <div
          class="h-3"
          title="unfitted oklch() as the browser clips it"
          style={{
            "background-color": `oklch(${props.swatch.l} ${props.requested} ${props.swatch.h})`,
          }}
        />
      </Show>
      <div class="bg-cw text-cb rounded-b-sm px-1 py-0.5 select-all">
        {props.swatch.hex}
      </div>
      <div class="text-can4 px-1 pt-0.5 truncate" title="RGB">
        {props.swatch.rgb.join(" ")}
      </div>
      <div class="text-can5 px-1 truncate" title="HSB">
        {hsb(props.swatch.rgb)}
      </div>
    </div>
  );
};

export default function ColorLab() {
  const [params, setParams] = useSearchParams();
  // An unencoded `?hue=170+` arrives as "170 ": the `+` became a space.
  const initial =
    typeof params.hue === "string" ? params.hue.replace(/ $/, "+") : "170+";
  const [value, setValue] = createSignal(initial);
  const [showRaw, setShowRaw] = createSignal(false);
  const [hexInput, setHexInput] = createSignal("");

  const pair = createMemo(() => parseColorSpace(value()));
  const swatches = createMemo(() => palette(pair()));
  const direction = createMemo<"+" | "-">(() =>
    value().trim().endsWith("-") ? "-" : "+",
  );

  const choose = (next: string) => {
    setValue(next);
    setParams({ hue: next }, { replace: true });
  };
  const setHue = (hue: number) => choose(hueString(hue, direction()));

  const hexHue = createMemo(() => hexToOklch(hexInput()));

  return (
    <div class="bg-cb min-h-screen text-can2" style={colorSpaceStyle(value())}>
      <div class="max-w-6xl mx-auto px-4 py-8 font-sans">
        <h1 class="font-octa text-4xl font-bold text-cad2">Colour lab</h1>
        <p class="text-can4 mt-1 text-sm">
          Main hue + counter hue at ±{GOLDEN_ANGLE}°. Colours outside sRGB lose
          chroma, never hue. Hex values are what pages render.
        </p>

        <div class="mt-6 grid gap-4 md:grid-cols-[1fr_auto] items-end">
          <label class="block">
            <span class="text-sm text-can4">
              Main hue {Math.round(pair().a * 10) / 10}° · counter{" "}
              {Math.round(pair().b * 10) / 10}°
            </span>
            <input
              type="range"
              min="0"
              max="359.5"
              step="0.5"
              value={pair().a}
              onInput={(e) => setHue(Number(e.currentTarget.value))}
              class="w-full mt-2"
              style={{
                "accent-color": swatches().cas5.hex,
              }}
            />
          </label>
          <div class="flex gap-1">
            <For each={["+", "-"] as const}>
              {(dir) => (
                <button
                  type="button"
                  class="px-4 py-2 rounded-md font-bold"
                  classList={{
                    "bg-cas5 text-cb": !pair().preset && direction() === dir,
                    "bg-can8 text-can3": !!pair().preset || direction() !== dir,
                  }}
                  onClick={() => choose(hueString(pair().a, dir))}
                >
                  {dir}
                  {GOLDEN_ANGLE}°
                </button>
              )}
            </For>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <code class="rounded-md bg-can8 px-3 py-2 text-cas3 select-all">
            colorSpace: {pair().preset ?? value().trim()}
          </code>
          <label class="flex items-center gap-2 text-sm text-can4">
            From hex
            <input
              type="text"
              placeholder="#3a7bd5"
              value={hexInput()}
              onInput={(e) => setHexInput(e.currentTarget.value)}
              class="w-28 rounded-md bg-can8 px-2 py-1 font-mono text-can2"
            />
          </label>
          <Show when={hexHue()}>
            {(o) => (
              <button
                type="button"
                class="rounded-md bg-can8 px-3 py-1 text-sm text-can2 hover:bg-can7"
                onClick={() => setHue(Math.round(o().h * 2) / 2)}
              >
                use hue {Math.round(o().h * 10) / 10}°
              </button>
            )}
          </Show>
          <label class="flex items-center gap-2 text-sm text-can4 ml-auto">
            <input
              type="checkbox"
              checked={showRaw()}
              onChange={(e) => setShowRaw(e.currentTarget.checked)}
            />
            compare with browser clipping
          </label>
        </div>

        <div class="mt-4 flex flex-wrap gap-2 text-sm">
          <For each={Object.keys(PRESETS) as PresetName[]}>
            {(name) => (
              <button
                type="button"
                class="rounded-md px-3 py-1"
                classList={{
                  "bg-cas5 text-cb": pair().preset === name && value() === name,
                  "bg-can8 text-can3 hover:bg-can7": !(
                    pair().preset === name && value() === name
                  ),
                }}
                title={`${PRESETS[name][0]}° / ${PRESETS[name][1]}° — nearest hue string ${nearestHueString(name)}`}
                onClick={() => choose(name)}
              >
                {name}{" "}
                <span class="opacity-60">≈ {nearestHueString(name)}</span>
              </button>
            )}
          </For>
        </div>

        <div id="example" class="mt-8">
          <Example />
        </div>

        <div class="mt-10 space-y-6">
          <For each={HUE_SLOTS}>
            {(slot) => (
              <For each={CHROMA_LEVELS}>
                {(level) => (
                  <section>
                    <h2 class="text-sm text-can4 mb-2">
                      c{slot}
                      {level} · {SLOT_LABEL[slot]}{" "}
                      {Math.round(pair()[slot] * 10) / 10}°,{" "}
                      {LEVEL_LABEL[level]} (C {CHROMA[level]})
                    </h2>
                    <div class="grid grid-cols-3 sm:grid-cols-9 gap-2">
                      <For each={STEPS}>
                        {(step) => {
                          const token = `c${slot}${level}${step}` as Token;
                          return (
                            <SwatchCell
                              token={token}
                              swatch={swatches()[token]}
                              requested={CHROMA[level]}
                              showRaw={showRaw()}
                            />
                          );
                        }}
                      </For>
                    </div>
                  </section>
                )}
              </For>
            )}
          </For>
          <p class="text-xs text-can5">
            Lightness per step: {LIGHTNESS.join(" · ")}. HSB is for tools only;
            octahedron's hue is the OKLCH hue, which differs from HSB's.
          </p>
        </div>
      </div>
    </div>
  );
}
