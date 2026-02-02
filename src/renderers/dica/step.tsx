import { Component, Show, createSignal, onMount } from 'solid-js';
import { StepStatus } from './types';
import { A, useLocation } from '@solidjs/router';
import { Lightbulb, MapPin, Sparkle } from 'lucide-solid';

export const Step: Component<{ step: StepStatus }> = ({ step }) => {
  const location = useLocation();
  const isActive = () => location.hash === `#${step.id}`;

  const [isNew, setIsNew] = createSignal(true);
  onMount(() => {
    const timer = setTimeout(() => setIsNew(false), 600);
    return () => clearTimeout(timer);
  });

  if (step.type === 'clue') {
    return (
      <A
        href={`#${step.id}`}
        class="h-12 pl-3 text-neutral-complement-700 bg-neutral-complement-300 border-neutral-complement-400 hover:border-neutral-complement-500 hover:bg-neutral-complement-400 flex items-center gap-2 rounded-l-full p-2 border border-r-4 leading-tight"
        classList={{
          'border-r-neutral-complement-400': !isActive(),
          'border-r-neutral-complement-600': isActive(),
          'animate-shake': isNew(),
        }}
      >
        <Lightbulb />
        <span>
          <span>{step.title}</span>
        </span>
      </A>
    );
  } else {
    return (
      <A
        href={`#${step.id}`}
        class="gap-2 text-neutral-700 bg-neutral-300 border-neutral-400 hover:border-neutral-500 hover:bg-neutral-400 flex items-center rounded-r-full p-2 border border-l-4"
        classList={{
          'opacity-70': step.finished,
          'border-l-neutral-600': isActive(),
          'animate-shake': isNew(),
        }}
      >
        <MapPin />
        <span class="grow flex flex-col gap-1">
          <span>{step.title}</span>
          <span class="flex gap-0.5 text-slate-400">
            <Sparkle size={12} />
            <Sparkle size={12} classList={{ 'opacity-50': step.weight < 2 }} />
            <Sparkle size={12} classList={{ 'opacity-50': step.weight < 3 }} />
          </span>
        </span>
        <Show when={step.finished}>
          <span class="border rounded-full px-2">{step.score}</span>
        </Show>
      </A>
    );
  }
};
