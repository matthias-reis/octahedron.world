import { useParams, useSearchParams } from '@solidjs/router';
import { createResource, Show, Suspense } from 'solid-js';
import { TrafficPage } from '~/components/logs/traffic-page';
import { fetchTrafficQuarter } from '~/components/logs/traffic-server';
import { buildTrafficPageData, parseFilter } from '~/components/logs/traffic-utils';

export default function LogsQuarter() {
  const params = useParams<{ q: string }>();
  const [sp] = useSearchParams<{ f?: string }>();
  const q = () => params.q ?? '';
  const filter = () => parseFilter(sp.f ?? '');

  const [response] = createResource(q, (qParam) => fetchTrafficQuarter(qParam));

  const data = () => {
    const r = response();
    if (!r) return null;
    return buildTrafficPageData(r, filter(), 'quarter', q());
  };

  return (
    <Suspense fallback={<div class="text-can6 text-xs font-mono">Loading…</div>}>
      <Show when={data()}>
        {(d) => (
          <TrafficPage data={d()} filter={filter()} viewType="quarter" viewParam={q()} />
        )}
      </Show>
    </Suspense>
  );
}
