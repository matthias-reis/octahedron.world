import { createEffect, onCleanup } from 'solid-js';
import { useLocation } from '@solidjs/router';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';

const DELAY_MS = 2500;

export type ViewQuestConfig = BaseQuestConfig & {
  variant: 'view';
};
export type ViewQuestStatus = BaseQuestStatus & { variant: 'view' };

export const ViewQuest: QuestVariant<ViewQuestConfig, ViewQuestStatus> = (
  props,
) => {
  const location = useLocation();

  createEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (hash !== props.config.ref) return;
    if (props.status.finished) return;

    const timer = setTimeout(() => {
      const weight = 100;
      const reveal = props.config.reveal ?? [];
      props.onFinalize(weight, reveal);
    }, DELAY_MS);

    onCleanup(() => clearTimeout(timer));
  });

  return null;
};
