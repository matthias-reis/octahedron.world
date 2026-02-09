import { Component, createSignal, createMemo, Show, JSX } from 'solid-js';
import { Rocket, Star, ArrowRight } from 'lucide-solid';

type SpacetravelProps = {
  data: {
    from: string;
    to: string;
    dist: number; // lightyears
    acc: number; // g
    limit: boolean; // limit acceleration?
    time?: number; // months (acceleration time if limited)
    mass?: number; // tonnes
    unit?: 'ly' | 'au'; // distance unit
    editable?: boolean;
  };
};

const C = 1; // Speed of light (ly/y)
const G_TO_LYY2 = 1.03; // 1g in ly/y^2
const C_MS = 299792458; // m/s
const C_MMS = 299.792458; // Mm/s
const J_TO_PJ = 1e-15;
const EARTH_ENERGY_PJ = 650000; // Annual Earth Energy Consumption in PJ
const LY_TO_AU = 63241.1;

const formatDuration = (years: number) => {
  if (years >= 2) {
    let y = Math.floor(years);
    let m = Math.round((years - y) * 12);
    if (m === 12) {
      y += 1;
      m = 0;
    }
    return m > 0 ? `${y}y ${m}m` : `${y}y`;
  }

  const totalMonths = years * 12;
  if (totalMonths < 2) {
    const m = Math.floor(totalMonths);
    const d = Math.round((totalMonths - m) * 30.44);

    if (m === 0) return `${d}d`;
    return `${m}m ${d}d`;
  }

  // Between 2m and 2y
  const y = Math.floor(years);
  const m = (years - y) * 12;
  if (y === 0) return `${m.toFixed(1)}m`;
  return `${y}y ${m.toFixed(1)}m`;
};

export const Spacetravel: Component<SpacetravelProps> = (props) => {
  // Initialize signals with props
  const [from, setFrom] = createSignal(props.data.from || 'Earth');
  const [to, setTo] = createSignal(props.data.to || 'Proxima Centauri');
  const [dist, setDist] = createSignal(props.data.dist || 4.24);
  const [acc, setAcc] = createSignal(props.data.acc || 1);
  const [limit, setLimit] = createSignal(props.data.limit || false);
  const [accTimeMonths, setAccTimeMonths] = createSignal(props.data.time || 12);
  const [mass, setMass] = createSignal(props.data.mass || 1000); // Default 1000 tonnes
  const [unit, setUnit] = createSignal(props.data.unit || 'ly');
  const editable = props.data.editable || false;

  // Physics Calculations
  const results = createMemo(() => {
    // Convert distance to LY for physics
    const d = unit() === 'au' ? dist() / LY_TO_AU : dist();
    const a = acc() * G_TO_LYY2;
    const limited = limit();
    const t_acc_limit = accTimeMonths() / 12; // years

    let t_earth = 0;
    let t_ship = 0;
    let max_v = 0;
    let d_acc = 0;
    let d_coast = 0;
    let d_dec = 0;

    if (!limited) {
      // Accelerate to half-way, then decelerate
      // d_half = d / 2
      // t_ship_half = acosh(a * d_half + 1) / a
      // t_earth_half = sqrt((d_half + 1/a)^2 - (1/a)^2) = sqrt(d_half^2 + 2*d_half/a)
      // v_max = tanh(a * t_ship_half)

      const d_half = d / 2;
      const t_ship_half = Math.acosh(a * d_half + 1) / a;
      const t_earth_half = Math.sqrt(
        Math.pow(d_half + 1 / a, 2) - Math.pow(1 / a, 2)
      ); // Or simply sinh(a*t_ship_half)/a

      t_ship = 2 * t_ship_half;
      t_earth = 2 * t_earth_half;
      max_v = Math.tanh(a * t_ship_half);
      d_acc = d_half;
      d_dec = d_half;
    } else {
      // Accelerate for t_acc_limit (ship time), coast, decelerate (assumed same profile as acc)
      // d_acc = (cosh(a * t_acc_limit) - 1) / a
      // v_max = tanh(a * t_acc_limit)
      // t_earth_acc = sinh(a * t_acc_limit) / a

      d_acc = (Math.cosh(a * t_acc_limit) - 1) / a;
      d_dec = d_acc;
      max_v = Math.tanh(a * t_acc_limit);

      if (2 * d_acc >= d) {
        // If acceleration distance is more than half, we just do the logic as if it was unlimited but only up to distance d
        // Actually, if 2*d_acc > d, it means we overshoot if we follow the limit plan?
        // Or it means the limit is ignored because we reach destination before limit?
        // Let's assume if 2*d_acc >= d, it behaves like the unlimited case (turnover at half distance)
        // Recalculate as unlimited
        const d_half = d / 2;
        const t_ship_half = Math.acosh(a * d_half + 1) / a;
        t_ship = 2 * t_ship_half;
        const t_earth_half = Math.sqrt(Math.pow(d_half, 2) + (2 * d_half) / a);
        t_earth = 2 * t_earth_half;
        max_v = Math.tanh(a * t_ship_half);
        d_acc = d_half;
        d_dec = d_half;
        d_coast = 0;
      } else {
        d_coast = d - 2 * d_acc;
        const t_earth_coast = d_coast / max_v;
        // t_ship_coast = t_earth_coast / gamma
        // gamma = cosh(a * t_acc_limit)
        const gamma = Math.cosh(a * t_acc_limit);
        const t_ship_coast = t_earth_coast / gamma;

        const t_earth_acc = Math.sinh(a * t_acc_limit) / a;

        t_earth = 2 * t_earth_acc + t_earth_coast;
        t_ship = 2 * t_acc_limit + t_ship_coast;
      }
    }

    return {
      t_earth,
      t_ship,
      max_v,
      d_acc,
      d_coast,
      d_dec,
    };
  });

  const energy = createMemo(() => {
    // Relativistic Kinetic Energy: E = (gamma - 1) * m * c^2
    // We accelerate and decelerate, so we need this energy twice.
    // gamma = 1 / sqrt(1 - v^2/c^2)
    // max_v is in units of c
    const v = results().max_v;
    const gamma = 1 / Math.sqrt(1 - v * v);

    // Mass in kg
    const m_kg = mass() * 1000;

    // Energy in Joules for one acceleration phase
    const e_joules = (gamma - 1) * m_kg * Math.pow(C_MS, 2);

    // Total energy (acc + dec)
    const total_e_joules = 2 * e_joules;

    // Convert to Petajoules
    const total_e_pj = total_e_joules * J_TO_PJ;

    const earth_years = total_e_pj / EARTH_ENERGY_PJ;

    // Antimatter needed (25% efficiency for matter + antimatter = 50% of m turn into E)
    // E_input = E_kin / 0.25
    // E_input = m_am * c^2
    // m_am = E_kin / (0.25 * c^2)
    const m_antimatter_kg = total_e_joules / (0.5 * Math.pow(C_MS, 2));

    // Hydrogen needed (0.7% mass defect at 25% efficiency)
    const m_hydrogen_kg = total_e_joules / (0.00175 * Math.pow(C_MS, 2));

    return {
      pj: total_e_pj,
      earth_years,
      m_antimatter_kg,
      m_hydrogen_kg,
    };
  });

  return (
    <div class="my-4 p-4 bg-neutral-200 rounded-xl border border-neutral-300 shadow-sm relative overflow-hidden group">
      <Show when={editable}>
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-sm bg-saturated-400 text-neutral-700 px-2 py-1 rounded">
            Editable
          </span>
        </div>
      </Show>

      {/* Header */}
      <h3 class="text-xl font-bold mb-5 flex items-center gap-2 text-neutral-900">
        <Rocket class="w-6 h-6 text-saturated-500" />
        <span>
          Space Travel: {from()} <ArrowRight class="inline w-4 h-4" /> {to()}
        </span>
      </h3>

      {/* Visualization */}
      <div class="mb-6 relative pt-6 pb-2">
        <div class="flex items-center justify-between text-sm text-neutral-500 mb-2 absolute top-0 w-full">
          <span>{from()}</span>
          <span class="font-mono text-md bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
            {dist()} {unit().toUpperCase()}
          </span>
          <span>{to()}</span>
        </div>

        <div class="h-4 bg-neutral-200 rounded-full flex overflow-hidden w-full relative group/vis">
          {/* Start Icon */}
          <div class="absolute -left-1 -top-1 z-10">
            <div class="bg-complement-500 w-6 h-6 rounded-full border-2 border-neutral-200"></div>
          </div>

          <div
            class="h-full bg-gradient-to-r from-complement-500 to-saturated-400 border-r-2 border-neutral-200"
            style={{
              width: `${(results().d_acc / (unit() === 'au' ? dist() / LY_TO_AU : dist())) * 100}%`,
            }}
            title={`Acceleration: ${results().d_acc.toFixed(2)} ly`}
          />
          <div
            class="h-full bg-saturated-400"
            style={{
              width: `${(results().d_coast / (unit() === 'au' ? dist() / LY_TO_AU : dist())) * 100}%`,
            }}
            title={`Coasting: ${results().d_coast.toFixed(2)} ly`}
          />
          <div
            class="h-full bg-gradient-to-r from-saturated-400 to-complement-500 border-l-2 border-neutral-200"
            style={{
              width: `${(results().d_dec / (unit() === 'au' ? dist() / LY_TO_AU : dist())) * 100}%`,
            }}
            title={`Deceleration: ${results().d_dec.toFixed(2)} ly`}
          />

          {/* End Icon */}
          <div class="absolute -right-1 -top-1 z-10">
            <div class="bg-complement-500 w-6 h-6 rounded-full border-2 border-neutral-200"></div>
          </div>
        </div>

        <div class="flex justify-between mt-2 text-xs text-gray-400">
          <div class="text-center w-1/3 relative">
            Accelerate
            <div
              class="text-sm text-neutral-500 font-mono mt-0.5"
              title="Acceleration Time (Traveler)"
            >
              {formatDuration(
                Math.acosh(acc() * G_TO_LYY2 * results().d_acc + 1) /
                  (acc() * G_TO_LYY2)
              )}{' '}
              @ {acc()} g
            </div>
          </div>
          <div class="text-center w-1/3">Coast</div>
          <div class="text-center w-1/3 relative">
            Decelerate
            <div
              class="text-sm text-neutral-500 font-mono mt-0.5"
              title="Deceleration Time (Traveler)"
            >
              {formatDuration(
                Math.acosh(acc() * G_TO_LYY2 * results().d_dec + 1) /
                  (acc() * G_TO_LYY2)
              )}{' '}
              @ {acc()} g
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 p-4 bg-neutral-300 rounded-lg border border-neutral-400">
        <div class="text-center w-1/3">
          <div class="text-xs text-gray-500 dark:text-neutral-500 uppercase font-medium mb-1">
            Duration (Earth)
          </div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white font-mono">
            {formatDuration(results().t_earth)}
          </div>
        </div>
        <div class="text-center w-1/3 relative">
          <div class="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-neutral-600"></div>
          <div class="text-xs text-complement-700 uppercase mb-1">
            Duration (Traveler)
          </div>
          <div class="text-3xl font-black text-complement-600 font-mono">
            {formatDuration(results().t_ship)}
          </div>
          <div class="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-neutral-600"></div>
        </div>
        <div class="text-center w-1/3">
          <div class="text-xs text-gray-500 dark:text-neutral-500 uppercase font-medium mb-1">
            Max Speed
          </div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white font-mono">
            {results().max_v.toFixed(3)} c
            <Show when={unit() === 'au'}>
              <div class="text-sm text-neutral-500 font-normal mt-1">
                {(results().max_v * C_MMS).toFixed(2)} Mm/s
              </div>
            </Show>
          </div>
        </div>
      </div>

      <div class="mb-4 p-4 bg-neutral-300 border border-neutral-400 rounded-lg text-center">
        <div class="text-xs text-complement-700 uppercase mb-1">
          Energy Required for <strong>{mass().toLocaleString()}</strong> t
        </div>

        <div class="grid grid-cols-3 gap-3 text-xs border-t border-neutral-400 pt-3 mt-2">
          <div>
            <div class="uppercase text-neutral-500 mb-1">
              Compared to
              <br />
              global Consumption
            </div>
            <div class="text-lg font-bold font-mono mb-1">
              {Math.round(energy().earth_years).toLocaleString()} y
            </div>
          </div>
          <div>
            <div class="uppercase text-neutral-500 mb-1">
              Antimatter
              <br />
              with 25% eff
            </div>
            <div class="font-mono text-neutral-800 text-lg font-bold">
              {(energy().m_antimatter_kg / 1000).toLocaleString()} t
            </div>
          </div>
          <div>
            <div class="uppercase text-neutral-500 mb-1">
              Hydrogen (Fusion)
              <br />
              with 25% eff
            </div>
            <div class="font-mono text-neutral-800 text-lg font-bold">
              {(energy().m_hydrogen_kg / 1000).toLocaleString()} t
            </div>
          </div>
        </div>
        <div class="text-sm text-complement-600 mt-4">
          {Math.round(energy().pj).toLocaleString()} PJ
        </div>
      </div>

      {/* Inputs (only if editable) */}
      <Show when={editable}>
        <div class="border-t border-neutral-200 mt-3">
          <h4 class="text-sm uppercase text-neutral-500 tracking-wider mb-4">
            Configuration
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="Start"
              value={from()}
              onInput={(e) => setFrom(e.target.value)}
            />
            <InputGroup
              label="Destination"
              value={to()}
              onInput={(e) => setTo(e.target.value)}
            />
            <InputGroup
              label={`Distance (${unit().toUpperCase()})`}
              value={dist()}
              onInput={(e) => setDist(parseFloat(e.target.value))}
              type="number"
              step="0.1"
            />
            <div class="flex items-end mb-2">
              <div class="flex bg-neutral-300 p-1 rounded-lg w-full">
                <button
                  class={`flex-1 text-xs py-1.5 rounded-md transition-colors ${unit() === 'ly' ? 'bg-white shadow-sm text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`}
                  onClick={() => setUnit('ly')}
                >
                  LY
                </button>
                <button
                  class={`flex-1 text-xs py-1.5 rounded-md transition-colors ${unit() === 'au' ? 'bg-white shadow-sm text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`}
                  onClick={() => setUnit('au')}
                >
                  AU
                </button>
              </div>
            </div>

            <InputGroup
              label="Acceleration (g)"
              value={acc()}
              onInput={(e) => setAcc(parseFloat(e.target.value))}
              type="number"
              step="0.1"
            />
            <InputGroup
              label="Ship Mass (tonnes)"
              value={mass()}
              onInput={(e) => setMass(parseFloat(e.target.value))}
              type="number"
            />

            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="limit-acc"
                checked={limit()}
                onChange={(e) => setLimit(e.target.checked)}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="limit-acc"
                class="text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Limit Acceleration Phase?
              </label>
            </div>

            <Show when={limit()}>
              <InputGroup
                label="Acc. Time (months)"
                value={accTimeMonths()}
                onInput={(e) => setAccTimeMonths(parseFloat(e.target.value))}
                type="number"
              />
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
};

const InputGroup: Component<{
  label: string;
  value: string | number;
  onInput: (e: any) => void;
  type?: string;
  step?: string;
}> = (props) => (
  <div>
    <label class="block mb-2 text-sm font-medium text-neutral-700">
      {props.label}
    </label>
    <input
      type={props.type || 'text'}
      value={props.value}
      onInput={props.onInput}
      step={props.step}
      class="bg-neutral-300 border border-neutral-400 text-neutral-900 text-sm rounded-lg focus:ring-saturated-500 focus:border-saturated-500 block w-full p-2.5"
    />
  </div>
);
