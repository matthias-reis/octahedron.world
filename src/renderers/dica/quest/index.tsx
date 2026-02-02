import { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { CustomBlockProps } from 'solid-mds';
import type { StepStatus } from '../types';
import type { QuestVariant, QuestConfig, QuestVariantKey } from './types';
import { DefaultQuest } from './default-quest';
import { ViewQuest } from './view-quest';
import { ChoiceQuest } from './choice-quest';
import { MultipleChoiceQuest } from './multiple-choice-quest';
import { InputQuest } from './input-quest';
import { NumberQuest } from './number-quest';
import { MultitextQuest } from './multitext-quest';
import { ImageMapQuest } from './image-map-quest';
import { ImageMapMultiQuest } from './imagemapmulti-quest';
import { ImageMapPrecisionQuest } from './imagemapprecision-quest';

export interface QuestProps extends CustomBlockProps {
  onFinalize: (ref: string, weight: number, reveal: string[]) => void;
  onChange: (ref: string, updates: Partial<StepStatus>) => void;
  stepStatus: Record<string, StepStatus>;
}

const questVariants: Record<string, QuestVariant<any, any>> = {
  view: ViewQuest,
  choice: ChoiceQuest,
  multiplechoice: MultipleChoiceQuest,
  input: InputQuest,
  number: NumberQuest,
  multitext: MultitextQuest,
  imagemap: ImageMapQuest,
  imagemapmulti: ImageMapMultiQuest,
  imagemapprecision: ImageMapPrecisionQuest,
};

export const Quest: Component<QuestProps> = (props) => {
  const config = () => props.data as QuestConfig | undefined;
  if (!config()?.ref) return null;

  const variant = (): QuestVariantKey =>
    (props.payload[0] as QuestVariantKey) ?? 'default';
  const ref = () => config()!.ref;
  const questStatus = () => props.stepStatus[ref()];

  if (!questStatus()) return null;

  const handleFinalize = (weight: number, reveal: string[]) => {
    props.onFinalize(ref(), weight, reveal);
  };

  const handleChange = (updates: Partial<StepStatus>) => {
    props.onChange(ref(), updates);
  };

  const QuestComponent = () => questVariants[variant()] ?? DefaultQuest;

  return (
    <Dynamic
      component={QuestComponent()}
      status={{ ...questStatus()!, variant: variant() }}
      config={{ ...config(), variant: variant() }}
      onFinalize={handleFinalize}
      onChange={handleChange}
    />
  );
};
