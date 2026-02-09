```yaml @@
title: 'Waves'
subTitle: 'Space Travel in Numbers'
description:
  Let's calculate us through some hard scifi constraints. THe Fourth Wave is
  sending a gigantic generation spaceship to the next star system. How long does
  that take and how much energy would you need to make it work?
slug: waves
group: 'the-fourth-wave'
type: 'report'
image: 'the-fourth-wave'
```

I've created a hard scifi space travel calculator. With this you can find out
how long a journey to other stars will take, how fast you will go and how much
energy you will need to get there.

This is the only hard scifi way to travel to other stars, the only way without
inventing a technology that breaks with the theory of relativity to travel
faster.

For the fourth wave short story, this is the method I had in mind. So let's
examine the waves until the pioneers get to their new home world.

First of all please have a look at the short story.

```yaml teaser
slug: the-fourth-wave-shortstory
```

Now to the first wave. Mission № 1 went from Earth to Alpha Centrauri. We
assume, that there was not so much energy availabe. And the acceleration phase
and the deceleration phase would take 3 months each.

We additionally assume that the ship has a mass of 600.000 tonnes. Which would
be slightly bigger than an aircraft carrier and allow 10.000 people to travel
including Soil for food production, psychological space, support systems and
rotation engines for artificial gravity.

```yaml spacetravel
from: Earth
to: Alpha Centauri
dist: 4.37
acc: 0.8
mass: 600000
limit: true
time: 3
```

The next stop for the second wave would be more challenging, 8 lightyears to
Wolf 359. Assuming better technologies to produce and store energy and therefore
longer and slightly more accelleration.

```yaml spacetravel
from: Alpha Centauri
to: Wolf 359
dist: 8.25
acc: 1.1
mass: 600000
limit: true
time: 4
```

Then the hop to Procyon, the third wave. I addede even a bit more g.

```yaml spacetravel
from: Wolf 359
to: Procyon
dist: 8.6
acc: 1.2
mass: 600000
limit: true
time: 6
```

The final step is described in a lot of detail in the short story. I reduced the
gravity again, because the starting point Racoon has lower gravity of 0.5 g
already.

```yaml spacetravel
from: Procyon
to: Luyten's Star
dist: 1.2
acc: 1
mass: 600000
limit: true
time: 6
```

You see that this endeavour is not at all limited by the spaceship. When I first
thought about it, my idea was: They can just take the ship and continue to the
next star.

But the energy for acceleration is immense. The last hops are way beyond 20.000
years of todays annual energy consuption (which is is pureSciFi) and would
consume around

- 500 tons of antimatter if we found some
- or 140.000 tons of hydrogen for fusion reactors.

# Interplanetary Travel

I want to try more at the end, more tangible dimensions. Now we come back to the
near future and the travel within the solar system. How much do you need to get
from earth to mars with moderate gravity (i.e. acceleration / deceleration)?

```yaml spacetravel
from: Earth
to: Mars
unit: au
dist: 1
acc: 0.2
mass: 500
limit: false
```
