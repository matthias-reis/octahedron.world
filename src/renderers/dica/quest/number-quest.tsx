import { Show, createSignal, createEffect } from 'solid-js';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';
import { QuestWrapper } from './quest-wrapper';

export type NumberQuestConfig = BaseQuestConfig & {
  variant: 'number';
  question: string;
  solution: number;
  tolerance: number;
  success: string;
  failure: string;
  notfound: string;
};

export type NumberQuestStatus = BaseQuestStatus & {
  variant: 'number';
  tries?: number;
};

const MAX_TRIES = 10;
const PENALTY_PER_TRY = 0.07;

export const NumberQuest: QuestVariant<NumberQuestConfig, NumberQuestStatus> = (
  props
) => {
  const config = () => props.config;

  const [isFinished, setIsFinished] = createSignal(props.status.finished);
  const [tries, setTries] = createSignal(props.status.tries ?? 0);
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

  const calculateScore = (input: number): number => {
    const solution = config().solution;
    const tolerance = config().tolerance;
    const distance = Math.abs(input - solution);

    const precisionRatio = distance / tolerance;
    const A = 1 - 0.3 * precisionRatio;
    const B = 1 - tries() * PENALTY_PER_TRY;

    return Math.round(A * B * 100);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (isFinished()) return;

    const inputStr = inputValue().trim();
    const input = parseFloat(inputStr);

    if (isNaN(input)) {
      setInputValue('');
      setShowError(true);
      return;
    }

    const solution = config().solution;
    const tolerance = config().tolerance;
    const distance = Math.abs(input - solution);

    if (distance <= tolerance) {
      const score = calculateScore(input);
      const reveal = config().reveal ?? [];
      setIsFinished(true);
      setShowError(false);
      props.onFinalize(score, reveal);
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
        <p class="text-saturated-500 text-sm text-center opacity-70">
          The answer was: {config().solution}
        </p>
      </Show>

      <Show when={!isFinished()}>
        <form onSubmit={handleSubmit} class="flex flex-col items-center gap-4">
          <input
            type="number"
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
          <p class="text-saturated-400 mt-4 text-center">{config().failure}</p>
          <p class="text-neutral-500 text-sm text-center mt-1">
            Attempt {tries()} of {MAX_TRIES}
          </p>
        </Show>
      </Show>
    </QuestWrapper>
  );
};
