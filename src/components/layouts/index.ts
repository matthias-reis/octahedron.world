import { Layout } from '~/types';
import { layout as storyline } from './storyline';
import { layout as report } from './report';
import { layout as lightbox } from './lightbox';
import { layout as defaultLayout } from './default';

export const layouts: Record<string, Layout> = {
  storyline,
  report,
  lightbox,
  default: defaultLayout,
};
