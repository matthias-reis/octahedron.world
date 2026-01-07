'use client';

import { FC } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

export type GraphData = { name: string; result: number; reference?: boolean }[];

export const World2CalculatorChart: FC<{ graph: GraphData }> = ({ graph }) => (
  <VictoryChart
    domainPadding={{ x: 40, y: 0 }}
    width={500}
    height={300}
    padding={{ left: 100, right: 50 }}
  >
    <VictoryAxis
      width={200}
      style={{
        axis: { stroke: '#fff8' },
        tickLabels: { fill: 'currentColor' },
      }}
    />
    <VictoryBar
      data={graph}
      x="name"
      y="result"
      barRatio={0.6}
      horizontal
      labels={({ datum }) => datum.result + '%'}
      style={{
        labels: { fill: 'currentColor' },
        data: {
          fill: ({ datum }) => (datum.reference ? '#fff7' : '#fff2'),
          stroke: '#fff',
          strokeWidth: '1px',
        },
      }}
    />
  </VictoryChart>
);
