import { pluginsRegistry } from "./src/renderers/population-simulation/plugins/index";
import { Citizen } from "./src/renderers/population-simulation/types";

const citizens = {};
for (let i = 0; i < 1000; i++) {
  citizens[i] = new Citizen(i);
  // assign random ages and partners to trigger error
  citizens[i].age = Math.floor(Math.random() * 80);
  citizens[i].isMale = Math.random() > 0.5;
  citizens[i].partnerId = -1;
  citizens[i].health = 1;
}
const state = { citizens };

const activePlugins = [pluginsRegistry.decay, pluginsRegistry.reproduction];

try {
  for (let year = 1; year <= 10; year++) {
    for (const plugin of activePlugins) {
      if (plugin.transformer) {
        plugin.transformer(state, year);
      }
    }
    
    // run extractors
    for (const plugin of activePlugins) {
      if (plugin.extractors && plugin.extractors.singleShare) {
        plugin.extractors.singleShare(state, year);
      }
    }
  }
  console.log("Success");
} catch (e) {
  console.error(e.stack);
}
