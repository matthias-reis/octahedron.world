import { Layout } from '~/types';
import { layout as storyline } from './storyline';
import { layout as report } from './report';
import { layout as lightbox } from './lightbox';
import { layout as entry } from './entry';
import { layout as grid } from './grid';
import { layout as album } from './album';
import { layout as legal } from './legal';
import { layout as world2 } from './world-2';
import { layout as defaultLayout } from './default';

export const layouts: Record<string, Layout> = {
  storyline,
  report,
  lightbox,
  entry,
  grid,
  album,
  legal,
  world2,
  default: defaultLayout,
};
