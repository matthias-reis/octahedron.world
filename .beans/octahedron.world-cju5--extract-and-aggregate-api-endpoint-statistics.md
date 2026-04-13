---
# octahedron.world-cju5
title: Extract and Aggregate API Endpoint Statistics
status: completed
type: task
priority: normal
created_at: 2026-04-12T11:21:09Z
updated_at: 2026-04-12T16:40:10Z
parent: octahedron.world-4jdu
blocked_by:
    - octahedron.world-n26t
---

Create an API endpoint under /api/traffic-stats.

The general concept is based on four different time aggregates:

- day: single day, no aggregation needed
- week: seven days starting on Mondays, not aggregated
- quarter: always 13 weeks, starting with calendar week 1, 14, 27 and 40. The
  last quarter sometimes has an additional week. aggregated to weeks
- all: all data aggregated via weekly average into quarters (this would remove
  the length variation in Q4)

The API would look:

- `/api/traffic-stats` all (agg by quarter)
- `/api/traffic-stats/quarter/2026-1` quarter (agg by week)
- `/api/traffic-stats/week/2026-01` week.
- `/api/traffic-stats/day/2026-01-01` day.

Be aware that the data format is up to 3 levels deep <domain> . <route> .

<statuscode>.

So also the aggregation has the same levels.

## Consolidation

The stats in the json file hold the data for every day. On request:

- read the file
- if aggregation is needed, do it
- then send the result as json

In case there is no file, send a status 501. In case there is no quarter, week,
day under the requested name, send a status 404.

## Result Shape

```
{
    type: "day" | "week" | "quarter" | "all",
    aggregations: {
        "<dayname | w{year}-{w} | q{year}-{1|2|3|4}>": {...}
    }
}
```

## Summary of Changes

Created the following files:

- ****: Shared utility with types, calendar helpers (ISO week/quarter math), merge/average helpers, and `loadTrafficData()`
- ****: `GET /api/traffic-stats` — groups all days into weeks, then averages weeks into quarters
- ****: `GET /api/traffic-stats/quarter/{year}-{1-4}` — returns per-week aggregations for the quarter
- ****: `GET /api/traffic-stats/week/{year}-{ww}` — returns raw daily data for the 7 days of the ISO week
- ****: `GET /api/traffic-stats/day/YYYY-MM-DD` — returns single day data

Error handling: 501 if traffic.json missing, 404 if requested period has no data, 400 for bad params.
