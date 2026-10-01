```yaml @@
slug: 007-brandt
group: seiten
title: Wolfgang Grube, Inh. Martin Brandt – Wärmepumpe, Heizung und Bad in Hannover
type: microsite
language: de
noindex: true
description: SHK-Meisterbetrieb in Hannover – Wärmepumpen, hydraulischer Abgleich, Wartung, Badmodernisierung mit eigenem Lister Badstudio und 24h-Notdienst.
og:
  title: Wärmepumpe & Bad in Hannover – Grube, Inh. Martin Brandt
  image: og.jpg
notice:
  text: Persönliche Konzeptvorschau · keine offizielle Website von Wolfgang Grube, Inh. Martin Brandt
  short: Konzeptvorschau · keine offizielle Website
brand:
  name: Wolfgang Grube · Inh. Martin Brandt
  logo: logo.webp
theme:
  hue: 250
  radius: 1
  fonts: studio
  colors: { copy: main, background: main }
header:
  phone: 0511 604 57 22
  cta: { text: Beratung anfragen, url: "#kontakt" }
footer:
  note: Unverbindliche Konzeptdarstellung eines möglichen neuen Internetauftritts. Fotos von m-brandt-haustechnik.de und listerbadstudio.de (CAT Photography, Catrin Rörig). Wolfgang Grube · Inh. Martin Brandt · Gehägestraße 20b · 30655 Hannover
legal:
  - Impressum
  - Datenschutz
quickbar:
  - { icon: phone, text: Anrufen, url: "tel:+495116045722" }
  - { icon: mail, text: E-Mail, url: "mailto:info@m-brandt-haustechnik.de" }
  - { icon: route, text: Route, url: "https://www.google.com/maps/dir/?api=1&destination=Geh%C3%A4gestra%C3%9Fe+20b,+30655+Hannover" }
```

+++start

```yaml @
layout: hero
kicker: { icon: badge-check, text: Bosch Premium Partner in Hannover }
backdrop:
  src: masthead.webp
  position: 50% 100%
  style: cover
  valign: top
```

# Wärmepumpe und Bad in Hannover – aus Meisterhand

Heizung, Solar und Wärmepumpen, Bäder aus dem eigenen Lister Badstudio und ein
Notdienst rund um die Uhr.

```yaml cta
primary: { text: 0511 604 57 22 anrufen, url: "tel:+495116045722", icon: phone }
secondary: { text: Badstudio besuchen, url: "#badstudio", icon: arrow-down-right }
```

+++wege

```yaml @
variant: surface
kicker: Ihr Anliegen
```

## Wobei dürfen wir helfen?

```yaml cards
icons: tile
items:
  - icon: heater
    label: Heizung
    title: Neue Heizung oder Wärmepumpe
    text: Luft-Wärmepumpe, Hybridanlage, Solar oder die Modernisierung Ihrer bestehenden Heizung – wir beraten Sie und bauen ein.
    link: { text: Zur Heiztechnik, url: "#heizung" }
  - icon: droplets
    label: Bad
    title: Neues Bad
    text: Vom ersten Entwurf in 3D bis zum fertigen Komplettbad – geplant und gezeigt im Lister Badstudio.
    link: { text: Zum Badstudio, url: "#badstudio" }
  - icon: siren
    label: Notdienst
    title: Heizung kalt, Rohr gebrochen
    text: Unser 24h-Notdienst hilft schnell und verlässlich – auch an Wochenenden und Feiertagen.
    link: { text: 0511 604 57 22 anrufen, url: "tel:+495116045722" }
```

+++heizung

```yaml @
nav: Heizung
layout: split
kicker: Heiztechnik
```

## Wärmepumpen in Hannover – vom Fachbetrieb eingebaut

Wir installieren Luft-Wärmepumpen, Hybridanlagen, Solarthermie und
Photovoltaik – und helfen Ihnen, den CO₂-Ausstoß Ihres Hauses zu senken. Als
Bosch Premium Partner arbeiten wir mit Technik, die wir kennen.

```yaml index
items:
  - icon: thermometer-sun
    title: Wärmepumpen und Hybridanlagen
    text: Luft-Wärmepumpen und Hybridanlagen für Neubau und Bestand – auf Wunsch kombiniert mit Photovoltaik, damit ein Teil des Stroms vom eigenen Dach kommt.
  - icon: sun
    title: Solarthermie und Photovoltaik
    text: Sonnenwärme für Warmwasser und Heizung, Solarstrom fürs Haus. Wir planen die Anlage passend zu Ihrer Heizung.
  - icon: clipboard-check
    title: Wartung
    text: Wartungsservice für Gas- und Ölthermen und Flüssiggasanlagen – und für regenerative Anlagen wie Wärmepumpe und Solar.
  - icon: wrench
    title: Hydraulischer Abgleich und Reparatur
    text: Den nach GEG vorgeschriebenen hydraulischen Abgleich führen wir fachgerecht durch. Und wir reparieren, was tropft, klemmt oder ausfällt – vom Wasserhahn bis zur Therme.
```

```yaml image
src: abgleich.webp
alt: Zwei Monteure am geöffneten Firmentransporter, einer trägt einen orangefarbenen Schlauch über der Schulter
ratio: 21/9
caption: Unterwegs zum hydraulischen Abgleich
```

+++badstudio

```yaml @
nav: Badstudio
variant: inverted
colors: { copy: complementary, background: complementary }
kicker: { text: Lister Badstudio, tone: copy }
layout: split
```

## Ihr neues Bad beginnt in der List

In unserer Ausstellung in der Voßstraße sehen Sie Bäder in echt, bevor Sie
sich entscheiden. Sonja Krethke plant Ihr Komplettbad in 3D – und wir
koordinieren alles bis zur Übergabe, auch Fliesen, Elektro und Maler.

```yaml gallery
items:
  - src: badstudio.webp
    alt: Ausstellung des Lister Badstudios mit Waschtischen, runden beleuchteten Spiegeln und Wand-WC
    caption: Die Ausstellung
  - src: badstudio-aussen.webp
    alt: Eckhaus in der Voßstraße mit den Schaufenstern des Lister Badstudios und dem Schriftzug Grube
    caption: Voßstraße 44, Hannover-List
  - src: beratung.webp
    alt: Beratungsgespräch am Tisch in der Ausstellung, ein Monteur und eine Kundin
    caption: Beratung am Tisch
```

```yaml features
style: chips
items:
  - { icon: compass, text: 3D-Badplanung }
  - { icon: house, text: Komplettbadsanierung }
  - { icon: heart, text: Barrierefreie Bäder }
  - { icon: hammer, text: Trockenbau und Verkleidungen }
  - { icon: users, text: Fliesen, Elektro und Maler koordiniert }
```

```yaml contact
style: grid
name: Lister Badstudio
address:
  - Voßstraße 44
  - 30161 Hannover
phone: 0511 624590
email: info@listerbadstudio.de
hours: [Mo–Do 7:00–15:00, Fr 7:00–13:00, Termine nach Vereinbarung]
route: https://www.google.com/maps/dir/?api=1&destination=Vo%C3%9Fstra%C3%9Fe+44,+30161+Hannover
```

+++team

```yaml @
nav: Team
kicker: Team
```

## Ein Team, das man beim Namen kennt

Mehr als 35 Jahre führten Wolfgang und Karin Grube den Betrieb. Im April 2007
hat Installateur- und Heizungsbauermeister Martin Brandt übernommen. Er sitzt
im Innungsvorstand und ist Lehrlingswart – Ausbildung ist bei uns Chefsache.

```yaml gallery
items:
  - src: team.webp
    alt: Sechs Monteure in dunkelblauen T-Shirts stehen Arm in Arm vor der Fahrzeugflotte
    caption: Das Team vor der Flotte
  - src: martin-brandt.webp
    alt: Porträt von Martin Brandt
    caption: Martin Brandt · Inhaber, Meister SHK
  - src: krethke.webp
    alt: Porträt von Sonja Krethke
    caption: Sonja Krethke · Ausstellung, 3D-Planung
  - src: foerster.webp
    alt: Porträt von N. Foerster
    caption: N. Foerster · Sanitär und Bäder
  - src: langemeyer.webp
    alt: Porträt von K. Langemeyer
    caption: K. Langemeyer · Wärmepumpen und Heizung
  - src: schulte.webp
    alt: Porträt von D. Schulte
    caption: D. Schulte · Wärmepumpen, Hybrid, Neubau
```

+++marken

```yaml @
layout: band
variant: surface
```

```yaml features
style: chips
items:
  - { icon: badge-check, text: Bosch Premium Partner }
  - { icon: heater, text: Buderus }
  - { icon: heater, text: Junkers }
  - { icon: heater, text: Vaillant }
  - { icon: droplets, text: Geberit }
  - { icon: droplets, text: Villeroy & Boch }
  - { icon: droplets, text: Grohe }
  - { icon: droplets, text: hansgrohe }
  - { icon: droplets, text: Duravit }
  - { icon: droplets, text: Keuco }
  - { icon: wind, text: Zehnder }
  - { icon: heater, text: Kermi }
```

+++notdienst

```yaml @
variant: tint
layout: split
kicker: 24h-Notdienst
```

## Heizungsnotdienst in Hannover – rund um die Uhr

Rohrbruch, kalte Heizung oder eine andere Störung: Sie erreichen uns rund um
die Uhr, auch an Wochenenden und Feiertagen.

```yaml callout
label: 24h-Notdienst
text: 0511 604 57 22
url: "tel:+495116045722"
icon: phone
```

+++kontakt

```yaml @
nav: Kontakt
layout: side
kicker: Kontakt
```

## Sprechen Sie mit uns

Ob Wartung, Reparatur, Beratung zu Heizung, Solar oder Bad: Rufen Sie an oder
schreiben Sie uns. Mobil erreichen Sie uns unter 0172 357 06 91.

```yaml contact
name: Wolfgang Grube · Inh. Martin Brandt
address:
  - Gehägestraße 20b
  - 30655 Hannover
phone: 0511 604 57 22
fax: 0511 604 57 20
email: info@m-brandt-haustechnik.de
route: https://www.google.com/maps/dir/?api=1&destination=Geh%C3%A4gestra%C3%9Fe+20b,+30655+Hannover
```
