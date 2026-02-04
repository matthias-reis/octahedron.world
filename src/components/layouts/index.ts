import { Layout } from '~/types';
import { layout as report } from './report';
import { layout as world2 } from './world-2';
import { layout as defaultLayout } from './default';

export const layouts: Record<string, Layout> = {
  report,
  world2,
  default: defaultLayout,
};
