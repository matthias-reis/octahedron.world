import { For, Show, createSignal } from 'solid-js';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';
import { QuestWrapper } from './quest-wrapper';

export type MultipleChoiceQuestConfig = BaseQuestConfig & {
  variant: 'multiplechoice';
  question: string;
  options: string[];
  solutions: number[];
  success: string;
  failure: string;
};

export type MultipleChoiceQuestStatus = BaseQuestStatus & {
  variant: 'multiplechoice';
  tries?: number;
};

const parseSolutions = (solutions: number[] | string): number[] => {
  if (typeof solutions === 'string') {
    try {
      return JSON.parse(solutions);
    } catch {
      return [];
    }
  }
  return solutions;
};

export const MultipleChoiceQuest: QuestVariant<
  MultipleChoiceQuestConfig,
  MultipleChoiceQuestStatus
> = (props) => {
  const config = () => props.config;
  const solutions = () => parseSolutions(config().solutions);

  const [isFinished, setIsFinished] = createSignal(props.status.finished);
  const [tries, setTries] = createSignal(props.status.tries ?? 0);
  const [selected, setSelected] = createSignal<Set<number>>(new Set());
  const [showError, setShowError] = createSignal(false);

  const toggleOption = (index: number) => {
    if (isFinished()) return;

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
    setShowError(false);
  };

  const handleSubmit = () => {
    if (isFinished()) return;

    const selectedArray = Array.from(selected()).sort((a, b) => a - b);
    const solutionsArray = [...solutions()].sort((a, b) => a - b);

    const isCorrect =
      selectedArray.length === solutionsArray.length &&
      selectedArray.every((val, idx) => val === solutionsArray[idx]);

    if (isCorrect) {
      const currentTries = tries();
      const score = Math.max(30, 100 - currentTries * 7);
      const reveal = config().reveal ?? [];
      setIsFinished(true);
      props.onFinalize(score, reveal);
    } else {
      const newTries = tries() + 1;
      setTries(newTries);
      setSelected(new Set<number>());
      setShowError(true);
      props.onChange({ tries: newTries });
    }
  };

  return (
    <QuestWrapper isFinished={isFinished()}>
      <h3 class="text-2xl mb-4">{config().question}</h3>

      {isFinished() ? (
        <p class="text-emerald-500 max-w-sm mx-auto my-6 text-center">
          {config().success}
        </p>
      ) : (
        <>
          <div class="flex flex-col gap-2">
            <For each={config().options}>
              {(option, index) => (
                <button
                  onClick={() => toggleOption(index())}
                  class="px-4 py-3 text-left rounded-lg transition-colors flex items-center gap-3"
                  classList={{
                    'dica-selector-inactive': !selected().has(index()),
                    'dica-selector-active': selected().has(index()),
                  }}
                >
                  <span
                    class="w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 bg-transparent"
                    classList={{
                      'dica-box-inactive': !selected().has(index()),
                      'dica-box-active': selected().has(index()),
                    }}
                  >
                    <Show when={selected().has(index())}>
                      <svg
                        class="w-4 h-34"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </Show>
                  </span>
                  <span>{option}</span>
                </button>
              )}
            </For>
          </div>

          <div class="mt-4 flex flex-col items-center gap-3">
            <button
              onClick={handleSubmit}
              class="px-6 py-2 bg-saturated-500 hover:bg-saturated-600 text-white font-medium rounded-lg transition-colors"
            >
              Submit
            </button>

            <Show when={showError()}>
              <p class="text-saturated-400 text-center">{config().failure}</p>
            </Show>
          </div>
        </>
      )}
    </QuestWrapper>
  );
};
