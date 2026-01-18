# Octahedron World

A personal content publishing platform built with SolidStart and Tailwind CSS.

## Tech Stack

- **Framework**: SolidStart 1.1+ (meta-framework for SolidJS)
- **Styling**: Tailwind CSS 4.0+
- **Routing**: SolidJS Router (file-based routing)
- **Build Tool**: Vinxi
- **Content**: Markdown files with YAML frontmatter
- **Images**: Sharp for processing

## Project Structure

```
octahedron.world/
├── _content/              # Markdown content files organized by topic
├── src/
│   ├── routes/           # SolidStart file-based routes
│   ├── components/       # Reusable UI components
│   │   ├── layouts/      # Layout components for different content types
│   │   └── plugins/      # Content section renderers
│   ├── model/            # Data access layer
│   └── types.ts          # TypeScript type definitions
├── scripts/
│   ├── content.ts        # Parses markdown and generates data.json
│   ├── imagine.ts        # Processes images for web
│   └── watch-content.ts  # Watches content changes in dev mode
├── public/
│   └── img/              # Processed images (s.jpg and l.jpg variants)
├── data.json             # Generated content metadata (do not edit)
├── routes.json           # Generated route list (do not edit)
└── redirects.json        # Generated slug aliases (do not edit)
```

## Content System

### Markdown Files

All content lives in `_content/` organized by topic directories (e.g.,
`_content/mesh/`, `_content/photography/`).

Each markdown file has:

- **YAML frontmatter**: Metadata that defines how the page behaves
- **Markdown body**: The actual content

### Key Frontmatter Fields

```yaml
---
slug: unique-page-url # Required: URL path for this page
title: Page Title # Required: Display title
layout: post # Optional: Layout type (defaults to 'default')
group: mesh # Required: Topic group/category
root: true # Optional: Show on homepage (default: false)
weight: 2 # Optional: Sort order on homepage
image: image-name # Optional: Image reference (without extension)
alias: old-url-path # Optional: Legacy URL redirects (see below)
---
```

- **`slug`**: Defines the URL path (e.g., `mesh` → `/mesh`)
- **`layout`**: Selects which layout component to use (concept explained in
  Layouts section)
- **`root: true`**: Pages marked as root items appear on the homepage
- **`weight`**: Controls sort order for root items on homepage
- **`image`**: References an image from `_content/` (processed by
  `pnpm imagine`)
- **`alias`**: Legacy field for old URL structure redirects. **Never touch this
  field.** Only exists on migrated content to preserve old links. New content
  does not need this field.

### Content Processing Scripts

**`pnpm content`** (scripts/content.ts):

- Scans `_content/**/*.md`
- Parses frontmatter and markdown body
- Generates three files:
  - `data.json`: Full metadata for all content
  - `routes.json`: List of valid route slugs
  - `redirects.json`: Alias mappings

**`pnpm imagine`** (scripts/imagine.ts):

- Finds images in `_content/**/*.{jpg,jpeg,png}`
- Generates two variants per image:
  - `public/img/{name}/s.jpg`: Small (600px, quality 65)
  - `public/img/{name}/l.jpg`: Large (1280px, quality 90)

Both scripts run automatically before `dev` and `build` (see `predev` and
`prebuild` in package.json).

## Navigation Structure

### Homepage ([src/routes/index.tsx](src/routes/index.tsx))

- Displays all pages where `root: true` in frontmatter
- Items are sorted by `weight` field
- Grid layout with images and descriptions
- Each item links to its slug URL

### Site Navigation ([src/components/nav.tsx](src/components/nav.tsx))

- Shows on all pages except homepage
- Fixed position top-right corner
- Collapsible menu showing all root items
- Home button to return to homepage

### Page Routing

Content pages are rendered dynamically:

1. User visits `/{slug}`
2. SolidStart router matches the route
3. [src/components/octa.tsx](src/components/octa.tsx) component:
   - Fetches metadata from `data.json` using slug
   - Selects appropriate layout based on frontmatter `layout` field
   - Renders content sections using layout's plugin system

## Layouts and Plugins

### Layouts

Layouts define how content is displayed. Located in
[src/components/layouts/](src/components/layouts/).

Each layout provides:

- **Main component**: Overall page structure (header, container, styling)
- **Section wrapper**: How to wrap each content section
- **Plugins**: Custom renderers for special content types

The `layout` field in frontmatter selects which layout to use. If omitted,
`default` layout is used.

### Plugins System

Plugins are responsible for rendering individual content sections. The
`pnpm content` script parses markdown files and creates a list of sections,
where each section has a `type` and a `payload`.

**How it works:**

1. **Content parsing** ([scripts/content.ts:15-33](scripts/content.ts)):
   - Markdown body is split into sections by `---` delimiters
   - Plain text becomes `{ type: 'text', payload: '...' }`
   - Special syntax `==> slug` becomes `{ type: 'link', payload: 'slug' }`
   - Custom syntax `==> <type> payload` becomes
     `{ type: 'type', payload: 'payload' }`

2. **Section rendering** ([src/components/octa.tsx](src/components/octa.tsx)):
   - For each section, looks up the plugin for that section's `type`
   - If layout defines a plugin for that type, uses it
   - Otherwise falls back to `DefaultPlugin` (shows error state)

3. **Plugin interface**:

   ```typescript
   type Plugin = (props: {
     type: string;
     payload: string;
     wrapper?: ParentComponent;
   }) => JSX.Element;
   ```

**Built-in plugins** ([src/components/plugins/](src/components/plugins/)):

- **`text`**: Default plugin that transforms markdown to HTML using
  remark/rehype
  - Handles all standard markdown syntax
  - Can be customized per-layout with different component mappings
  - Example: Headers, paragraphs, lists, code blocks, math (KaTeX)
- **`link`**: Renders a link box to another page by slug
  - Payload is a slug reference (e.g., `mesh`)
  - Fetches metadata and displays as a card with image and description
- **`group`**: Displays all pages within a content group
- **`cta`**: Call-to-action component
- **`world-2-calculator`**: Custom interactive calculator (example of special
  functionality)
- **`default`**: Fallback plugin that shows error for unknown types

**Extensibility:**

The plugin system is designed for future expansion. To add new section types:

1. Create a new plugin in `src/components/plugins/{name}/index.tsx`
2. Register it in the layout's plugin map
3. Use the custom syntax in markdown: `==> <{name}> {payload}`

This allows layouts to support domain-specific content types (interactive
widgets, data visualizations, embedded media, etc.) without modifying the core
content processing pipeline.

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

```bash
# 1. Create markdown file
# File: _content/my-group/my-page.md
---
slug: my-page
title: My Page Title
group: my-group
layout: post
image: my-image
---

This is my content.

==> related-page

More content here.
```

```bash
# 2. Add image (same directory as markdown)
# _content/my-group/my-image.jpg

# 3. Process content
pnpm content && pnpm imagine

# 4. Verify in data.json
# Check that my-page appears with correct metadata
```

### Creating a Root Item (Homepage Entry)

Add to existing content's frontmatter:

```yaml
root: true
weight: 5 # Lower numbers appear first
description: Brief description shown on homepage
```

### Linking Between Pages in Markdown

Use the link plugin syntax:

```markdown
Some paragraph of text.

==> other-page-slug

More content continues here.
```

This renders as a styled link box with image and metadata.

### Using Custom Section Types

```markdown
Regular markdown content here.

==> <cta> https://example.com

More markdown content.

==> <world-2-calculator> config-data

Text continues.
```

Each `==> <type> payload` creates a section with that type, rendered by the
corresponding plugin.

### Creating a New Plugin

1. **Create plugin file**:

   ```typescript
   // src/components/plugins/my-plugin/index.tsx
   import { Plugin } from '~/types';

   export const MyPlugin: Plugin = ({ type, payload, wrapper }) => {
     const Wrapper = wrapper || 'section';
     return (
       <Wrapper>
         <div>Custom rendering for: {payload}</div>
       </Wrapper>
     );
   };
   ```

2. **Register in layout**:

   ```typescript
   // src/components/layouts/my-layout/index.ts
   import { MyPlugin } from '~/components/plugins/my-plugin';

   export const myLayout = {
     main: MyLayoutMain,
     plugins: {
       text: TextPlugin(),
       link: LinkPlugin,
       'my-plugin': MyPlugin, // Register here
     },
   };
   ```

3. **Use in markdown**:
   ```markdown
   ==> <my-plugin> some-payload-data
   ```

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

1. **Add new content**: Create `.md` file in `_content/{group}/` with proper
   frontmatter
2. **Add images**: Place images in same directory as markdown file
3. **Run scripts**: `pnpm content && pnpm imagine` (or restart dev server)
4. **Check data.json**: Verify your content appears with correct metadata

### Making it a Root Item

To show a page on the homepage:

1. Add `root: true` to frontmatter
2. Add `weight: N` to control sort order (higher numbers appear first)
3. Ensure `image` field points to an existing image

## Important Notes

- **Never edit generated files**: `data.json`, `routes.json`, `redirects.json`
  are auto-generated
- **Image references**: Use filename without extension in frontmatter (e.g.,
  `image: mesh` for `mesh.jpg`)
- **Slug uniqueness**: Each slug must be unique across all content
- **Layout selection**: Layout determines the entire page structure and
  available content section types
