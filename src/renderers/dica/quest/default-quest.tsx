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
      fallback={<p class="text-cbs5 font-bold text-center">Completed!</p>}
    >
      <button onClick={handleClick} class="dica-button">
        Complete Quest
      </button>
    </Show>
  );
};
