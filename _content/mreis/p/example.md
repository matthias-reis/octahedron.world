```yaml @@
slug: p/example
group: p
title: Fern & Flour – Bäckerei in Leipzig-Plagwitz
type: microsite
language: de
description: Bäckerei in Leipzig-Plagwitz. Sauerteigbrot, Gebäck und Kaffee, jeden Morgen frisch gebacken, seit 2014.
og:
  title: Fern & Flour – Brot, das sich Zeit nimmt
  image: og.jpg
brand:
  name: Fern & Flour
  mark: F&F
  tagline: Bäckerei in Plagwitz seit 2014
theme:
  hue: 30
  radius: 0.5
  fonts: editorial
legal:
  - Impressum
  - Datenschutz
```

+++hero

```yaml @
layout: hero
```

# Brot, das sich Zeit nimmt

Sauerteig, Gebäck und guter Kaffee aus einer kleinen Bäckerei in Plagwitz.
Alles wird jeden Morgen vor Ort gebacken, aus Mehl, dessen Mühle wir kennen.

```yaml cta
primary: { text: So findest du uns, url: "#kontakt" }
secondary: { text: Unser Sortiment, url: "#sortiment" }
```

+++sortiment

```yaml @
nav: Sortiment
variant: surface
```

## Was wir backen

Eine kurze Liste, dafür ordentlich gemacht. Das Sortiment wechselt mit den
Jahreszeiten, der Sauerteig bleibt.

```yaml cards
items:
  - icon: wheat
    title: Sauerteigbrote
    text: Roggen, Dinkel und unser Landbrot, 36 Stunden geführt.
  - icon: croissant
    title: Frühstücksgebäck
    text: Croissants, Kardamomschnecken und das Plunderstück des Tages.
  - icon: coffee
    title: Kaffeebar
    text: Filterkaffee und Espresso von einer Rösterei zwei Straßen weiter.
  - icon: cake-slice
    title: Torten auf Bestellung
    text: Geburtstag, Hochzeit oder einfach so. Zwei Tage Vorlauf.
  - icon: users
    title: Backkurse
    text: Samstagvormittag, sechs Leute, ein Sauerteigansatz zum Mitnehmen.
  - icon: truck
    title: Für die Gastronomie
    text: Brot für Cafés und Restaurants im Leipziger Westen.
```

+++ueber-uns

```yaml @
nav: Über uns
variant: inverted
```

## Mehl, Wasser, Salz und Geduld

2014 haben wir mit einem Ofen angefangen und mit einem Sauerteig, der älter
ist als der Laden. Heute backen, verkaufen und brühen hier acht Leute. Die
Rezepte haben sich weniger verändert als das Team.

```yaml cta
primary: { text: Backkurs buchen, url: "#kontakt" }
```

+++kontakt

```yaml @
nav: Kontakt
```

## Komm vorbei

Frisches Brot gibt es ab 7 Uhr. Torten und Bestellungen für die Gastronomie
nehmen wir telefonisch oder per Mail an.

```yaml contact
name: Fern & Flour
address:
  - Karl-Heine-Straße 42
  - 04229 Leipzig
phone: +49 341 1234567
email: hallo@fern-and-flour.example
hours:
  - Di–Fr 7:00–18:00
  - Sa 7:00–14:00
```

+++palette

```yaml @
variant: surface
```

## Farbschema

Sechs Paletten aus einem Basis-Farbton: main, adjacent (±42,5°), accent
(±137,5°) und complementary (180°), jede mit drei hellen, drei mittleren und
drei dunklen Tönen.

```yaml palette
```
