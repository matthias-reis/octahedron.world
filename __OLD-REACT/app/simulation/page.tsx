import { randomSigma } from './_helpers';
import SimulationClient from './simulation-client';

export default function SimulationPage() {
  return (
    <body>
      <div className="container mx-auto my-4">
        <h1 className="text-6xl font-bold">Capital Simulation</h1>
        <SimulationClient />
      </div>
    </body>
  );
}
