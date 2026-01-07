import type { FC, ReactElement } from 'react';
import type { FCC, ItemMeta } from '../../core/types';

export type Layout = {
  Main: FC<{
    item: ItemMeta;
    sections: ReactElement<any>[];
    categoryItems?: ItemMeta[];
    relatedItems?: ItemMeta[];
  }>;
  components: Record<string, FCC<{ payload?: string }>>;
};
