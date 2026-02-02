---
title: Über Octahedron World
superTitle: Autor, Motivation und Technologie
group: general
slug: ueber-uns
layout: legal
image: _home
language: de
ref: about
---

# Wer bin ich?

Hallo, mein Name ist Matthias.

Ich bin Software Engineer und Team Lead. Aber schon seit meiner Jugend denke ich
mir Geschichten aus und baue andere Welten in meinem Kopf. Später habe ich sie
aufgeschrieben, vergessen, wiedergefunden, neue Ideenschichten hinzugefügt und
so weiter.

Ich bin inzwischen einige Jahrzehnte älter und immer noch tauchen von Zeit zu
Zeit Ideen auf. Es gibt also reichlich Material.

# Wohin mit all dem Inhalt in meinem Kopf?

Vor einigen Jahren wuchs eine dieser Ideen so sehr an, dass sie in einen Roman
kanalisiert werden mussten (oder konnten). Ich habe es sogar geschafft, ihn
zusammen mit meiner lieben Frau Anne zu schreiben und zu veröffentlichen. Es ist
ein Fantasy-Roman (auf Deutsch) mit dem Titel „Die Hermetiker“. Und ich bin
sicher, ich werde den einen oder anderen Hinweis auf diesen Seiten platzieren,
vielleicht sogar ein Probekapitel. Für den Anfang könnt Ihr einiges über das
Worldbuilding und andere Dinge im Hermetiker-Universum erfahren.

==> hermetics

Aber es gab noch viele andere Geschichten, von Space Opera über Cyberpunk bis
hin zu recherchierten wissenschaftlichen Fakten. Für diese habe ich noch keinen
geeigneten Kanal gefunden.

Ich habe viele Formate ausprobiert. Als Entwickler verliert man sich so leicht
darin, die bestmögliche Blog-Technologie zu erstellen und vergisst dabei den
Inhalt. Und so habe ich viele Varianten ausprobiert, alle gebunden an
Bedingungen wie „mindestens ein kompletter Artikel pro Woche“. Und ich habe es
nie geschafft, so viel zu liefern und verlor nach einer Weile den Faden.

## Byte-Sized Fiction

Dann kam die Twitter-Krise und Corona. Elon Musk wollte Twitter kaufen. Und
jeder probierte andere Dinge aus wie [Mastodon](https://mstdn.social/@aithir).
Das war die Gelegenheit für einen Neustart und die Erstellung eines
zweckgebundenen Accounts.

Das Format war vorgegeben. Das Maximum auf dieser Instanz waren 1.000 Zeichen
pro **Tröt**. Also habe ich meinen Inhalt in kleine 150-Wort-Stücke geschnitten
und das Material in Serien veröffentlicht, die ich [Storylines](/storylines)
nannte. Was begann, war eine Phase, die man als die **kambrische Explosion** an
Inhalten bezeichnen könnte.

Weil man nach einiger Zeit den Überblick verliert, wenn man durch einen
Social-Media-Feed blättert, kam ich nach einer Weile wieder auf den
ursprünglichen Plan zurück, eine Website dafür zu erstellen. Aber dieses Mal mit
dem Unterschied, dass es bereits einigen Inhalt gab.

Und das routinierte Tempo von **vier Beiträgen pro Woche** oder 2 bis 3
gedruckten Seiten blieb erstmal. Erstaunlich! Und ich werde nie den zusätzlichen
Nervenkitzel jenseits des kontinuierlichen Schreibens vergessen: Komprimierung
in Flash Fiction und jeden Tag ein kleines bisschen Spannung erzeugen.

# Neuformatiert

Aber das war nicht das Ende. Früher oder später musste das Konzept seine
kreativen Grenzen erreichen und der Wunsch, über diese künstliche Einschränkung
hinauszugehen, wurde größer und größer.

Die nächsten Iterationen gingen daher zurück zur Veröffentlichung längerer
Abschnitte bis hin zu ganzen Kurzgeschichten, diesmal in einem monatlichen
Magazinformat. Ich habe auch die Storylines überarbeitet und wieder vollwertige
Lesestrecken daraus erstellt. Aber man konnte immer noch sehen, wie die Dinge
wuchsen. Alle Inhalte sind während ihrer Entstehung live, mit allen Schritten
dazwischen. Wann immer ein neues Kapitel oder ein neuer Abschnitt verfügbar war,
wurde die Seite aktualisiert.

# Konsolidierung

Vorspulen ins Jahr 2026. Eine weitere, die bisher letzte große Änderung der
Seite und vor allem ihres Inhalts. Ich habe das Konzept der monatlichen Magazine
mit gemischten Themen fallen gelassen und eine Struktur eingeführt, die sich an
meine Handlungsbögen anlehnt. Ein Kapitel für jeden Bogen und Ihr findet das
gesamte Material, das zu einer Welt gehört, in diesem Kapitel. Seid also bereit,
die ganze Welt auf einmal zu erkunden.

Fiktion im Bereich Sci-Fi und Fantasy zu erstellen bedeutet Worldbuilding.
Prinzipien zu erstellen, die wiederverwendet werden können, ist viel einfacher
und prägnanter, als mit einer Geschichte zu beginnen und zu versuchen, die
Umgebung daran anzupassen. Das ist meine Art, mir Inhalte vorzustellen, und ich
dachte, das sollte sich auf der Seite widerspiegeln.

Nebeneffekt: Alle meine anderen Ideen (Musik hören, Spiele erfinden,
Programmieren, Fotografie) passen auch hinein und finden sich jeweils in ihren
Kapiteln wieder.

## Tech Talk

Noch ein paar technische Fakten über das Portal gefällig?

Ich benutze inzwischen **Solid JS** (Solid Start) und deploye alles in ein
Docker Image, das auf einem selbst gehosteten **Hetzner** Server lebt. Daher
habe ich mich von meinen vorherigen Iterationen mit Next.js und Vercel (deren
Richtlinien ich nicht mehr so sehr mag) abgewendet.

Ich möchte keine Werbung auf der Plattform. Das minimale und maßgeschneiderte
Tracking erfolgt über - Ihr habt es erraten - eine selbst gehostete
Matomo-Instanz (nachdem ich auch Google Analytics verlassen habe).

Ich benutze Tailwind für die Styles und eine maßgeschneiderte Markdown-Pipeline
basierend auf unified und remark, um die Seiten zu erstellen. Der gesamte Text
lebt im Repo neben dem Code und durchläuft denselben Deployment-Zyklus (ich will
hier nicht von CI-Pipeline sprechen) wie der Code selbst.

Jedes Thema kommt mit seinem Coverbild. Die meisten Bilder stammen von der
**Midjourney** AI oder Geminis Nano Banana.

## Viel Spaß

**Der wichtigste Zweck meiner Texte ist es, mich selbst beim Schreiben zu
unterhalten.**

Aber ich schätze auch Feedback und Diskussionen. Wie gefällt es Euch? Passt
etwas nicht zusammen, Typos irgendwo? Seid Ihr neugierig, was als nächstes
kommt?

Ich denke immer noch über eine direkte Feedback-Schleife innerhalb der Seite
nach. Ich würde gerne Eure Gedanken hören. Aber für jetzt könnt Ihr mir
[mailen](mailto:mr@octahedron.world) oder mich über
[Mastodon](https://mstdn.social/@aithir),
[Bluesky](https://bsky.app/profile/octahedron.bsky.social) oder
[Instagram](https://www.instagram.com/matzn/) erreichen.

Aber natürlich möchte ich auch, dass Ihr Spaß mit meinen Texten habt.
[Warum taucht Ihr nicht einfach ein?](/)
