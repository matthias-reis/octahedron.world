import { useParams, useSearchParams } from '@solidjs/router';
import { createResource, Show, Suspense } from 'solid-js';
import { TrafficPage } from '~/components/logs/traffic-page';
import { fetchTrafficDay } from '~/components/logs/traffic-server';
import { buildTrafficPageData, parseFilter } from '~/components/logs/traffic-utils';

export default function LogsDay() {
  const params = useParams<{ d: string }>();
  const [sp] = useSearchParams<{ f?: string }>();
  const day = () => params.d ?? '';
  const filter = () => parseFilter(sp.f ?? '');

  const [response] = createResource(day, (dParam) => fetchTrafficDay(dParam));

  const data = () => {
    const r = response();
    if (!r) return null;
    return buildTrafficPageData(r, filter(), 'day', day());
  };

  return (
    <Suspense fallback={<div class="text-can6 text-xs font-mono">Loading…</div>}>
      <Show when={data()}>
        {(pageData) => (
          <TrafficPage data={pageData()} filter={filter()} viewType="day" viewParam={day()} />
        )}
      </Show>
    </Suspense>
  );
}
