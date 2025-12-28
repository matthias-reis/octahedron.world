import { coupling } from './_derive-coupling';
import { decay } from './_derive-decay';
import { reproduction } from './_derive-reproduction';
import { Gender, Result, State, Status } from './_state';

const ITERATIONS = 1000; // years
const CITIZENS_AT_START = 100_000; // 100 k
const LIKELIHOOD_FEMALE = 0.488;
const AGE_AT_START = 0; // years

const results: Result[] = [];

export const runSimulation = async (
  onUpdate: (progress: { result: Result; of: number; elapsed: number }) => void
): Promise<Result[]> => {
  const t0 = performance.now();
  let prev = getStartingState();
  results.push(prev.result);
  for (let year = 1; year <= ITERATIONS; year++) {
    await new Promise((resolve) => setTimeout(resolve, 0)); // yield to keep UI responsive
    const next = prev
      .derive(decay, year)
      .derive(coupling, year)
      .derive(reproduction, year);
    if (isVisibleYear(year)) {
      onUpdate({
        result: next.result,
        of: ITERATIONS,
        elapsed: performance.now() - t0,
      });
      results.push(next.result);
    }
    prev = next;
  }
  return results;
};

const getStartingState = (): State => {
  const citizens = [];
  for (let id = 0; id < CITIZENS_AT_START; id++) {
    const gender: Gender =
      Math.random() < LIKELIHOOD_FEMALE ? 'female' : 'male';
    const age = AGE_AT_START;
    const likelihoodForPartner = Math.random();
    const health = Math;
    const fertility = Math.random();
    citizens.push({
      id,
      gender,
      age,
      status: 'alive' as Status,
      likelihoodForPartner,
      fertility,
    });
  }
  return new State(0, citizens);
};

function isVisibleYear(year: number): boolean {
  if (year < 150) {
    return year % 5 === 0;
  } else {
    return year % 50 === 0;
  }
}
