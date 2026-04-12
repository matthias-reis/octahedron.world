---
# octahedron.world-n26t
title: Load and Refine Raw Traefik Log Data
status: completed
type: task
priority: normal
created_at: 2026-04-12T11:21:03Z
updated_at: 2026-04-12T14:09:23Z
parent: octahedron.world-4jdu
---

Read all files from the `/logs` directory. Files ending in `.gz` must be
decompressed on the fly before parsing. Every line in each file is a
self-contained JSON document (NDJSON format).

## Log Format

Each line is a JSON object. Key fields:

| Field              | Type   | Description                                |
| ------------------ | ------ | ------------------------------------------ |
| `RequestHost`      | string | Target host (e.g. `octahedron.world`)      |
| `RequestMethod`    | string | HTTP method                                |
| `RequestPath`      | string | URL path                                   |
| `DownstreamStatus` | number | HTTP response status code                  |
| `Duration`         | number | Request duration in nanoseconds            |
| `RouterName`       | string | Traefik router name (e.g. `catchall@file`) |
| `StartLocal`       | string | ISO timestamp                              |
| `ClientHost`       | string | Client IP                                  |
| `entryPointName`   | string | `http` or `https`                          |

## Script

Create `scripts/analyze-logs.ts`:

- [x] Read file /logs/traffic.json
- [x] Glob all files in `/logs` (including `.log.<number>`, `log.<number>.gz`).
      Remember it under the name \*.log.<number> (i.e. ignore .gz in the file
      name)
- [x] If a file is already mentioned in /logs/traffic.json > parsedDocuments,
      skip it
- [x] Stream-parse each remaining file line by line (decompress `.gz` on the
      fly)
- [x] Parse each line as JSON, skip/log malformed lines
- [x] Extract: `RequestHost`, `RequestMethod`, `RequestPath`,
      `DownstreamStatus`, `Duration`, `RouterName`, `StartLocal`
- [x] Collect into a normalized record array
- [x] Output a first-pass `traffic.json` for inspection
- [x] Remember the name of the file in the traffic.json file under
      parsedDocuments

The file should live in /logs/traffic.json.

For this first pass, make an additional count analysis:

- the combination of RequestHost, RequestMethod, RequestPath, DownstreamStatus
  form an entity.
- Count how many times each entity appears in the logs.
- additionally aggregate the paths (e.g. request is example.com/foo/bar/baz,
  then example.com/foo/bar, example.com/foo, example.com are also incremented).
  But add the aggregations as separate entities. In the end sort the
  aggregations by count.

target format for now

```
{
    requests: [
        ...
    ],
    aggregations: {
        example.com: 25,
        example.com/foo: 10,
        ...
    },
    parsedDocuments: [...]

}
```

## Note: Next iteration

Based on the aggregations, we will refine the next ticket to allow filtering and
proper aggregations for further use.

## Summary of Changes

Created `scripts/analyze-logs.ts`:
- Globs `/logs/*.log*` (including `.gz` variants)
- Incremental: skips files already in `parsedDocuments` using canonical name (without `.gz`)
- Stream-parses each file line by line; decompresses `.gz` on the fly via `zlib.createGunzip()`
- Counts unique entities (host|method|path|status) and aggregates path prefixes
- Outputs sorted `{ requests, aggregations, parsedDocuments }` to `/logs/traffic.json`

Also added `analyze-logs` script entry to `package.json`.
