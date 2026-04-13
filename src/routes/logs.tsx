import { type ParentProps, Suspense } from 'solid-js';

export default function LogsLayout(props: ParentProps) {
  return (
    <div class="min-h-screen bg-can9">
      <main class="max-w-5xl mx-auto py-5 px-4">
        <div class="text-sm font-sans text-cas6 mb-4 uppercase tracking-widest font-black">
          Traffic Logs
        </div>
        <Suspense
          fallback={<div class="text-can6 text-xs font-mono">Loading…</div>}
        >
          {props.children}
        </Suspense>
      </main>
    </div>
  );
}
