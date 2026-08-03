import { proseComponents } from "~/ui/prose";
import { Cta } from "./cta";
import { MdsCode } from "./mds-code";
import { Spacetravel } from "./spacetravel";
import { TeaserBlock } from "./teaser-block";
import { TeaserGroup } from "./teaser-group";
import { Typography } from "./typography";

/**
 * Octahedron's MDS component map: the shared prose map first, then this site's
 * typography overrides, then the renderer-specific blocks only octahedron has.
 */
export const canonicalComponents = {
  ...proseComponents,
  ...Typography,
  teaser: TeaserBlock,
  cta: Cta,
  group: TeaserGroup,
  spacetravel: Spacetravel as typeof TeaserGroup,
  ...MdsCode,
};
