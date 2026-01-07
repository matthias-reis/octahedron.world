'use client';

import { FC, useEffect, useState, useRef } from 'react';
import { Result } from './_state';
import { runSimulation } from './_simulation';

const toFormatted = (num: number) => new Intl.NumberFormat('de-DE').format(num);

export default function SimulationClient() {
  const [results, setResults] = useState<
    { result: Result; of: number; elapsed: number; duration: number }[]
  >([]);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const runAsync = async () => {
      // Use setTimeout to yield control back to browser
      await new Promise((resolve) => setTimeout(resolve, 0));
      const simulationResults = await runSimulation(
        ({ result, of, elapsed }) => {
          setResults((prev) => {
            const lastTime = prev[prev.length - 1]?.elapsed ?? 0;
            const duration = elapsed - lastTime;
            return [...prev, { elapsed, of, duration, result }];
          });
        }
      );
    };

    runAsync();
  }, []);

  // Copy before reversing so we don't mutate React state in place
  const list = [...results].reverse();

  return (
    <div>
      {list.map(({ result, elapsed, of }, i) => {
        const isFirst = i === 0;
        let remainingTime = '';
        let elapsedTime = formatDuration(elapsed);
        if (isFirst) {
          const perYear = elapsed / result.year;
          const yearsLeft = of - result.year;
          const remainingMs = perYear * yearsLeft;
          remainingTime = formatDuration(remainingMs);
        }
        return (
          <div
            key={i}
            className="my-2 p-1 border-b border-b-decent-300 text-sm font-light grid grid-cols-6 gap-1"
          >
            <Dataset
              name="Year"
              value={result.year.toString()}
              additionalValue={
                i === 0
                  ? `${remainingTime} left, ${elapsedTime} elapsed`
                  : undefined
              }
            />
            <Dataset
              name="Population"
              value={toFormatted(result.population + result.born)}
              additionalValue={toFormatted(
                result.dead + result.alive + result.born + result.died
              )}
            />
            <Multidata
              values={[
                ['born', toFormatted(result.born)],
                ['died', toFormatted(result.died)],
              ]}
            />
            <Dataset
              name="Male"
              value={`${((result.m * 100) / result.population).toFixed(1)} %`}
              additionalValue={toFormatted(result.m)}
            />
            <Dataset
              name="Female"
              value={`${((result.f * 100) / result.population).toFixed(1)} %`}
              additionalValue={toFormatted(result.f)}
            />
            <Dataset
              name="With Partner"
              value={`${(
                (result.withPartner * 100) /
                result.population
              ).toFixed(1)} %`}
              additionalValue={toFormatted(result.withPartner)}
            />
          </div>
        );
      })}
    </div>
  );
}

const Dataset: FC<{
  name: string;
  value: string;
  additionalValue?: string;
}> = ({ name, value, additionalValue }) => {
  return (
    <div className="flex flex-col items-end">
      <span className="text-decent-500 text-xs">{name}</span>
      <span>{value}</span>
      <span className="text-decent-500 text-xs">{additionalValue}</span>
    </div>
  );
};

const Multidata: FC<{
  values: [string, string][];
}> = ({ values }) => {
  return (
    <div>
      {values.map(([key, value]) => (
        <div key={key} className="flex justify-end w-full gap-2">
          <span className="text-decent-500 text-xs">{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms} ms`;
  const sec = ms / 1000;
  if (sec < 60) return `${sec.toFixed()} s`;
  const min = Math.floor(sec / 60);
  const remSec = Math.round(sec % 60);
  return `${min}m ${remSec}s`;
};
