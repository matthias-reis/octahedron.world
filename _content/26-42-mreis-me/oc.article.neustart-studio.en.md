```yaml @@
type: page
title: Neustart Studio
format: article
publishedAs: neustart-studio
image: 26-007-neustart-studio
language: en
description: One-page websites for local trade businesses, pitched by showing the finished page first — a side project with Hein.
imageShape: square
time: 2026-11-10T00:00:00.000Z
tags: []
relations:
  - rel: parent
    to: 26-42-mreis-me/work
```

[Neustart Studio](https://neustart.studio) is a side project with my friend
Hein: one-page websites for small German trade businesses — plumbers,
carpenters, hairdressers, the kind of Handwerksbetrieb that has no website yet,
or one that hasn't changed since 2012.

## The idea: show it before you ask

Most agencies pitch a website with a slide deck and a quote. We skip straight to
the part that actually convinces someone: we build the page first, with their
own name, services and photos already in it, and send them a link to their own
homepage before they've agreed to anything. The decision gets easy once they're
looking at a site that already exists.

## How it works

A small pipeline, mostly run by AI agents working from files rather than a chat
history, so either of us can pick a run back up where it left off:

1. **Research.** Find local trade businesses with a weak or missing web
   presence, score them against our own criteria, and write up a short profile
   for each one worth pursuing.
2. **Build.** Turn one profile into a live preview at
   `neustart.studio/<their-slug>` — their own content, not a template with
   placeholder text.
3. **Learn.** Feedback on what worked, or didn't, turns into changes to the
   scoring and research rules, not one-off fixes.

The site itself runs on Astro and Bun, with the previews and everything behind
them in a plain SQLite database rather than a stack of services — the point is
to keep it cheap and fast to run, not to build a platform.

## Why this, and not a second company

I'm a few hours a week on this with Hein, not building a business next to
commonspace. It's a project and a craft: how do you generate and pitch a
personal preview site fast enough that doing it for one more lead costs almost
nothing. If it ever opens a door to paid work for either of us, that's a bonus,
not the plan.

## My part

Concept and the pipeline — research, page generation, the agent tooling behind
both — built with Hein, who leads naming, outreach and client judgement.
