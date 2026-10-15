```yaml @@
type: page
format: microsite
publishedAs: 012-obgartel
title: Obgartel – Großhandel für Arbeitshygiene und Arbeitsschutz in Mittenaar-Bicken
language: de
noindex: true
description: Großhandel für Arbeitshygiene und Arbeitsschutz aus Mittenaar-Bicken – 14 Warengruppen von Hygienepapier bis Sicherheitsschuh, mit eigenem Zentrallager.
og:
  title: Obgartel – Großhandel aus Mittenaar-Bicken
  image: og.jpg
notice:
  text: Persönliche Konzeptvorschau · keine offizielle Website der Obgartel GmbH & Co. KG
  short: Konzeptvorschau · keine offizielle Website
brand:
  name: Obgartel GmbH & Co. KG
  logo: logo.webp
  logoHeight: 3
theme:
  hue: 250
  radius: 0.375
  fonts: norm
  colors: { copy: accent-right, background: accent-right }
header:
  phone: 0 27 78 / 69 669-0
  cta: { text: Katalog, url: "#katalog" }
footer:
  note: "Unverbindliche Konzeptdarstellung eines möglichen neuen Internetauftritts. Fotos, Produktbilder und Herstellerlogos von obgartelgmbh.de, Logo nachgezeichnet; Karte: Daten © OpenStreetMap-Mitwirkende (ODbL); der Katalog ist in dieser Vorschau nicht verlinkt. Obgartel GmbH & Co. KG · Kalkwerk 4 · 35756 Mittenaar-Bicken · AG Wetzlar HRA 7562 · persönlich haftende Gesellschafterin: Obgartel Verwaltungs GmbH, AG Wetzlar HRB 7259 · Geschäftsführer: Klaus Obgartel"
  meta: { icon: shield-check, text: Kein Tracking · keine Cookies }
  colors: { copy: main, background: main }
legal:
  - Impressum
  - Datenschutz
  - AGB
quickbar:
  - { icon: phone, text: Anrufen, url: "tel:+492778696690" }
  - { icon: mail, text: E-Mail, url: "mailto:info@obgartelgmbh.de" }
  - { icon: route, text: Route, url: "https://www.google.com/maps/dir/?api=1&destination=Kalkwerk+4,+35756+Mittenaar" }
```

+++start

```yaml @
layout: hero
variant: inverted
colors: { copy: main, background: main }
kicker: { text: GROSSHANDEL · MITTENAAR-BICKEN, tone: copy }
visual:
  src: karte.webp
  alt: Karte von Bicken und Offenbach an der B 255 mit dem Standort der Obgartel GmbH & Co. KG am Kalkwerk 4
  url: https://www.google.com/maps/dir/?api=1&destination=Kalkwerk+4,+35756+Mittenaar
  label: Route zur Obgartel GmbH & Co. KG planen
  credit: { text: © OpenStreetMap-Mitwirkende, url: "https://www.openstreetmap.org/copyright" }
  badge: { icon: route, title: Route planen, text: Kalkwerk 4 · an der B 255 }
```

# Großhandel für Arbeitshygiene & Arbeitsschutz

Ein mittelständisches Familienunternehmen mit Firmensitz, Lager vor Ort und
Zentrallager in Mittenaar-Bicken – für Hygiene, Reinigung, Schutzausrüstung
und Werkstattbedarf aus einer Hand.

```yaml cta
primary: { text: Zum Katalog, url: "#katalog", icon: book-open }
secondary: { text: 0 27 78 / 69 669-0, url: "tel:+492778696690", icon: phone }
```

+++sortiment

```yaml @
nav: Sortiment
variant: plain
kicker: { text: WARENGRUPPEN, icon: boxes, tone: copy }
```

## Das Sortiment auf einen Blick

Vierzehn Warengruppen für Betrieb, Werkstatt, Praxis und Lager. Jede führt
direkt in den Katalog – mit allen Artikeln, Größen und Varianten.

```yaml catalog
link: { text: Gesamtkatalog öffnen, url: "#katalog", icon: book-open }
note: 14 Warengruppen – das ganze Sortiment im Katalog
items:
  - title: Reinigungs­technik
    text: Maschinen und Geräte für saubere Böden in Halle, Werkstatt und Büro
    url: "#katalog"
    feature: true
    images:
      - src: reinigung-scheuersaug.webp
        alt: Kompakte Scheuersaugmaschine Sprintus MoviX in Schwarz und Rot mit zwei roten Bürstenwalzen
      - src: reinigung-akkusauger.webp
        alt: Akku-Nass- und Trockensauger Sprintus ERA iGO in Grau und Schwarz mit roten Akzenten
  - title: Hygiene­produkte
    text: Papier, Seife und Pflege für Waschraum, Küche und Sozialbereich
    url: "#katalog"
    feature: true
    images:
      - src: hygiene-papier.webp
        alt: Rolle weißes Toilettenpapier mit Prägung
      - src: hygiene-cremeseife.webp
        alt: Zehn-Liter-Kanister blaue Cremeseife Meeresbrise
  - title: Arbeits­schutz
    text: Persönliche Schutzausrüstung für Werkstatt, Produktion und Lager
    url: "#katalog"
    feature: true
    images:
      - src: arbeitsschutz-sneaker.webp
        alt: Grauer Sicherheitsschuh im Sneaker-Stil von U-Power
      - src: arbeitsschutz-sicherheitsschuh.webp
        alt: Schwarzer Sicherheitsschuh von U-Power mit roten Akzenten, von der Seite
  - title: Kühl­schmier­stoffe – Öle – Zubehör
    text: Schmierstoffe, Öle und Technik für den Maschinenpark
    url: "#katalog"
    feature: true
    images:
      - src: kss-oelskimmer.webp
        alt: Bandskimmer mit blauem Band und Ablaufschlauch zum Abscheiden von Öl aus Kühlschmierstoff
  - title: Putzrollen / Putztücher
    text: Rollen und Tücher zum Wischen, Trocknen und Polieren
    url: "#katalog"
    feature: true
    images:
      - src: putzrolle-blau.webp
        alt: Große blaue Putztuchrolle, dreilagig
  - title: Filtrations­technik
    text: Filtermedien und Anlagen für Flüssigkeiten und Luft
    url: "#katalog"
    feature: true
    images:
      - src: filter-vlies.webp
        alt: Nahaufnahme eines weißen Polyester-Filtervlieses
        fit: cover
  - title: Chemische Produkte
    text: Reiniger und Entfetter für Industrie, Kfz und Sanitär
    url: "#katalog"
    images:
      - src: chemie-reiniger.webp
        alt: Industriereiniger Kevin Multiforte als Flasche und Zwanzig-Liter-Kanister
  - title: Spender-Systeme
    text: Spender für Papier, Seife und Desinfektion
    url: "#katalog"
    images:
      - src: spender-jumbo.webp
        alt: Weißer Spender für Jumbo-Toilettenpapierrollen
  - title: KFZ- und Industrie­lackierung
    text: Zubehör und Pflege für Lackierung und Fahrzeug
    url: "#katalog"
    images:
      - src: kfz-weartec.webp
        alt: Vier Packungen Weartec Super Shot Oberflächen-Optimierungslösung
  - title: Medizin und Kranken­pflege
    text: Liegenabdeckungen und Zubehör für Praxis und Pflege
    url: "#katalog"
    images:
      - src: medizin-liegenrolle.webp
        alt: Zwei weiße Rollen Liegenabdeckung, eine stehend, eine liegend
  - title: Verpackungs­folien / Kartonagen
    text: Folien, Bänder und Füllmaterial für den Versand
    url: "#katalog"
    images:
      - src: verpackung-stretch.webp
        alt: Mehrere Rollen Handstretchfolie, eine mit grünem Abroller
  - title: CNC-Werkzeuge
    text: Fräser und Bohrer für die Zerspanung
    url: "#katalog"
    images:
      - src: cnc-fraeser.webp
        alt: Vier beschichtete Schaftfräser in absteigender Größe nebeneinander
        fit: cover
  - title: Werkstatt­ausrüstung
    text: Ausstattung für Werkstatt und Lager
    url: "#katalog"
    images:
      - src: werkstatt-kippbehaelter.webp
        alt: Blauer Kippbehälter mit Rollen und gelb-schwarzer Warnmarkierung
  - title: Öl- und Flüssigkeits­binder
    text: Bindemittel für Öl und Flüssigkeiten
    url: "#katalog"
    images:
      - src: oelbinder-rolle.webp
        alt: Graue Rolle Ölbindevlies, ein Stück abgewickelt
```

+++marken

```yaml @
layout: band
variant: surface
```

```yaml logos
label: Marken im Sortiment
items:
  - { src: marke-tork.webp, alt: Tork }
  - { src: marke-kimberly-clark.webp, alt: Kimberly-Clark Professional }
  - { src: marke-katrin.webp, alt: Katrin }
  - { src: marke-temca.webp, alt: Temca }
  - { src: marke-herwe.webp, alt: Herwe }
  - { src: marke-u-power.webp, alt: U-Power }
  - { src: marke-sprintus.webp, alt: Sprintus }
  - { src: marke-nilfisk.webp, alt: Nilfisk }
  - { src: marke-cleanfix.webp, alt: cleanfix }
  - { src: marke-hako.webp, alt: Hako }
  - { src: marke-sonic.webp, alt: Sonic Equipment }
  - { src: marke-akemi.webp, alt: Akemi }
  - { src: marke-mipa.webp, alt: mipa }
  - { src: marke-indasa.webp, alt: Indasa }
  - { src: marke-motul.webp, alt: Motul }
  - { src: marke-liqui-moly.webp, alt: Liqui Moly }
  - { src: marke-totalenergies.webp, alt: TotalEnergies }
  - { src: marke-huchtemeier.webp, alt: Huchtemeier }
  - { src: marke-metzger.webp, alt: Metzger }
```

+++standort

```yaml @
nav: Standort
layout: split
variant: plain
kicker: { text: STANDORT, icon: warehouse, tone: copy }
```

## Firmensitz und Lager in Mittenaar-Bicken

Am Kalkwerk 4 in Bicken sitzen Büro und Lager vor Ort, dazu kommt unser
Zentrallager. Ein Ansprechpartner, ein Lieferant – für Hygiene,
Reinigung, Schutzausrüstung und Werkstattbedarf.

```yaml gallery
items:
  - src: firmensitz.webp
    alt: Weißes Firmengebäude der Obgartel GmbH & Co. KG mit Rolltor und Firmenschild unter blauem Himmel
    caption: Firmensitz, Kalkwerk 4
  - src: lager-vorort.webp
    alt: Gang zwischen Paletten mit Papierrollen und Hygienepapier im Lager
    caption: Lager vor Ort
  - src: zentrallager-innen.webp
    alt: Hochregalgang im Zentrallager mit Paletten bis unter das Hallendach
    caption: Zentrallager
```

+++kontakt

```yaml @
nav: Kontakt
layout: side
variant: tint
kicker: { text: KONTAKT, tone: copy }
```

## Persönliche Beratung

Sie haben Fragen zu bestimmten Produkten oder wünschen eine persönliche
Beratung? Unser Team ist für Sie da – rufen Sie an oder schreiben Sie uns.

```yaml emblem
src: creditreform.webp
alt: Siegel „Wir sind Mitglied“ von Creditreform
size: 7
```

```yaml contact
name: Obgartel GmbH & Co. KG
address: [Kalkwerk 4, 35756 Mittenaar-Bicken]
phone: 0 27 78 / 69 669-0
fax: 0 27 78 / 69 669-29
email: info@obgartelgmbh.de
hours: ["[Öffnungszeiten]"]
route: https://www.google.com/maps/dir/?api=1&destination=Kalkwerk+4,+35756+Mittenaar
```
