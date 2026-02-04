```@@|
title: Meetdown - A Pitch
description: >-
  Somethig seems to be missing in the landscape of social networks. So why don't
  we try to build it?
date: 2025-09-08T00:00:00.000Z
colorSpace: red
tags:
  - Meetup
  - Social Networks
  - AT Protocol
  - Activity Pub
  - Communities
  - Pitch
  - Fediverse
  - Content Federation
group: social-networks
superTitle: Social Networks
alias: posts/2025/2025-09-08-meetdown-pitch
slug: meetdown-pitch
type: report
image: social-networks
```

> Annotation before we dive in: Meetdown - the name - is meant as a pun, like
> Markup -> Markdown. It has a slightly negative connotation. Therefore it's not
> a name proposal. That would be one of the first tasks to actually find a name.
> So please don't get acquainted to it too early if you read this.

# On Networking

Let's create some context first. **Networking**, the term, gives me vibes of
overhyped modern business exchanges or influencer mingling (hello, LinkedIn). It
appears to be about creating connections rather than maintainig them. But of
course that's not at all what it is and should be in the core. We should rather
see it as the vital social interactions we all need extended by the
possibilities of the digital world.

Social networks and Communities are an entierely natural phenomenon. They have
always existed, ages before the wheel was invented (probably by a group of
people collaborating together).

The internet and the social platforms made it easier to get in contact, but
probably harder to maintain a deep connection. Two even bigger aspects are
derived from the asymmetry of connections. If you meet in person, both have the
same space and activity level, while a creator on TikTok has a big and rather
anonymous crowd on the opposite side. Also consuming versus interacting plays a
big role in social networks.

I wanted to see these Aspects play together and refined those two criteria to
describe current networking practices to be able to take a more analytical look:

- **Create/Consume Ratio**: How much does everyone actively contribute vs. how
  much do you listen and digest? Are a few content creators opposing millions of
  consumers or is everyone in a group actively involved in playing a board game?
- **Proximity**: How close are the members of a community to each other? This
  includes both physically and mentally. On the internet the distance is huge
  while e.g. in a maker community people might work closely hands on together
  and in a family, all members are close even if they are thousands of
  kilometers apart.

If you now plot those criteria on two axes, something interesting happens.

![Networking Context](_meetdown-network-matrix)

I've added some examples of social interactions. TV and streaming networks seem
to be the one extreme. A few creators are producing content for a big anonymous
mass.

This is closely followed by social media platforms like Instagram or TikTok and
the more interactive text networks like Bluesky, Mastodon or X.

On the very opposite side, however, there is instant messaging. The people in
those conversations are usually very close to each other and the exchange is on
eye level. But those media usually don't have functionalities to make contact.
You can (with some exceptions) only chat if you know the other side already.

The aha moment lies in the big empty space between those worlds, the region of
communities and likeminded people. While there are some commercial services that
play in that area (thinking of meetup or discord), that space is heavily
underrepresented.

And that's also the gist of this long introduction. Let's dive into this
potential.

# Missing Links

Well, almost. Let's recap and speculate first what might be missing:

- **Group Formation**: Finding likeminded people in your city, in your
  neighborhood or in your field of interest.
- **Public vs. Private**: Communities often have internal affairs, but also want
  to publish information or be loud in the outer world. And as a community they
  also might be heard better than as individuals in the other social networks.
- **Offline vs. Online**: Just like in modern work environments, you also want
  to have a good mix of asynchronous exchange in an online setting and meeting
  people in real life.
- **Levels of Engagement**: Not everyone wants to be and can be equally active
  in a community. Some just want to listen, some want to help organising, some
  want to be founders or part of the core team. All of them should be able to
  find their place and their means of communication and exchange.

**So we need to bridge the gap.**

# Pitch

**What do we want to build?**

## A Place to Organise Meet-ups and Steer Communities

Start something

- Create the community of your choice and invite people to it
- Organise events offline as well as online
- Promote events through other social media platforms
- Notify people about news and activities

Be part of something

- Find the right community for yourself (based on your location and interests)
- Find an interesting event nearby
- Simple authentication (e.g. with your other social accounts)
- Join and contribute as soon as you have found your spot

## Effective Exchange and Publicity Tooling

The platform Meetup.com is a significant contender in this space. But (besides
its commercial goals) it lacks some features that would make it a great tool for
communities.

- means of closed asynchronous communication beyond events (chat groups,
  messaging)
- a serious documentation space
- ownership. Information created by the community belongs to the community
- close integration into the social media landscape (federation)

# More Features, Details and Principles

## Part of a Federated Social Network Ecosystem

![Fediverse Network](_meetdown-fediverse)

The solution should embrace existing protocols like Activity Pub (Mastodon) or
AT (Bluesky). It should re-use existing tooling and infrastructure as good as
possible and extend them only if needed. This allows building on a strong
technical foundation backed by many great engineers. We also leverage the
greater developer community that contributes to those services.

Posting announcements to the Fediverse on behalf of a community or on behalf of
an event should be easy and seamlessly baked into our solution, displaying the
stream of the official hashtag of an event as well.

## Free and Indie - Open Source and Non Profit

![Free to use and Open Source](_meetdown-open)

We want to build open source software free to use by everybody who wants to form
a community or support others in doing so. We don’t want to and most likely will
not earn money with that idea.

Disclaimer: We won’t get rich, but we will help people find each other.

Hosting costs money, but a decentral approach might put this onto many shoulders
backed by donations and sponsorship rather than equity.

But especially all contributors of course would donate their time and expertise.

## Self Hostable - Roll Your Own Instance

![Self Hosted and Easy to Update](_meetdown-self-hosted)

That automatically brings me to the next must have:

The to be created product should be part of a decentralised network of community
management instances. It should be modular and self-hostable.

One goal is to provide easy to use dev-ops recipes for setting up and updating
an own instance of the ecosystem. Another goal is to provide artefacts
(specialised server modules) that collect information from all the decentral
systems to make them discoverable again (e.g. though a comprehensive location
based search). I.e. a system for content federation.

To leverage that we go protocol first (and implementation details later), like
the other federated networks do. It even might make sense to build everything on
top of some of the other's protocols (AT is very flexible, for example).

## UX as First Class Citizen

![User Experience and excellent Design](_meetdown-ux)

A collaboration tool should be easy to use - not only by tech savvy people.
Especially if several aspects and modules from different sources are combined,
the UX and a well crafted design language are key and can even replace some
marketing move.

As we don't have commercial interests, I think we do not necessarily have to
adhere to or copy from existing patterns with our design and ux patterns. We can
be more courageous, experimental and trend setting.

Both - good design language and new patterns - might help us to get attention
that we'd otherwise would have to buy with non existent marketing budget.

# First Thoughts

Not even the name is set in stone as of now. This is just a pitch or a first
vision, the napkin sketch before you buy a canvas for an oil painting. But
ideas, associations and potential leads are flying in with every minute of
research. So here’s a list of some first possibilities:

- Software Architecture: Not one monolithic system, but at least two building
  blocks. An entrance (”Discover”) and an area behind closed doors for members
  (”Organise”)
- Operations: Hosting the first servers in Europe and avoiding dependencies to
  proprietary infrastructure like AWS or Vercel
- First Guinneapig: Making the Hamburg Dev User groups (HH JS, React HH, Ruby
  HH) potential contributors and then also the first users.
- Extensible: Easy to add permission plugins that could leverage payments at a
  later stage. Some events just can’t be provided for free.
- System Architecture: Leverage existing chat ecosystems like Matrix
  ([https://matrix.org/](https://matrix.org/))
- Product Ideas: Align on dates and calendar clashes by providing a solution
  like doodle ([https://doodle.com/](https://doodle.com/))

# What we need

## A Name

The name must be the first thing. With that we can reserve a domain, create a
Github Orga and a Discord server for internal discussions. And with the name
comes the logo and the design language follows.

## AI Concept

We want to take the project as an experiment on how far we can get with AI. And
with AI I don't mean vibe coding (and its negative connotation), I mean moving
fast and having some experts that constantly check if it goes into the right
direction.

We work together with AI. We will surely include `Opus` in our architecture
discussions. But we never let the AI decide anything.

## Contributors

And therefore we need hooman brains. At least some likeminded people in a core
community.

We want to build a platform for communities, but we also would like to approach
this as a community. Therefore we need contributors who’d like to donate some
free time:

- Designers, UX experts and product people who are willing to create something
  sustainable and inclusive
- Passionate frontend devs and architects who can align on a streamlined set of
  technology and frameworks
- Backend and DevOps experts willing to work on services that are integrated
  into a bigger social media landscape as well as serializable tooling

Let’s return the power of community into the hands of the people. Join us today
and help shape the future of human connection and growth.

## Contact

Want to hear more or get into discussion?

Ping me:

- on bluesky: `@octahedron.bsky.social`
- on Mastodon: `@matzee@norden.social`
