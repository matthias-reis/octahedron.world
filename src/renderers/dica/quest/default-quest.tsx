import { Show } from 'solid-js';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';

export type DefaultQuestConfig = BaseQuestConfig & {
  variant: 'default';
};
export type DefaultQuestStatus = BaseQuestStatus & { variant: 'default' };

export const DefaultQuest: QuestVariant<
  DefaultQuestConfig,
  DefaultQuestStatus
> = (props) => {
  const isFinished = () => props.status.finished;

  const handleClick = () => {
    const weight = 90 + Math.round(Math.random() * 10);
    const reveal = props.config.reveal ?? [];
    props.onFinalize(weight, reveal);
  };

  return (
    <Show
      when={!isFinished()}
      fallback={<p class="text-pink-400 font-bold text-center">Completed!</p>}
    >
      <button
        onClick={handleClick}
        class="px-6 py-3 bg-pink-700 text-black font-semibold rounded-lg hover:bg-pink-500 transition-colors mx-auto"
      >
        Complete Quest
      </button>
    </Show>
  );
};
