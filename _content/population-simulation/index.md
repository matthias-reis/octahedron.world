```yaml @@
title: Population Simulation
description:
  What could happen in the next ten years. Let's start with AR headsets
date: 2023-01-02T00:00:00.000Z
colorSpace: yellow
tags:
  - population
  - population simulation
group: population-simulation
superTitle: Predictions
slug: population-simulation
type: population-simulation
image: predictions
```

```yaml population
plugins:
  - decay
  - reproduction
extract:
  - singleShare
  - newBorns
  - died
  - averageChildren
  - averageChildrenIfChildren
  - all
  - population
```

## Introduction

This is an experiment. It's a simulation of population growth, wealth
distribution and other aspects of a growing society. The starting point is
always a base population of 1000 citizens that is watched over a period of 1000
years.

The system is built in a way that I can manipulate the parameters every year on
the one hand (called transformers) and extracht statistical data every ten
yearson the other hand (called extractors). Transformers and extractors re
combined together into a plugin. And for every graph in the following flow,
certain plugins are active or not.

## Part One: Basic Flow of Life

Life is spread into two events: birth (reproduction) and death (decay). Let's
start with the simpler one, death. Every citizen has a base robustness and a
resulting health score that changes over time (the older they get the more
change might happen). As soon as that score drops below a threshold, the citizen
dies.

That aspect alone leads to an early extinction of the population of course.
After 90 years or so, al of the citizens should be dead when we don't add
offspring. And that is also what we see:

```yaml population
plugins:
  - decay
extract:
  - population
```

Birth however is a lot more complicated. First citizens have to be of the
generally fertile type and in the right age group to be able to reproduce. Then
they have to find a partner that has a high compatibility. Then they might have
children. And the children are created as new citizens inheriting some of the
traits of their parents.
