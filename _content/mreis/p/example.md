```yaml @@
slug: p/example
group: p
title: Fern & Flour
type: microsite
description: Neighbourhood bakery in Leipzig-Plagwitz. Sourdough, pastries and coffee, baked every morning since 2014.
brand:
  name: Fern & Flour
  mark: F&F
  tagline: Neighbourhood bakery since 2014
theme:
  hue: 55
  accentHue: 150
  neutralHue: 60
  chroma: 0.13
  neutralChroma: 0.014
  radius: 1
  fonts: editorial
legal:
  - Imprint
  - Privacy
```

+++hero

```yaml @
variant: tint
layout: hero
```

# Bread that takes its time.

Sourdough, pastries and good coffee from a small bakery in Plagwitz. Everything
is baked every morning on site, from flour we know by name.

```yaml cta
primary: { text: Visit us, url: "#contact" }
secondary: { text: What we bake, url: "#offer" }
```

+++offer

```yaml @
nav: What we bake
```

## What we bake

A short list, done properly. The range changes with the seasons, the sourdough
never does.

```yaml cards
items:
  - icon: leaf
    title: Sourdough loaves
    text: Rye, spelt and our country loaf, fermented for 36 hours.
  - icon: sun
    title: Morning pastries
    text: Croissants, cardamom buns and the daily danish.
  - icon: coffee
    title: Coffee bar
    text: Filter and espresso from a roaster two streets away.
  - icon: heart
    title: Cakes to order
    text: Birthday, wedding or just because. Two days' notice.
  - icon: users
    title: Baking classes
    text: Saturday mornings, six people, one starter to take home.
  - icon: truck
    title: Wholesale
    text: Bread for cafés and restaurants in the west of Leipzig.
```

+++about

```yaml @
nav: About
variant: inverted
```

## Flour, water, salt and patience.

We started in 2014 with one oven and a sourdough starter that is older than
the shop. Today eight people bake, sell and pour coffee here. The recipes have
changed less than the team.

```yaml cta
primary: { text: Join a class, url: "#contact" }
```

+++contact

```yaml @
nav: Contact
variant: surface
```

## Come by.

Fresh bread from 7 in the morning. Orders for cakes and wholesale by phone or
email.

```yaml contact
name: Fern & Flour
address:
  - Karl-Heine-Straße 42
  - 04229 Leipzig
phone: +49 341 1234567
email: hello@fern-and-flour.example
hours:
  - Tue–Fri 7:00–18:00
  - Sat 7:00–14:00
```

+++palette

```yaml @
variant: plain
```

## Palette calibration

The three ramps and the role tokens of this page, as the theme knobs resolve
them.

```yaml palette
```
