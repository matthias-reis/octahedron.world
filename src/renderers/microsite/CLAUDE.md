# Microsites

Standalone one-pagers for small businesses, served at `seiten.mreis.me/<name>`. A
briefing goes in, a page comes out. Every page looks unique, but all of them
are built from this one renderer and its design system.

Reference page: `_content/seiten/example.md`. New pages are drafted with the
`/handzettel` skill (`.claude/skills/handzettel/`). The homepage
`seiten.mreis.me` lists every microsite as its sharing card, for admins only
(`src/sites/seiten/pages/home.tsx`).

**Every page must look different from the ones before it.** Before
composing, look at the existing pages under `_content/seiten/` and vary the
hero (image column, backdrop, typographic), the section layouts, the blocks
and the color combination.

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
- Files live next to the page in `_content/seiten/<name>/` and are served by
  the access-checked `/asset/<slug>/<file>` route — never from the public
  build (`src/routes/asset/`). They are deleted together with the page. No
  `public/` folder.
- `pnpm ms-image <src> <name> <file>`: `<file>.webp` (≤1600 px) plus
  `<file>-800.webp` for the srcset. `--wide`: 2400 + 1200 px, for
  backdrops. `--logo`: one webp ≤480 px, alpha kept. `--og`: `og.jpg`,
  1200×630 cover crop (`--position` to steer it).
- In MDS: `brand.logo: logo.webp`, `og.image: og.jpg`, and
  `` ```yaml image `` blocks (`src`, `alt`, `ratio`, `caption`, `eager` for the
  first image on screen).

## Building blocks

Each is documented (YAML shape) in a comment above its component.

- **Global scope:** `brand` (`name`, `mark`, `sub`, `tagline`, `logo`),
  `theme`, `header` (`phone`, `cta`), `notice` (strip above the header),
  `footer` (`note`, `meta`, `variant`, `colors` — a group override for the
  dark chrome: footer, notice bar and quick bar, e.g. to match the
  highlighted section), `quickbar` (fixed call/mail/route bar on phones),
  `legal`, `og`, `noindex`.
- **Section local scope:** `nav`, `variant`, `colors`, `kicker` (string, or
  `{ text, icon }` for a pill; `tone: copy` sets it in the text color instead
  of the button color), `pattern` (a subtle repeating motif behind the
  section in its text color — `patterns.ts`, e.g. `roof`), `backdrop` (full-bleed background image, the
  copy moves onto a frosted panel; `style: cover` sets it straight onto the
  photo, bottom left, magazine-cover style; `align: right` puts the copy on
  the right half, `valign: top` (cover only) sets it into the sky with the
  subject below — `backdrop.tsx`), `align: center` (everything on the vertical
  axis, e.g. a hero around a big logo), `layout`:
  - `hero` — display type; with `visual` (image + optional badge + quote card)
    it becomes two columns (`hero-visual.tsx`); `visual.style: bleed` runs
    the photo edge to edge over the right half instead of a framed card
  - `split` — kicker + h2 left, the first paragraph right, the rest below
  - `side` — text left, the last block right (lists, contact card)
  - `band` — compact strip without a headline (trust bar)
- **Blocks:** `cards` (icons, `icons: tile`, `label`, `tags`, `link`),
  `features` (`plain` / `tiles` / `chips`), `index` (numbered 01, 02, … list
  with real text — for a long service list), `stats` (two or three big real
  figures), `video` (YouTube, two-click: nothing loads from YouTube before
  the click; the poster is a local file), `cta` (buttons with icons),
  `contact` (rows incl. `fax`, `route`; `style: grid` for tiles),
  `callout` (one oversized line, e.g. the phone number), `rating`, `image`,
  `gallery` (asymmetric photo mosaic, first image large, optional captions on
  the photos — 3 or 6 items), `emblem` (a logo or seal shown big and
  uncropped, `size` in rem), `palette`.
- **Logo:** `brand.logo` is the whole wordmark — the name is not repeated
  next to it (it becomes the `alt`). An existing logo on white gets its
  background turned into alpha before `pnpm ms-image … --logo`.
- **Concept previews of real businesses** (like `001-juergens`,
  `002-elektro-schuster`) always get
  `noindex: true` and a `notice` saying the page is not official.

## Access

Every page is private by default (`src/sites/seiten/`, stateless, no
database):

- **Admins** log in at `/login` (`SEITEN_ADMIN_PASSWORD`) and see every page
  plus the overview with a link generator.
- **Clients** get a link `seiten.mreis.me/<slug>?k=<code>`: an HMAC-signed
  code for exactly one page with a fixed expiry (24 h – 7 days, chosen at
  creation). The first visit turns it into a page cookie; without it, the
  page shows only a code field. CLI: `pnpm seiten-link <slug> [hours]`
  (needs the production `SEITEN_SECRET`).
- `access: 2` (global scope) invalidates every code issued for the page —
  bump it to revoke. `public: true` opens a page to everyone (only the
  example page).
- Unknown slugs show the same locked page as real ones, and images go
  through the same check (`/asset/<slug>/<file>`, `?k=` carried along for
  link-preview crawlers).
- Env: `SEITEN_SECRET`, `SEITEN_ADMIN_PASSWORD`. In development both fall
  back to `dev`; in production a missing one keeps everything locked.

## Content rules

- One file per page: `_content/seiten/<name>.md`, `slug: <name>` (one
  segment, a-z 0-9 -), `group: seiten`, `type: microsite`. The site
  (`seiten`) comes from the folder. Client pages are numbered:
  `003-<business>`.
- Every `+++step` is one section. The step id is the anchor (`#<id>`), so
  keep it short, lowercase and meaningful (`offer`, `about`, `contact`).
- Only sections with a `nav` label show up in the header. The hero and the
  palette never get one.
- The first section is the hero: `layout: hero`, exactly one `#` heading,
  one lead paragraph, and a `cta` block. Every other section opens with a
  `##` heading.
- Alternate `variant`s so neighbouring sections never share a background.
  At most one `inverted` and one `accent` section per page.
- The `palette` section (color system + hue slider) lives on the example
  page only. Real pages don't get one; test a hue there with the slider.
- Card grids: 3 or 6 items for three columns, 2 or 4 with `columns: 2`.
  Icons only from the curated set in `ui.tsx`.

## Color system

Defined in `theme.css`, exposed to Tailwind in `app.css`. Four layers:

1. **Base hue** — `theme.hue` (0–360), the only color knob a page sets.
2. **Palettes** — six hues derived from it: `main` (H),
   `adjacent-left` / `adjacent-right` (H ∓ 42.5), `accent-left` /
   `accent-right` (H ∓ 137.5, golden angle), `complementary` (H + 180).
   Left = minus, right = plus. A seventh palette, `signal`, is not derived
   from the hue: it is the page's own brand color (`theme.signal: "#efb814"`)
   with a dark ink — bright shades are the brand color, dark shades the ink.
   Use it when the brand color is one the hue ladder can't reach (a true
   yellow); as the button group it gives ink buttons with brand-colored copy.
   Each has nine shades:
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
- A pairing can shape its display face: `h1Weight`, `headingWeight`,
  `displayStretch` (for width-axis fonts like Archivo), `displayTracking`,
  `displayWordSpacing` — see `industrial` for a condensed, heavy setup.
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

- `pnpm content` must pass. Open `http://seiten.localhost:4242/<name>` (log
  in at `/login`, dev password `dev`) at
  desktop and mobile widths.
- Check the header anchors, the mobile menu, no horizontal scroll, and
  contrast in every variant.
