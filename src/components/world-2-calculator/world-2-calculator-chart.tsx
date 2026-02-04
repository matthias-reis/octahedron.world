'use client';

import { Component, onMount } from 'solid-js';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { DefaultChart } from 'solid-chartjs';

export type GraphData = { name: string; result: number; reference?: boolean }[];

// Custom plugin to display percentage labels on bars
const labelPlugin = {
  id: 'customLabels',
  afterDatasetsDraw(chart: any) {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((bar: any, index: number) => {
        const value = dataset.data[index];
        ctx.fillStyle = '#fff';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${value}%`, bar.x + 5, bar.y);
      });
    });
  },
};

export const World2CalculatorChart: Component<{ graph: GraphData }> = ({
  graph,
}) => {
  onMount(() => {
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend,
      Colors,
      labelPlugin
    );
  });

  const chartData = {
    labels: graph.map((d) => d.name),
    datasets: [
      {
        label: 'CO₂ Emissions',
        data: graph.map((d) => d.result),
        backgroundColor: graph.map((d) => (d.reference ? '#fff7' : '#fff2')),
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 100,
        right: 50,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      customLabels: {},
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'currentColor',
        },
        border: {
          color: '#fff8',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'currentColor',
        },
        border: {
          color: '#fff8',
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
  };

  return (
    <DefaultChart
      type="bar"
      data={chartData}
      options={chartOptions}
      width={500}
      height={300}
    />
  );
};
