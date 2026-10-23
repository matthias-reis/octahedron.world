import { type Component, createUniqueId, For, Show } from "solid-js";
import { usePageAsset } from "./assets";

/**
 * Photos set into a half-timbered wall, like the infill of the frame — for a
 * carpenter whose own photos are small (old websites, 019-herbst). One SVG,
 * so beams and photos stay aligned at every width:
 *
 * ```yaml gefach
 * columns: 2                 # photo columns, 2 or 3 (default 2)
 * gable: true                # optional: a gable roof on top, like a house
 * label: Seit 1960           # optional: a line in the gable field
 * items:
 *   - { src: fachwerk.webp, alt: Saniertes Fachwerkhaus }
 * caption: Fotos: Holzbau Herbst   # optional line under the wall
 * ```
 *
 * The photos fill the fields in rows (4:3, cropped to the middle); a narrow
 * field with braces runs down both sides, the braces of two rows meeting
 * like the logo's frame. The beams take the page's headline ornament color
 * (`theme.ornament.color`, e.g. `adjacent-left-d3`), else the strong copy
 * color; empty fields the card color. The hero uses it as
 * `visual: { house: [...] }` (hero-visual.tsx).
 */
export type GefachData = {
  items: { src?: string; alt?: string }[];
  columns?: number;
  gable?: boolean;
  label?: string;
  caption?: string;
};

/** One beam thickness, the narrow brace field and the wall inset, in SVG units. */
const W = 600;
const T = 10;
const INSET = 34;
const BRACE = 0.38;

/** One photo, cropped into its field. */
const Photo: Component<{
  src?: string;
  clip: string;
  x: number;
  y: number;
  width: number;
  height: number;
}> = (props) => {
  const src = usePageAsset(() => props.src);
  return (
    <Show when={src()}>
      {(url) => (
        <>
          <clipPath id={props.clip}>
            <rect
              x={props.x}
              y={props.y}
              width={props.width}
              height={props.height}
            />
          </clipPath>
          <image
            href={url()}
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            preserveAspectRatio="xMidYMid slice"
            clip-path={`url(#${props.clip})`}
          />
        </>
      )}
    </Show>
  );
};

export const Gefach: Component<{ data: GefachData; class?: string }> = (
  props,
) => {
  const columns = () => (props.data.columns === 3 ? 3 : 2);
  const items = () => props.data.items.filter((item) => item.src);
  const rows = () => Math.max(1, Math.ceil(items().length / columns()));
  const gable = () => props.data.gable === true;

  // Wall geometry: n photo columns between two narrow brace columns.
  const wall = W - 2 * INSET;
  const unit = () => (wall - (columns() + 3) * T) / (columns() + 2 * BRACE);
  const cellH = () => unit() * 0.75;
  const roofH = () => (gable() ? wall * 0.46 : 0);
  const top = () => roofH() + (gable() ? 0 : T / 2);
  const wallH = () => rows() * cellH() + (rows() + 1) * T;
  const height = () => top() + wallH() + T / 2;
  /** Left edge of column i (0 = left brace field, columns()+1 = right). */
  const colX = (i: number) => {
    const brace = unit() * BRACE;
    if (i === 0) return INSET + T;
    return INSET + T + brace + T + (i - 1) * (unit() + T);
  };
  const rowY = (r: number) => top() + T + r * (cellH() + T);

  /** The roof line's height at x (apex in the middle, eaves past the wall). */
  const apex = 8;
  const roofY = (x: number) =>
    apex + (roofH() - apex + 12) * (Math.abs(x - W / 2) / (W / 2 - 4));
  const collarY = () => apex + (roofH() - apex) * 0.42;
  const collarX = () =>
    W / 2 - (W / 2 - 4) * ((collarY() - apex) / (roofH() - apex + 12));
  // Posts between the brace fields and the photos run up into the gable.
  const postXs = () => [colX(1) - T / 2, colX(columns() + 1) - T / 2];

  const label = () =>
    props.data.items
      .map((item) => item.alt)
      .filter(Boolean)
      .join("; ");
  const id = createUniqueId();

  const beam = { stroke: "var(--ms-ornament, var(--ms-copy-strong))" };

  return (
    <figure class={`ms-block m-0 ${props.class ?? ""}`}>
      <svg
        viewBox={`0 0 ${W} ${height()}`}
        role="img"
        aria-label={label()}
        class="block w-full h-auto drop-shadow-[0_18px_28px_rgb(0_0_0/0.16)]"
      >
        {/* Infill (plaster) behind everything */}
        <rect
          x={INSET}
          y={top()}
          width={wall}
          height={wallH()}
          style={{ fill: "var(--ms-card)" }}
        />
        <Show when={gable()}>
          <polygon
            points={`${INSET},${roofH()} ${INSET},${roofY(INSET)} ${W / 2},${apex} ${W - INSET},${roofY(W - INSET)} ${W - INSET},${roofH()}`}
            style={{ fill: "var(--ms-card)" }}
          />
        </Show>

        {/* Photos in the fields */}
        <For each={items()}>
          {(item, index) => (
            <Photo
              src={item.src}
              clip={`${id}-${index()}`}
              x={colX((index() % columns()) + 1)}
              y={rowY(Math.floor(index() / columns()))}
              width={unit()}
              height={cellH()}
            />
          )}
        </For>

        <g fill="none" stroke-width={T} stroke-linecap="square" style={beam}>
          {/* Frame: sill, top plate, rails between the rows */}
          <For each={Array.from({ length: rows() + 1 }, (_, r) => r)}>
            {(r) => (
              <line
                x1={INSET + T / 2}
                x2={W - INSET - T / 2}
                y1={top() + T / 2 + r * (cellH() + T)}
                y2={top() + T / 2 + r * (cellH() + T)}
              />
            )}
          </For>
          {/* Posts */}
          <For
            each={[
              INSET + T / 2,
              ...Array.from(
                { length: columns() + 1 },
                (_, i) => colX(i + 1) - T / 2,
              ),
              W - INSET - T / 2,
            ]}
          >
            {(x) => (
              <line
                x1={x}
                x2={x}
                y1={top() + T / 2}
                y2={top() + wallH() - T / 2}
              />
            )}
          </For>
          {/* Braces in the narrow side fields: they meet at the rails */}
          <For each={Array.from({ length: rows() }, (_, r) => r)}>
            {(r) => {
              const y0 = () => rowY(r) - T / 2;
              const y1 = () => rowY(r) + cellH() + T / 2;
              const up = r % 2 === 0;
              const lx0 = INSET + T / 2;
              const lx1 = () => colX(1) - T / 2;
              const rx0 = () => colX(columns() + 1) - T / 2;
              const rx1 = W - INSET - T / 2;
              return (
                <>
                  <line
                    x1={lx0}
                    y1={up ? y1() : y0()}
                    x2={lx1()}
                    y2={up ? y0() : y1()}
                  />
                  <line
                    x1={rx1}
                    y1={up ? y1() : y0()}
                    x2={rx0()}
                    y2={up ? y0() : y1()}
                  />
                </>
              );
            }}
          </For>
          <Show when={gable()}>
            {/* Posts up into the gable, collar beam, king post */}
            <For each={postXs()}>
              {(x) => <line x1={x} x2={x} y1={roofH()} y2={roofY(x)} />}
            </For>
            <line
              x1={collarX()}
              x2={W - collarX()}
              y1={collarY()}
              y2={collarY()}
            />
            <line x1={W / 2} x2={W / 2} y1={apex} y2={collarY()} />
            {/* Roof: two rafters past the wall, slightly heavier */}
            <path
              d={`M4 ${roofY(4)} L${W / 2} ${apex} L${W - 4} ${roofY(W - 4)}`}
              stroke-width={T * 1.5}
              stroke-linejoin="miter"
              stroke-linecap="butt"
            />
          </Show>
        </g>

        <Show when={gable() && props.data.label}>
          {(text) => (
            <text
              x={W / 2}
              y={(collarY() + roofH()) / 2 + 12}
              text-anchor="middle"
              class="font-ms-display"
              style={{
                fill: "var(--ms-copy-strong)",
                "font-size": "34px",
                "font-weight": "800",
                "letter-spacing": "0.02em",
              }}
            >
              {text()}
            </text>
          )}
        </Show>
      </svg>
      <Show when={props.data.caption}>
        {(caption) => (
          <figcaption class="mt-ssm text-xs text-copy-soft text-center">
            {caption()}
          </figcaption>
        )}
      </Show>
    </figure>
  );
};
