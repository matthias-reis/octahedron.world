import { For, Show, createSignal } from 'solid-js';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';
import { QuestWrapper } from './quest-wrapper';

export type ChoiceQuestConfig = BaseQuestConfig & {
  variant: 'choice';
  question: string;
  options: string[];
  solution: number;
  success: string;
  failure: string;
};

export type ChoiceQuestStatus = BaseQuestStatus & {
  variant: 'choice';
  tries?: number;
};

export const ChoiceQuest: QuestVariant<ChoiceQuestConfig, ChoiceQuestStatus> = (
  props
) => {
  const config = () => props.config;

  const [isFinished, setIsFinished] = createSignal(props.status.finished);
  const [tries, setTries] = createSignal(props.status.tries ?? 0);
  const [lastWrong, setLastWrong] = createSignal<number | null>(null);

  const handleChoice = (index: number) => {
    if (isFinished()) return;

    if (index === Number(config().solution)) {
      const currentTries = tries();
      const optionsCount = config().options.length;
      const score = Math.max(
        0,
        Math.round((1 - currentTries * (1 / optionsCount)) * 100)
      );
      const reveal = config().reveal ?? [];
      setIsFinished(true);
      props.onFinalize(score, reveal);
    } else {
      const newTries = tries() + 1;
      setLastWrong(index);
      setTries(newTries);
      props.onChange({ tries: newTries });
    }
  };

  return (
    <QuestWrapper isFinished={isFinished()}>
      <h3 class="text-2xl mb-4">{config().question}</h3>

      {isFinished() ? (
        <p class="text-emerald-500 max-w-sm mx-auto my-5 text-center">
          {config().success}
        </p>
      ) : (
        <>
          <div class="flex flex-col gap-2">
            <For each={config().options}>
              {(option, index) => (
                <button
                  onClick={() => handleChoice(index())}
                  class="px-4 py-3 text-left rounded-lg transition-colors"
                  classList={{
                    'dica-selector-inactive': lastWrong() !== index(),
                    'dica-selector-active': lastWrong() === index(),
                  }}
                >
                  {option}
                </button>
              )}
            </For>
          </div>

          <Show when={lastWrong() !== null}>
            <p class="text-saturated-600 mt-4 text-center">
              {config().failure}
            </p>
          </Show>
        </>
      )}
    </QuestWrapper>
  );
};
