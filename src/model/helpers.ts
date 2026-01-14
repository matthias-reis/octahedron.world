import { CompactItemMeta } from '~/types';

export const sortRootItems = (items: CompactItemMeta[]) => {
  return items.sort((a, b) => {
    const weightA = a.weight ?? 0;
    const weightB = b.weight ?? 0;
    if (weightA === weightB) {
      return Math.random() < 0.5 ? -1 : 1;
    } else {
      return weightB - weightA;
    }
  });
};
