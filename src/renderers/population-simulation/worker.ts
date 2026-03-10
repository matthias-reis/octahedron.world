import { pluginsRegistry } from "./plugins";
import { Citizen, type SimulationState } from "./types";

self.onmessage = (e: MessageEvent) => {
  const { plugins = [], extract = [] } = e.data;

  // 1. Initialize population of 1000 citizens
  const citizens: Record<number, Citizen> = {};
  for (let i = 0; i < 1000; i++) {
    citizens[i] = new Citizen(i);
  }
  const state: SimulationState = {
    citizens,
  };

  const activePlugins = plugins
    .map((p: string) => pluginsRegistry[p])
    .filter(Boolean);
  const metricsToExtract: string[] = extract;

  // Store results
  const results: Record<string, number[]> = {};
  for (const metric of metricsToExtract) {
    results[metric] = [];
  }

  const chunkYears = 200;
  const totalYears = 1000;
  let currentYear = 1;

  const processChunk = () => {
    const endYear = Math.min(currentYear + chunkYears - 1, totalYears);

    for (let year = currentYear; year <= endYear; year++) {
      // Allow plugins to transform the state every year
      for (const plugin of activePlugins) {
        if (plugin.transformer) {
          plugin.transformer(state, year);
        }
      }

      // 3. Take a snapshot every 10 years
      if (year % 10 === 0) {
        for (const metric of metricsToExtract) {
          let extractedValue = 0;
          for (const plugin of activePlugins) {
            if (plugin.extractors?.[metric]) {
              extractedValue = plugin.extractors[metric](state, year);
              break;
            }
          }
          results[metric].push(extractedValue);
        }
      }
    }

    currentYear = endYear + 1;

    // Send partial results
    self.postMessage({
      type: currentYear > totalYears ? "COMPLETE" : "PROGRESS",
      year: endYear,
      results,
    });

    if (currentYear <= totalYears) {
      // Schedule next chunk
      setTimeout(processChunk, 0);
    }
  };

  processChunk();
};
