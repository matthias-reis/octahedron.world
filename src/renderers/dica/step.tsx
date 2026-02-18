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
        class="h-12 pl-3 text-cbn2 bg-cbn7 border-cbn5 hover:border-cbn3 hover:bg-cbn6 flex items-center gap-2 rounded-l-full p-2 border border-r-4 leading-tight"
        classList={{
          'border-r-cbn5': !isActive(),
          'border-r-cbd3 hover:border-r-cbd3': isActive(),
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
        class="gap-2 text-can2 bg-can7 border-can5 hover:border-can3 hover:bg-can6 flex items-center rounded-r-full p-2 border border-l-4"
        classList={{
          'opacity-70': step.finished,
          'border-l-cad3 hover:border-l-cad3': isActive(),
          'animate-shake': isNew(),
        }}
      >
        <MapPin />
        <span class="grow flex flex-col gap-1">
          <span>{step.title}</span>
          <span class="flex gap-0.5 text-can4">
            <Sparkle size={12} />
            <Sparkle size={12} classList={{ 'opacity-50': step.weight < 2 }} />
            <Sparkle size={12} classList={{ 'opacity-50': step.weight < 3 }} />
          </span>
        </span>
        <Show when={step.finished}>
          <span class="border rounded-full px-2 w-6 text-center">
            {step.score} p
          </span>
        </Show>
      </A>
    );
  }
};
