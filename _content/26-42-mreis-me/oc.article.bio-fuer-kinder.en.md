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

The platform, [bio-fuer-kinder.de](https://bio-fuer-kinder.de), and its
organisers, Tollwood Munich, have been my clients since 2014. I've built every
major version of it since then, together with my colleague who does the project
management and QA.

## What it does

The platform uses a set of recipes that are tailor-made for catering for
children and organises everything into a weekly plan that adheres to all
nutritional rules and best practices for mass cooking.

It's built from the smallest building blocks (ingredients) and can calculate
relevant results such as:

- costs and shopping carts
- nutritional values (carbs / fats / proteins)
- warnings (when exceeding certain rules in the plan)

Every user can then adapt the recommended plan.

## Iterations

We worked together with several chefs and catering experts to get into every
detail of kitchen organisation and calculation.

The first version went live in 2014: PHP and Symfony on the server, jQuery and
Tilion, a small framework of my own, in the browser. In 2021 I restarted the
codebase on Firebase (database and hosting), with a GitHub-based flow for the
few editorial changes (Tina CMS), and Next.js and MUI in the frontend.

By now we're at V5, with:

- Our own hosting
- Postgres and Payload CMS
- Tailwind replaced MUI
- A big face lift

Over time I continuously renewed parts of the architecture to stay up to date
with the latest tech. Especially in the React world, a lot has happened since I
started planning the first version in 2014.

Some of the core features (like the Firebase authentication) are still waiting
to be picked up in a future iteration.

## My part

Concept, architecture and full-stack implementation, across every version since
the first.
