---
superTitle: Worldbuilding
title: The Mesh - Worldbuilding for a Cyberpunk World
description:
  A vision of a hypothetical metaverse-esque three dimensional internet
colorSpace: red
startDate: 2022-05-18T00:00:00.000Z
date: 2022-12-21T00:00:00.000Z
related:
  - operator
  - tattoos
tags:
  - Cyberpunk
  - SciFi
  - AmWriting
  - Worldbuilding
  - Storyline
group: mesh-worldbuilding
alias: storylines/mesh
slug: mesh-worldbuilding
layout: lightbox
image: mesh-worldbuilding
---

I'm a developer and computer guy, so it's only natural that the most fascinating
genre in science fiction for me is Cyberpunk. My favourite novel - hereby
recommended - is Neal Stephenson's "Snow Crash".

The coolest part in this type of story always was the 3D version of the internet
in there - like the "metaverse" but much cooler, darker and also filthier. Just
like the real internet was before it was dominated by 5 mega sites.

We're still not there - nothing is 3D. Nobody (including Zuck) has even shown
off a realistic concept. We might be right ahead of a big shift in that
direction. I'm waiting for those apple ski goggles to become useful. But for
now, it's still imagination.

My imagined version of a Cyberpunk internet (starting after I had read Snow
Crash and Neuromancer in 1992) is called "**The Mesh**" and throughout the
course of this small essay, I show off some of its details.

## Geometry

The virtual world is a giant torus with exactly the same surface as the earth.
The measuring is decimal and uses units (**u**) which are equivalent to 1 meter
and klicks (**k**) for kilometres.

The form factor of the torus is **7**. So the tube ends up with a radius of
**929 k** and the inner radius (the hole) is **6504 k**.

The tube is split into 512 sectors, which results in a width of **11,4 k** per
sector. The torus has 4.096 sectors. Therefore on the outside equator, the
sectors are nearly squares.

Sectors have a unique address written as `@ttt.TTT`. `ttt` represents the tube
segment in octal (as lower case letters `a..h`). `TTT` represents the torus
segment in hexadecimal (as numbers and uppercase letters `0..9A..F`). Valid
addresses look like this: `@had.14D`. You can imagine what the tube segment
`@bad` has to offer, right?

Now let's zoom in a bit more into my very own metaverse clone. We've learned
that one sector has a length of 11.4 k. This area again is split into 256 x 256
so-called **areas**. Each around 44 x 44 u (meters) in size (a bit less on the
inside of the torus as mentioned). With that addition, the formal addresses are
complete. Four additional hex digits now form the full location like
`@had.14D.00.1a`.

Just like today's IP addresses, these formal ones may have easy-to-remember
aliases. The most well-known one is surely `@root`, the global main entrance to
the mesh welcoming all newbies.

Each area is hosted on a dedicated server or cloud space including all its 3d
information. Unmaintained or better unclaimed areas are forwarded to a generic
landscape generating server. Whenever your avatar moves around in the mesh, it
is located in one of the areas.

There is only one contract between areas. **6 u** (units) in the exact middle of
each side of a square have to stay open to be able to move from one area to the
next. That's where usually streets go through.

## Moving in the Mesh

As mentioned, an avatar can travel between two areas by stepping over the 6 u
wide gap in the middle of each side of the area square. This happens more or
less without noticing.

But there is another way of reaching a certain area. You don't have to walk
around the whole world to reach a certain place. Every area is filled with
streets and buildings and public art and lights etc. One of these constructs is
a portal. Each area has exactly one of them. The owner of the area is
responsible for the look of that portal but there has to be one and it follows
some rules.

It's always a door - minimum 2 u high and 1 u wide. It is placed anywhere in the
area. And in eye height at 1.5 u there has to be a well-visible standardised
portal sign. Other than that, portals are creative spaces for their architects.
Some just resemble backdoors or weird standalone objects, others are landmarks
like the pyramids.

You can step through the portal and then choose your destination and travel to
the other side of the doughnut in an instant.

Speaking of Avatars. After the first exercises, where test users had been given
the ability to design their own characters, it turned out that people tended to
experiment. Some of them created disproportionally huge or much too small
avatars.

After that, the designers of the mesh added restrictions. An Avatar, which is
the representation of a user in the Mesh must be between 1 u and 2 u in height
and a maximum of 1 u in width and depth. The minimal portal sizes are based on
these values.

Up to today, these are the only restrictions. If you walk along the streets of
the more crowded areas, you see many different characters ranging from
photorealistic to exotically fluffy. Most people even have several avatars they
can choose from when entering the Mesh. One of the photorealistic types is
usually always in the portfolio.

Clothing is a big topic as well and because you can already express a lot of
individuality with it, the realistic avatar is being picked 19 out of 20 times.

The Mesh has four attraction points on its outer equator - South, West, North
and East. The southern centre is `@root`, the default entry point if you log
into the Mesh. It is therefore the largest travelling hub. Most people enter
here just to directly transit through its portal to other destinations.

But there are also quite some attractions located around that spot - mainly for
the newbies and occasional surfers.

If you visit the mesh often - and that is the majority of over a billion users -
you most likely have a home base. This is a flat, an apartment or your own house
built somewhere in the vast regions of the mesh space. In case you have that,
you always respawn in there after a new login.

For most people, the home base has much more functions than only an access
point. It's a central message hub and often has facilities to control other
things inside or outside the mesh from setting the indoor temperature in your
real flat at home to organising your week. It is like a mixture between the old
desktop screen on a two-dimensional computer and a personal assistant.

## Coding

When the Mesh and its predecessors had been introduced, the way how content was
created changed drastically. Before that, the web had consisted of semantic
text, most of the time dynamically controlled by software that ran on servers or
in a browser.

With the introduction of three-dimensional virtual realities, developers also
had to consider the space and the representation of their data in it.

The Mesh is still an open, decentral net. To allow a homogenous virtual
impression of such a heterogeneous situation, the managing consortium introduced
a development standard called UNO, **Unified Net Objects**.

This standard splits the 3d world into a huge tree of nodes that permanently
change. Each node in there is represented by three characteristics:

- its **look and feel** including its relation to its children and parent nodes
- the **data** that it stores
- and the possibilities of how it could **interact** with data and environment
  aka. the code.

Writing programs for the Mesh is more complicated and fuzzy than in previous
versions of the internet.

In former times, coding was precise. A developer controlled every single pixel
and every interaction. But the surface of a 3D world is much bigger than a web
browser's interface. The Mesh can be entered with devices from watches to
immersive suits. Each of them comes with different ways of dealing with the Mesh
space.

Therefore a good part of the interaction between different objects in the Mesh
is controlled by the Mesh's core software itself. Developers could do, but
rarely do detailed motion studies to tweak micro movement curves of objects.
These days, that is the realm of AI. Aspects like facial expressions or body
gestures are derived from live or trained video footage and applied by an
artificial intelligence algorithm.

Developers and designers are plumbing the pieces together. Additionally, there
are huge libraries of basics to choose from. Devs can concentrate on the 20%
that make the difference. And the stars among them can do real magic with it.

## Structure and Texture

We already know that the Mesh is a giant doughnut, But I want to give you some
more details.

The Builders wanted to introduce as many different sceneries as possible. That
is why they chose the for of a torus. The doughnut is rotating around one axis
in a daily cycle and around the symmetrical centre in a yearly cycle and it's
illuminated by a giant sun from one side. This creates the effect of day and
night and sometimes even a tube eclipse. Then the shadow of one tube side casts
a shadow on some areas on the other side.

In addition, the torus has four spokes on the inside and in the centre of it
all, there is a spherical core. The spokes are small compared to the diameter of
the doughnut tube but gigantic when you stand right in front of one of the
sockets. All of this central construction contains the management and
controlling facilities to run the mesh - from teleportation logic to search
engines. Companies who build infrastructure to run the mesh have their home turf
inside a spoke or even in the core sphere.

The freshly created pristine Mesh contained virtual landscapes that resembled
different regions of the earth from Antarctica over deserts to rainforests.

There is one unifying element, a gigantic river called **Lethe** that spans the
whole outside equator of the Mesh doughnut. The river is in some areas as wide
as an ocean but in other areas as small as 10u.

Besides that, you can find wide land, hills and mountains, forests and other
rivers and lakes all of which in the end lead into the Lethe.

In the first year, the Mesh was exclusively opened for designers, architects and
companies in a closed Beta. They started to terraform the surface. They created
cities, they designed geometric structures, organic streets, artificial
monuments and re-formed some of the landscapes to make them even more
interesting.

They also became the owners of the first claimed areas. They defined the first
look of a world that was meant to be changing over and over from that point
onwards.

## Architecture and Interior

Architecture in the Mesh Cyberspace is an essential ingredient. It has become
the most admired discipline amongst designers and produced buildings and cities
as diverse as the real world and beyond.

In theory, buildings are logistically restricted to an area (you remember?
That's around 44 x 44 u) and have a maximum height of 200 u to avoid superlative
effects. Only towards the largest spokes of the doughnut wheel, higher
skyscrapers up to 1.000 u are allowed to compete with the gigantic column that
spans into a seemingly infinite sky. And don't forget that streets have to go
through the middle of the area borders. Within the boundaries of these
parameters, the owner of an area has absolute freedom to build whatever they
want.

Some designers have found ways to overcome these limits with tricks and
exceptional rules. For example, there are 6 beautiful sports stadiums that span
3 x 4 areas (170 x 130 u) consisting of 12 distinct buildings. If you look at
their construction in detail, you'd still see the rules applied. But for most
people, they look like a homogenous whole.

The mesh is a dynamic model. A renderer only loads what it currently needs. On
the outside, this divides the world into areas. But the inside of buildings is
only loaded when your avatar enters them.

There are no physical rules for the geometry of building interiors. The geometry
doesn't even have to fit its outer size. As a designer, you could build a small
Swedish cabin by a lake and make the inside a huge warehouse for space rockets.

On the other hand, some views on the torus are so spectacular, that you want to
provide windows to look outside. The best example is one of the high towers next
to one of the giant spokes of the torus construct. At 1.000 u height, you can
oversee the whole curving with the city structures and the far-out landscapes
below.

The architectural design - interior like exterior - is therefore an art form in
itself. Just like in the real world it spans from profane and off-the-shelf to
masterfully crafted and genius. And it changes its form every day.

## The Train

The train is probably the most iconic attraction on the Mesh. Technically,
nobody needs a transportation facility in the virtual world. Just go to the next
teleporter, pick your target area and there you are. The train has a different
purpose, however.

Its monorail is precisely spanning the outer equator. It is built at a height of
500 u, way above the height of buildings. The rail is constructed as a
transparent tube and the trains wagons are also equipped with generously huge
windows. The sight if you sit in there takes your breath away. This is a trip
everyone should do from time to time.

Every 16 sectors, there is a stop. The 256 iconic train stations are the only
exceptions to the 200u rule mentioned before. They are designed by the best
architects. The northern, eastern, southern and western stations are the most
well known buildings in the virtual world. The `@root` travelling hub on the
south pole, where the majestic train station and the main entry into the VR fall
together, is the epicentre of the whole Mesh.

## Final Thoughts

I got started with the concept of the Mesh back in the late eighties when I had
read Neuromancer. So it was way before Zuckerberg's Metaverse and the modern
world that is on the brink of introducing Augmented Reality to our everyday
life. But one part is missing to becoming Cyberpunk: the real world.

Cyberpunk is a melange combining virtual worlds with a most often dystopian
future. But there is no easy way to include the real world in a world-building
concept. As an author and inventor of stories, you have to feel it. You have to
re-live future world scenes in your head. Everything must come to life.

You might have already read the first part of the first storylines playing with
the Mesh. I've also dedicated the story of my left arm's tattoo motives to this
universe. Expect much more where this comes from. I have so much fun writing
this.

World-building is not only a necessary tool for consistency. It's a source of
ideas. I hope you've enjoyed it.
