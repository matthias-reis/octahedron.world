```yaml @@
type: page
title: Sounds Vegan
format: article
publishedAs: sounds-vegan
language: en
description: A music and lifestyle blog with band interviews and a sustainability focus, on its third technical rebuild — React, Payload CMS, custom search.
image: 26-005-sounds-vegan
imageShape: square
tags: []
relations:
  - rel: parent
    to: 26-42-mreis-me/work
```

[Sounds Vegan](https://soundsvegan.com) is a music and lifestyle blog: band
interviews, editorial content, and a running focus on sustainability. It's been
live under one name or another for years — I've rebuilt its technical foundation
three times since I got involved.

## What the blog is

Band interviews, festival coverage and editorial pieces, with sustainability
running through all of it. Years of archive content that people actually search
for, not just browse.

## What I built

- The current stack: React (Next.js) with Payload CMS as the backend, replacing
  a line of earlier systems — WordPress, then Gatsby, then two custom CMS
  generations before this one
- A custom fuzzy search across the full archive, so a half-remembered title or a
  typo still finds the right interview
- On-page SEO built into the CMS itself: a global SEO defaults sheet covering
  title, description and social-preview image for any page that doesn't set its
  own, so nothing ships with an empty `<head>`

## The decisions behind it

Every rebuild of Sounds Vegan has had the same constraint: the archive is the
asset, and old links have to keep working. The move to Payload followed that
rule — content, assets and even fixed-path files like PDFs and media kits came
out of the codebase and into the CMS one piece at a time, with every URL pinned
throughout, so nothing broke for anyone who'd linked an article years ago. The
point of it all: whoever runs the editorial side can publish, fix an SEO
description or swap a social-preview image without a developer or a deploy.

## Outcome

The current stack is live and carrying the blog's full history. What's left are
change requests, not rebuilds.

## My part

Concept, architecture and implementation with React and Payload CMS, across the
blog's current technical generation and the two before it.
