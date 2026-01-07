import { getAgeGroupingIndex } from './_helpers';
import { Citizen, State } from './_state';

const likelihoodForPartnerByAge = [0, 0.19, 0.09, 0.02, 0.0005, 0, 0];

/*
The algorithm sorts all female and male citizens based on their likelihood to mate.
THe likelihood is 0 when it's already a couple
*/
export const coupling = (state: State): State => {
  // filter citizens

  const availableMales: Citizen[] = [];
  const availableFemales: Citizen[] = [];

  state.living.forEach((c) => {
    // combined likelihood: by age and personal
    // based on those we determine if someone is eligible

    const likelihoodForPartner =
      likelihoodForPartnerByAge[getAgeGroupingIndex(c.age)] *
      c.likelihoodForPartner;
    if (!c.partner && likelihoodForPartner > Math.random()) {
      if (c.gender === 'male') {
        availableMales.push(c);
      } else {
        availableFemales.push(c);
      }
    }
  });

  const length = Math.min(availableMales.length, availableFemales.length);

  // assign partners
  for (let i = 0; i < length; i++) {
    const male = availableMales[i];
    const female = availableFemales[i];
    male.partner = female.id;
    female.partner = male.id;
  }

  return state;
};
