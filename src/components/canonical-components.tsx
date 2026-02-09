import { Typography } from './typography';
import { TeaserBlock } from './teaser-block';
import { MdsCode } from './mds-code';
import { Cta } from './cta';
import { TeaserGroup } from './teaser-group';
import { Spacetravel } from './spacetravel';

export const canonicalComponents = {
  ...Typography,
  teaser: TeaserBlock,
  cta: Cta,
  group: TeaserGroup,
  spacetravel: Spacetravel as typeof TeaserGroup,
  ...MdsCode,
};
