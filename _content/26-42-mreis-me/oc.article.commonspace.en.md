```yaml @@
type: page
title: commonspace in a Nutshell
format: article
publishedAs: commonspace
language: en
description: What commonspace is, how it works, what it's done since May, and what makes it different — in one five-minute read.
image: 26-006-commonspace
imageShape: square
time: 2026-10-08T00:00:00.000Z
tags: []
relations:
  - rel: parent
    to: 26-42-mreis-me/work
```

commonspace is a platform for communities and events. I co-founded it in 2026
with two partners, and I'm responsible for the technology.

## The problem

Anyone who runs a community or organises events ends up stitching together five
separate tools: chat, posts and announcements, event listings, ticketing and
admission, and some kind of feedback loop. Each one is built for someone else's
product, not for the way a hackathon, a fan base or a professional user group
actually works. The alternative — building it yourself — means you now also own
hosting, notification delivery and analytics, on top of the community you set
out to run.

## What commonspace is

commonspace gives organisers a home for their community: real-time chat, posts,
events, registration and admission control, all under the organiser's own brand.
Members get one place instead of five. Think of what Shopify did for small
retail — now for events and communities.

## How it works

Two layers: a central discovery and account platform, plus any number of
independent community servers. Each community runs on its own server, so growth
in one doesn't put load on another and one organiser's data stays separate from
everyone else's. The backend is built around CQRS, which keeps that separation
clean as features get added. Organisers — and, increasingly, their own AI agents
— can operate the whole thing through MCP, not just through a dashboard.

## Traction

We started in spring 2026 with one concrete use case: hackathons for EDTH, the
European Defense Tech Hub. The first ran in Prague on 15 May, 95 guests, 27
teams. Since then: **18,000+ members**, **180+ events** on the platform, **17
hackathons** since May — Prague to Seoul and Taiwan — and a migration of **45
events in one go** when the whole community moved from the prototype onto the
current architecture on 1 September.

## What makes it different

**Agents, not just dashboards.** commonspace can be operated by AI agents
through MCP. In October, jury feedback for a hackathon went out to every
participant that way for the first time — a flow that used to cost an organiser
half a day became one prompt and an approval. Users can bring their own agents
for invites, promotion, page building or analysis, and stay in the driver's seat
the whole time.

**Independent community servers**, not one shared database every customer
competes for. Scale and isolation come from the architecture, not from more
hardware on a monolith.

**An open core.** The parts every organiser needs stay free and open; what we
charge for sits on top — enterprise extras like single sign-on and audit logs.

## Team

I co-founded commonspace with two partners in 2026 and lead the technology as
CTO.

## What's next

Short term: a proper self-onboarding flow so organisers stop needing a
one-on-one walkthrough from us, a built-in agent chat interface, and campaign
tracking so organisers can see which channel actually brings people in. Further
out: broader ticketing and billing, and the host community for our own customers
that's been on the list for a while.
