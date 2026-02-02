```@@|
slug: gestohlene-zeit
language: de
ref: stolen-time
title: Gestohlene Zeit
description:
  Der erste DICA Fall mit ausführlichen Erläuterungen wie die Quests funktionieren.
group: dica-club
image: crime-scene
tags:
  - Escape Game
  - Scavenger Hunt
  - Riddles
  - Geolocation
version: 1
subtitle: Der erste DICA Fall
start: 2024-12-21
type: dica
colorSpace: carmine
reveal:
  - fall
```

+++fall

```@|
title: Der Tatort
type: page
weight: 1
```

# Willkommen in der Welt der Spürnasen und Rätselfreunde!

> Dieser erste Fall verschafft Dir einen Einstieg in die verschiedenen Arten der
> Rätsel und Fälle, die Du hier findest. Du lernst die Bedienung und Strategien
> kennen, damit Du Dich voll auf die Fälle konzentrieren kannst.

Als **Hieronyms zu Feuerbach**, der Direktor des Stadtmuseums den Einbruch
bemerkte, rief er postwendend die Polizei. Das war morgens um 5.30 Uhr.

Nun stehe ich, KHK Kahaka, vor einem sprichwörtlichen Scherbenhaufen. Im
Galerieflügel wurde eine Glashaube zerbrochen und das wertvolle Exponat, eine
alte Taschenuhr, gestohlen.

Übrig ist nur noch der weiße Sockel mit der Inschrift **"Die Uhr, die die Zeit
lenken kann - Anno 1502"**, sowie -- da musste ich genauer hinsehen -- ein
Zettel mit Text in Schreibmaschinenschrift.

Das musste ein Hinweis des Täters sein.

![Bild des Tatorts](crime-scene)

Weitere Spuren scheint es nicht zu geben. Die restlichen Artefakte des Raums
sind

- ca. 10 weitere Uhrenexponate
- zahlreiche Wandportraits berühmter Uhrmacher
- ein übergroßes Wanduhren-Pendel, das von der Decke hängt
- der Effelturn als Gemälde an der Westwand gehör schon zun nächsten
  Themenbereich
- mehrere Vitrinen mit alten Konstruktionszeichnungen und anderen Schriftstücken

Alle anderen Exponate und Ausstellungselemente sind absolut unversehrt
geblieben. Auch die Überwachungskameras zeigen keinerlei verdächtige
Aktivitäten. Eine Holzempore, die über eine Treppe erreichbar ist weist
ebenfalls keine offensichtlichen Spuren auf.

```quest/view|
ref: fall
reveal:
  - keine-zeit-verschwenden
```

```@/help
Also los, wenn Du Lust hast, steig in das erste Rätsel ein. Im Moment ist nur eine
einzige Spur rechts zu sehen, also **klick doch gleich mal drauf**.

Generell sind Rätsel und Fälle nicht immer linear aufgebaut. Die rechte Spalte
lässt Dich durch die verschiedenen Szenen navigieren, um Hinweise zu finden. Es ist unter Deiner Kontrolle, was Du als nächstes machst. Die Geschichte wird also nicht von selbst weiter gehen.

Achte also auch darauf, ob hier neue Einträge auftauchen, denn viele Seiten werden
nur dann sichtbar, wenn bestimmte Bedingungen erfüllt sind.
```

+++keine-zeit-verschwenden

```@|
title: Keine Zeit verschwenden
weight: 2
type: page
```

# Was willst Du als erstes tun?

> Eines der einfachsten Rätsel ist die klassische Wer-wird-Millionär-Quizfrage.
> Du kannst sie lösen, indem Du auf die korrekte Antwort klickst.
>
> Jedes Rätsel kannst Du mit einem Wert zwischen 0 und 100 abschließen. Also
> Vorsicht! Wenn Du eine falsche Lösung anklickst, darfst Du nochmal raten, aber
> wir ziehen Dir ein paar Punkte ab.

Ich will mir die ersten Sachverhalte notieren und überlege kurz. Wie heißt der
Saal nochmal, in dem wir uns befinden?

```quest/choice|
ref: keine-zeit-verschwenden
question: Wie lautet der Name des Saals?
options:
  - Uhrensaal
  - Galerieflügel
  - Bibliothek
  - Haupthalle
solution: 1
success:
  Sehr gut! Wir befinden uns im Galerieflügel, wie man an den zahlreichen
  Wandportraits gut sehen kann. Als Belohnung gibt es einen Hinweis.
  Schau mal rechts in die Navigationsleiste.
failure: Das war leider falsch. Probier es gleich nochmal!
reveal:
  - die-webseite
```

```@/help
Wie Du siehst, musst Du auf jedes Detail achten. Aber keine Sorge. Du kannst
gerne nochmal nachsehen gehen. Kleiner Hinweis, den es wahrscheinlich nur in
diesem einführunsrätsel gratis gibt: Die Antwort findest Du im
Einführungstext. Also falls Du es vergessen hast, klicke in der rechten
Navigationsspalte auf "Der Tatort" und lies nochmal nach.
```

+++die-webseite

```@|
title: Die Webseite
type: clue
```

# Ein Detail auf dem Zettel

> Dies ist ein "Clue", also ein Hinweis. Hinweise enthalten normalerweise selbst
> keine Rätsel. Sie können aber drei verschiedene Aufgaben erfüllen.
>
> 1. Sie enthalten Informationen, die du möglicherweise anderswo eingeben oder
>    verwenden musst.
> 2. Sie führen Dich an einen anderen Ort (wie hier bei diesem Hinweis)
> 3. Sie können Seiten freischalten. Findet man beispielsweise alle 3 Hinweise
>    in einem Fall, dann wird eine weitere Seite sichtbar und die Ermittlung
>    kann weitergehen
>
> Hinweise können sich überall befinden. Bisweilen musst Du sogar DICA verlassen
> und anderswo suchen, um an die gewünschte URL zu kommen. Dann ist eine solche
> Clue Seite eben nur der Ausgangspunkt.
>
> In einigen Fällen gibt es sogar QR Codes an echten Orten, die Du scannen
> musst. Aber keine Sorge, wir haben uns für den Anfang für eine einfache
> Variante entschieden.

Der Zettel ist aktuell die heißeste Spur. Noch bevor alle Spuren gesichert
wurden, ziehst Du Dir die Gummihandschuhe über und fotografierst den
Schreibmaschinentext ab.

Sofort sticht Dir eine URL ins Auge:

[https://www.zeitlenkung.de/peter-henlein](#spuren)

```@/help
Klicke einfach auf den Link. Er bringt dich zu einer versteckten Seite.
Sobald Du dort bist, erscheint sie dann auch in der rechten Navigationsspalte.
```

+++spuren

```@|
title: Die erste Spur
weight: 1
type: page
```

# Der Erfinder der Taschenuhr

> Gut. Du hast die URL nicht im Browser eingegeben, sondern auf den Text
> geklickt. Perfekt!
>
> Dies ist ein so genanntes View Rätsel. Es ist sogar noch einfacher, als die
> Frage aus dem vorherigen Rätsel. Sobald Du auf die Seite kommst, gilt das
> Rätsen als abgeschlossen.
>
> Natürlich kann es beliebig schwer sein, die Seite zu finden.

![Website](website)

`https://www.zeitlenkung.de/peter-henlein`

&nbsp;

Die Webseite zeigt **Peter Henlein**, den Erfinder der Taschenuhr. Sein Leben,
sowie die erste Uhr, die er baute, sind hier ausführlich beschrieben. Du liest
die Informationen aufmerksam durch und notierst Dir die wichtigsten Punkte.

Ein Punkt fällt Dir sofort auf. Die erste erwähnte Uhr scheint später datiert zu
sein, als die, die hier verschwunden ist.

Zusammen mit dem Zettel, den Du gefunden hast, ergeben sich nun einige Spuren,
denen Du folgen musst.

```quest/view|
ref: spuren
reveal:
  - auf-der-webseite
  - der-zettel
  - die-tatwaffe
```

```@/help
Wie Du siehst, sind rechts in der Übersicht nun weitere Rätsel aufgetaucht. Du kannst sie in beliebiger Reihenfolge angehen.
```

+++auf-der-webseite

```@|
title: Auf der Webseite
weight: 2
type: page
```

# Rätselhafte Seite

> Lass uns die Schwierigkeit nun etwas steigern.
>
> Multiple Choice Fragen sind tückisch, da Du in der Regel nicht weißt, wieviel
> richtige Antworten es gibt.

Die gefundene Webseite ist seltsam. Sie zeigt augenscheinlich normale
Informationen an. Doch weiter unten findest Du eine Liste von Begriffen, die
eine Art Einstiegscode darstellen. Du musst unbedigt die richtigen finden.

```quest/multiplechoice|
ref: auf-der-webseite
question: Welche Begriffe können der Uhrmacherei zugewiesen werden?
options:
  - Pendel
  - Rotor
  - Ziffernblatt
  - Flügelschraube
  - Gezeiten
  - Kurbelwelle
  - Sekundenzeiger
  - Kompass
  - Unruhe
  - Knüppel
solutions: [0, 2, 6, 8]
success:
  Sehr gut! Bist Du gelernter Uhrmacher oder was?
  Wie Du vielleicht gesehen hast, wurde ein Clue freigeschaltet.
  Eine weitere Unterseite ist aufgegangen.
failure:
  Das war leider falsch. Probier es gleich nochmal!
  Wir müssen Dir aber leider ein paar Punkte abziehen.
reveal:
  - zugang
```

+++zugang

```@|
title: Die Unterseite
type: clue
reveal:
  - notizbuch
```

# Zugang

> Dies ist ein Hinweis. Hinweise musst Du sammeln. Für manche Puzzles werden ein
> oder mehrere Hinweise benötigt. Vorher bekommst Du sie nicht zu sehen.
>
> Hinweise tauchen auch gesondert in der Arbeitsleiste auf, sodass Du sie
> jederzeit erreichen kannst.
>
> In diesem Fall führen alle aktuell offenen Rätsel zu einer neuen Spur. Werden
> die richtigen Hinweise gefunden, einer oder mehrere, dann geht es weiter.

Du hast den Code auf der scheinbar harmlose Webseite gefunden und eine
versteckte Seite geöffnet. Doch der Dieb scheint Dich zum Narren zu halten. Auf
das eine Rätsel folgt das nächste.

Die Seite, die erscheint, enthält nur ein paar seltsame Buchstaben, vermutlich
ein Passwort:

```note
DRIC
```

Am besten Du trägst die Buchstaben in [Dein Notizbuch](#notizbuch) ein.

+++der-zettel

```@|
title: Der Zettel
weight: 2
type: page
```

# Der stumme Begleiter

> Es gibt auch Rätsel, bei denen man die Antwort eingeben muss. Hier ist
> Vorsicht geboten, den man muss auf Groß- und Kleinschreibung achten. Bitte
> beachte auch die Hinweise bei solchen Rätseln genau, um die Richtige
> Eingabeform mit Singular, Plural, mit- ooder ohne Artikel usw. zu wählen.
>
> Denn auch hier ist es so, dass wir Dir ein paar Prozentpunkte abziehen, wenn
> Du eine falsche Eingabe machst.

Auf dem Zettel vom Tatort steht neben der Internetadresse, die als Quelle
genannt wurde auch noch dieses Rätsel:

```note
Um mich zu finden musst Du dieses Rätsel lösen:

Ich bin nicht zu greifen, doch stets um dich herum.
Ohne mich steht alles still, doch sehen kannst du mich nicht.
Ich bin der Begleiter von Sekunden und Stunden – wie nennt man mich?

  Gez. _Der stumme Begleiter_
```

```quest/input|
ref: der-zettel
question: Welcher Begriff könnte gesucht werden?
solution: Zeit
success:
  Sehr gut! Du bist auf der richtigen Spur. Dir wurde hiermit auch ein weiterer
  Clue freigeschaltet.
failure:
  Das war leider falsch. Bitte achte auch auf Groß- und Kleinschreibung! Probier
  es gleich nochmal!
notfound:
  Zeit, das wäre die richtige Lösung gewesen. Leider hast Du dies auch nach 10
  Versuchen nicht gefunden. Wir lassen Dich weiterkommen, müssen Dir aber für diese
  Aufgabe 0 Punkte geben.
reveal:
  - enttaeuscht
```

+++enttaeuscht

```@|
title: Mehr Spuren
type: clue
```

# Gut und schlecht zugleich

> Dies ist ein Hinweis. Hinweise musst Du sammeln. Für manche Puzzles werden ein
> oder mehrere Hinweise benötigt. Vorher bekommst Du sie nicht zu sehen.
>
> Hinweise tauchen auch gesondert in der Arbeitsleiste auf, sodass Du sie
> jederzeit erreichen kannst.
>
> In diesem Fall führen alle aktuell offenen Rätsel zu einer neuen Spur. Werden
> die richtigen Hinweise gefunden, einer oder mehrere, dann geht es weiter.

Enttäuschung macht sich breit.

Du hast das schwere Rätsel des Zettels gelöst, doch es hat Dich wieder nicht
wirklich weitergebracht.

Offensichtlich dreht sich alles um **die Zeit**. Das hattest Du ja schon gewusst
bei einer so wertvollen gestohlenen Taschenuhr.

Nun ja. es gibt ja noch mehr Spuren, denen man folgen kann. Vielleicht führen
sie Dich ja weiter.

**Aber Halt! Der Zettel hat auch eine Rückseite. Dort hat jemad etwas mit
Bleistift geschrieben.**

```note
H z. F.
```

Komische Buchstabenkombination. Trotzdem unbedingt in
[Dein Notizbuch](#notizbuch) eintragen.

+++die-tatwaffe

```@|
title: Die Tatwaffe
weight: 2
type: page
```

# Die Tatwaffe

> Schätzungen sind eine beliebte Rätselart. Natürlich taucht diese Variante auch
> in Dica auf. Und selbstverständlich kann man sie auch vorzüglich in
> Kriminalfällen einsetzen.
>
> Du gibst einfach den gesuchten Wert als Zahl ein und wir prüfen ob er
> innerhalb der Toleranz liegt. Wenn nicht, musst Du nochmal raten. Aber
> Achtung: Auch wenn's passt, je genauer Du den Wert triffst, desto mehr Punkte
> gibt es.

Wir haben noch gar nicht über die Tatwaffe gesprochen. Denn der Täter hat nicht
etwa einen Hammer benutzt und diesen wieder mitgenommen. Nein. Auch hier wurden
Hinweise hinterlassen.

Die Tatwaffe war vermutlich **das riesige Pendel**. Die Galerie ist mit einem
großen Pendel ausgestattet, das von der Decke hängt und von Besuchern bewegt
werden kann. Wenn man die Sicherung entfernt, was augenscheinlich hier der Fall
ist, kann das Pendel frei schwingen. Nun müsste man nur noch die Raumhöhe kennen
und die Richtung bestimmen.

Aha. Beim Umschauen ergibt sich ein weiterer Hinweis.

![Eiffelturm Mural](eiffel-tower)

An der Westwand des Galerieflügels ist der Eiffelturm aufgemalt - in voller
Größe von der Sockelleiste bis unter die Decke. Ein faszinierendes Mural. Die
kleine Plakette am Fuß des Gemäldes besagt **"Maßstab 1:50"**. Na wenn das nicht
ausreicht, um die Raumhöhe zu bestimmen.

```quest/number|
ref: die-tatwaffe
question: Wie hoch ist die Decke des Galerieflügels in Zentimeter?
solution: 660
tolerance: 60
success: Sehr gut kombiniert, perfekt abgeleitet.
failure:
  Das war leider falsch. Bitte versuche es nochmal. Du darfst auch gerne das
  Internet zur Hilfe nehmen. Wir suchen die Höhe in Zentimetern.
reveal:
  - die-empore
```

+++die-empore

```@|
title: Die Empore
type: clue
```

# Der echte Tatort

> Dies ist ein Hinweis. Hinweise musst Du sammeln. Für manche Puzzles werden ein
> oder mehrere Hinweise benötigt. Vorher bekommst Du sie nicht zu sehen.
>
> Hinweise tauchen auch gesondert in der Arbeitsleiste auf, sodass Du sie
> jederzeit erreichen kannst.
>
> In diesem Fall führen alle aktuell offenen Rätsel zu einer neuen Spur. Werden
> die richtigen Hinweise gefunden, einer oder mehrere, dann geht es weiter.

Selbstverständlich war der Tatort die Vitrine. Das war augenscheinlich. Aber das
Pendel wurde von der Empore aus losgelassen. Der Täter musste die Vitrine gar
nicht berühren.

Der für die Verhältnisse des kleinen Museums bombastische Galerieflügel war in
einigen Teilen zweigeschossig. Eine wundervolle Holzempore war über eine mit
Drechseleien verzierte Treppe zugänglich.

Größe und Richtung passten perfekt zusammen. Der Täter mus das Pendel genau hier
vom Geländer fallengelassen haben. Dann schwang es über seinen Ruhepunkt hinweg
und zerschlug das Glas der Vitrine, ohne dass der Täter auf dem
Überwachungsvideo zu sehen gewesen wäre.

Das heißt auch, dass der Täter sehr viel Wissen vom Tatort haben musste. Er
kannte die Winkel der Kameras und wusste von den Sicherungsbolzen, die
eigentlich verhinderten, dass das Pendel zu weit ausschlägt.

Dann schauen wir uns die Empore mal etwas genauer an.

Hier, genau hier. Moment. Hier hat jemand etwas ins Geländer geschnitzt. Das
muss ganz frisch sein. Du erkennst vier Buchstaben:

```note
FRIE
```

Am besten Du trägst die Buchstaben in [Dein Notizbuch](#notizbuch) ein.

+++notizbuch

```@|
title: Notizbuch
weight: 3
type: page
```

# Deine Notizen

> Schon klar, das ist natürlich kein echtes Notizbuch, sondern ein weiteres
> Rätsel, diesmal vom Typ Mehrfacheingabe.
>
> Normalerweise musst Du hier nacheinander mehrere richtige Wörter eingeben.
> Z.B. die Wochentage.
>
> Oft - wie hier wird es aber auch genutzt, um Spuren zusammenzutragen. Denn Du
> kannst das Rätsel (genau wie alle anderen) auch mehrfach besuchen. Es merkt
> sich in der Zwischenzeit, was Du schon eingegeben hattest

Hier kannst Du alle Passwörter zusammentragen, die Du unter den anderen Rätseln
und Hinweisen findest.

Kleine Hilfe: Am Ende sollten es 3 Wörter sein.

```quest/multitext|
question:
  Trage hier die Buchstabenkombinationen ein, die Du gefunden hast.
  Du kannst auch auf andere Seiten gehen und wieder hierher zurückkehren um
  verschiedene Informationen zusammenzusammeln.
ref: notizbuch
solutions:
  - FRIE
  - DRIC
  - H z. F.
success:
  Sehr gut, Du hast erstmal alle Hinweise im Raum gefunden. Doch was hat das zu bedeuten?
  Es hat sich ein weiteres Rätsel geöffnet.
failure:
  Das hat leider nicht gepasst. Bitte versuche es nochmal. Du kannst auch gerne
  die Texte von den anderen Seiten kopieren.
notfound:
  Das waren 10 Fehlversuchhe. Leider hast Du die richtigen Lösungen nicht alle
  eingegeben. Wir lassen Dich weiterkommen, müssen Dir aber für diese
  Aufgabe 0 Punkte geben.
reveal:
  - der-name
```

+++der-name

```@|
title: Der Name
type: page
```

# Notizen sortieren

> Wir lernen hier eine weitere Rätselart kennen. Die Texteingabe.
>
> Wichtig ist, dass Du auf Groß und Kleinschreibung achtest und auch die
> Leerzeichen korrekt setzt.
>
> Falsche Eingaben werden wie immer mir etwas Punktabzug belegt.

Also nochmal zu den Notizen. Ich habe hier alle Textfetzen, die ich bisher
gefunden habe eingetragen. Ich denke wir sollten jetzt schon einiges an Material
haben. Drei seltsame Buchstabenkombinationen:

```note
DRIC

H z. F.

FRIE
```

```quest/input|
ref: der-name
weight: 3
question: Was könnten diese Buchstaben in der richtigen Reihenfolgeergeben?
solution: "FRIEDRICH z. F."
success: z. F. wie bei "zu Feuerbach". Sehr gut kombiniert! Friedrich zu Feuerbach. Wir haben einen Namen
failure:
  Das war leider falsch. Bitte achte auch auf Groß- und Kleinschreibung! Probier
  es gleich nochmal!
reveal:
  - verdaechtig
  - familienfoto
```

+++verdaechtig

```@|
title: Der Hauptverdächtige
type: clue
```

# Unser Hauptverdächtiger

![Bild von Friedrich zu Feuerbach](friedrich)

**Friedrich zu Feuerbach**, der Bruder des Museumsdirektors. So so. Das erklärt
einiges. Wir haben auf jeden Fall unseren Verdächtigen Nummer eins.

Aber wieso sollte er seinen Namen am Tatort hinterlassen?

Ein paar Dinge gilt es offensichtlich noch zu klären.

+++familienfoto

```@|
title: Fragen über Fragen
weight: 3
type: page
```

# Brüder im Bilde

> Bilderrätsel verlangen etwas Präzision und eine gute Spürnase. Finde das eine
> Objekt im Bild, das gesucht wird, und klicke so genau es geht darauf.

Friedich, der Bruder des Museumsdirektors.

Am Eingang des Museums hängt ein Foto. Es fiel mir schon auf, als ich hereinkam.
Ein altes Familienfoto der Feuerbachs. Zwei zu dem Zeitpunkt noch etwas jüngerhe
Herren, die genau gelich aussehen, Hieronymus und Friedrich. Es müssen Zwillinge
sein.

Ich beauftrage die Spurensicherung, das Foto genauer zu untersuchen und werfe
schon mal selbst einen Blick darauf.

Aber Moment, was ist das? Ich schnappe mir eine Lupe uns sehe mir ein Detail
genauer an.

```quest/imagemap|
ref: familienfoto
image: brothers
spot: [47, 59.5]
question: Welches spannende Detail ist hier zu sehen?
success:
  Unglaublich! Auf dem Foto ist unsere Uhr zu sehen, die gestohlene Taschenuhr,
  die zugegebenermaßen für eine heutige Taschenuhr sehr bullig aussieht.
failure:
  Das war leider falsch. Probier es gleich nochmal!
reveal:
  - rueckseite
  - pinnwand
```

```@/help
Hier musst Du das eine Detail finden, das für den Fall wichtig ist.
Schau genau über das Bild. Der eine Bruder hat etwas in der Hand.
```

+++rueckseite

```@|
title: Rückseite des Fotos
type: clue
```

Nach nur fünf Minuten kam einer der Kriminaltechniker an und zeigte mir das
Bild, nachdem er es kurz untersucht hatte.

"Hier ist etwas auf der Rückseite", sagte er. "Ein Text mit Bleistift
geschrieben. **'ENTERBT'** in Großbuchstaben."

```note
ENTERBT
```

"Was haben diese Leute nur mit den Rückseiten? Schon wieder ein Hinweis?", frage
ich.

Ich schaue ihn an, hole den Zettel vom Tatort und vergleiche die Buchstaben.

"Sieht ziemlich ähnlich aus, finden Sie nicht auch?", frage ich ihn.

"Ja, scheint die gleiche Handschrift zu sein", antwortet er. "Ich schicke gleich
Fotos von beinden Stücken zu unserem Graphologen. Der kann das sicher
bestätigen. Könnte ja auch vom Zwilling stammen."

"Zwillinge haben nicht unbedingt die gleiche Handschrift, Watson.", antworte
ich.

Wieso habe ich ihn Watson genannt? Keine Ahnung.

+++pinnwand

```@|
title: Die Pinnwand
weight: 2
type: page
```

# Friedrichs Alibi

> Bilderrätsel gibt es auch eine Stufe schwieriger. Kennt Ihr Wimmelbilder? Hier
> kommt eines.
>
> Manche Quests geben Euch Hinweise, wie viele Treffer in dem Bild versteckt
> sind. Manche nicht.

"Wo können wir den den Bruder Friedrich zu Feuerbach erreichen?", frage ich die
Dame an der Rezeption.

"Oh, vermutlich gar nicht", antwortet sie. "Er ist schon seit zwei Wochen in
Zürich auf einem Uhrmacherkongress. Er ist nämlich selbst Uhrmacher. Hier an der
Pinnwand hängen seine Postkarten. Drei Stück hat er verschickt."

```quest/imagemapmulti|
ref: pinnwand
image: pinboard
spots:
  - [44, 28]
  - [52, 48.5]
  - [77, 48]
tolerance: 8
question: Finde die drei Postkarten aus der Schweiz.
success:
  Sehr gut! Wir haben die drei Postkarten gefunden.
  Die Poststempel bestätigen, dass sie aus der Schweiz kommen.
failure:
  Das war leider die falsche Stelle. Probier es gleich nochmal!
reveal:
  - verhoere
```

```@/help
Also gut. Wir helfen Dir. Es sind drei Postkarten.
Finde einfach die Motive, die zur Schweiz passen.
```

+++verhoere

```@|
title: Verhöre
weight: 1
type: page
```

> Zeit zum Durchatmen. Wir haben Fortschritte gemacht, aber noch passt nichts
> zusammen.
>
> Hier also erstmal der Recap. Achte gleichzeitig auf die Liste der Hinweise.
> Dort haben sich zwei Verhörprotokolle angesammelt.

# Es passt nicht zusammen

Alles deutet auf den Bruder hin. Die Namensfragmente am ganzen Tatort, das
Familienfoto, das uns das Motiv liefert.

Aber wer hinterlässt schon so viele Hinweise am Tatort? Vor allem seinen eigenen
Namen? Und dazu kommt dass er augenscheinlich ein Alibi hat. Er hält sich im
Moment in Zürich auf einem Uhrmacherkongress auf.

Noch ein Aber: Welcher andere Täter würde so offensichtilche Spuren
hinterlassen? So offensichtlich, dass jeder Kriminalist sofort denkt, dass alles
gestellt sein muss.

Wir kommen nicht weiter. Wir müssen die Zeugen befragen. Ich schnappe mir Bruder
Hieronymus. Meine Kollegin versucht bereits, den Bruder im Hotel in Zürich zu
erreichen.

```quest/view|
ref: verhoere
reveal:
  - hieronymus
  - friedrich
  - geometrie
```

```@/help
Achte wieder auf den "Clues" Bereich rechts. Dort sind die beiden Verhöre zu finden.
Zudem ist diesmal schoon das nächste Rätsel freigeschaltet worden.
```

+++hieronymus

```@|
title: Gespräch mit Hieronymus zu Feuerbach
type: clue
```

# Im Büro des Direktors

Ick klopfe im Büro von Hieronymus zu Feuerbach an und trete ein. er ist immer
noch sichtlich aufgelöst über den Einbruch. Das Exponat ist von herausragender
Bedutung.

"Können Sie mir zunächst noch etwas über die Uhr erzählen?", frage ich ihn, um
seine Gedanken etwas zu fokussieren.

"Ja, selbstverständlich", antwortet er. "Die Uhr wurde von Peter Henlein im Jahr
1502 gebaut. Sie müssen wissen, dass das mehrere Jahre vor dem Datum ist, das in
der Wissenschaft immer genannt wird. Monogramm und Jahreszahl sind eingraviert
und wir sind überzeugt, dass es sich um ein frühes Werk von Henlein handelt."

"Verstehe, Sie sagen Sie sind überzeugt, dass die Uhr echt ist. Heißt das, dass
es noch nicht bestätigt wurde?"

"Wir erwarten einen Experten in etwa einem Monat, der die Uhr genau untersuchen
wird. Aber ja, wir, mein Bruder und ich, sowie zwei weitere Uhrmacher aus
unserem Bekanntenkreis sind uns ziemlich sicher."

"Nun zu Ihrem Bruder Friedrich. Wir haben am Eingang ein Foto gefunden, auf dem
"ENTERBT" steht. Können Sie dazu etwas sagen?"

"Oh, das war mir noch gar nicht aufgefallen. Ja, etwa die Hälfte der Sammlung
stammt von unserem Vater. Er hatte aber alles mir vermacht. Men Vater hatte sich
in einem Streit mal mit Friedrich überworfen. Friedrich war schon immer ein
genialer Mechaniker. Er war besser darin als mein Vater und ich glaube, er hatte
das nicht vertragen. Nun ja, nun ist er schon zehn Jahre tot."

"Und wie würden Sie Friedrichs Rolle heute hier im Museum beschreiben?"

"Ich binde meinen Bruder wie einen Miteigentümer ein, aber ich trage die
finanzielle Verantwortung. Nebenbei betreibt er noch einen Uhrmacherbetrieb und
verkauft von Zeit zu Zeit seine Modelle für sehr viel Geld."

"Glauben Sie er hegt einen Groll gegen Sie?"

"Nein, das kann ich mir nicht vorstellen. wir haben ein gutes Verhältnis."

+++friedrich

```@|
title: Telefonprotokoll mit Friedrich zu Feuerbach
type: clue
```

```note
**KOK Berger:** Guten Tag, hier spricht Kommissarin Berger. Ich rufe vom Museum Ihres Bruder aus an.

**FzF:** Ja, guten Tag. Wie kann ich Ihnen helfen?

**KOK Berger:** Hier im Museum hat ein Einbruch stattgefunden. Wir überprüfen routinemäßig alle Beteiligten. Sie sind ja zurzeit auf einem Uhrmacherkongress in Zürich, richtig?

**FzF:** Ja, das stimmt.

**KOK Berger:** Wie lange schon?

**FzF:** Seit etwa zwei Wochen. Der Kongress startete vorgestern. Davor hatte ich noch einige Geschäftstermine in der Schweiz.

**KOK Berger:** Können Sie mir einen Kotakt nennen, der das bestätigt?

**FzF:** Ja, natürlich, einige sogar. Ich kann Ihnen die Kontaktdaten meines Hotels und meines Geschäftspartners hier in Zürich geben.
```

Nach Rückfragen bei den genannten Personen bestätigt sich das Alibi von
Friedrich zu Feuerbach.

+++geometrie

```@|
title: Die Geometrie des Pendels
weight: 3
type: page
```

# Wie werden wir aus Friedrich schlau?

> Es gibt noch eine weitere Art von Bilderrätseln. In diesen muss man schätzen.
> Ein Punkt auf dem Bild ist korrekt und es wird gemessen, wie nache die
> Schätzung am richtigen Punk dran ist.

Friedrich hatte ein starkes Motiv, aber auch ein stichfestes Alibi.

Nach Betrachtung der Kameraaufnahmen stellt sich eine abschließende Frage:

Auf der Kamera sieht man wie das Pendel schwingt. Die Uhr fällt vermutlich nach
hinten weg. Denn als das Pendel wieder heraussschwingt und die Sicht freigibt,
ist die Vitrine zertrümmert und das Objekt weg.

Der Täter musste nicht im Bild der Kameras sein als die Tat verübt wurde. Doch
er oder sie hinterließ auch einen Zettel und schließlich war auch das Objekt
verschwunden. Spätestens dann muss er doch durchs Bild gelaufen sein, oder?

Es sei denn...

Die Assistenten haben Baupläne des Museums besorgt. Mich interessiert besonders
der Querschnitt durch den Flügelbau, dort wo das Pendel schwingt. Man sieht die
Empore, den Ort wo der Täter vermeintlich das Pendel hat fallen lassen.

Was wenn er es nicht fallen ließ, sondern als geschickter Uhrmacher eine
Mechanik baute. Wir sollten die Wand dahinter prüfen. Aber wo genau? Führen wir
das Pendel weiter.

```quest/imagemapprecision|
ref: geometrie
question: An welcher Stelle könnte sich hinter der Wand ein Hohlraum befinden?
image: geometry
spot: [90.5, 50.8]
success:
  Unglaublich! Hinter der Wand über der Durchgangstür ist tatsächlich ein Hohlraum.
reveal:
  - loesung
```

```@/help
Hier musst Du den genauen Punkt finden, an dem sich der Hohlraum hinter der
Wand befindet. Am besten Du führst einfach den Pendelschwung weiter.
Dann solltest Du auf die Wand treffen.
```

+++loesung

```@|
title: Wir lösen auf
type: clue
subtype: solution
```

# Die Mechanik im Gebäude

Zusammen mit den Technikern tasteten wir die Wand an der Empore ab. Und
tatsächlich befindet sich ein Hohlraum dahinter. Und wenn man genau schaut, kann
man auch eine ganz dünne Fuge erkennen, mit Uhrmacherpräzision eingearbeitet.

Die Fuge kommt von einer Platte, die bündig mit der Wand abschließt. Man kann
sie einfach aufklappen, wirklich makellose Mechanik.

Dahinter befindet sich ein Hohlraum, in dem genau das Pendel Platz findet.

Und was entdecke ich da? Ein goldenes Meisterstück der Uhrmacherkunst. Die
gestohlene Taschenuhr auf einem weichen, mit Samt ausgekleideten Bett.

Der ganze Coup wurde vollständig mechanisch durchgeführt. Ein kleiner Motor
konnte das Pendel hochziehen und im richtigen Moment fallen lassen. Ein
Magnetarm am Pendel schnappte sich die Uhr im Vorbeiflug, ließ den Zettel fallen
und gab die Uhr im Hohlraum wieder frei.

Damit konnte man auch mit Alibi der Täter sein.

Noch am selben Tag ließen wir Friedrich zu Feuerbach von der Schweizer Polizei
festnehmen. Kurz danach gestand er alles.

![Friedrich wird abgeführt](arrest)

Er ist zweifelsohne ein genialer Mechaniker, aber als Krimineller hatte er noch
einiges zu lernen. Seine doppelte Finte mit den Spuren, die zu ihm selbst
führten war mehr als offensichtlich.

Damit kann ich die Akte schließen. Der erste Fall für DICA ist gelöst.
