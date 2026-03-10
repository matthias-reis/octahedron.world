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
import { createSignal, createEffect, onCleanup } from "solid-js";

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
  const [simulationData, setSimulationData] = createSignal<
    Record<string, number[]>
  >({});
  const [simRunning, setSimRunning] = createSignal(false);

  const activePlugins = props.data.plugins || [];
  const metricsToExtract = props.data.extract || [];

  const labels = Array.from({ length: 100 }, (_, i) => (i + 1) * 10); // 10, 20... 1000

  // Curated color palette extending basic tailwind

  const startWorker = () => {
    setSimRunning(true);
    // Initialize state with zeros for all metrics to show the background "shadow data" pattern
    const initialState: Record<string, number[]> = {};
    for (const m of metricsToExtract) {
      initialState[m] = new Array(100).fill(0);
    }
    setSimulationData(initialState);

    // We can use a Vite/Next web worker syntax
    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (e) => {
      const { type, results } = e.data;
      if (results) {
        // Pad the newly arrived results up to 100 with zeros so the chart doesn't flicker/change size.
        const paddedResults: Record<string, number[]> = {};
        for (const [key, arr] of Object.entries(
          results as Record<string, number[]>,
        )) {
          paddedResults[key] = [
            ...arr,
            ...new Array(Math.max(0, 100 - arr.length)).fill(0),
          ];
        }
        setSimulationData(paddedResults);
      }
      if (type === "COMPLETE") {
        setSimRunning(false);
        worker.terminate();
      }
    };

    worker.postMessage({
      plugins: activePlugins,
      extract: metricsToExtract,
    });

    return worker;
  };

  let currentWorker: Worker | undefined ;

  createEffect(() => {
    if (activePlugins.length && metricsToExtract.length) {
      currentWorker?.terminate();
      currentWorker = startWorker();
    }
  });

  onCleanup(() => {
    currentWorker?.terminate();
  });

  return (
    <div class="flex flex-col gap-4 w-full py-2">
      <div class="flex justify-end items-center px-2">
        <button
          type="button"
          class="px-4 py-2 bg-can6 hover:bg-can5 text-white rounded font-bold disabled:opacity-50 transition-colors"
          onClick={() => {
            currentWorker?.terminate();
            currentWorker = startWorker();
          }}
          disabled={simRunning()}
        >
          {simRunning() ? "Calculating..." : "Rerun Simulation"}
        </button>
      </div>
      {props.data.extract?.map((metric) => {
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
          animation: {
            duration: 0, // Disable animation to prevent layout bounce when worker chunks arrive
          },
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
