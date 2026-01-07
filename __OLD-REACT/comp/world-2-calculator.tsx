import { FCC } from '../core/types';
import {
  World2CalculatorChart,
  type GraphData,
} from './world-2-calculator-chart';

export const World2Calculator: FCC<{ payload?: string }> = ({ payload }) => {
  const variant =
    variants[(payload as keyof typeof variants) || ''] || variants.budget;

  const graph: GraphData = variant.lines.map(({ name, value, reference }) => ({
    name,
    result: Math.round((value * 100) / (inhabitants[reference] * budget)),
  }));
  graph.push({ name: 'Budget', result: 100, reference: true });

  return (
    <div className="border border-decent-600 p-4">
      <div className="text-decent-600">
        <World2CalculatorChart graph={graph} />
      </div>
      <h3 className="text-2xl font-bold font-condensed text-center mt-5">
        {variant.title}
      </h3>
      <p className="text-sm text-center w-2/3 mx-auto">{variant.text}</p>
    </div>
  );
};

const variants: Record<string, Variant> = {
  budget: {
    title: 'What We Actually Emit',
    text: 'Here are some reference numbers for the CO₂ emissions of the different regions of the world.',
    lines: [
      { name: 'Germany', value: 675_000_000, reference: 'de' },
      { name: 'EU', value: 3_619_000_000, reference: 'eu' },
      { name: 'China', value: 11_472_000_000, reference: 'ch' },
      { name: 'USA', value: 5_007_000_000, reference: 'us' },
      { name: 'World', value: 54_590_000_000, reference: 'wo' },
    ],
  },
  vegan: {
    title: 'Effect of a Vegan Diet',
    text: 'This chart compares savings of a vegan diet to giving up your car with surprising results.',
    lines: [
      { name: 'Savings No Car', value: 473_600_000, reference: 'eu' },
      { name: 'Savings Vegan', value: 94_500_000, reference: 'de' },
      { name: 'German', value: 675_000_000, reference: 'de' },
    ],
  },
  coal: {
    title: 'Fossile Energy Sources',
    text: `The single coal plant Niederaußem contributes 36% to the budget of a german citizen but only 0.7% of the overall energy.
          Additinally, I've added coal as a whole and gas for comparison.
          `,
    lines: [
      { name: 'Niederaußem', value: 29_600_000, reference: 'de' },
      { name: 'Lignite', value: 116_000_000, reference: 'de' },
      { name: 'Hard Coal', value: 49_000_000, reference: 'de' },
      { name: 'Gas', value: 29_000_000, reference: 'de' },
    ],
  },
  flights: {
    title: 'Transport Sector - Flights',
    text: `We all know that flying is bad for the environment. But how bad is it really?
          Let's compare the results to our budget and have a look at different distances including return flights.
          Hamburg - Sylt (180km) is a typical private jet route, which allows much less people per flight with
          a devastating impact compared to the distance. I'm assuming 9 tons per flight and six passengers on board.
          `,
    lines: [
      { name: 'HH - Sydney', value: 12.893, reference: 'pe' },
      { name: 'HH - Malaga', value: 0.918, reference: 'pe' },
      { name: 'Hamburg - Sylt', value: 3, reference: 'pe' },
    ],
  },
};

const inhabitants = {
  pe: 1,
  de: 83_000_000,
  eu: 447_000_000,
  ch: 1_412_000_000,
  us: 332_000_000,
  wo: 7_674_000_000,
};

const budget = 1.6; // tons per person per year

type Line = {
  name: string;
  value: number;
  reference: keyof typeof inhabitants;
};

type Variant = {
  title: string;
  text: string;
  lines: Line[];
};
