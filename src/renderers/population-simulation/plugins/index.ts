import type { PopulationPlugin } from "../types";
import { decay } from "./decay";
import { reproduction } from "./reproduction";

export const pluginsRegistry: Record<string, PopulationPlugin> = {
  decay,
  reproduction,
};
