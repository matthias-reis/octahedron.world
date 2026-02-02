# Dica Renderer

This directory contains the "Dica" renderer for the MDS workflow. It is a specialized, interactive template designed for gamified content ("quests"), originally ported from the Dica monorepo.

## Overview

The Dica renderer transforms an MDS markdown file into an interactive application with:
-   **Step-based navigation**: Content is split into "steps" (pages or clues) that are revealed progressively.
-   **State Management**: Tracks which steps are revealed, finished, and the user's score.
-   **Quest System**: Interactive components (puzzles, inputs) embedded in the markdown.

## Core Architecture

### Entry Point
-   **`create-template.tsx`**: The main component. It parses the raw markdown using `solid-mds`, initializes the state store, and manages the overall layout (Cover page vs. Steps view).

### State Management
State is managed using a SolidJS Store (`stepsStatus`) and persisted to `localStorage`.

-   **`StepStatus`**:
    -   `revealed`: Is the step visible in the nav?
    -   `finished`: Has the user completed the step's tasks?
    -   `score`: Points earned.
-   **Persistence**: Keys are namespaced by slug and version (e.g., `my-slug-1`).

### File Structure

-   `create-template.tsx`: Main logic and layout.
-   `quest/`: Directory containing all Quest variant components.
-   `page.tsx` / `step.tsx`: UI components for the main content area and navigation sidebar.
-   `types.ts`: TypeScript definitions for the renderer's specific data structures.

## Quest System

Quests are custom blocks in the markdown that render interactive components.

**Syntax**:
```markdown
:::quest variant_name
{ "ref": "step-id", "reveal": ["next-step"] }
:::
```

-   **`variant_name`**: Maps to a component in `quest/index.tsx` (e.g., `choice`, `input`, `imagemap`).
-   **`ref`**: The ID of the step this quest belongs to/controls.
-   **`reveal`**: Array of step IDs to reveal upon completion.

### Adding a New Quest

1.  Create a component in `quest/my-quest.tsx`.
2.  Register it in `quest/index.tsx`.
3.  Use `:::quest my-quest` in markdown.
