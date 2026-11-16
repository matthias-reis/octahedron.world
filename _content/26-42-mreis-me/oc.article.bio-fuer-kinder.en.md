```yaml @@
type: page
title: Bio für Kinder
format: article
publishedAs: bio-fuer-kinder
language: en
description: A SaaS platform for caterers planning organic meals for kindergartens and schools — twelve years running, now on Payload CMS.
image: 26-008-bio-fuer-kinder
imageShape: square
tags: []
relations:
  - rel: parent
    to: 26-42-mreis-me/work
```

Bio für Kinder helps caterers who cook organic meals for kindergartens and
schools plan what's for lunch — and everything the kitchen needs to get there.
The platform, [biospeiseplan.de](https://biospeiseplan.de), has been my client's
since 2014, and I've built every major version of it since.

## The problem

Planning organic meals for dozens of institutions means juggling recipes,
seasonal availability, nutrition requirements and a shopping list that has to be
right every week, for every kitchen. Doing that on paper or in spreadsheets
stops scaling the moment you're serving more than a handful of schools.

## What I built

- Meal and cooking plans for kindergartens and schools, built from a recipe
  library
- Cost and nutritional values aggregated automatically per plan, so a kitchen
  sees the real cost and nutrition of what it's serving before it's served
- A shopping-list wizard: pick a date range, the system pulls every ingredient
  needed across that period, groups it, lets the kitchen fix quantities and
  prices, then hands over a list ready to print and shop from
- A CMS for the editorial side — seminar listings, recipe articles, video
  content — so content changes don't need a developer

## Technical decisions

The platform has outlived several of its own technology choices, which is normal
for something running over a decade. The latest major version moved content
management onto Payload CMS — the same move I made for
[Sounds Vegan](/26-42-mreis-me/oc.article.sounds-vegan.en) — while deliberately
leaving the older backend running in parallel for recipes and user data.
Rewriting a live, paying client's backend in one go is a good way to break it;
running the new CMS alongside the old backend let the editorial team start
working in the new system straight away, while the rest of the migration happens
in its own, lower-risk steps in the versions after.

## Outcome

The Payload version shipped and went to the editorial team to fill with content;
the current round is follow-up changes on top of it. Twelve years in, the
platform is still what the client runs their actual kitchens on.

## My part

Concept, architecture and full-stack implementation, across every version since
the first.
