export function getAgeGroupingIndex(age: number) {
  const ageGroupings = [18, 30, 40, 60, 80, 100]; // years

  for (let i = 0; i < ageGroupings.length; i++) {
    if (age < ageGroupings[i]) {
      return i;
    }
  }
  return ageGroupings.length;
}

export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomSigma(min: number, max: number): number {
  const mean = (min + max) / 2;
  const stddev = (max - min) / 6;

  let value;
  do {
    const u = Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    value = z * stddev + mean;
  } while (value < min || value > max);

  return value;
}
