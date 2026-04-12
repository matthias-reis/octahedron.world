---
# octahedron.world-4sk8
title: Refine Aggregations in analyze-logs.ts
status: completed
type: task
priority: normal
created_at: 2026-04-12T14:20:16Z
updated_at: 2026-04-12T14:58:37Z
parent: octahedron.world-4jdu
blocked_by:
    - octahedron.world-n26t
---

Based on the first-pass output in `logs/traffic.json`, refine the aggregation
logic in `scripts/analyze-logs.ts`. Start from scratch, so get rid of the
previous aggregaion logic.

## Grouping by DAY

Our smallest time unit is one day. Therefore aggregations and counters are
grouped by day. Extract the day from the time format and assume CET as the
relevant timezone to determine the day. The relevant data in each log line can
be found under `time`.

## Filtering and Aggregation

Now let's dive into the aggregation and filtering logic. that are done daily.

Create a top level config variable "CANONICAL_HOSTS" which are `mreis.me`,
`octahedron.world`, `beta.soundsvegan.com`, `soundsvegan.com`.

All other hosts are filtered out. But counted under `aggregations.{day}.other`
in the format {[http status]:count}, e.g. {200: 10, 404: 50}.

The next entries are by canonical host, i.e `aggregations.{day}.{host}`.

Below that, we have the request counts including status code, e.g.

```
{
    aggregations: {
        "2026-04-12": {
            "mreis.me": {
                "/": {
                    "200": 10
                },

            }
        }
    }
}
```

Additionally create an `assets` bucket. In that we collect (count) routes that
are not relevant for the dashboard.

For now, add the routes `/_next/*` and `favicon.ico`. Add this config (array of
path globs?) to the top of the script to make it extensible, e.g when technology
changes.

## Reference

- Edit: `scripts/analyze-logs.ts`
- Input/output: `logs/traffic.json`

## Summary of Changes\n\nRewrote aggregation logic in `scripts/analyze-logs.ts` from scratch:\n- Removed flat `requests[]` array and old flat `aggregations` map\n- Added `CANONICAL_HOSTS` config constant at top of file\n- Added `ASSET_PATH_GLOBS` config constant (`/_next/**`, `/favicon.ico`)\n- New output: `aggregations[day][host][path][status] = count` for canonical hosts\n- Non-canonical hosts counted under `aggregations[day].other[status]`\n- Asset paths counted under `aggregations[day].assets[path][status]`\n- Day extracted from `StartLocal` field using Europe/Berlin timezone (CET/CEST)\n- Kept incremental `parsedDocuments` tracking unchanged
