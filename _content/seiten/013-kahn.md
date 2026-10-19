```yaml @@
type: page
format: microsite
publishedAs: 013-kahn
title: Kahn – Tischlerei und Bestattungsinstitut in Northeim
language: de
noindex: true
description: Tischlerei und Bestattungsinstitut Kahn in Northeim, seit 1910 an St. Sixti – Möbel, Treppen und Küchen nach Maß und würdevolle Bestattungen, rund um die Uhr erreichbar.
og:
  title: Kahn in Northeim – Tischlerei und Bestattungen seit 1910
  image: og.jpg
notice:
  text: Persönliche Konzeptvorschau · keine offizielle Website der Tischlerei und des Bestattungsinstituts Kahn
  short: Konzeptvorschau · keine offizielle Website
brand:
  name: Tischlerei und Bestattungsinstitut Kahn
  logo: logo.webp
  logoHeight: 2.6
  href: /013-kahn
theme:
  hue: 40
  radius: 0.25
  fonts: lapidar
  colors: { copy: accent-right, background: accent-right }
  buttonShade: m3
header:
  phone: 05551 911 777
  switch:
    - { text: Tischlerei, url: /013-kahn-tischlerei }
    - { text: Bestattungen, url: /013-kahn-bestattungen }
footer:
  note: "Unverbindliche Konzeptdarstellung eines möglichen neuen Internetauftritts. Logo nachgezeichnet; Symbolbilder KI-generiert; Fotos St. Sixti: Anaconda74 (CC0) und Postkarte Brück & Sohn Kunstverlag, 1907 (CC0), über Wikimedia Commons. Tischlerei und Bestattungsinstitut Kahn · Inhaber Felix Kahn · Kirchstraße 4 · 37154 Northeim · USt-IdNr. DE 811750429"
  meta: { icon: shield-check, text: Kein Tracking · keine Cookies }
  colors: { copy: adjacent-right, background: adjacent-right }
legal:
  - Impressum
  - Datenschutz
quickbar:
  - { icon: phone, text: Anrufen, url: "tel:+495551911777" }
  - { icon: hammer, text: Tischlerei, url: /013-kahn-tischlerei }
  - { icon: flower, text: Bestattungen, url: /013-kahn-bestattungen }
```

+++start

```yaml @
layout: hero
kicker: { text: Kirchstraße 4 · Northeim · seit 1910, icon: church, tone: copy }
```

# Zwei Handwerke, ein Haus an St. Sixti

Seit drei Generationen baut die Familie Kahn Möbel, Treppen und Küchen – und
begleitet Familien, wenn ein Mensch gestorben ist. Wobei dürfen wir Ihnen
helfen?

```yaml doors
items:
  - kicker: { text: Tischlerei, icon: hammer }
    title: Sie planen etwas aus Holz
    text: Möbel und Innenausbau, Treppen, Küchen, Fenster und Türen – geplant mit Ihnen, gebaut in unserer Werkstatt. Und alte Stücke, die wieder in Ordnung kommen sollen.
    image: tuer-tischlerei.webp
    alt: Alte Hobelbank mit Handhobel und frischen Eichenspänen im Licht eines Werkstattfensters
    caption: Symbolbild (KI-generiert)
    primary: { text: Zur Tischlerei, url: /013-kahn-tischlerei, icon: arrow-up-right }
    note: { icon: clock, text: Mo–Do 7:30–17:00 · Fr 7:30–14:00 }
  - kicker: { text: Bestattungsinstitut, icon: flower }
    title: Sie haben einen Menschen verloren
    text: Wir sind für Sie da, Tag und Nacht. Felix Kahn, fachgeprüfter Bestatter, nimmt Ihnen ab, was jetzt zu erledigen ist – auf Wunsch bei Ihnen zu Hause.
    image: tuer-bestattungen.webp
    alt: Weiße Lilien in einer schlichten Glasvase auf einem Fensterbrett im weichen Morgenlicht
    caption: Symbolbild (KI-generiert)
    primary: { text: 05551 911 777, url: "tel:+495551911777", icon: phone }
    secondary: { text: Zum Bestattungsinstitut, url: /013-kahn-bestattungen }
    note: { icon: clock, text: Telefonisch rund um die Uhr erreichbar }
    variant: inverted
    colors: { copy: adjacent-right, background: adjacent-right }
```

+++familie

```yaml @
nav: Familie
variant: surface
layout: split
kicker: Seit 1910
```

## Drei Generationen an derselben Adresse

Die Tischlerei Kahn besteht seit 1910 im Herzen von Northeim, direkt an der
St. Sixti Kirche. Werkstatt und Bestattungsinstitut teilen sich bis heute
das Haus in der Kirchstraße 4.

```yaml cards
icons: tile
items:
  - icon: hammer
    label: 1. Generation
    title: Willi Kahn
    text: gründet 1910 die Tischlerei an der St. Sixti Kirche.
  - icon: hammer
    label: 2. Generation
    title: Heinz Kahn
    text: führt den Betrieb als Sohn des Gründers fort.
  - icon: hand-heart
    label: 3. Generation
    title: Felix Kahn
    text: leitet Tischlerei und Bestattungsinstitut – als Tischlermeister und seit 1993 als fachgeprüfter Bestatter.
```

```yaml image
src: postkarte-1907.webp
alt: Historische Postkarte „Northeim i. Hann. – St. Sixti-Kirche“ mit Blick über Gärten auf die Kirche
ratio: 1528/1000
caption: St. Sixti auf einer Postkarte von 1907, drei Jahre vor der Gründung der Tischlerei (Brück & Sohn Kunstverlag, gemeinfrei)
```

+++kontakt

```yaml @
nav: Kontakt
backdrop:
  src: sixti.webp
  position: 35% 45%
  align: right
```

## Kirchstraße 4, an St. Sixti

Für die Tischlerei und das Bestattungsinstitut gilt dieselbe Nummer. Im
Trauerfall erreichen Sie uns rund um die Uhr.

```yaml contact
name: Tischlerei und Bestattungsinstitut Kahn
address: [Kirchstraße 4, 37154 Northeim]
phone: 05551 911 777
fax: 05551 911 778
route: https://www.google.com/maps/dir/?api=1&destination=Kirchstra%C3%9Fe+4,+37154+Northeim
```
