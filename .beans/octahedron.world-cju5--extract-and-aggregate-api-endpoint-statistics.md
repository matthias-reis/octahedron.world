---
# octahedron.world-cju5
title: Extract and Aggregate API Endpoint Statistics
status: draft
type: task
created_at: 2026-04-12T11:21:09Z
updated_at: 2026-04-12T11:21:09Z
parent: octahedron.world-4jdu
blocked_by:
    - octahedron.world-n26t
---

Read the consolidated `logs.json` and aggregate by endpoint. Compute per-endpoint statistics and expose them via a SolidStart API route.

## Todo

- [ ] Define aggregation output schema (method, path pattern, request count, status distribution, p50/p95 duration, error rate)
- [ ] Implement grouping by method + normalized path (collapse dynamic segments like IDs)
- [ ] Compute per-endpoint statistics
- [ ] Create API route `src/routes/api/logs.ts` (or `api/logs-stats.ts`)
- [ ] Verify endpoint returns correct JSON in dev
