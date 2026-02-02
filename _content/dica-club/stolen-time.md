```@@|
slug: stolen-time
language: en
ref: gestohlene-zeit
title: Stolen Time
description:
  The first DICA case with detailed explanations of how the quests work.
group: dica-club
image: crime-scene
tags:
  - Escape Game
  - Scavenger Hunt
  - Riddles
  - Geolocation
version: 1
subtitle: The first DICA Case
start: 2024-12-21
type: dica
colorSpace: carmine
reveal:
  - case
```

+++case

```@|
title: The Crime Scene
type: page
weight: 1
```

# Welcome to the world of sleuths and riddle lovers!

> This first case gives you an introduction to the different types of riddles
> and cases you will find here. You will learn the controls and strategies so
> that you can fully concentrate on the cases.

When **Hieronymus zu Feuerbach**, the director of the City Museum, noticed the
burglary, he immediately called the police. That was at 5:30 in the morning.

Now I, KHK Kahaka, am standing before a proverbial pile of broken glass. In the
gallery wing, a glass cover was smashed and the valuable exhibit, an old pocket
watch, was stolen.

Only the white pedestal remains with the inscription **"The watch that can
control time - Anno 1502"**, as well as -- I had to look closer -- a note with
text in typewriter font.

That must be a clue from the perpetrator.

![Image of the crime scene](crime-scene)

There seem to be no other traces. The remaining artifacts in the room are

- approx. 10 other watch exhibits
- numerous wall portraits of famous clockmakers
- an oversized wall clock pendulum hanging from the ceiling
- the Eiffel Tower as a painting on the west wall already belongs to the next
  theme area
- several display cases with old construction drawings and other documents

All other exhibits and exhibition elements have remained absolutely intact. The
surveillance cameras also show no suspicious activities. A wooden gallery,
accessible via stairs, also shows no obvious traces.

```quest/view|
ref: case
reveal:
  - waste-no-time
```

```@/help
So let's go, if you feel like it, start with the first riddle. At the moment only a
single track is visible on the right, so **click on it right away**.

Generally, riddles and cases are not always linear. The right column
lets you navigate through the different scenes to find clues. It is under your control what you do next. The story will not continue by itself.

So also pay attention if new entries appear here, because many pages only
become visible when certain conditions are met.
```

+++waste-no-time

```@|
title: Waste No Time
weight: 2
type: page
```

# What do you want to do first?

> One of the simplest riddles is the classic Who Wants to Be a Millionaire quiz
> question. You can solve it by clicking on the correct answer.
>
> You can complete every riddle with a value between 0 and 100. So be careful!
> If you click a wrong solution, you can guess again, but we will deduct a few
> points.

I want to note down the first facts and think for a moment. What is the name of
the hall we are in again?

```quest/choice|
ref: waste-no-time
question: What is the name of the hall?
options:
  - Clock Hall
  - Gallery Wing
  - Library
  - Main Hall
solution: 1
success:
  Very good! We are in the Gallery Wing, as can be easily seen from the numerous
  wall portraits. As a reward, there is a clue.
  Look to the right in the navigation bar.
failure: Unfortunately that was wrong. Try again right away!
reveal:
  - the-webpage
```

```@/help
As you can see, you have to pay attention to every detail. But don't worry. You are
welcome to go look again. Little hint, which is probably only free in this very first game: You will find the answer in the introduction text on the previous page. So if you forgot it, no problem, just navigate back, read tit up, remember it and come back to answer the question.
```

+++the-webpage

```@|
title: The Webpage
type: clue
```

# A Detail on the Note

> This is a "Clue". Clues normally contain no riddles themselves. But they can
> fulfill three different tasks.
>
> 1. They contain information that you may need to enter or use elsewhere.
> 2. They lead you to another location (like here with this clue)
> 3. They can unlock pages. For example if you find all 3 clues in a case, then
>    another page becomes visible and the investigation can continue
>
> Clues can be anywhere. sometimes you even have to leave DICA and search
> elsewhere to get the desired URL. Then such a Clue page is just the starting
> point.
>
> In some cases there are even QR codes at real locations that you have to scan.
> But don't worry, we decided on a simple variant for the beginning.

The note is currently the hottest lead. Even before all traces have been
secured, you put on rubber gloves and photograph the typewritten text.

Immediately a URL catches your eye:

[https://www.time-flies.com/peter-henlein](#traces)

```@/help
Simply click on the link. It takes you to a hidden page.
As soon as you are there, it will also appear in the right navigation column.
```

+++traces

```@|
title: The First Clue
weight: 1
type: page
```

# The Inventor of the Pocket Watch

> Good. You didn't enter the URL in the browser, but clicked on the text.
> Perfect!
>
> This is a so-called View Riddle. It is even simpler than the question from the
> previous riddle. As soon as you get to the page, the riddle counts as
> completed.
>
> Of course it can be arbitrarily difficult to find the page.

![Website](website)

`https://www.time-flies.com/peter-henlein`

&nbsp;

The website shows **Peter Henlein**, the inventor of the pocket watch. His life,
as well as the first watch he built, are described here in detail. You read the
information carefully and note down the most important points.

One point stands out immediately. The first watch mentioned seems to be dated
later than the one that disappeared here.

Together with the note you found, there are now several leads that you must
follow.

```quest/view|
ref: traces
reveal:
  - on-the-page
  - the-note
  - the-weapon
```

```@/help
As you can see, more riddles have now appeared in the overview on the right. You can tackle them in any order.
```

+++on-the-page

```@|
title: On the Page
weight: 2
type: page
```

> Let's increase the difficulty a bit.
>
> Multiple Choice questions are tricky, because you usually don't know how many
> correct answers there are.

The website found is strange. apparently it shows normal information. But
further down you find a list of terms that represent a kind of entry code. You
absolutely must find the right ones.

```quest/multiplechoice|
ref: on-the-page
question: Which terms can be assigned to watchmaking?
options:
  - Pendulum
  - Rotor
  - Dial
  - Wing nut
  - Tides
  - Crankshaft
  - Second hand
  - Compass
  - Balance wheel
  - Stick
solutions: [0, 2, 6, 8]
success:
  Very good! Are you a trained watchmaker or what?
  As you might have seen, a clue was unlocked.
  Another subpage has opened.
failure:
  Unfortunately that was wrong. Try again right away!
  But we sadly have to deduct a few points.
reveal:
  - access
```

+++accesss

```@|
title: The Subpage
type: clue
reveal:
  - notebook
```

# Access

> This is a clue. You have to collect clues. For some puzzles one or more clues
> are required. Before that you won't get to see them.
>
> Clues also appear separately in the task bar, so that you can reach them at
> any time.
>
> In this case all currently open riddles lead to a new track. If the right
> clues are found, one or more, then it continues.

You found the code on the seemingly harmless website and opened a hidden page.
But the thief seems to be making a fool of you. One riddle is followed by the
next.

The page that appears contains only a few strange letters, presumably a
password:

```note
DRIC
```

Best you enter the letters in [Your Notebook](#notebook).

+++the-note

```@|
title: The Note
weight: 2
type: page
```

# The Silent Companion

> There are also riddles where you have to enter the answer. Caution is advised
> here, because you have to pay attention to upper and lower case. Please also
> pay close attention to the hints in such riddles to choose the correct input
> form with singular, plural, with or without article etc.
>
> Because here too, we deduct a few percentage points if you make a wrong input.

On the note from the crime scene, next to the internet address mentioned as the
source, there is also this riddle:

```note
To find me you must solve this riddle:

I cannot be grasped, yet I am always around you.
Without me everything stands still, yet you cannot see me.
I am the companion of seconds and hours – what am I called?

  Signed _The Silent Companion_
```

```quest/input|
ref: the-note
question: Which term could be sought?
solution: Time
success:
  Very good! You are on the right track. You have hereby also unlocked another
  Clue.
failure:
  Unfortunately that was wrong. Please pay attention to upper and lower case too! Try
  again right away!
notfound:
  Time, that would have been the correct solution. Unfortunately you didn't find this even after 10
  tries. We let you proceed, but have to give you 0 points for this
  task.
reveal:
  - disappointed
```

+++disappointed

```@|
title: More Clues
type: clue
```

# Good and Bad at the Same Time

> This is a clue. You have to collect clues. For some puzzles one or more clues
> are required. Before that you won't get to see them.
>
> Clues also appear separately in the task bar, so that you can reach them at
> any time.
>
> In this case all currently open riddles lead to a new track. If the right
> clues are found, one or more, then it continues.

Disappointment spreads.

You solved the difficult riddle of the note, but it didn't really get you any
further.

Obviously everything revolves around **Time**. You knew that already with such a
valuable stolen pocket watch.

Well, there are more tracks to follow. Maybe they will lead you further.

**But Stop! The note also has a back side. Someone wrote something there with
pencil.**

```note
H z. F.
```

Strange letter combination. Still, definitely enter it in
[Your Notebook](#notebook).

+++the-weapon

```@|
title: The Weapon
weight: 2
type: page
```

# The Weapon

> Estimations are a popular type of riddle. Of course this variant also appears
> in Dica. And naturally one can also use it excellently in criminal cases.
>
> You simply enter the sought value as a number and we check if it lies within
> the tolerance. If not, you have to guess again. But Attention: Even if it
> fits, the more precisely you hit the value, the more points you get.

We haven't talked about the weapon yet. For the perpetrator didn't use a hammer
and take it with him. No. Here too clues were left behind.

The weapon was probably **the huge pendulum**. The gallery is equipped with a
large pendulum that hangs from the ceiling and can be moved by visitors. If one
removes the safety catch, which is apparently the case here, the pendulum can
swing freely. Now one would only need to know the room height and determine the
direction.

Aha. Looking around reveals another clue.

![Eiffel Tower Mural](eiffel-tower)

On the west wall of the gallery wing, the Eiffel Tower is painted - in full size
from the baseboard to below the ceiling. A fascinating mural. The small plaque
at the foot of the painting says **"Scale 1:50"**. Well if that isn't enough to
determine the room height.

```quest/number|
ref: the-weapon
question: How high is the ceiling of the gallery wing in centimeters?
solution: 660
tolerance: 60
success: Very well combined, perfectly deduced.
failure:
  Unfortunately that was wrong. Please try again. You are also welcome to use the
  internet for help. We are looking for the height in centimeters.
reveal:
  - the-gallery
```

+++the-gallery

```@|
title: The Gallery
type: clue
```

# The Actual Crime Scene

> This is a clue. You have to collect clues. For some puzzles one or more clues
> are required. Before that you won't get to see them.
>
> Clues also appear separately in the task bar, so that you can reach them at
> any time.
>
> In this case all currently open riddles lead to a new track. If the right
> clues are found, one or more, then it continues.

Naturally the crime scene was the display case. That was obvious. But the
pendulum was released from the gallery. The perpetrator didn't have to touch the
display case at all.

The gallery wing, bombastic for the proportions of the small museum, was
two-storied in some parts. A wonderful wooden gallery was accessible via a
staircase decorated with turnery.

Size and direction matched perfectly. The perpetrator must have dropped the
pendulum exactly here from the railing. Then it swung past its resting point and
smashed the glass of the display case, without the perpetrator being visible on
the surveillance video.

That also means that the perpetrator must have had a lot of knowledge of the
crime scene. He knew the angles of the cameras and knew about the safety bolts
that actually prevented the pendulum from swinging too far.

Then let's take a closer look at the gallery.

Here, right here. Wait. Someone carved something into the railing here. That
must be very fresh. You recognize four letters:

```note
FRIE
```

Best you enter the letters in [Your Notebook](#notebook).

+++notebook

```@|
title: Notebook
weight: 3
type: page
```

# Your Notes

> Sure, this is of course not a real notebook, but another riddle, this time of
> type Multiple Input.
>
> Normally you have to enter several correct words one after another here. E.g.
> the days of the week.
>
> Often - like here it is also used to compile clues. Because you can visit the
> riddle (just like all others) multiple times. It remembers in the meantime
> what you had already entered.

Here you can compile all passwords that you find under the other riddles and
clues.

Little help: In the end there should be 3 words.

```quest/multitext|
question:
  Enter the letter combinations you found here.
  You can also go to other pages and return here to
  collect various information.
ref: notebook
solutions:
  - FRIE
  - DRIC
  - H z. F.
success:
  Very good, you have found all hints in the room for now. But what does that mean?
  Another riddle has opened.
failure:
  That unfortunately didn't fit. Please try again. You are also welcome to
  copy the texts from the other pages.
notfound:
  That was 10 failed attempts. Unfortunately you didn't enter all the correct solutions.
  We let you proceed, but have to give you 0 points for this
  task.
reveal:
  - the-name
```

+++the-name

```@|
title: The Name
type: page
```

# Sorting Notes

> We learn another riddle type here. Text input.
>
> It is important that you pay attention to upper and lower case and also set
> the spaces correctly.
>
> Wrong entries are penalized as always with some point deduction.

So back to the notes. I have entered all text scraps I have found so far here. I
think we should have quite some material by now. Three strange letter
combinations:

```note
DRIC

H z. F.

FRIE
```

```quest/input|
ref: the-name
weight: 3
question: What could these letters form in the correct order?
solution: "FRIEDRICH z. F."
success: z. F. like in "zu Feuerbach". Very well combined! Friedrich zu Feuerbach. We have a name
failure:
  Unfortunately that was wrong. Please pay attention to upper and lower case too! Try
  again right away!
reveal:
  - suspicious
  - family-photo
```

+++suspicious

```@|
title: The Prime Suspect
type: clue
```

# Our Prime Suspect

![Image of Friedrich zu Feuerbach](friedrich)

**Friedrich zu Feuerbach**, the brother of the museum director. So so. That
explains a lot. We definitely have our suspect number one.

But why should he leave his name at the crime scene?

A few things obviously still need to be clarified.

+++family-photo

```@|
title: Questions upon Questions
weight: 3
type: page
```

# Brothers in the Picture

> Image riddles require some precision and a good nose. Find the one object in
> the picture that is sought, and click on it as precisely as possible.

Friedrich, the brother of the museum director.

At the entrance of the museum hangs a photo. It caught my eye when I came in. An
old family photo of the Feuerbachs. Two gentlemen, somewhat younger at the time,
who look exactly the same, Hieronymus and Friedrich. They must be twins.

I instruct forensics to examine the photo more closely and take a look at it
myself.

But wait, what is that? I grab a magnifying glass and look at a detail more
closely.

```quest/imagemap|
ref: family-photo
image: brothers
spot: [47, 59.5]
question: Which exciting detail can be seen here?
success:
  Unbelievable! On the photo our watch can be seen, the stolen pocket watch,
  which admittedly looks very bulky for a modern pocket watch.
failure:
  Unfortunately that was wrong. Try again right away!
reveal:
  - backside
  - pinboard
```

```@/help
Here you have to find the one detail that is important for the case.
Look exactly over the picture. One brother has something in his hand.
```

+++backside

```@|
title: Back of the Photo
type: clue
```

After only five minutes one of the forensic technicians arrived and showed me
the picture after he had examined it briefly.

"Here is something on the back", he said. "A text written in pencil.
**'DISINHERITED'** in capital letters."

```note
DISINHERITED
```

"What is it with these people and the back sides? Another clue?", I ask.

I look at him, get the note from the crime scene and compare the letters.

"The letters look quite similar, don't you think?", I ask him.

"Yes, seems to be the same handwriting", he answers. "I'll send photos of both
pieces to our graphologist right away. He can surely confirm that. Could also
come from the twin."

"Twins don't necessarily have the same handwriting, Watson.", I answer.

&nbsp;

Why did I call him Watson? No idea.

+++pinboard

```@|
title: The Pinboard
weight: 2
type: page
```

# Friedrich's Alibi

> Image riddles also exist one level harder. Do you know hidden object games?
> Here comes one.
>
> Some quests give you hints how many hits are hidden in the picture. Some
> don't.

"Where can we reach the brother of your boss, Friedrich zu Feuerbach?", I ask
the lady at the reception.

"Oh, probably not at all", she answers. "He has been in Zurich at a watchmaker
congress for two weeks. He is a watchmaker himself. Here on the pinboard hang
his postcards. He sent three of them."

```quest/imagemapmulti|
ref: pinboard
image: pinboard
spots:
  - [44, 28]
  - [52, 48.5]
  - [77, 48]
tolerance: 8
question: Find the three postcards from Switzerland.
success:
  Very good! We found the three postcards.
  The postmarks confirm that they come from Switzerland.
failure:
  Unfortunately that was the wrong spot. Try again right away!
reveal:
  - interviews
```

```@/help
Alright. We'll help you. It's three postcards.
Simply find the motifs that fit Switzerland.
```

+++interviews

```@|
title: Interviews
weight: 1
type: page
```

# It Doesn't Add Up

> Time to take a breath. We have made progress, but nothing fits together yet.
>
> Here is the recap for now. Pay attention to the list of clues at the same
> time. Two interrogation protocols have accumulated there.

Everything points to the brother. The name fragments all over the place, the
family photo that gives us the motive.

But who leaves so many clues at the crime scene? Especially his own name? And on
top of that he apparently has an alibi. He is currently in Zurich at a
watchmaker congress.

**Another But:** Which other perpetrator would leave such obvious traces? So
obvious that every criminalist immediately thinks that this must be staged.

We are not getting anywhere. We have to question the witnesses. I grab brother
Hieronymus. My colleague is already trying to reach the brother in the hotel in
Zurich.

```quest/view|
ref: interviews
reveal:
  - hieronymus
  - friedrich
  - geometry
```

```@/help
Watch the "Clues" area on the right again. The two interrogations can be found there.
Also, the next riddle has already been unlocked this time.
```

+++hieronymus

```@|
title: Conversation with Hieronymus zu Feuerbach
type: clue
```

# In the Director's Office

I knock on Hieronymus zu Feuerbach's office and enter. He is still visibly
shaken by the burglary. The exhibit is of outstanding importance.

"Can you tell me something more about the watch first?", I ask him to focus his
thoughts a bit.

"Yes, of course", he answers. "The watch was built by Peter Henlein in the
year 1502. You must know that this is several years before the date that is
always mentioned in science. Monogram and year are engraved and we are convinced
that it is an early work by Henlein."

"I see, you say you are convinced the watch is genuine. Does that mean that it
hasn't been confirmed yet?"

"We expect an expert in about a month who will examine the watch closely. But
yes, we, my brother and I, as well as two other watchmakers from our circle of
acquaintances are pretty sure."

"Now to your brother Friedrich. We found a photo at the entrance on which
'DISINHERITED' is written. Can you say something about that?"

"Oh, I hadn't noticed that at all. Yes, about half of the collection comes from
our father. But he had bequeathed everything to me. My father had once fallen
out with Friedrich in an argument. Friedrich was always a brilliant mechanic. He
was better at it than my father and I think the old man couldn't handle that.
Well, he has been dead for ten years now."

"And how would you describe Friedrich's role here in the museum today?"

"I involve my brother like a co-owner, but I bear the financial responsibility.
Besides, he runs a watchmaking business and sells his models for a lot of money
from time to time."

"Do you think he holds a grudge against you?"

"No, I can't imagine that. We have a good relationship."

+++friedrich

```@|
title: Phone Log with Friedrich zu Feuerbach
type: clue
```

```note
**KOK Berger:** Good day, this is Commissioner Berger speaking. I am calling from your brother's museum.

**FzF:** Yes, good day. How can I help you?

**KOK Berger:** A burglary has taken place here in the museum. We are routinely checking all involved parties. You are currently at a watchmaker congress in Zurich, right?

**FzF:** Yes, that's correct.

**KOK Berger:** For how long?

**FzF:** Since about two weeks. The congress started the day before yesterday. Before that I had some business appointments in Switzerland.

**KOK Berger:** Can you give me a contact who confirms this?

**FzF:** Yes, of course, several even. I can give you the contact details of my hotel and my business partner here in Zurich.
```

After checking with the mentioned persons, the alibi of Friedrich zu Feuerbach
is confirmed.

+++geometry

```@|
title: The Geometry of the Pendulum
weight: 3
type: page
```

# How do we figure out Friedrich?

> There is another type of image riddles. In these you have to estimate. A point
> on the image is correct and it is measured how close the guess is to the
> correct point.

Friedrich had a strong motive, but also a watertight alibi.

After viewing the CCTV recordings, a final question arises:

On the camera you can see the pendulum swinging. The watch probably falls
backwards. Because when the pendulum swings out again and clears the view, the
display case is smashed and the object is gone.

The perpetrator didn't have to be in the view range of the cameras when the
crime was committed. But he or she also left a note and finally the object was
also gone. At the latest then he must have walked through the picture to grab
it, right?

&nbsp;

Unless...

&nbsp;

The assistants have obtained blueprints of the museum. I am particularly
interested in the cross-section through the wing building, where the pendulum
swings. You can see the gallery, the place where the perpetrator supposedly
dropped the pendulum.

What if he didn't drop it, but built a mechanism as a skilled watchmaker. We
should check the wall behind it. But where exactly? I take some transparent
paper and draw the pendulum swing.

```quest/imagemapprecision|
ref: geometry
question: At which point could a cavity be located behind the wall?
image: geometry
spot: [90.5, 50.8]
success:
  Unbelievable! Behind the wall above the connecting door there is actually a cavity.
reveal:
  - solution
```

```@/help
Here you have to find the exact point where the cavity is located behind the
wall. Best you simply continue the pendulum swing.
Then you should hit the wall.
```

+++solution

```@|
title: We Solve It
type: clue
subtype: solution
```

# The Mechanism in the Building

Together with the technicians we scanned the wall at the gallery. And indeed
there is something behind it. If you look closely, you can see a very thin
joint, worked in with watchmaker precision.

The joint comes from a panel that is flush with the wall. You can simply fold it
open, truly flawless mechanics.

Behind it is a cavity, that workd perfectly as a garage for the pendulum.

And what do I discover there? A golden masterpiece of watchmaking art. The
stolen pocket watch on a soft bed lined with velvet.

The whole coup was carried out completely mechanically. A small motor could pull
the pendulum up and drop it at the right moment. A magnetic arm on the pendulum
grabbed the watch in flyby, dropped the note and released the watch into the
cavity again.

This way one could be the perpetrator even with an alibi.

On the same day we had Friedrich zu Feuerbach arrested by the Swiss police.
Shortly afterwards he confessed everything.

![Friedrich is being led away](arrest)

He is undoubtedly a brilliant mechanic, but as a criminal he still had some
things to learn. His double feint with the traces that led to himself was more
than obvious.

With that I can close the file. The first case for DICA is solved.
