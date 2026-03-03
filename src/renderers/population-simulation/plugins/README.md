# Population Simulation Architecture

This directory contains the core logic and plugins for the Population Simulation
engine. The simulation models a society over a period of 1000 years, starting
with an initial population and observing their lives through birth, partnership,
aging, and death.

## Core Concepts

The system is built on an extensible plugin architecture that is orchestrated by
the main simulation loop in `../population.tsx`.

### State and Entities (`../types.ts`)

- **`SimulationState`**: The single source of truth containing all citizens in a
  `Record<number, Citizen>`.
- **`Citizen`**: Represents an individual in the simulation. Key properties
  include:
  - Base traits: `id`, `isMale`, `born`, `age`
  - Lifecycle: `dead`, `died` (year of death)
  - Characteristics: `robustness` (genetic baseline), `health` (current
    vitality), `socialScore`
  - Relationships: `partnerId`, `fatherId`, `motherId`, `children`

### The Simulation Engine (`../population.tsx`)

1. **Initialization**: Creates 1,000 baseline citizens with randomized starting
   traits (robustness, initial ages 18-30, social scores, initial health).
2. **The 1,000 Year Loop**: For each year from 1 to 1000:
   - Evaluates all active plugins' `transformer` functions sequentially.
3. **Metric Extraction**: Every 10 years, it takes a snapshot by invoking the
   `extractors` of the active plugins, accumulating arrays of data for rendering
   via charts.

## Plugins Architecture

Plugins define the rules of the simulation. They are registered in `index.ts`. A
`PopulationPlugin` interface requires:

- **`transformer: (state: SimulationState, year: number) => void`**: Mutates the
  collective state by applying logic for the current year (e.g., aging citizens,
  calculating health, creating babies).
- **`extractors: Record<string, (state: SimulationState, year: number) => number>`**:
  A dictionary of functions that pull specific statistics out of the state
  (e.g., calculation of total population size, average age, birth rate).

### Included Plugins

#### 1. Decay (`decay.ts`)

Handles aging and death.

- **Transformer**: Increases every living citizen's age by 1. Reduces health
  based on their base `robustness` and an age-based health distribution curve
  (differentiated between males and females). If health drops below a threshold,
  the citizen dies.
- **Extractors**: `averageHealth`, `population`, `all`, `died`, `deathRate`,
  `averageAge`, `lifeExpectancy`.

#### 2. Reproduction (`reproduction.ts`)

Handles finding partners and procreation.

- **Transformer**:
  - **Mating**: Evaluates singles. Citizens over a certain threshold (combining
    `socialScore`, randomized age-affinity curves, and chance) enter the dating
    pool. Females pick males based on compatibility (comparing `socialScore`,
    `robustness`, and age proximity).
  - **Reproduction**: Evaluates females with partners. A formula factoring in
    their `socialScore`, `health`, and current number of children dictates the
    probability of having a baby. New citizens inherit properties from their
    parents.
- **Extractors**: `newBorns`, `couples`, `averageChildren`,
  `averageChildrenIfChildren`, `singleShare`, `females`.

## Utilities

#### Math & Randomization (`randoms.ts`)

- **`shape(bottom, max, top)`**: Generates a random number using a triangular
  distribution, useful for introducing weighted variance to genetic traits or
  event probabilities.
- **`age(curve)`**: Returns an interpolator function based on a sparse record of
  age-to-value mappings (e.g., predicting fertility peaks or health declines by
  age).

---

**Next Steps for Agents:** When asked to extend this simulation (e.g. adding new
mechanics like economy or war), you can create a new `.ts` file representing
your `PopulationPlugin`, add transformers/extractors, and register it in
`index.ts`. All plugin state should reside on the `Citizen` instances or broadly
inside the `SimulationState`.
