---
name: dica-migrate
description: Migrate dica template and content rendering from the dica monorepo into octahedron.world
---

# Dica Migration Task

You are migrating the MDS content rendering system from the **dica monorepo**
into **octahedron.world**. The dica app already has a working implementation
for loading and rendering MDS-format markdown files. Octahedron.world already
uses the `solid-mds` npm package for parsing, but the **template** (rendering)
side is a stub.

## Your Task

{{prompt}}

## Source Repository

The dica monorepo lives at:

```
/Users/matthias.reis/code/dica/
```

**Read the dica CLAUDE.md first** if you need general context about the dica
repo structure:

```
/Users/matthias.reis/code/dica/CLAUDE.md
```

Use the `Read` tool or `Bash` (cat/ls) to access files in the dica repo - they
are outside this project's filesystem sandbox but accessible via those tools.

## Key Source Files in Dica

### Content Loading (server-side)

The pattern for loading raw MDS markdown from disk:

- `/Users/matthias.reis/code/dica/apps/app/src/lib/gestohlene-zeit.ts` -
  Server function that reads a `.md` file with `readFile()` and returns raw
  string
- `/Users/matthias.reis/code/dica/apps/app/src/lib/examples.ts` -
  Generic loader that reads from a directory by filename

Both use `"use server"` + `readFile` from `node:fs/promises`. They return raw
markdown strings to the client.

### Template (client-side rendering)

The main template that parses MDS markdown and renders it as an interactive
SolidJS UI:

- `/Users/matthias.reis/code/dica/apps/app/src/dica/create-template.tsx` -
  **The main template component** (~385 lines). This is the primary file to
  migrate. It:
  - Calls `parse()` from `solid-mds` with a component map
  - Manages step state with `createStore`
  - Persists progress to `localStorage`
  - Renders a cover page, step navigation, progress bar, and quest system
  - Uses hash-based routing (`#step-id`) to switch between steps

- `/Users/matthias.reis/code/dica/apps/app/src/dica/types.ts` - Type
  definitions: `GlobalScope`, `LocalScope`, `StepStatus`, `TemplateOptions`

- `/Users/matthias.reis/code/dica/apps/app/src/dica/page.tsx` - Page wrapper
  component with visibility toggle via opacity

- `/Users/matthias.reis/code/dica/apps/app/src/dica/step.tsx` - Step
  navigation item component (sidebar list items for pages and clues)

- `/Users/matthias.reis/code/dica/apps/app/src/dica/cover-page.tsx` - Cover
  page component (title, subtitle, start button)

- `/Users/matthias.reis/code/dica/apps/app/src/dica/logo.tsx` - SVG logo
  component

- `/Users/matthias.reis/code/dica/apps/app/src/dica/index.ts` - Barrel export

### Quest System

The quest system is a set of interactive quiz/puzzle components:

- `/Users/matthias.reis/code/dica/apps/app/src/dica/quest/index.tsx` - Quest
  dispatcher that maps variant names to components
- `/Users/matthias.reis/code/dica/apps/app/src/dica/quest/types.ts` - Quest
  type definitions

Quest variants (each in their own file under `quest/`):
`default-quest`, `view-quest`, `choice-quest`, `multiple-choice-quest`,
`input-quest`, `number-quest`, `multitext-quest`, `image-map-quest`,
`imagemapmulti-quest`, `imagemapprecision-quest`

### Route integration in dica

The route `gestohlene-zeit.tsx` shows how it all connects:
```tsx
const Template = clientOnly(() => import("~/dica/create-template"));
// ...
<Show when={content()}>{(md) => <Template markdown={md()} />}</Show>
```

The template is loaded with `clientOnly` because it uses `localStorage` and
hash routing (browser-only APIs).

## Target in Octahedron.world

### What already exists

- **`solid-mds` package** is installed (`^0.3.2` in package.json) and used in
  `scripts/content.ts` for parsing global metadata at build time
- **MDS workflow detection** in `scripts/content.ts:57-71` - files starting
  with backticks are identified as MDS, their global metadata is extracted into
  `data.json`
- **Route generation** in `scripts/content.ts:100-104` - MDS routes get
  `workflow: 'mds'` in `routes.json`
- **Router dispatch** in `src/app.tsx:33-36` - MDS routes render `<MdsTemplate>`
  instead of `<Octa>`
- **Stub component** at `src/components/mds-template.tsx` - Currently just
  renders `<h1>Hello MDS</h1>`
- **Content file** at `_content/dica-club/gestohlene-zeit.md` - Already copied
  over in MDS format

### What needs to be built

The `MdsTemplate` component in `src/components/mds-template.tsx` needs to:

1. **Load the raw markdown** from disk via a server function (like
   `getGestohleneZeitContent` in dica, but generic - reading from
   `_content/{group}/{slug}.md` based on the route's slug)
2. **Parse and render** using `solid-mds`'s `parse()` with a component map
3. **Render the full interactive template** - cover page, steps, navigation,
   progress, quests

### Architecture Decisions

- Place dica-specific components under `src/components/dica/` to mirror the
  structure from the dica repo
- The server-side content loader can go into `src/model/` alongside existing
  model functions, or in a dedicated lib file
- Use `clientOnly` for the template component since it requires browser APIs
- The template should work within octahedron.world's existing layout system
  (Nav, Footer from `app.tsx`), but the dica template is essentially
  full-screen, so consider how it integrates with the existing chrome
- Reuse `solid-mds` parse types - they are exported from the package

### Content Structure (MDS format)

MDS files use this structure:
```markdown
\```@@|
slug: my-page
title: My Title
version: 1
\```

+++step-id

\```@|
title: Step Title
type: page
weight: 1
\```

Markdown content for this step...

:::quest variant
{ "ref": "step-id", "reveal": ["next-step"] }
:::

+++another-step
...
```

- `\```@@|` = global metadata (like frontmatter)
- `+++id` = step delimiter with ID
- `\```@|` = local (per-step) metadata
- `:::quest variant` = custom block (rendered by component map)

## Guidelines

1. **Read source files from dica** before implementing - don't guess at the
   implementation
2. **Reference `CLAUDE.md`** for octahedron.world patterns (layouts, plugins,
   data layer, routing)
3. **Adapt, don't copy blindly** - the dica app is a standalone test app;
   octahedron.world has its own conventions (Tailwind classes, layout system,
   routing)
4. **Use TypeScript** - match the typing patterns in `src/types.ts`
5. **Incremental approach** - get the basic template rendering working first,
   then add interactivity (quests, progress persistence, etc.)
6. **Test with existing content** - `_content/dica-club/gestohlene-zeit.md` is
   already there and detected by the content script
7. The `solid-mds` package version in octahedron.world may differ from dica's
   workspace version - check for API compatibility if something doesn't work
8. The dica template uses `lucide-solid` icons - octahedron.world already has
   this dependency
