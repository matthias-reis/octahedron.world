---
# octahedron.world-fd3k
title: Migrate project from pnpm/Node to Bun
status: todo
type: epic
priority: normal
created_at: 2026-04-13T13:50:47Z
updated_at: 2026-04-13T13:51:03Z
---

Switch the entire project to use Bun as both the package manager (replacing pnpm) and server runtime (replacing Node.js). This covers Dockerfile, scripts, CI, and all tooling references.

## Tasks

- [ ] **package.json** — Remove `packageManager: pnpm`, add `packageManager: bun`; update `engines`; replace `tsx` runner with `bun` in all scripts (`content`, `imagine`, `watch:content`, predev/prebuild hooks)
- [ ] **Remove tsx dependency** — Bun natively runs TypeScript; remove `tsx` from devDependencies
- [ ] **Dockerfile** — Change base image from `node:24-alpine` to `oven/bun:1-alpine`; replace `corepack enable pnpm && pnpm install` with `bun install --frozen`; update build commands; update runtime image
- [ ] **entrypoint.sh** — Replace `node` with `bun` for `analyze-logs.js` background process and `exec node server/index.mjs`
- [ ] **crontab** — Replace `node` with `bun` for the analyze-logs job
- [ ] **pnpm-lock.yaml** — Delete; replaced by `bun.lockb` after `bun install`
- [ ] **pnpm-workspace.yaml** — Delete (or migrate patch/onlyBuiltDependencies config to bun equivalents)
- [ ] **patches/** — Review if `html-to-image` patch is still needed; bun supports patches via `bun patch` command
- [ ] **.gitignore** — Add `bun.lockb`, remove pnpm-specific entries
- [ ] **CLAUDE.md** — Update all `pnpm` command references to `bun`
- [ ] **Run `bun install`** — Generate `bun.lockb`, verify all deps resolve correctly
- [ ] **Test dev server** — Run `bun dev`, confirm scripts and HMR work
- [ ] **Test Docker build** — Build image with updated Dockerfile, verify production server starts

## Notes

- Bun is fully Node.js compatible for `server/index.mjs` — no code changes needed there
- `oven/bun:1-alpine` image includes Node.js compat layer
- `onlyBuiltDependencies` in pnpm-workspace.yaml (esbuild, sharp, @parcel/watcher) may need to be moved to a `trustedDependencies` field in package.json for bun
- The `.github/workflows/docker-image.yml` requires no changes since it delegates to Docker
