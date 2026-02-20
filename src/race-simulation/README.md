## Dev Server

Runs on **http://localhost:4242/race-simulation**

## Logic in src/race-simulation/index.ts

Create a group (array) of 100 racers (should be a `class`). Each with an id (1
.. 100), a random skill (0..1), reliability (0..1), risk (0..1).

The 100 racers run in seven race days (one per weekday). Every race day comes
with 8 stages. Each stage comes with another set of random numbers: achievement,
luck.

The racer can either

- drop out (reliability \* luck below dropoutThreshold)
- dnf the stage ((1- risk) \* luck below dnfThreshold)
- get a score (skill _ risk _ achievement)

Annotation: make dropoutThreshold and dnfThreshold configurable easy to access
constants. Goal is: 10% drop out rate per day plus 15% dnf rate.

Racers who drop out don't take part in the next stages of the day anymore.

Recers who took part and got a score can earn points. Only the first 30 will get
points.

Number 30: 1 point ... Number 1: 30 points

The top 30 racers of the day get additional (double) points.

Number 30: 2 points ... Number 1: 60 points

Therefore the maximum of a race hday is 300 points.

Of the seven race days, the best 5 days count for the overall ranking. Therefore
the weekly maximum is 1500 points.

## Visualisation in src/routes/race-simulation.tsx

- dark mode as usual
- a table with all racers sorted by their week's result.
- column 1 the id in lg
- column 2 the random characteristics (skill, reliability, risk)
- column 3 the total points (bold)
- column 4, 5, 6, 7, 8, 9, 10: the points for each day (picked values in white,
  deleted values greyed out) PLUS note if drop out, PLUS dnf count
- first row of the table: th with row titles
- second row of the table: dropout count, finish rate per race in %
