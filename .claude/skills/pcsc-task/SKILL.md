---
name: pcsc-task
description: Work on PCSC One migration tasks with full context
---

# PCSC One Migration Task

You are working on migrating PCSC One (music rating database) from
Next.js/Firebase to Octahedron World.

## Essential Context

**Original source code:** `../pcsc` (relative to repo root) **PCSC
documentation:** `src/pcsc/CLAUDE.md` (read this for PCSC-specific architecture)
**Main architecture:** `CLAUDE.md` (reference for Octahedron patterns)

## Your Task

{{prompt}}

## Guidelines

1. Check `src/pcsc/CLAUDE.md` for PCSC-specific context before starting
2. Reference `CLAUDE.md` for Octahedron patterns (layouts, plugins, data layer)
3. Look at original code in `../pcsc` when needed to understand existing
   implementation
4. Update `src/pcsc/CLAUDE.md` with any architectural decisions or new
   components
5. Use TypeScript types from the original codebase
6. Follow incremental migration approach - one feature at a time
7. Test each feature before moving to the next. Also make sure that all types
   are correct and there are no TypeScript errors.
8. Document any new components, hooks, or utilities you create in
   `src/pcsc/CLAUDE.md`
