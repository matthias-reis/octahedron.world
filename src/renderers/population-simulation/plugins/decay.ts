import type { PopulationPlugin } from "../types";
import { age, shape } from "./randoms";

const healthDistributionMale = age({
  0: 0.85,
  10: 0.99,
  50: 0.95,
  70: 0.94,
  80: 0.74,
  100: 0.1,
});
const healthDistributionFemale = age({
  0: 0.85,
  10: 0.99,
  50: 0.98,
  70: 0.97,
  80: 0.82,
  100: 0.2,
});
const DEATH_THRESHOLD = 0.045;

export const decay: PopulationPlugin = {
  transformer: (state, year) => {
    for (const c of Object.values(state.citizens)) {
      if (c.dead) continue;

      c.age++;

      // Calculate health (moving average to prevent sudden drops, weighted by vulnerability)
      const prevHealth = c.health;
      const healthThreshold = c.isMale
        ? healthDistributionMale(c.age)
        : healthDistributionFemale(c.age);
      c.health =
        prevHealth *
        shape(
          0.5 * healthThreshold,
          (0.5 + c.robustness) * healthThreshold,
          1.5 * healthThreshold,
        );
      if (c.health > 1) c.health = 1;

      if (c.health < DEATH_THRESHOLD) {
        c.dead = true;
        c.died = year;
      }
    }
  },
  extractors: {
    averageHealth: (state) => {
      const living = Object.values(state.citizens).filter((c) => !c.dead);
      if (living.length === 0) return 0;
      return living.reduce((sum, c) => sum + c.health, 0) / living.length;
    },
    population: (state) =>
      Object.values(state.citizens).filter((c) => !c.dead).length,
    all: (state) => Object.values(state.citizens).length,
    died: (state, year) => {
      const diedAbsolute = Object.values(state.citizens).filter(
        (c) => c.died && c.died > year - 10 && c.died <= year,
      ).length;
      const population = Object.values(state.citizens).filter(
        (c) => !c.died || c.died >= year - 10,
      ).length;
      return diedAbsolute / population;
    },
    averageAge: (state) => {
      const living = Object.values(state.citizens).filter((c) => !c.dead);
      if (living.length === 0) return 0;
      return living.reduce((sum, c) => sum + c.age, 0) / living.length;
    },
    lifeExpectancy: (state) => {
      const dead = Object.values(state.citizens).filter((c) => c.dead);
      if (dead.length === 0) return 0;
      return (
        dead.reduce((sum, c) => sum + ((c.died || 0) - c.born), 0) / dead.length
      );
    },
  },
};
