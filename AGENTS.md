# Octahedron World

A personal content publishing platform built with SolidStart and Tailwind CSS.

## Tech Stack

- **Framework**: SolidStart 1.1+ (meta-framework for SolidJS)
- **Styling**: Tailwind CSS 4.0+
- **Routing**: SolidJS Router (file-based routes + routes generated from content)
- **Build Tool**: Vinxi
- **Content**: Markdown in MDS format (`hast-mds` on the build side, `solid-mds`
  in the renderers)
- **Images**: Sharp for processing

## Project Structure

```
octahedron.world/
├── _content/              # Markdown content files organized by group
├── src/
│   ├── routes/           # SolidStart file-based routes (hand-written pages)
│   ├── components/       # Reusable UI components
│   │   └── mds-template.tsx  # Maps an item's `type` to its renderer
│   ├── renderers/        # One full-page renderer per content type
│   ├── model/            # Data access layer (reads data.json)
│   ├── sites/            # Per-site shells (octahedron, mreis)
│   └── types.ts          # TypeScript type definitions
├── scripts/
│   ├── content.ts        # Parses MDS markdown and generates the JSON files
│   ├── imagine.ts        # Processes images for web
│   └── watch-content.ts  # Watches content changes in dev mode
├── public/
│   └── img/              # Processed images (s.jpg and l.jpg variants)
├── data.json             # Generated content metadata (do not edit)
├── routes.json           # Generated route list (do not edit)
└── redirects.json        # Generated slug aliases (do not edit)
```

## Content System

There is exactly **one** content workflow: MDS. Every file in `_content/` is an
MDS document, and every published page is rendered by a renderer in
`src/renderers/`. There is no frontmatter workflow, no layouts and no plugins —
those were removed in early 2026.

### The pipeline

```
_content/**/*.md
   │   scripts/content.ts  (pnpm content)
   ▼
data.json  +  routes.json  +  redirects.json
   │   src/app.tsx reads routes.json and creates a <Route> per entry
   ▼
MdsTemplate (src/components/mds-template.tsx)
   │   looks up renderers[item.type]
   ▼
src/renderers/{type}
```

`src/model/model.ts` is the only thing that reads `data.json`; renderers receive
the already-parsed MDS structure.

### File format

An MDS file starts with a **global scope** — a fenced YAML block marked `@@`.
It is mandatory: `pnpm content` aborts on a file that does not have one.

````markdown
```yaml @@
slug: my-page
group: my-group
title: My Page Title
type: post
image: my-image
```

# Heading

Regular markdown content.
````

The fence is ` ```yaml @@ ` — that is the only accepted form.

### Syntax specific to this project

- **Global scope** (` ```yaml @@ `): page metadata, must be the first thing in
  the file. Feeds `data.json`.
- **Steps** (`+++step-id`): divides a document into named steps/slides. Used by
  the step-based renderers (`dica`, `storyline`).
- **Local scope** (` ```yaml @ `): per-step configuration, placed directly under
  a `+++` marker.
- **Custom blocks** (` ```yaml <name> `): a fenced YAML block rendered by a
  registered component instead of as code — e.g. ` ```yaml teaser `. The block
  names known to the parser are listed in `scripts/content.ts`; the components
  they map to live in `src/components/canonical-components.tsx`.

### Required metadata

`slug`, `title` and `image` are effectively mandatory (see `ItemMeta` in
`src/types.ts`). A missing `title` aborts `pnpm content` — the page is not
silently dropped.

## Renderers

`src/renderers/` holds one full-page renderer per content type. The renderer is
selected by the `type` field in the global scope and wired up in the `renderers`
map in `src/components/mds-template.tsx`.

Registered types:

| `type`                  | renderer                              |
| ----------------------- | ------------------------------------- |
| `post`                  | `src/renderers/default`               |
| `default`               | `src/renderers/default`               |
| `album`                 | `src/renderers/album`                 |
| `dica`                  | `src/renderers/dica`                  |
| `digest`                | `src/renderers/digest`                |
| `grid`                  | `src/renderers/grid`                  |
| `legal`                 | `src/renderers/legal`                 |
| `lightbox`              | `src/renderers/lightbox`              |
| `population-simulation` | `src/renderers/population-simulation` |
| `report`                | `src/renderers/report`                |
| `storyline`             | `src/renderers/storyline`             |
| `world2`                | `src/renderers/world2`                |

An unknown `type` renders a visible "Unknown renderer type" fallback rather than
failing the build.

**`type: none`** is not a renderer. It marks a page that belongs in `data.json`
(so its metadata stays queryable) but must _not_ get a generated route —
`content.ts` filters it out of `routes.json`. It is used by `pcsc-one` and
`pcsc-contest`, which own hand-written file routes in `src/routes/`.

### Creating a new renderer

1. Create `src/renderers/{name}/index.tsx` (plus a `types.ts` for its
   `GlobalScope`/`LocalScope` if it needs one).
2. Default-export a component taking the parsed MDS structure.
3. Register the key in the `renderers` map in
   `src/components/mds-template.tsx`.

## Data Layer (Model)

The [src/model/model.ts](src/model/model.ts) file serves as the data access
layer (repository pattern) for the application. All functions here read from
`data.json` and provide refined, type-safe data to components.

**Key functions:**

- **`getRoute(slug)`**: Fetches full metadata for a single page by slug
- **`getRedirect(slug)`**: Resolves alias redirects to canonical slugs
- **`getAllRoutes()`**: Returns all content items with full metadata
- **`getAllCompactRoutes()`**: Returns all items with minimal metadata (for
  listings)
- **`getAllRootRoutes()`**: Returns only root items (homepage display)

**Implementation notes:**

- Uses SolidStart's `query` function for server-side data fetching
- Includes caching in production mode (bypassed in dev for hot reloading)
- All functions are server-only (marked with `'use server'`)
- Data is read from filesystem, not a database

**Alternative names considered:** `repository`, `queries`, `dataLayer`. Current
name `model` follows MVC-like conventions and is concise.

## Common Patterns

### Adding a New Content Page

Create the file — `_content/my-group/my-page.md`:

````markdown
```yaml @@
slug: my-page
group: my-group
title: My Page Title
type: post
image: my-image
description: What this page is about
```

This is my content.
````

Then:

```bash
# 1. Add the image next to the markdown file
#    _content/my-group/my-image.jpg

# 2. Process content and images
pnpm content && pnpm imagine

# 3. Verify in data.json that my-page appears with correct metadata
```

### Creating a Root Item (Homepage Entry)

Add to the page's global scope:

```yaml
root: true
weight: 5 # controls sort order
description: Brief description shown on homepage
```

### Linking Between Pages

Use ordinary markdown links, or a teaser block to render a card with the target
page's image and metadata:

````markdown
```yaml teaser
slug: other-page-slug
```
````

### Querying Data in Components

```typescript
import { createAsync } from '@solidjs/router';
import { getRoute, getAllRootRoutes } from '~/model/model';

// In a component:
const item = createAsync(() => getRoute('my-slug'));
const rootItems = createAsync(() => getAllRootRoutes());
```

## Development Workflow

### Running the Site

```bash
pnpm dev          # Start dev server on port 4242
```

This runs:

1. `pnpm content` - Process markdown
2. `pnpm imagine` - Process images
3. `vinxi dev` - Start dev server with HMR
4. Content watcher monitors `_content/` for changes

### Building for Production

```bash
pnpm build        # Production build
pnpm start        # Run production server
```

### Working with Content

1. **Add new content**: Create a `.md` file in `_content/{group}/` with a
   ` ```yaml @@ ` global scope
2. **Add images**: Place images in same directory as markdown file
3. **Run scripts**: `pnpm content && pnpm imagine` (or restart dev server)
4. **Check data.json**: Verify your content appears with correct metadata

### Making it a Root Item

To show a page on the homepage:

1. Add `root: true` to the global scope
2. Add `weight: N` to control sort order
3. Ensure `image` field points to an existing image

## Important Notes

- **Never edit generated files**: `data.json`, `routes.json`, `redirects.json`
  are auto-generated (and gitignored)
- **Image references**: Use the filename without extension (e.g. `image: mesh`
  for `mesh.jpg`)
- **Slug uniqueness**: Each slug must be unique across all content
- **Malformed content fails the build**: a file without a ` ```yaml @@ ` global
  scope, or without a `title`, aborts `pnpm content`. Pages are never silently
  dropped.
- **Type selection**: `type` determines the entire page structure and which
  custom blocks make sense
