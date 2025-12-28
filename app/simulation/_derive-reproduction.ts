import { getAgeGroupingIndex } from './_helpers';
import { State } from './_state';

const fertilityByAge = [0, 0.23, 0.34, 0.06, 0, 0, 0];

/*
Reproduction is simplified. we aim for about 3 kids per couple.
We iterate over women who are part of a couple.
*/
export const reproduction = (state: State): State => {
  // first all new borns from prev round will become alive
  state.living.forEach((citizen) => {
    if (citizen.status === 'born') {
      citizen.status = 'alive';
    }
    const fertility =
      fertilityByAge[getAgeGroupingIndex(citizen.age)] * citizen.fertility;
    if (
      citizen.status === 'alive' &&
      citizen.gender === 'female' &&
      citizen.partner &&
      fertility > Math.random()
    ) {
      const childId = state.addChild(citizen);
      citizen.children = [...(citizen.children ?? []), childId];
    }
  });

  return state;
};
