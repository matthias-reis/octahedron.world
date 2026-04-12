---
# octahedron.world-n26t
title: Load and Refine Raw Traefik Log Data
status: draft
type: task
priority: normal
created_at: 2026-04-12T11:21:03Z
updated_at: 2026-04-12T11:33:11Z
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

- [ ] Read file /logs/traffic.json
- [ ] Glob all files in `/logs` (including `.log.<number>`, `log.<number>.gz`).
      Remember it under the name \*.log.<number> (i.e. ignore .gz in the file
      name)
- [ ] If a file is already mentioned in /logs/traffic.json > parsedDocuments,
      skip it
- [ ] Stream-parse each remaining file line by line (decompress `.gz` on the
      fly)
- [ ] Parse each line as JSON, skip/log malformed lines
- [ ] Extract: `RequestHost`, `RequestMethod`, `RequestPath`,
      `DownstreamStatus`, `Duration`, `RouterName`, `StartLocal`
- [ ] Collect into a normalized record array
- [ ] Output a first-pass `traffic.json` for inspection
- [ ] Remember the name of the file in the traffic.json file under
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
