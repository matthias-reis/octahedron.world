import { createMemo, For } from 'solid-js';
import { simulateWeek, Stage, Racer } from '~/race-simulation';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function DayCell(props: { racer: Racer; dayIndex: number }) {
  const day = () => props.racer.days[props.dayIndex];
  const picked = () => day().picked;
  const totalPts = () => day().points + day().bonusPoints;
  const pattern = () => day().stages.map((stage) => stage.token);

  return (
    <td class="px-3 py-2 text-right align-top font-mono">
      {/* Points — bold, bright/grey based on picked */}
      <div
        class={`font-bold tabular-nums leading-tight ${
          picked() ? 'text-cad2' : 'text-cad6 line-through'
        }`}
      >
        {totalPts()}
      </div>
      {/* Stage pattern */}
      <div
        class={`text-xs leading-snug tracking-tight mt-0.5 whitespace-nowrap text-can5`}
      >
        {pattern().slice(0, 4).join(' ')}
        <br />
        {pattern().slice(4, 8).join(' ')}
      </div>
    </td>
  );
}

export default function Page() {
  const racers = createMemo(() => simulateWeek());

  const dayStats = createMemo(() =>
    DAY_LABELS.map((_, d) => {
      const all = racers();
      const dropped = all.filter((r) => r.days[d].dropped).length;
      const noScoreStages = all.reduce(
        (acc, r) => acc + r.days[d].noScoreCount,
        0
      );
      const finishRate = (1 - noScoreStages / 800) * 100;
      return { dropped, finishRate };
    })
  );

  return (
    <div class="min-h-screen bg-can9 text-can1">
      <div class="px-6 py-8">
        <h1 class="font-octa text-5xl font-bold text-cas3 mb-1 tracking-wide">
          Race Simulation
        </h1>
        <p class="text-can5 text-sm mb-8">
          100 racers · 7 days · 8 stages/day · best 5 days count
        </p>

        <div class="overflow-x-auto border border-can5">
          <table class="w-full border-collapse text-sm">
            <thead>
              {/* Header row */}
              <tr class="border-b border-can7 bg-cad7 text-can3 font-bold text-sm">
                <th class="px-3 py-3 text-center w-4">Pos</th>
                <th class="px-3 py-3 text-center w-4">#</th>
                <th class="px-3 py-3 text-left">Char</th>
                <th class="px-3 py-3 text-right">Total</th>
                <For each={DAY_LABELS}>
                  {(label) => <th class="px-3 py-3 text-right">{label}</th>}
                </For>
              </tr>

              {/* Summary stats row */}
              <tr class="border-b border-can7 bg-can9">
                <td class="px-3 py-2 text-can6 text-xs">—</td>
                <td class="px-3 py-2 text-can6 text-xs">—</td>
                <td class="px-3 py-2 text-can6 text-xs">—</td>
                <td class="px-3 py-2 text-can6 text-xs text-right">—</td>
                <For each={dayStats()}>
                  {(s) => (
                    <td class="px-3 py-2 text-right text-xs leading-snug font-mono">
                      <div class="text-cas4">
                        FIN: {s.finishRate.toFixed()}%
                      </div>
                      <div class="text-cbs4">DO: {s.dropped}#</div>
                    </td>
                  )}
                </For>
              </tr>
            </thead>

            <tbody>
              <For each={racers()}>
                {(racer, rank) => (
                  <tr
                    class={`border-b border-can6 transition-colors hover:bg-cad7`}
                  >
                    {/* Position */}
                    <td class="px-3 py-2 text-can4 text-sm tabular-nums">
                      {rank() + 1}
                    </td>

                    {/* Racer ID */}
                    <td class="px-3 py-2">
                      <span class="font-octa text-2xl font-bold text-cas3">
                        {racer.id}
                      </span>
                    </td>

                    {/* Characteristics */}
                    <td class="px-3 py-2 font-mono w-20">
                      <span class="text-cad6 block whitespace-nowrap">
                        SK: {racer.skill.toFixed(2)}
                      </span>
                      <span class="text-can6 block whitespace-nowrap">
                        RL: {racer.reliability.toFixed(2)}
                      </span>
                      <span class="text-cbn6 whitespace-nowrap">
                        RI: {racer.risk.toFixed(2)}
                      </span>
                    </td>

                    {/* Weekly total */}
                    <td class="px-3 py-2 text-right">
                      <span class="font-bold text-cbs3 text-2xl">
                        {racer.totalPoints}
                      </span>
                    </td>

                    {/* Per-day cells */}
                    <For each={racer.days}>
                      {(_, dayIndex) => (
                        <DayCell racer={racer} dayIndex={dayIndex()} />
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
