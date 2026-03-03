import { Citizen, type PopulationPlugin } from "../types";
import { age } from "./randoms";

const partnerAgeShape = age({
  0: 0,
  17: 0,
  18: 0.7,
  24: 0.8,
  30: 0.9,
  40: 0.5,
  50: 0,
});
const MATE_THRESHOLD = 1.2;
const CHILD_THRESHOLD = 0.68;

export const reproduction: PopulationPlugin = {
  transformer: (state, year) => {
    // -------------------------
    // A) Mating
    // -------------------------
    const citizensArray = Object.values(state.citizens);
    const available = citizensArray.filter(
      (c) => !c.dead && c.partnerId === -1,
    );

    // Find who is looking for a partner this year
    const onList = available.filter(
      (c) =>
        c.socialScore * partnerAgeShape(c.age) > MATE_THRESHOLD * Math.random(),
    );

    const femalesOnList = onList.filter((c) => !c.isMale);

    for (const f of femalesOnList) {
      const malesOnList = onList.filter((c) => c.isMale && c.partnerId === -1);
      if (malesOnList.length === 0) continue;

      // Sort males by compatibility
      malesOnList.sort((a, b) => {
        const scoreA =
          (1 - Math.abs(f.socialScore - a.socialScore)) *
          (1 - Math.abs(f.age - a.age) * 0.05) *
          Math.random();

        const scoreB =
          (1 - Math.abs(f.socialScore - b.socialScore)) *
          (1 - Math.abs(f.age - b.age) * 0.05) *
          Math.random();

        return scoreB - scoreA;
      });

      const winner = malesOnList[0];

      // Mutual binding
      f.partnerId = winner.id;
      winner.partnerId = f.id;

      // Strike male from list
      malesOnList.shift();
    }

    // -------------------------
    // B) Reproduction
    // -------------------------
    const allAvailableFemales = citizensArray.filter(
      (c) => !c.dead && !c.isMale && c.partnerId !== -1,
    );

    for (const f of allAvailableFemales) {
      const p = f.socialScore * f.health * 0.38 ** (f.children.length + 1);
      if (p > Math.random() * CHILD_THRESHOLD) {
        const babyId = Object.keys(state.citizens).length;
        // we limit the population to a max of 5000 citizens to keep the page responsive.
        if (babyId > 50000) break;
        const baby = new Citizen(babyId);
        baby.age = 0;
        baby.born = year;
        baby.robustness =
          (f.robustness + state.citizens[f.partnerId].robustness) / 2;
        baby.health = 0.8; // By curve definition initialHealthShape(0) = 0.8
        baby.fatherId = f.partnerId;
        baby.motherId = f.id;

        state.citizens[baby.id] = baby;
        f.children.push(baby.id);
        const father = state.citizens[f.partnerId];
        if (father && !father.dead) {
          // Add to father
          father.children.push(baby.id);
        }
      }
    }
  },
  extractors: {
    newBorns: (state, year) => {
      const newBornsAbsolute = Object.values(state.citizens).filter(
        (c) => c.born >= year - 10,
      ).length;
      const population = Object.values(state.citizens).filter(
        (c) => !c.died || c.died >= year - 10,
      ).length;
      return newBornsAbsolute / population;
    },
    couples: (state) =>
      Object.values(state.citizens).filter(
        (c) =>
          !c.dead &&
          !c.isMale &&
          c.partnerId !== -1 &&
          state.citizens[c.partnerId] &&
          !state.citizens[c.partnerId].dead,
      ).length,
    averageChildren: (state) => {
      const females = Object.values(state.citizens).filter((c) => !c.isMale);
      const children = females.reduce((sum, c) => sum + c.children.length, 0);
      return children / females.length;
    },
    averageChildrenIfChildren: (state) => {
      const females = Object.values(state.citizens).filter(
        (c) => !c.isMale && c.children.length > 0,
      );
      const children = females.reduce((sum, c) => sum + c.children.length, 0);
      return children / females.length;
    },
    singleShare: (state) => {
      const adults = Object.values(state.citizens).filter(
        (c) => !c.dead && c.age > 18,
      );
      const singles = adults.filter((c) => c.partnerId === -1);
      return singles.length / adults.length;
    },
    females: (state) =>
      Object.values(state.citizens).filter((c) => !c.dead && !c.isMale).length /
      Object.values(state.citizens).filter((c) => !c.dead).length,
  },
};
