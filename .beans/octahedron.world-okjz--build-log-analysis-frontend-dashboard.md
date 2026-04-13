---
# octahedron.world-okjz
title: Build Log Analysis Frontend Dashboard
status: completed
type: task
priority: normal
created_at: 2026-04-12T11:21:13Z
updated_at: 2026-04-13T07:48:15Z
parent: octahedron.world-4jdu
blocked_by:
    - octahedron.world-cju5
---

SolidStart frontend pages that consume the log stats API and display results.

The pages are simply structured.

- Navigation at the top
- Headline and Single KPI display: average of the current selection
- list of items with name and consistent bar

## Routes

We want to be able to route through all data as follows:

- `/logs` all (agg by quarter)
- `/logs/quarter/2026-1` quarter (agg by week)
- `/logs/week/2026-01` week.
- `/logs/day/2026-01-01` day.

Furthermore we want to be able to filter by route/domain combo. We do this with
the `f` query param.

For example:

- URL `/logs/week/2026-01?f=mreis.me` shows only the routes in domain mreis.me.
- URL `/logs/week/2026-01?f=mreis.me/posts` shows only the routes in domain
  mreis.me that start with /posts.

Both path and f param define the content to be shown in the list. See the list.

## Navigation

the navigation consists of one button, three dropdowns and an input field:

- all (links to /logs)
- quarter dropdown: The API contains a `firstDate` entry. Calculate all quarters
  between firstDate and now and display them. On change switch to that URL, but
  keep the Filter `f` query param.
- week dropdown: Similar approach. Display all weeks in that dropdown and switch
  to them.
- domains dropdown: List all available domains to choose from. On change, adapt
  the f parameter in the URL and trigger the repaint accordingly. E.g. selecting
  mreis.me leads to `f=mreis.me`
- paths input: this is meant to manually add a sub path. if the input does not
  start with /, add it. e.g. `posts` leads to `f=mreis.me/posts`. The input
  change will be sent with a debounce of 1s.

## Headline and Average

The headline shows exactly what is being displayed and consists of 2 parts.

Part 1: selected date range

- All Stats
- Quarter 2026-1
- Week 2026-01
- Day 2026-01-01

Part 2: Filter

- All Entries
- mreis.me/posts

In combination examples:

- `Week 2026-01 // mreis.me/posts`
- `All Stats // All Entries`

The single average number always displays the average DAILY status 200 visits
with one digit precision in german locale notation (e.g. `451,1` or `1.234,5` ).
It's the sum of all routes divided by the days.

Do not include the paths `other` (aggregations.{day}.other) and `assets`
(aggregations.{day}.{domain}.assets) into the calculation. Apply this to all
aggregated calculations on the page (there are more further down)

## List

The list of results shows output lines. Each line has

- linked name. the link leads to a change of filter, which allows navigation in
  addition to the top nav.
- horizontal bar (coloured div in grey div) with a relative length based on the
  max value in the list
- actual value (see below)

Depending on the viewed type, you see different entries in the list:

- all stats: lists all quarters, link goes to the quarter, the values are the
  average daily views in the quarter.
- quarter: lists all 13 or 14 weeks. Link goes to the week,Value is the average
  of all 7 days in the week.
- week: list all seven days, link goes to the day, value is the sum of the day
  again without `other` and `assets`. After that, list all http status types
  other than 200. E.g. a small `404` label and the number below. But make sure
  that all horizontal bares are stached exactly below each other to make them
  comparable.
- day: list all paths including domain (e.g. mreis.me/posts/foo-bar-baz), link
  applies the path as filter. Als display the other status codes.

Again for the calculation - to repeat: all of the displayed line and average
values are applied with the current filter in mind.

Visual appearance: It's important that the bars are forming some sort of a
chart. Therefore the lines should not be too far apart. The design therefore has
to be compact but stay readable anyway. It's ok if it only works on big screen /
scrolls horizontally.

## Todo

- [x] Create all static and dynamic routes under `/logs/*`
- [x] Fetch data from the logs API route
- [x] Create navigation and recalculation/relayout flow
- [x] prepare data based on parameters (calculate averages, create renderable
      list)
- [x] render the list and create the bar component.

## Summary of Changes

Created 8 new files implementing the traffic log dashboard:

- **`src/components/logs/traffic-utils.ts`**: Pure utility module with ISO week calendar helpers, filter parsing, `sum200`/`sumNon200` data extractors, KPI computation, German number formatting, list item builders, and `buildTrafficPageData` master function.
- **`src/components/logs/traffic-server.ts`**: `query()`-wrapped fetch functions for all four API endpoints.
- **`src/components/logs/traffic-page.tsx`**: Shared page component with `TrafficNav` (All button + quarter/week/domain dropdowns + debounced path input), `TrafficHeadline` (view label + filter label + avg KPI), compact bar rows, and non-200 status rows for week/day views.
- **`src/routes/logs.tsx`**: Minimal layout wrapper.
- **`src/routes/logs/index.tsx`**: All-stats view (aggregated by quarter).
- **`src/routes/logs/quarter/[q].tsx`**: Quarter view (aggregated by week).
- **`src/routes/logs/week/[w].tsx`**: Week view (7 days + non-200 rows).
- **`src/routes/logs/day/[d].tsx`**: Day view (per-path rows + non-200 rows).

Filter via `?f=` query param is applied client-side. Navigation preserves the filter when switching quarters/weeks.
