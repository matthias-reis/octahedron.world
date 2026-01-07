import { getAgeGroupingIndex } from './_helpers';
import { State } from './_state';

const likelihoodToDieMale = [0.0001, 0.0004, 0.001, 0.008, 0.031, 0.34, 0.55];
const likelihoodToDieFemale = [
  0.00005, 0.00025, 0.0007, 0.005, 0.025, 0.3, 0.55,
];

/*
People are dying with a certain likelihood. The older the more likely. Only a few get older than 100.
*/
export const decay = (state: State): State => {
  // all citizens get one year older and have a likelihood to die
  state.living.forEach((citizen) => {
    const likelihoodToDie =
      citizen.gender === 'male'
        ? likelihoodToDieMale[getAgeGroupingIndex(citizen.age)]
        : likelihoodToDieFemale[getAgeGroupingIndex(citizen.age)];
    let status = citizen.status;
    // status died only in the year of death, status dead afterwards
    if (status === 'died') {
      citizen.status = 'dead';
    }
    if (status === 'alive' && Math.random() < likelihoodToDie) {
      citizen.status = 'died';
    }
    citizen.age += 1;
  });
  return state;
};
