---
# octahedron.world-okjz
title: Build Log Analysis Frontend Dashboard
status: draft
type: task
created_at: 2026-04-12T11:21:13Z
updated_at: 2026-04-12T11:21:13Z
parent: octahedron.world-4jdu
blocked_by:
    - octahedron.world-cju5
---

SolidStart frontend page that consumes the log stats API and displays a dashboard: traffic overview, per-endpoint breakdown, status code distribution, and error highlights.

## Todo

- [ ] Create route `src/routes/logs.tsx`
- [ ] Fetch data from the logs API route
- [ ] Build overview stats section (total requests, error rate, top endpoints)
- [ ] Build per-endpoint table with sortable columns
- [ ] Add status code breakdown (2xx / 3xx / 4xx / 5xx)
- [ ] Add client-side filtering/search by path or method
