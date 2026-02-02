import { Typography } from './typography';
import { TeaserBlock } from './teaser-block';
import { MdsCode } from './mds-code';

export const canonicalComponents = {
  ...Typography,
  teaser: TeaserBlock,
  ...MdsCode,
};
