import { CompactItemMeta } from '~/types';

const getRandomBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const sortRootItems = (items: CompactItemMeta[]) => {
  return items.sort((a, b) => {
    const weightA = (a.weight ?? 0.5) * getRandomBetween(0.5, 1);
    const weightB = (b.weight ?? 0.5) * getRandomBetween(0.5, 1);
    return weightB - weightA;
  });
};
