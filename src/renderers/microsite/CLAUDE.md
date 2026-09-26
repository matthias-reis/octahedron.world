# Microsites

Standalone one-pagers for small businesses, served under `mreis.me/p/*`. A
briefing goes in, a page comes out. Every page looks unique, but all of them
are built from this one renderer and its design system.

Reference page: `_content/mreis/p/example.md`. New pages are drafted with the
`/handzettel` skill (`.claude/skills/handzettel/`).

## Who decides what

- **Colors:** pick one of the combinations below. If none fits the brief,
  stop and propose an extension to Matze; never add palettes, shades,
  semantic colors or combinations on your own.
- **Everything else is yours:** visual hierarchy, composition, section order,
  type scale, and the font pairing. Use your design skills
  (`frontend-design`) and design for this business's mood, not for the
  reference page.

## No AI design slop

Pages must not look like a generic AI/design-system playbook page.

- Content is German unless the briefing says otherwise (`language: de` is
  the default and sets `lang` on the page). German typography: „…“ quotes,
  en dash for ranges, `7:00–18:00`.
- No beige, tan or cream backgrounds. Light backgrounds are near-neutral
  (`neutralChroma` ≤ 0.005); tinted brights are only for small areas.
- No full stops at the end of headlines.
- One text element, one color. A headline or paragraph may be set in the
  accent color, but never mixed: no "This is a beautiful **Headline**" with
  one word picked out in the accent. Exception: links.
- Icons are lucide only.
- Every page has at least one real visual (photo, illustration, map). The
  example page is exempt.

## SEO and sharing

Sharing (WhatsApp, Signal, LinkedIn, Mail) matters more than search, so the
sharing card must be perfect. `pnpm content` enforces the checkable parts
(`scripts/validate-microsite.ts`).

- One `h1` per page, in the hero. Every other section opens with an `h2`,
  `h3` only below an `h2`, and no skipped levels.
- `title` is the `<title>`: business, what, where, e.g.
  `Fern & Flour – Bäckerei in Leipzig-Plagwitz`.
- `description`: 120–160 characters, concrete (what, where, why), used for
  meta and og:description.
- `og.title` (optional, defaults to `title`) is written for a chat preview,
  not for Google: short and human.
- `og.image` is mandatory: a 1200×630 JPEG built with `--og`. The business
  name must be readable at thumbnail size; nothing important near the edges.
- Every `image` block has a real `alt` (what is in the picture), never
  "Bild von …".

## Images and logos

- Every image and logo is made for the page: generated or composed, then
  converted with `pnpm ms-image`. Never hotlink, never use stock URLs.
- Files live next to the page in `_content/mreis/p/<name>/` and are
  imported through `import.meta.glob` in `assets.ts`. They ship with
  fingerprinted URLs and are deleted together with the page. No `public/`
  folder.
- `pnpm ms-image <src> <name> <file>`: `<file>.webp` (≤1600 px) plus
  `<file>-800.webp` for the srcset. `--logo`: one webp ≤480 px, alpha
  kept. `--og`: `og.jpg`, 1200×630 cover crop (`--position` to steer it).
- In MDS: `brand.logo: logo.webp`, `og.image: og.jpg`, and
  `` ```yaml image `` blocks (`src`, `alt`, `ratio`, `caption`, `eager` for the
  first image on screen).

## Building blocks

Each is documented (YAML shape) in a comment above its component.

- **Global scope:** `brand` (`name`, `mark`, `sub`, `tagline`, `logo`),
  `theme`, `header` (`phone`, `cta`), `notice` (strip above the header),
  `footer` (`note`, `meta`, `variant`), `quickbar` (fixed call/mail/route bar
  on phones), `legal`, `og`, `noindex`.
- **Section local scope:** `nav`, `variant`, `colors`, `kicker` (string, or
  `{ text, icon }` for a pill), `layout`:
  - `hero` — display type; with `visual` (image + optional badge + quote card)
    it becomes two columns (`hero-visual.tsx`)
  - `split` — kicker + h2 left, the first paragraph right, the rest below
  - `side` — text left, the last block right (lists, contact card)
  - `band` — compact strip without a headline (trust bar)
- **Blocks:** `cards` (icons, `icons: tile`, `label`, `tags`), `features`
  (`plain` / `tiles` / `chips`), `cta` (buttons with icons), `contact` (rows
  incl. `route`), `rating`, `image`, `palette`.
- **Concept previews of real businesses** (like `001-juergens`) always get
  `noindex: true` and a `notice` saying the page is not official.

## Content rules

- One file per page: `_content/mreis/p/<name>.md`, `slug: p/<name>`,
  `group: p`, `type: microsite`. The site (`mreis`) comes from the folder.
- Every `+++step` is one section. The step id is the anchor (`#<id>`), so
  keep it short, lowercase and meaningful (`offer`, `about`, `contact`).
- Only sections with a `nav` label show up in the header. The hero and the
  palette never get one.
- The first section is the hero: `layout: hero`, exactly one `#` heading,
  one lead paragraph, and a `cta` block. Every other section opens with a
  `##` heading.
- Alternate `variant`s so neighbouring sections never share a background.
  At most one `inverted` and one `accent` section per page.
- Keep the `palette` section at the end while a page is being calibrated.
  Remove it before the page goes to the client. It shows the base scheme
  (see below) and has a hue slider; `hue:` in the block sets the start value.
- Card grids: 3 or 6 items for three columns, 2 or 4 with `columns: 2`.
  Icons only from the curated set in `ui.tsx`.

## Color system

Defined in `theme.css`, exposed to Tailwind in `app.css`. Four layers:

1. **Base hue** — `theme.hue` (0–360), the only color knob a page sets.
2. **Palettes** — six hues derived from it: `main` (H),
   `adjacent-left` / `adjacent-right` (H ∓ 42.5), `accent-left` /
   `accent-right` (H ∓ 137.5, golden angle), `complementary` (H + 180).
   Left = minus, right = plus. Each has nine shades:
   - `b1` `b2` (desaturated) `b3`: bright, for backgrounds
   - `m1` `m2` `m3` (desaturated): mid, for accents
   - `d1` `d2` (desaturated) `d3`: dark, for text and inverted sections

   All 54 are CSS vars (`--ms-accent-left-d1`) and Tailwind colors
   (`text-accent-left-d1`, `bg-main-b2`, `border-complementary-m3`) and may be
   used in page-specific design.
3. **Groups** — `copy`, `background` and `button` each point at one palette.
   Defaults: copy → `accent-left`, background → `accent-left`,
   button → `main`.
4. **Semantic colors** — derived from the groups:
   | Tailwind | light | inverted |
   | --- | --- | --- |
   | `bg-page` | background b1 | background d3 |
   | `bg-card` | background b2 | background d2 |
   | `bg-tint` | background b3 | background d2 |
   | `border-line` | background b3 | background d2 |
   | `text-copy-strong` | copy d1 | copy b1 |
   | `text-copy` | copy d2 | copy b2 |
   | `text-copy-soft` | copy m3 | copy b3 |
   | `text-link` | copy m2 | copy m1 |
   | `bg-button` | button m2 | button m1 |
   | `bg-button-hover` | button d3 | button b3 |
   | `text-button-copy` | button b1 | button d1 |

**Approved combinations** (buttons always in the page's button group,
default `main`):

| # | copy + background | highlighted (inverted) section |
| - | ----------------- | ------------------------------ |
| 1 | accent-left (default) | main |
| 2 | main | accent-right |
| 3 | main | accent-left |
| 4 | accent-right | adjacent-right |
| 5 | accent-left | adjacent-left |
| 6 | accent-left | complementary |
| 7 | complementary | accent-left |

Set the left column page-wide, the right one on the inverted section:

```yaml
theme:
  hue: 30
  colors: { copy: main, background: main }                 # combo 2, page
```

```yaml
variant: inverted
colors: { copy: accent-right, background: accent-right }   # combo 2, section
```

The `palette` block previews all of them live.

**Rules**

- Shared, reusable components (buttons, cards, header, footer, blocks) use
  **semantic colors only**. Palette shades are for page-specific design.
- Override groups per page in the global scope and per section in the local
  scope, never with per-page CSS:
  ```yaml
  theme:
    colors: { copy: main, background: complementary }   # page
  ```
  ```yaml
  colors: { background: accent-right }                  # section (yaml @)
  ```
  Both become `.ms-<group>-<palette>` classes that re-point the group.
- Section `variant`s: `plain` (page b1), `surface` (b2), `tint` (b3),
  `inverted` (the highlighted section: d3 background, bright copy).
- The semantic layer is re-declared on every `.ms-section`. Anything that
  should respond to a group class or `ms-inverted` must be (inside) an
  element with `ms-section`.
- The `palette` block's slider rewrites `--ms-hue` on the whole page. Use it
  to test a hue before committing it to `theme.hue`.

## Theme rules

- A page's whole identity lives in `theme:`. Never add per-page CSS or
  classes.
- Pick `hue` first and check it with the palette slider. Yellows (≈ 80–110)
  and blues (≈ 230–270) are the usual troublemakers.
- The font pairing carries the mood of the business and matters more than
  the colors: a plumber and a florist must not share one. Pick (or add) a
  pairing per briefing, and don't default to the example page's pairing.
- Fonts come only from `fontPairings` in `theme.ts`. A new pairing needs a
  Fontsource package, an `@import` in `theme.css` and a registry entry. No
  Google Fonts, no CDN (GDPR).

## Design-system rules

- Colors: see "Color system" above. A new semantic color is added in
  `theme.css` (light block and `.ms-inverted`), and as `--color-*` in
  `app.css`.
- Nothing from mreis or octahedron leaks in: no `col-*`, no `c*` palette, no
  `~/ui` components (except `cx`).
- Stays server-rendered. Registered via `lazy()`, not `clientOnly()`, and
  must work without JavaScript. Interactivity is progressive (see the
  `<details>` menu).
- New blocks: register the name in `scripts/content.ts`, implement it in
  `blocks.tsx`, validate YAML defensively (`str`, `list`, `link` helpers),
  and document the YAML shape in a comment above the component.

## Checking a page

- `pnpm content` must pass. Open `http://mreis.localhost:4242/p/<name>` at
  desktop and mobile widths.
- Check the header anchors, the mobile menu, no horizontal scroll, and
  contrast in every variant.
