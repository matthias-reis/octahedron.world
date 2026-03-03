import { Cta } from "./cta";
import { MdsCode } from "./mds-code";
import { Spacetravel } from "./spacetravel";
import { TeaserBlock } from "./teaser-block";
import { TeaserGroup } from "./teaser-group";
import { Typography } from "./typography";

export const canonicalComponents = {
  ...Typography,
  teaser: TeaserBlock,
  cta: Cta,
  group: TeaserGroup,
  spacetravel: Spacetravel as typeof TeaserGroup,
  ...MdsCode,
};
