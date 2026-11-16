```yaml @@
type: page
title: Yet Another Social Network?
format: article
publishedAs: mosquito-social
language: en
description: Half a year after the Meetdown pitch, the idea had a name, a license and an architecture. What we were building at mosquito.social.
image: 26-011-mosquito-social
imageShape: square
time: 2026-03-05T00:00:00.000Z
tags:
  - Social Networks
  - Communities
  - AT Protocol
  - Fediverse
  - Architecture
relations:
  - rel: parent
    to: 26-42-mreis-me/posts
```

This is the second take on an idea I first sketched in
[Meetdown – A Pitch](/26-42-mreis-me/oc.report.meetdown-pitch.en). The why is
still the same: there is a big empty space between public social networks and
private messengers, and that's exactly where communities live. Meetdown explains
that part. This post picks up where it ended. The idea now had a working name,
mosquito.social, and the napkin sketch turned into building blocks, an
architecture and a plan for a first version.

## Filling Some Holes

It seems like a lot of organisers and attendees of meetups feel the same. They
contribute or foster a community for free. But then they have to pay for their
tools.

- For community managers it's relatively pricy to host events on a platform like
  meetup.com, and it even got pricier recently. So either they pay out of their
  own pockets or find long term sponsors.
- The only deal you get in return is a little bit of findability and publicity.
- Almost any type of community has additional tasks for which they need other
  tooling: Discord or WhatsApp for coordination (write to a potential speaker?
  Good luck), and something else again to share photos, slide decks or videos
  after an event.

## The Niche of Coziness

Social networks are a hostile place these days. You post something with a typo
in it, and you immediately get attacked. If the thought you have is unfinished
or too long, you get mocked or worst case ignored. And for every new idea you
have to find your audience again and again.

Now imagine a community you can pick or build up yourself. A closed space with
free exchange and the "Vegas Rule" (or any rule you want to apply). Free to
join, but you have to knock on the door. And additionally with the possibility
to meet in person and manage events.

That thought spawned more ideas about who could use such a platform:

- Families can share photos and videos of the last birthday party and stay in
  touch even if relatives live far away.
- Working teams can separate professional and personal exchange (and stay in
  contact with former peers).
- Developers can use it for their open source project (yes, we will be eating
  our own dog food).
- Artists and bands can stay in contact with their fan base. Imagine concerts
  being announced on the platform and you see who else is joining the event in
  your location.

## Idea in a Nutshell

Start a community in minutes, spread the word through the more public social
networks, then dive into the private space of your community. Inside it: events
with RSVP and calendar entries, a "Doodle"-like poll to find a time slot, and
payment at some point, because not every organiser can offer an event for free.
Plus a place to collaborate on documentation: meeting minutes, idea papers,
photos and slide decks.

The good thing is that a community is self-sufficient. You don't need a critical
mass of millions of users to make the concept work. A single community is enough
to get the project started. Discoverability only matters once it grows.

## Principles

Two principles from the Meetdown pitch stayed and got more concrete.

**Federation.** Decentralised nodes that talk to each other server-to-server.
That lets the system grow horizontally instead of investing in one monolithic
infrastructure, and communities that want even more privacy can host their own
instance. For the contracts between client and server and between servers, we
planned to stay compatible with the AT Protocol.

**Open source.** People should not be afraid of future costs, so the software
would be published under the Apache 2.0 license: free to use and free to modify.

## Two Kinds of Servers

Meetdown already hinted at an entrance ("Discover") and an area behind closed
doors ("Organise"). mosquito.social made that two server types.

### Search and Discover

**Discovery instances** (DIs) are the open portal for finding communities and
events. There will only be a few of them, in the beginning surely just one,
operated by us. A DI takes care of:

- Accounts: you can join several communities on different servers, so your
  account lives centrally, with single sign-on to every connected management
  instance.
- Discovery: search for communities and events, including a location based
  search with a map view.
- Feeds: news from communities, and public posts you can subscribe to.

### Plan and Interact

**Management instances** (MIs) are the private space of a community. There will
be many of them, so community data has to be portable: you can move a community
to another instance and all links still work. One instance can host one or more
communities.

Think of a community as a building with an entrance and a bulletin board at the
door. To the outside, it acts as a regular account on Bluesky or Mastodon, and
community managers can post on its behalf. Hashtags for communities and events
pull public posts back in: if someone posts about your event on Bluesky, it
shows up in the community's feed.

Behind the door, the community space offers the exchange tooling:

- a wiki-like documentation space
- a media library to upload and present footage
- polls, among others for finding time slots
- event management with RSVP, calendar entries and wallet passes
- an optional payment plugin for paid events and other fees
- real time chat on the federated Matrix protocol, with sub-groups and direct
  messages
- an internal feed, where members post privately and a community manager decides
  together with the author whether a post also goes public

## The Architecture: a History of Actions

The single source of truth for a community is a repository. The concept is very
similar to Git or Redux, and the AT Protocol implements it in a similar fashion.
It holds the whole history of activity: every transaction is an action, done by
an actor, with a name and a payload. Each type of action has a handler that
knows how to update the state, like a reducer in Redux.

Play the actions back in the right order and you get the current state, or any
state before it. That's also why moving a community to another instance, or
archiving it, only means moving that stack of actions.

An example: a community member spoke at the last event and now shares the slide
deck. They create a post and upload the deck, two separate actions. Another
member likes the post, a third action that increments the likes from 0 to 1.

For the system as a whole, the nodes should be easy to deploy and host, even by
non-experts, on many hosters and without special infrastructure like AWS or
Vercel. Ideally, updating an instance is a single script.

## A First Version

We weren't under time pressure, and learning to set things up properly mattered
as much as the product. So the core would be built more thoroughly than a
typical MVP, while the feature set would stay small:

- Accounts and authentication, the basis for everything else
- Creating a community in a few steps, on a chosen management instance
- A community landing page that says what it does and stands for, with a join
  button
- The community feed
- Events with descriptions, RSVP and a list of who takes part
- Simple observability: traffic per community, members, server load

Discoverability wasn't part of it. Communities can organise that themselves
until there's a critical mass.

A second phase would add payment (earlier if there's demand), the collaboration
space for footage and slide decks, polls, Matrix-based chat and storage figures
per community. Content federation between instances, search and the map view
would come later.

## What Was Next

1. Bring in design for a visual language, and a logo that is recognisable and
   creates some buzz.
2. Build the technical core: hosting, deployment, CI.
3. A staging platform with synthetic test data to validate every development
   step.
4. The first MVP features on top of that.
5. A community that acts as the first real world tester.
6. Funding and support to continue development.
