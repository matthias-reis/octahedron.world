```@@|
title: Federated Social Networks
description: >-
  Probably the first piece of SciFi is a story written by Johannes Kepler in the
  early 17th century.
date: 2025-05-02T00:00:00.000Z
colorSpace: cyan
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
alias: posts/2025/2025-05-02-federated-social-networks
slug: federated-social-networks
type: post
image: social-networks
```

We live in weird times. For over fifteen years, we have willingly given all
private information to organisations who made revenues out of placing ads and
selling this information. This went up to a level where theses social networks
have been used to manipulate Britain into the Brexit and Trump onto the throne.

But politics aside, far aside. How would a different world look like? What would
we have to do if we wanted to own our data and still interact digitally with
each other?

One consequence out of this big mess are a handful of protocols that define such
a social network, a network that is federated into many interacting but
autonomous instances and still allows discovery and exchange on a global level.

On the one hand, there is **Activity Pub**, a protocol based on W3C standards
developed by the Social Working Group, finalised around 2018 and used by many
Fediverse services like Mastodon, Pixelfed or Pleroma.

On the other hand we have the one-company driven **AT Protocol**, published in
2022 (first draft) and developed together with and for Bluesky (by the company
Bluesky PBC from former Twitter boss Jack Dorsey).

In this article - just out of curiosity - I want to dive a step deeper into both
of them, dive into the primitives, building blocks and principles behind the
protocols on an architectural level.

So as I said, politics and business aside. We dive into some technicalities
here.

> **Just one sidenote:** I will not go extremely deep into technical details.
> The flight level is supposed to be rather high in order to allow comparing the
> effects. Additionally, to find out how the protocols work, we don’t have to
> look deeply into how they are used at the time of writing. So don’t expect too
> much speculation on how centralized Bluesky is for a federated system etc.

## AT Protocol

The protocol that drives Bluesky is comparably sophisticated and goes relatively
deep into the architectural building blocks rather than only defining the bare
bone communication layer.

The general setup consists of the following acting entities:

- `PDS`es (Personal Data Servers) host the content that is being shared, your
  posts, images, interactions etc. together with their rich metadata.
- `Repo` s are quite similar to git repositories. A PDS hosts a repo for every
  user on that instance. They hold the emitted data of the user in an always
  consistent way. They are portable, i.e transferrable to other PDSes.
- `Relay`s collect and bundle information from all the PDSes and expose a huge
  single-point-of-truth stream of data called `Firehose`
- `Labeler` s are the moderation entity (marking NSFW, handling complaints
  etc.). They consume the firehose and expose additional metadata for the posts.
  What’s important is, that the original content is never being altered except
  by the owners themselves. Therefore Labelers emit additional datasets that can
  be included in the frontends/App Views.
- `Feed Generator`s are also consuming all information from the firehose. They
  are filtering incoming information, curate it, bring it in order and expose
  just a set of IDs - nothing more.
- `App View`s are the frontend applications. They usually consume the
  information of feeds, enrich the data - e.g. resolve the information behind
  the id from the Feed Generators and display that feed and all the other view
  domains like profiles as you would expect from a social network.

One key design principle seems to be that abstraction layers are created in
front of everything. On top of a PDS, there is a Relay, for example. But this is
also true for identifiers. AT is using `DID` URIs to target users or posts or
other resources. DID stands for Decentralised Identifiers and comes from a W3C
working group. The principle is that it’s unique and already contains
information about its resolver, not unlike web URLs. DID resolution is in theory
very similar to DNS.

But not DIDs are shared as visible idenitifers for profiles. It’s the more
legible `Handle`s you might be familiar with. That means you can easily change
your handle and still maintain the exact same personal repository. On the other
hand only the broker that resolves identifiers needs to know where your repo is
hosted. So also your data can move around different PDSes and still be resolved
in a consistent way.

This little architectural detail seems to provide a very important building
block for users being in charge of their data themselves. Switching to own
servers is easily possible with this.

A second aspect is modularisation. There is no such thing as an intransparent
algorithm as well as there is no user unfriendly sorting by date only. Instead
everyone can implement and use their own Feed Generator. And every use case
does. There are feeds just for photography, Tik Tok like short videos or even
discussions around the AT protocol itself. And many of them are open sourced and
analysable or even forkable. This is just one example of its modularity.

I won’t go too much into implementation details on how efficiently those modules
are built and on which technology they are based as it’s not really important.
There are some obvious downsides, because the design of the protocol alone
includes single points of failure. One of them is the Relay, the big firehose,
which is a stream that contains all change sets of all users.

When you build a feed generator for example, you have to parse all incoming data
(which appears to be about 2000 items per second at the moment). This can
currently only scale internally (by parallelising, sharding and caching
strategies).

I have a second example. As everybody owns their own data in form of a repo,
others need a way to receive that data and socialise with it. So the chain goes
through a discovery process (what is the actual HTTP URL to receive the contents
of a post with ID xyz) which is also a single point of truth and failure and can
only scale with extensive caching over time - the DID resolution.

The last interesting aspect of AT that is worth having a look should probably
have been the first. It’s about the `Lexicon`. A lexicon is a way to define the
shape/type a piece of data is allowed to have. It’s the language in whch all
endpoints and all data structures propagated by the AT Proto are defined, i.e.
the truth that every developer has to adhere to when building their own
implementation of a module within the ecosystem.

A lexicon is using a JSON based DSL to describe data structures not unlike JSON
Schema. It just adds some standardised metadata. More or less only two basic
semantic types are allowed:

- `Record`s describe all sorts of objects and their structure.
- Endpoints (`Query`, `Procedure` or `Subscription`) describe endpoints
  (XRPC/HTTP or WS api) by defining query params, input and output data
  structure as well as error cases.

The cool thing about Lexica is that they are composable by referencing other
Lexica through their NSID. I.e. a feed is an array of posts.

## Activity Pub

Activity Pub is based on Activity Streams, which is a W3C standard that existed
way before the first implementations showed up. It was an effort to define a
unified language to describe internet activity and extends other standards like
JSON-LD (that you might know from [schema.org](http://schema.org) markup).

The overall protocol is by far more lightweight than AT. It leaves a lot of
interpretation to the implementing service (like Mastodon or Pixelfed) and
therefore defines more of a baseline or common denominator than all the details.

However also here some design principles point to inherent advantages as well as
problems that we see in the real world apps.

But let’s start again with the building blocks:

First of all there are only two kinds of working units in the system:

- `Client`s are apps that display the information by querying and aggregating
  them in certain ways - nothing unexpected, I assume
- `Server`s or Home Servers are the nodes of the network. They deliver the
  information to the clients (client-to-server API) and exchange information
  with other nodes (server-to-server API).
- `Outbox`: A collection of activities that users (`Actor`s) have performed
  (create a post, follow, like …)
- `Inbox`: A collection of activities that actors are supposed to receive (e.g.
  new followers, replies)

And that’s already it. The Activity Pub servers form a network of equal nodes.
The protocol does not offer standardised ways to propagate content to everyone
(”broadcast”).

Probably the important aspect of the protocol is how federation works. Other
than one might expect from a decentralised system, it’s based on a push
principle rather than pull. For example if user A on server 1 follows user B on
server 2, then server 2 starts to push content of user B to server 1. From then
on it’s part of the server’s inventory and can and will be displayed to others
(on Mastodon for example in the federated timeline).

That means that connections are made by users and those connections only
exchange requested (followed) content, not all the content from the server.

Another aspect worth mentioning is how addresses (e.g. users) are resolved. The
protocol is using WebFinger. The identifying handle, for example
`@username@example.social` itself holds the information where to find all the
data of that account. As you might have noticed, this is one level lower in
terms of abstraction in comparison to the AT protocols DIDs. So one effect is
that a user and their posts are bound to an instance or at least it is
technically relatively complicated to move.

A last aspect concerns the objects (posts) that are exchanged. These are defined
in a separate protocol called Activity Streams which itself is based on JSON-LD.
Activity Streams defines some low level standard types (Note, Article, Image,
Video, …), but the definition regarding the actual content is rather loose. The
content of an article can be marked up as HTML for example or as Markdown or
Plain Text and it’s up to the client to interpret it correctly.

The types can be extended or augmented by own types but the Fediverse is diverse
and the likelihood that other clients can’t interpret the content and thus just
ignore the post is high. Therefore the likelihood that more complex types appear
is rather low. But still a Mastodon client can be used to browse Pixelfed
content with acceptable and functional UX.

A “one more thing” kind of thought comes from a feature that Activity Pub does
not have. Presenting curated content in a feed or a set of feeds is not
described in the protocol and therefore strictly local as well. This has led to
very rudimentary discovery experiences for example in Mastodon. There are
basically four types of feeds:

- The `Home` view shows everything you follow sorted by time
- The `Local` view shows everything that is published on one node (and therefore
  differs depending on the node you’re on)
- The `Federated` view in addition to the local feed shows everything that other
  people on the instance follow (so it also depends on the users of that node).
  That means operating an own node where you are the only user makes you
  relatively lonely.
- The ability to view and follow hash tags adds a fourth view to the game.
  Basically a filtered federated view to match the tag.

## Comparison

AT Protocol has two main features that are distinguishing it from Activity Pub:
Abstraction and Modularity.

Abstraction is a clear advantage, I would say. It’s probably in the long run the
core feature to really own your own content. With this, you’re free to move your
posts around and still keep them discoverable by others.

Modularity on the other hand has pros and cons. For example that content in a AT
Proto PDS is split into self contained User repos is a good architecture choice.
Also the possibility to curate content through independent Feed Generators is
positive, but it also implies single points of failure like the one firehose to
rule them all. In that case the more decentralised and more homogenous approach
of Activity Pub pays off.

Comparing the protocols alone gives you an indicator of how the real world
networks are most likely being used and where they are developing to. While the
AT Protocol provides modules that encourage wider spread, it fosters a bigger
global network while Activity pub stays centered to the node you’re on or to the
cozy community you belong to with limited options to see other content.

One final trade-off has to be mentioned that is inherent to federated content
and therefore affects both protocols. The system does not forget. You can’t get
rid of something that is public. You can delete posts in your instance but it is
not guaranteed that it’s deleted everywhere it had been federated to.

## The Real World

Enough of the theoretical overhead. How do the networks behave in reality?

First the size of the networks (I skip the sources as the dimensional
differences are so huge, a bit up or down doesn’t make a difference, it’s just
to get a feeling about the activity on the networks)

- **Instagram**:

  - Total Users: ~2 billion
  - Weekly Active Users (WAU): ~1.4 billion (est.)
  - Daily Active Users (DAU): ~400 million (est.)

- **TikTok**:

  - Total Users: ~1.58 billion
  - Weekly Active Users (WAU): ~1.1 billion (est.)
  - Daily Active Users (DAU): ~700 million (est.)

- **X (formerly Twitter)**:

  - Total Users: ~650 million
  - Weekly Active Users (WAU): ~400 million (est.)
  - Daily Active Users (DAU): 240–300 million

- **Bluesky**:

  - Total Users: ~35 million
  - Weekly Active Users (WAU): ~19.4 million
  - Daily Active Users (DAU): ~5.2 million

- **Mastodon**:

  - Total Users: ~9.5 million
  - Weekly Active Users (WAU): ~1 million (est.)
  - Daily Active Users (DAU): ~150,000 (est.)

- **Pixelfed**:
  - Total Users: ~726,000
  - Weekly Active Users (WAU): ~36,000 (est.)
  - Daily Active Users (DAU): ~5,000 (est.)

Bluesky is maintained and evolved by one company, Bluesky PBC, which is a
venture capital backed organsation. The likelihood that they don’t offer
everything for free forever is very high and I think that is the biggest point
of criticism they are facing.

Although there are theoretical possibilities for more than one Relay for
example, there is only one maintained by the company as of now. When the plug is
pulled there, the network is going dark.

The demand for information in the world (and therefore monetising social
networks) has shifted. We might not have to fear advertising that much anymore.
But a central firehose with all human generated interactions is perfect food for
AI, right?

Although older, Mastodon’s network is much smaller. Mastodon is demanding
activity from their users. It works best when your ratio between posting and
consuming is 50/50. But the world is different. Tiktok feels like 90%
consumption and 10% contribution. Also Bluesky allows for a different ratio as
there is more than enough to discover in the central firehose. That is the best
explanation I could come up with regarding the success level of the two
networks.

## Finale

I personally have left the big networks a while ago, X even before it was called
X. I like the coziness of Mastodon as well as the qualities of Bluesky. Probably
in the long run, I’d like to see both getting closer together and form a more
unified and robust Fediverse without “language” (protocol) barriers. But it’s
harder to bend protocols than to write software features.

My current guess is that in the long run AT Proto will be the winner and we will
have a second / third / fourth infrastructure backing the actual live network.
Hopefully also some that are considered “Public Infrastructure” rather than
equity owned goods. Projects like IndieSky and research efforts from e.g. the
European Union are already on the horizon.

The future winner will have to unite three aspects

- user friendliness and transparency
- control over your own content
- technical flexibility and openness for many different types of services

I’m curious where the ecosystems evolve to.
