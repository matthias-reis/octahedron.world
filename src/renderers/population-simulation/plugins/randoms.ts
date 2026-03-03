export function shape(bottom: number, max: number, top: number): number {
  const U = Math.random();
  const F = (max - bottom) / (top - bottom);

  if (U < F) {
    return bottom + Math.sqrt(U * (top - bottom) * (max - bottom));
  } else {
    return top - Math.sqrt((1 - U) * (top - bottom) * (top - max));
  }
}

export function age(curve: Record<number, number>): (age: number) => number {
  const points = Object.keys(curve)
    .map(Number)
    .sort((x, y) => x - y);

  return (currentAge: number): number => {
    if (points.length === 0) return 0;

    if (currentAge <= points[0]) return curve[points[0]];
    if (currentAge >= points[points.length - 1])
      return curve[points[points.length - 1]];

    let k1 = points[0];
    let k2 = points[points.length - 1];

    for (let i = 0; i < points.length - 1; i++) {
      if (currentAge >= points[i] && currentAge <= points[i + 1]) {
        k1 = points[i];
        k2 = points[i + 1];
        break;
      }
    }

    if (k1 === k2) return curve[k1];

    const ratio = (currentAge - k1) / (k2 - k1);
    return curve[k1] + ratio * (curve[k2] - curve[k1]);
  };
}
