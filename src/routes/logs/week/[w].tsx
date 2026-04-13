import { useParams, useSearchParams } from '@solidjs/router';
import { createResource, Show, Suspense } from 'solid-js';
import { TrafficPage } from '~/components/logs/traffic-page';
import { fetchTrafficWeek } from '~/components/logs/traffic-server';
import { buildTrafficPageData, parseFilter } from '~/components/logs/traffic-utils';

export default function LogsWeek() {
  const params = useParams<{ w: string }>();
  const [sp] = useSearchParams<{ f?: string }>();
  const w = () => params.w ?? '';
  const filter = () => parseFilter(sp.f ?? '');

  const [response] = createResource(w, (wParam) => fetchTrafficWeek(wParam));

  const data = () => {
    const r = response();
    if (!r) return null;
    return buildTrafficPageData(r, filter(), 'week', w());
  };

  return (
    <Suspense fallback={<div class="text-can6 text-xs font-mono">Loading…</div>}>
      <Show when={data()}>
        {(d) => (
          <TrafficPage data={d()} filter={filter()} viewType="week" viewParam={w()} />
        )}
      </Show>
    </Suspense>
  );
}
