import { Show, For, createSignal, createEffect } from 'solid-js';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';
import { QuestWrapper } from './quest-wrapper';

export type MultitextQuestConfig = BaseQuestConfig & {
  variant: 'multitext';
  question: string;
  solutions: string[];
  success: string;
  failure: string;
  notfound: string;
};

export type MultitextQuestStatus = BaseQuestStatus & {
  variant: 'multitext';
  tries?: number;
  found?: string[];
};

const MAX_TRIES = 10;
const PENALTY_PER_TRY = 10;

export const MultitextQuest: QuestVariant<
  MultitextQuestConfig,
  MultitextQuestStatus
> = (props) => {
  const config = () => props.config;

  const [isFinished, setIsFinished] = createSignal(props.status.finished);
  const [tries, setTries] = createSignal(props.status.tries ?? 0);
  const [found, setFound] = createSignal<string[]>(props.status.found ?? []);
  const [inputValue, setInputValue] = createSignal('');
  const [showError, setShowError] = createSignal(false);
  const [gaveUp, setGaveUp] = createSignal(false);

  createEffect(() => {
    if (
      props.status.tries &&
      props.status.tries >= MAX_TRIES &&
      props.status.finished
    ) {
      setGaveUp(true);
    }
  });

  const normalizeAnswer = (answer: string) => answer.trim().toLowerCase();

  const findMatchingSolution = (answer: string): string | undefined => {
    const normalized = normalizeAnswer(answer);
    return config().solutions.find((s) => normalizeAnswer(s) === normalized);
  };

  const isAlreadyFound = (solution: string): boolean => {
    return found().some(
      (f) => normalizeAnswer(f) === normalizeAnswer(solution)
    );
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (isFinished()) return;

    const answer = inputValue().trim();
    if (!answer) return;

    const matchingSolution = findMatchingSolution(answer);

    if (matchingSolution) {
      if (isAlreadyFound(matchingSolution)) {
        setInputValue('');
        setShowError(false);
      } else {
        const newFound = [...found(), matchingSolution];
        setFound(newFound);
        setInputValue('');
        setShowError(false);
        props.onChange({ found: newFound });

        if (newFound.length === config().solutions.length) {
          const currentTries = tries();
          const score = Math.max(0, 100 - PENALTY_PER_TRY * currentTries);
          const reveal = config().reveal ?? [];
          setIsFinished(true);
          props.onFinalize(score, reveal);
        }
      }
    } else {
      const newTries = tries() + 1;
      setTries(newTries);
      setInputValue('');
      setShowError(true);
      props.onChange({ tries: newTries });

      if (newTries >= MAX_TRIES) {
        setIsFinished(true);
        setGaveUp(true);
        const reveal = config().reveal ?? [];
        props.onFinalize(0, reveal);
      }
    }
  };

  return (
    <QuestWrapper isFinished={isFinished()} failed={gaveUp()}>
      <h3 class="text-2xl mb-6">{config().question}</h3>

      <Show when={isFinished() && !gaveUp()}>
        <p class="text-emerald-500 max-w-sm mx-auto my-6 text-center">
          {config().success}
        </p>
      </Show>

      <Show when={gaveUp()}>
        <p class="text-saturated-400 max-w-sm mx-auto my-6 text-center">
          {config().notfound}
        </p>
      </Show>

      <Show when={found().length > 0}>
        <ul class="mb-6 space-y-2">
          <For each={found()}>
            {(solution) => (
              <li class="flex items-center gap-2 font-mono text-emerald-400">
                <svg
                  class="w-5 h-5 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {solution}
              </li>
            )}
          </For>
        </ul>
      </Show>

      <Show when={!isFinished()}>
        <form onSubmit={handleSubmit} class="flex flex-col items-center gap-4">
          <input
            type="text"
            value={inputValue()}
            onInput={(e) => setInputValue(e.currentTarget.value)}
            class="w-full max-w-xs px-4 py-3 bg-neutral-complement-300 border border-neutral-complement-500 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-neutral-complement-500"
            placeholder="Your answer..."
          />
          <button type="submit" class="dica-button">
            Submit
          </button>
        </form>

        <Show when={showError()}>
          <p class="text-saturated-600 mt-4 text-center">{config().failure}</p>
          <p class="text-neutral-500 text-sm text-center mt-1">
            Attempt {tries()} of {MAX_TRIES}
          </p>
        </Show>

        <p class="text-neutral-500 text-sm text-center mt-4">
          {found().length} of {config().solutions.length} solutions found
        </p>
      </Show>
    </QuestWrapper>
  );
};
