```yaml @@
slug: 009-heizungsheld
group: seiten
title: Heizungsheld – Sanitär, Heizung und Wärmepumpe in Dortmund-Wickede
type: microsite
language: de
noindex: true
description: Heizungsheld aus Dortmund-Wickede – zwei Meister für Badsanierung, Heizungsmodernisierung, Wärmepumpen, Reparatur und Notdienst am Wochenende.
og:
  title: Heizungsheld – Ihr Meisterbetrieb für Bad und Heizung in Dortmund
  image: og.jpg
notice:
  text: Persönliche Konzeptvorschau · keine offizielle Website der Heizungsheld Matthias & Weismüller GmbH
  short: Konzeptvorschau · keine offizielle Website
brand:
  name: Heizungsheld
  logo: logo.webp
theme:
  hue: 85
  radius: 0.25
  fonts: poster
  signal: "#efb814"
  colors: { copy: signal, background: main, button: signal }
header:
  phone: 0157 751 89 651
  cta: { text: Anfrage senden, url: "#kontakt" }
footer:
  colors: { copy: signal, background: signal }
  note: Unverbindliche Konzeptdarstellung eines möglichen neuen Internetauftritts. Logo und Foto von mw-heizungsheld.de. Heizungsheld Matthias & Weismüller GmbH · Am Münzenkamp 12 · 44319 Dortmund
legal:
  - Impressum
  - Datenschutz
quickbar:
  - { icon: phone, text: Anrufen, url: "tel:+4915775189651" }
  - { icon: mail, text: E-Mail, url: "mailto:info@mw-heizungsheld.de" }
  - { icon: route, text: Route, url: "https://www.google.com/maps/dir/?api=1&destination=Am+M%C3%BCnzenkamp+12,+44319+Dortmund" }
```

+++start

```yaml @
layout: hero
align: center
```

```yaml emblem
src: emblem.webp
alt: Logo von Heizungsheld – ein Handwerker mit Rohrzange auf gelbem Kreis, darüber der Schriftzug Heizungsheld, Matthias & Weismüller GmbH
size: 21
```

# Bad, Heizung und Wärmepumpe in Dortmund-Wickede

Zwei Meister, 40 Jahre Berufserfahrung: Heizungsheld ist Ihr Meisterbetrieb
für Sanitär und Heizung – vom Traumbad bis zur neuen Wärmepumpe.

```yaml cta
primary: { text: 0157 751 89 651 anrufen, url: "tel:+4915775189651", icon: phone }
secondary: { text: Leistungen ansehen, url: "#leistungen", icon: arrow-down-right }
```

+++meister

```yaml @
nav: Die Meister
colors: { background: signal }
layout: side
kicker: { text: Die Meister, tone: copy }
```

## Zwei Meister, ein Betrieb

Sven Weismüller und Thomas Matthias sind beide Installateur- und
Heizungsbauermeister – und teilen sich die Arbeit nach ihren Stärken: der eine
für Heizungstechnik, der andere für Sanitär und Badumbau. Motiviert, engagiert
und innovativ.

```yaml stats
items:
  - { value: "22", text: Jahre Erfahrung – Thomas Matthias, Sanitär und Badumbau }
  - { value: "18", text: Jahre Erfahrung – Sven Weismüller, Heizungstechnik }
```

```yaml image
src: meister.webp
alt: Die beiden Inhaber in schwarzen Poloshirts vor einer Betonwand, jeder mit einer Rohrzange über der Schulter
ratio: 4/3
caption: Sven Weismüller und Thomas Matthias, Inhaber
```

+++leistungen

```yaml @
nav: Leistungen
kicker: Leistungen
```

## Alles aus Meisterhand – vom Gäste-WC bis zur Wärmepumpe

```yaml cards
icons: tile
items:
  - icon: droplets
    label: Sanitär
    title: Badsanierung in Dortmund
    text: Badgestaltung und Modernisierung – vom kleinen Gäste-WC bis zum barrierefreien, altersgerechten Badezimmer. Gemeinsam planen und bauen wir Ihr Traumbad.
    tags: [Gäste-WC, Barrierefrei, Modernisierung]
  - icon: heater
    label: Heizung
    title: Heizungsmodernisierung
    text: Reparatur verschiedener Hersteller wie Vaillant, jährliche Wartung, Umrüstung von Heizsystemen, Fußbodenheizungen – und neue Heizungsanlagen als Komplettlösung, auch kombiniert mit Solar.
    tags: [Wartung, Fußbodenheizung, Solar]
  - icon: wrench
    label: Service
    title: Rohrbruch und Verstopfung
    text: Rohrbrüche, Rohrverstopfungen, Trinkwasserfilter und Kundendienst. Ihr Anliegen ist nicht dabei? Melden Sie sich trotzdem bei uns.
    tags: [Kundendienst, Trinkwasserfilter]
```

+++waermepumpe

```yaml @
nav: Wärmepumpe
variant: inverted
colors: { copy: signal, background: signal }
layout: split
kicker: { text: Wärmepumpe, tone: copy }
```

## Wärmepumpe in Dortmund-Wickede – vom Heizungsbauermeister

Wir rüsten Ihre Heizung um und bauen moderne Wärmepumpen ein – auf Wunsch mit
Fußbodenheizung und kombiniert mit Solar. Geplant und eingebaut vom Meister,
der sich auf Heizungstechnik spezialisiert hat.

```yaml features
style: chips
items:
  - { icon: thermometer-sun, text: Moderne Wärmepumpen }
  - { icon: heater, text: Umrüstung von Heizsystemen }
  - { icon: house, text: Fußbodenheizung }
  - { icon: sun, text: Kombination mit Solar }
```

```yaml cta
primary: { text: Beratung zur Wärmepumpe, url: "mailto:info@mw-heizungsheld.de?subject=W%C3%A4rmepumpe", icon: mail }
```

+++klima

```yaml @
layout: band
variant: tint
```

```yaml features
style: plain
columns: 2
items:
  - { icon: wind, text: "Demnächst: Klimatechnik vom Meisterbetrieb" }
  - { icon: siren, text: "Notdienst am Wochenende und an Feiertagen, 9:00–19:00" }
```

+++kontakt

```yaml @
nav: Kontakt
layout: side
kicker: Kontakt
```

## Rufen Sie an – wir sind für Sie da

Montag bis Donnerstag 7:30–16:30, Freitag 7:30–14:30. Am Wochenende und an
Feiertagen erreichen Sie unseren Notdienst von 9:00 bis 19:00.

```yaml contact
name: Heizungsheld Matthias & Weismüller GmbH
address:
  - Am Münzenkamp 12
  - 44319 Dortmund
phone: 0157 751 89 651
email: info@mw-heizungsheld.de
hours: [Mo–Do 7:30–16:30, Fr 7:30–14:30, Notdienst Sa, So, Feiertag 9:00–19:00]
route: https://www.google.com/maps/dir/?api=1&destination=Am+M%C3%BCnzenkamp+12,+44319+Dortmund
```
