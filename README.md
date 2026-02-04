# Octahedron World

A sci-fi magazine and story platform built with SolidStart and the MDS (Markdown
Data System) workflow.

## Architecture

This project uses a **pure MDS workflow** for all content. MDS allows markdown
files to define their own rendering behavior through frontmatter and custom
components.

### Content System

All content is stored in `_content/` with the following structure:

- **Frontmatter**: Wrapped in ` ```@@|` and ` ``` ` (MDS format)
- **Type**: Determines which renderer to use (e.g., `storyline`, `lightbox`,
  `report`, `post`)
- **Content**: Standard markdown with optional custom components

#### Example Content File

```markdown
\`\`\`@@| title: My Story type: storyline description: A great story group:
stories slug: my-story image: my-image \`\`\`

# Chapter 1

Content goes here...
```

### Renderers

Renderers are located in `src/renderers/` and define how content is displayed:

- **`storyline`**: For narrative stories with sequential steps
- **`lightbox`**: For photo galleries and visual content
- **`report`**: For in-depth articles with structured layout
- **`world2`**: Extended report with calculator and graphics plugins
- **`post`/`default`**: Standard blog posts with two-column layout
- **`entry`**: For index/overview pages
- **`grid`**: For grid-based layouts
- **`album`**: For photo albums
- **`dica`**: Interactive quest-based content
- **`legal`**: For legal pages

Each renderer:

1. Parses markdown using `solid-mds`
2. Extracts frontmatter (global scope)
3. Renders content using SolidJS components
4. Can register custom components via `canonicalComponents`

### Scripts

#### `pnpm content`

Processes all markdown files in `_content/`:

- Parses MDS frontmatter
- Generates `data.json` with all metadata
- Generates `routes.json` for routing
- Generates `redirects.json` for URL aliases

#### `pnpm imagine`

Generates optimized images from source assets

#### `pnpm dev`

Runs the development server with content watching

## Adding New Content

1. Create a markdown file in `_content/[group]/[slug].md`
2. Add MDS frontmatter with type and metadata
3. Write content in markdown
4. Run `pnpm content` to regenerate metadata
5. The content will be automatically routed

## Creating a New Renderer

1. Create `src/renderers/[name]/index.tsx`
2. Create `src/renderers/[name]/types.ts` for type definitions
3. Export a default function that:
   - Takes `{ markdown: string }` as props
   - Parses with `solid-mds`
   - Returns a SolidJS component
4. Register in `src/components/mds-template.tsx`

Example:

```typescript
import { parse } from 'solid-mds';
import { canonicalComponents } from '~/components/canonical-components';
import type { GlobalScope, LocalScope } from './types';

export default function createTemplate(props: { markdown: string }) {
  const parsed = parse<GlobalScope, LocalScope>(
    props.markdown,
    canonicalComponents
  );
  const item = parsed.global;

  return (
    <div>
      <h1>{item?.title}</h1>
      {Object.values(parsed.steps).map((step) => (
        <step.Body />
      ))}
    </div>
  );
}
```

## Technologies

- **SolidStart**: Meta-framework for SolidJS
- **SolidJS**: Reactive UI library
- **solid-mds**: Markdown Data System parser
- **TailwindCSS**: Utility-first CSS
- **TypeScript**: Type safety
- **Vinxi**: Build tooling

## Directory Structure

```
├── _content/           # All markdown content
├── public/            # Static assets
├── scripts/           # Build scripts
├── src/
│   ├── app.tsx        # Root app component
│   ├── components/    # Shared UI components
│   ├── renderers/     # MDS renderers
│   ├── routes/        # File-based routes
│   └── types.ts       # Global type definitions
├── data.json          # Generated metadata
├── routes.json        # Generated routes
└── redirects.json     # Generated redirects
```

## Development

```bash
# Install dependencies
pnpm install

# Process content and start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```
