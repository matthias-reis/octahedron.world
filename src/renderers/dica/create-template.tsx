import { JSX, Show, For, onMount, createSignal, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { parse } from 'solid-mds';
import type { GlobalScope, LocalScope, StepStatus } from './types';
import { A, useLocation } from '@solidjs/router';
import { Page } from './page';
import { LoaderCircle, Signpost } from 'lucide-solid';
import { Step } from './step';
import { Quest } from './quest';
import { View } from './view';
import { LogoHorizontal } from './logo';
import { useI18n } from '~/i18n/context';

const MONTHS_DE = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

function formatDateDE(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parts[0];
  if (isNaN(day) || isNaN(month) || month < 0 || month > 11) return dateStr;
  return `${day}. ${MONTHS_DE[month]} ${year}`;
}

function getStorageKey(slug: string, version?: number): string {
  return `${slug}-${version ?? 0}`;
}

function loadStepsFromStorage(key: string): Record<string, StepStatus> | null {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

function saveStepsToStorage(
  key: string,
  steps: Record<string, StepStatus>
): void {
  try {
    localStorage.setItem(key, JSON.stringify(steps));
  } catch {
    // Ignore storage errors
  }
}

function mergeSteps(
  parsedSteps: Record<string, StepStatus>,
  storedSteps: Record<string, StepStatus> | null
): Record<string, StepStatus> {
  if (!storedSteps) return parsedSteps;

  const merged: Record<string, StepStatus> = {};
  for (const [id, parsedStep] of Object.entries(parsedSteps)) {
    const storedStep = storedSteps[id];
    if (storedStep) {
      merged[id] = {
        ...storedStep,
        ...parsedStep,
        finished: storedStep.finished,
        score: storedStep.score,
        revealed: storedStep.revealed,
      };
    } else {
      merged[id] = parsedStep;
    }
  }
  return merged;
}

export default function createTemplate(props: {
  markdown: string;
}): JSX.Element {
  const markdown = props.markdown;
  const state = {
    parsed: null as ReturnType<typeof parse<GlobalScope, LocalScope>> | null,
  };
  const [stepsStatus, setStepsStatus] = createStore<Record<string, StepStatus>>(
    {}
  );
  const { t, locale } = useI18n();

  const reveal = (ids: string[]) => {
    ids.forEach((ref) => {
      setStepsStatus(ref, (prev) => ({
        ...prev,
        revealed: true,
      }));
    });
  };

  const finalizeQuest = (ref: string, score: number, revealIds: string[]) => {
    reveal(revealIds);
    setStepsStatus(ref, (prev) => ({
      ...prev,
      finished: true,
      score,
    }));
  };

  const changeQuest = (ref: string, updates: Partial<StepStatus>) => {
    setStepsStatus(ref, (prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const components = {
    h1: (props: any) => (
      <h3 class="text-4xl font-octa font-bold mb-6" {...props} />
    ),
    h2: (props: any) => <h4 class="text-xl font-octa mt-5 mb-4" {...props} />,
    p: (props: any) => <p class="my-2 leading-relaxed" {...props} />,
    ul: (props: any) => <ul class="list-disc list-outside ml-6" {...props} />,
    ol: (props: any) => (
      <ol class="list-decimal list-outside ml-6" {...props} />
    ),
    li: (props: any) => <li class="my-1 leading-relaxed" {...props} />,
    strong: (props: any) => <strong class="font-bold" {...props} />,
    em: (props: any) => <em class="font-italic" {...props} />,
    a: (props: any) => <a class="text-saturated-500 underline" {...props} />,
    img: (props: any) => (
      <img
        class="my-6 mx-auto rounded-lg shadow-md select-none"
        src={
          props.src?.startsWith('http') ? props.src : `/img/${props.src}/l.jpg`
        }
        draggable={false}
      />
    ),
    blockquote: (props: any) => (
      <blockquote
        class="border-l-4 border-neutral-500 text-neutral-500 font-serif pl-4 italic my-4 leading-loose"
        {...props}
      />
    ),
    quest: (props: any) => (
      <Quest
        {...props}
        stepStatus={stepsStatus}
        onFinalize={finalizeQuest}
        onChange={changeQuest}
      />
    ),
    note: (props: any) => (
      <div class="my-4 p-5 bg-yellow-100 text-stone-700 font-mono leading-loose">
        {props.children}
      </div>
    ),
  };

  const parsed = parse<GlobalScope, LocalScope>(markdown, components);
  state.parsed = parsed;

  const slug = parsed.global?.slug ?? 'unknown';

  const storageKey = getStorageKey(slug, parsed.global?.version);

  // Build initial steps from parsed data
  const parsedSteps = Object.fromEntries(
    Object.values(parsed.steps).map((step) => [
      step.id,
      {
        id: step.id,
        title: step.local.title || 'Untitled',
        type: step.local.type,
        weight: step.local.weight || 1,
        finished: false,
        score: 0,
        revealed: false,
      },
    ])
  ) as Record<string, StepStatus>;

  // Load stored steps and merge with parsed steps
  const storedSteps = loadStepsFromStorage(storageKey);
  const initialSteps = mergeSteps(parsedSteps, storedSteps);
  setStepsStatus(initialSteps);

  // Persist stepsStatus whenever it changes
  createEffect(() => {
    const currentSteps = { ...stepsStatus };
    saveStepsToStorage(storageKey, currentSteps);
  });

  const [isHydrated, setIsHydrated] = createSignal(false);

  const location = useLocation();
  const currentHash = () => {
    if (!isHydrated()) return '';
    return location.hash.replace(/^#/, '');
  };
  const isViewingCover = () => !currentHash() || !parsed.steps[currentHash()];

  const handleStart = () => {
    if (state.parsed?.global?.reveal) {
      reveal(state.parsed.global.reveal);
    }
  };

  // Automatically reveal step when hash changes
  createEffect(() => {
    const hash = currentHash();
    if (hash && state.parsed?.steps[hash]) {
      reveal([hash]);
    }
  });

  onMount(() => {
    setIsHydrated(true);
  });

  const revealedPages = () => {
    return Object.values(stepsStatus).filter(
      (step) => step.revealed && step.type === 'page'
    );
  };

  const revealedClues = () => {
    return Object.values(stepsStatus).filter(
      (step) => step.revealed && step.type === 'clue'
    );
  };

  const progress = () => {
    const total = Object.values(stepsStatus)
      .filter((step) => step.type === 'page')
      .reduce((sum, step) => sum + Number(step.weight), 0);

    const finished = Object.values(stepsStatus)
      .filter((step) => step.type === 'page' && step.finished)
      .reduce((sum, step) => sum + Number(step.weight), 0);
    const percent = total > 0 ? (finished / total) * 100 : 0;
    return { total, finished, percent };
  };

  const average = () => {
    const scoreSum = Object.values(stepsStatus)
      .filter((step) => !!step.score)
      .reduce<number>((sum, step) => sum + step.score, 0);
    const count = Object.values(stepsStatus).filter(
      (step) => !!step.score
    ).length;
    return count > 0 ? scoreSum / count : 0;
  };

  return (
    <div
      class={`w-full min-h-screen relative ${parsed.global?.colorSpace || 'original'}`}
    >
      {/* Loading indicator - shown until hydration completes */}
      <div
        class={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity duration-500 ${
          isHydrated() ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <LoaderCircle
          class="animate-spin text-white"
          style={{ width: '100px', height: '100px' }}
          stroke-width="1"
        />
      </div>

      {/* Cover page */}
      <View visible={isViewingCover()} id="cover">
        <div class="text-center px-8 h-full flex flex-col items-stretch justify-center">
          <h2 class="text-6xl md:text-8xl font-bold mb-6 font-octa">
            {parsed.global?.title}
          </h2>

          <p class="text-xl md:text-2xl text-gray-400 mb-8">
            {parsed.global?.subtitle}
          </p>

          <p class="text-sm text-gray-500 mb-12">
            {parsed.global?.start ? formatDateDE(parsed.global.start) : ''}
          </p>

          <A
            href={`/${slug}#${parsed.first ?? ''}`}
            class="dica-button"
            onClick={handleStart}
          >
            Starten
          </A>
        </div>
      </View>

      {/* Steps - all rendered, visibility controlled via opacity */}
      <View visible={!isViewingCover()} id="steps">
        <div class="h-screen flex gap-4">
          <div class="grow overflow-hidden overflow-y-auto relative h-screen">
            <For each={Object.values(parsed.steps)}>
              {(step) => (
                <Page id={step.id} visible={currentHash() === step.id}>
                  <div class="max-w-3xl mx-auto px-4">
                    <h2 class="text-lg text-neutral-500 mb-2">
                      {step.local.title}
                    </h2>
                    <step.Body />
                    <Show when={step.local.help}>
                      {(getHelp) => {
                        const Help = getHelp();
                        return (
                          <div class="mt-8 p-5 border-2 border-neutral-400 bg-neutral-200 rounded-2xl">
                            <p class="text-sm text-neutral-500 flex items-center gap-1">
                              <Signpost size={16} />
                              {t('dica.help')}
                            </p>
                            <Help />
                          </div>
                        );
                      }}
                    </Show>
                  </div>
                </Page>
              )}
            </For>
          </div>
          <nav class="w-xs overflow-y-auto h-screen p-4">
            <div>
              <h1 class="font-octa text-3xl font-bold top-4 left-4 flex items-center justify-center gap-2 mt-16 mb-6 uppercase">
                <LogoHorizontal class="h-5 w-5 text-saturated-500" />{' '}
                <span>{parsed.global?.title}</span>
              </h1>
              <h2 class="text-2xl font-bold font-octa mb-4">
                {t('dica.progress')}: {progress().percent.toFixed() || 0}%
              </h2>
              <div class="flex gap-4 mb-4 items-center mr-2">
                <p class="relative h-12px bg-neutral-300 p-0.5 rounded-full grow">
                  <span
                    class="block h-3 rounded-full bg-linear-to-b from-complement-600 to-complement-400"
                    style={{ width: `${progress().percent || 0}%` }}
                  />
                </p>
                <p class="border rounded-full px-2">{average().toFixed()}</p>
              </div>
              <ul class="flex flex-col gap-2 mb-6">
                <For each={revealedPages()}>
                  {(step) => (
                    <li>
                      <Step step={step} />
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <Show when={revealedClues().length > 0}>
              <div>
                <h2 class="text-2xl font-bold font-octa mb-4">
                  {t('dica.clues')}
                </h2>
                <ul class="flex flex-col gap-2 mb-6">
                  <For each={revealedClues()}>
                    {(step) => (
                      <li>
                        <Step step={step} />
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Show>
          </nav>
        </div>
      </View>
    </div>
  );
}
