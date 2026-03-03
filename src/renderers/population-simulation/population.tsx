import {
  BarElement,
  CategoryScale,
  Chart,
  Colors,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "solid-chartjs";
import { createMemo, onMount } from "solid-js";
import { pluginsRegistry } from "./plugins";
import { Citizen, type SimulationState } from "./types";

// Register chart.js plugins and scales
if (typeof window !== "undefined") {
  Chart.register(
    Title,
    Tooltip,
    Legend,
    Colors,
    BarElement,
    CategoryScale,
    LinearScale,
  );
}

export const Population = (props: {
  data: { plugins?: string[]; extract?: string[] };
}) => {
  const runSimulation = () => {
    // 1. Initialize population of 1000 citizens
    const citizens: Record<number, Citizen> = {};
    for (let i = 0; i < 1000; i++) {
      citizens[i] = new Citizen(i);
    }
    const state: SimulationState = {
      citizens,
      nextId: 1000,
    };

    const activePlugins = (props.data.plugins || [])
      .map((p) => pluginsRegistry[p])
      .filter(Boolean);
    const metricsToExtract = props.data.extract || [];

    // Store results
    const results: Record<string, number[]> = {};
    for (const metric of metricsToExtract) {
      results[metric] = [];
    }

    // 2. Core Simulation Loop (Year 1 to 1000)
    for (let year = 1; year <= 1000; year++) {
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
            if (plugin.extractors && plugin.extractors[metric]) {
              extractedValue = plugin.extractors[metric](state, year);
              break;
            }
          }
          results[metric].push(extractedValue);
        }
      }
    }

    return results;
  };

  const simulationData = createMemo(runSimulation);
  const labels = Array.from({ length: 100 }, (_, i) => (i + 1) * 10); // 10, 20... 1000

  // Curated color palette extending basic tailwind
  const colors = ["#417f7f", "#339a9a"];

  return (
    <div class="flex flex-col gap-4 w-full py-2">
      {props.data.extract?.map((metric, index) => {
        const data = {
          labels,
          datasets: [
            {
              label: metric.charAt(0).toUpperCase() + metric.slice(1),
              data: simulationData()[metric] || [],
              backgroundColor: "#fffa",
              borderRadius: 2,
              borderWidth: 0,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              usePointStyle: true,
            },
            title: {
              display: true,
              text: `${metric}`,
              align: "start" as const,
              font: {
                size: 16,
                family: "Saira Semi Condensed",
                weight: "bold" as const,
              },
              color: "#fffc",
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: "#fff6",
                maxTicksLimit: 10,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: "#fff6",
                drawBorder: false,
              },
              ticks: {
                color: "#fff6",
              },
            },
          },
        };

        return (
          <div class="w-full h-[350px] bg-can8 rounded-xl border border-cas7 p-4">
            <Bar data={data} options={options} />
          </div>
        );
      })}
    </div>
  );
};
