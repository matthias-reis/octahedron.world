import { A, useNavigate, useSearchParams } from '@solidjs/router';
import { createSignal, For, Show } from 'solid-js';
import type { TrafficInfoRow } from './traffic-utils';

import {
  buildFilterParam,
  formatGerman,
  formatInt,
  withFilter,
  type ParsedFilter,
  type TrafficPageData,
} from './traffic-utils';

// --- Nav ---

function TrafficNav(props: {
  data: TrafficPageData;
  filter: ParsedFilter;
  viewType: string;
  viewParam: string;
}) {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [pathInput, setPathInput] = createSignal(
    props.filter.path.replace(/^\//, '')
  );
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const quarterValue = () =>
    props.viewType === 'quarter' ? props.viewParam : '';
  const weekValue = () => (props.viewType === 'week' ? props.viewParam : '');

  const handleQuarterChange = (val: string) => {
    if (!val) return;
    navigate(withFilter(`/logs/quarter/${val}`, props.filter));
  };

  const handleWeekChange = (val: string) => {
    if (!val) return;
    navigate(withFilter(`/logs/week/${val}`, props.filter));
  };

  const handleDomainChange = (val: string) => {
    // Keep current path but update f param; clear path part when changing domain
    const f = val || null;
    setSearchParams({ f } as Record<string, string | null>);
    setPathInput('');
  };

  const handlePathInput = (val: string) => {
    setPathInput(val);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const normalized = val ? (val.startsWith('/') ? val : `/${val}`) : '';
      const f = buildFilterParam(props.filter.domain, normalized) || null;
      setSearchParams({ f } as Record<string, string | null>);
    }, 1000);
  };

  const selectClass =
    'bg-can9 border border-can6 text-can2 text-xs font-mono px-2 py-1 rounded focus:outline-none focus:border-cas5 cursor-pointer';

  return (
    <nav class="flex flex-wrap gap-2 mb-5 items-center font-mono text-xs">
      <A
        href={withFilter('/logs', props.filter)}
        class="px-2 py-1 rounded border border-can6 text-can3 hover:text-cas3 hover:border-cas5 transition-colors"
        activeClass="border-cas5 text-cas3"
        end
      >
        All
      </A>

      <select
        value={quarterValue()}
        onChange={(e) => handleQuarterChange(e.currentTarget.value)}
        class={selectClass}
      >
        <option value="">Quarter ▾</option>
        <For each={props.data.allQuarters}>
          {(q) => <option value={q}>{q}</option>}
        </For>
      </select>

      <select
        value={weekValue()}
        onChange={(e) => handleWeekChange(e.currentTarget.value)}
        class={selectClass}
      >
        <option value="">Week ▾</option>
        <For each={props.data.allWeeks}>
          {(w) => <option value={w}>{w}</option>}
        </For>
      </select>

      <select
        value={props.filter.domain}
        onChange={(e) => handleDomainChange(e.currentTarget.value)}
        class={selectClass}
      >
        <option value="">All Domains</option>
        <For each={props.data.allDomains}>
          {(d) => <option value={d}>{d}</option>}
        </For>
      </select>

      <input
        type="text"
        placeholder="/path"
        value={pathInput()}
        onInput={(e) => handlePathInput(e.currentTarget.value)}
        disabled={!props.filter.domain}
        class="bg-can9 border border-can6 text-can2 text-xs font-mono px-2 py-1 rounded focus:outline-none focus:border-cas5 w-32 disabled:opacity-30 disabled:cursor-not-allowed"
      />
    </nav>
  );
}

// --- Headline ---

function TrafficHeadline(props: {
  viewLabel: string;
  filterLabel: string;
  kpi: number;
}) {
  return (
    <div class="flex items-center gap-2 mb-7">
      <h2 class="grow text-4xl font-black">
        {props.viewLabel} <span class="opacity-40 px-3">::</span>{' '}
        {props.filterLabel}
      </h2>
      <div class="text-6xl text-can1 tabular-nums flex flex-col items-center">
        <span class="text-sm text-can5 ml-1">avg. daily</span>
        <span class="font-mono font-black text-cbs4">
          {formatGerman(props.kpi)}
        </span>
      </div>
    </div>
  );
}

// --- Bar row ---

function BarRow(props: {
  label: string;
  href: string;
  value: number;
  maxValue: number;
  integer?: boolean;
  otherCodes?: Record<string, number>;
}) {
  const pct = () =>
    props.maxValue > 0 ? (props.value / props.maxValue) * 100 : 0;
  const codeEntries = () =>
    Object.entries(props.otherCodes ?? {}).sort(([a], [b]) =>
      a.localeCompare(b)
    );

  return (
    <div class="flex items-center gap-2 py-px group">
      <div class="w-44 shrink-0 text-right">
        <A
          href={props.href}
          class="text-can3 hover:text-cas3 transition-colors truncate block font-mono text-xs"
        >
          {props.label}
        </A>
      </div>
      <div class="flex-1 bg-can8 h-3 min-w-32">
        <div
          class="h-full bg-cas5 transition-all"
          style={{ width: `${pct()}%` }}
        />
      </div>
      <span class="w-16 shrink-0 text-right font-mono text-sm font-bold text-can4 tabular-nums">
        {props.integer ? formatInt(props.value) : formatGerman(props.value)}
      </span>
      <Show when={codeEntries().length > 0}>
        <span class="flex gap-2 shrink-0">
          <For each={codeEntries()}>
            {([code, n]) => (
              <span class="font-mono tabular-nums" style="font-size:11px">
                <span class="text-can6">{code}:</span>
                <span
                  classList={{
                    'text-can6': !n,
                    'text-can3': !!n,
                  }}
                >
                  {n.toLocaleString('de-DE')}
                </span>
              </span>
            )}
          </For>
        </span>
      </Show>
    </div>
  );
}

function InfoRow(props: { row: TrafficInfoRow }) {
  return (
    <div class="flex items-center gap-2 py-px opacity-70">
      <div class="w-44 shrink-0 text-right">
        <span class="font-mono text-xs italic text-can5">
          {props.row.label}
        </span>
      </div>
      <div class="flex-1 bg-can8 h-3 min-w-32" />
      <span class="w-16 shrink-0 text-right font-mono text-xs text-can3 tabular-nums">
        {Math.round(props.row.total).toLocaleString('de-DE')}
      </span>
    </div>
  );
}

function StatusRow(props: { code: string; count: number; maxValue: number }) {
  const pct = () =>
    props.maxValue > 0 ? (props.count / props.maxValue) * 100 : 0;

  return (
    <div class="flex items-center gap-2 py-px">
      <div class="w-44 shrink-0 text-right">
        <span class="font-mono text-xs bg-can7 text-can4 px-1 rounded">
          {props.code}
        </span>
      </div>
      <div class="flex-1 bg-can8 h-1.5 min-w-32">
        <div
          class="h-full bg-cbs6 transition-all"
          style={{ width: `${pct()}%` }}
        />
      </div>
      <span class="w-16 shrink-0 text-right font-mono text-sm text-can4 tabular-nums">
        {props.count.toLocaleString('de-DE')}
      </span>
    </div>
  );
}

// --- Main page component ---

export interface TrafficPageProps {
  data: TrafficPageData;
  filter: ParsedFilter;
  viewType: 'all' | 'quarter' | 'week' | 'day';
  viewParam: string;
}

export function TrafficPage(props: TrafficPageProps) {
  const hasNon200 = () => Object.keys(props.data.non200).length > 0;

  return (
    <div>
      <TrafficNav
        data={props.data}
        filter={props.filter}
        viewType={props.viewType}
        viewParam={props.viewParam}
      />
      <TrafficHeadline
        viewLabel={props.data.viewLabel}
        filterLabel={props.data.filterLabel}
        kpi={props.data.kpi}
      />

      <div class="overflow-x-auto">
        <div class="min-w-max">
          <For each={props.data.items}>
            {(item) => (
              <BarRow
                label={item.label}
                href={item.href}
                value={item.value200}
                maxValue={props.data.maxValue}
                integer={item.integer}
                otherCodes={item.otherCodes}
              />
            )}
          </For>

          <Show when={props.data.infoRows.length > 0}>
            <div class="mt-1 pt-1 border-t border-can7">
              <For each={props.data.infoRows}>
                {(row) => <InfoRow row={row} />}
              </For>
            </div>
          </Show>

          <Show when={hasNon200()}>
            <div class="mt-1 pt-1 border-t border-can7">
              <For
                each={Object.entries(props.data.non200).sort(
                  (a, b) => b[1] - a[1]
                )}
              >
                {([code, count]) => (
                  <StatusRow
                    code={code}
                    count={count}
                    maxValue={props.data.maxValue}
                  />
                )}
              </For>
            </div>
          </Show>

          <Show when={props.data.items.length === 0}>
            <p class="text-can5 text-xs font-mono py-4">No data.</p>
          </Show>
        </div>
      </div>
    </div>
  );
}
