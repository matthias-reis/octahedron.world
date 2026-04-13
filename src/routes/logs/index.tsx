import { useSearchParams } from '@solidjs/router';
import { createResource, Show, Suspense } from 'solid-js';
import { TrafficPage } from '~/components/logs/traffic-page';
import { fetchTrafficAll } from '~/components/logs/traffic-server';
import { buildTrafficPageData, parseFilter } from '~/components/logs/traffic-utils';

export default function LogsIndex() {
  const [sp] = useSearchParams<{ f?: string }>();
  const filter = () => parseFilter(sp.f ?? '');
  const [response] = createResource(() => fetchTrafficAll());

  const data = () => {
    const r = response();
    if (!r) return null;
    return buildTrafficPageData(r, filter(), 'all', '');
  };

  return (
    <Suspense fallback={<div class="text-can6 text-xs font-mono">Loading…</div>}>
      <Show when={data()}>
        {(d) => (
          <TrafficPage data={d()} filter={filter()} viewType="all" viewParam="" />
        )}
      </Show>
    </Suspense>
  );
}
