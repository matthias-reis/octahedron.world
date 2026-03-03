import type { Component } from "solid-js";
import type { StepStatus } from "../types";
import type { ChoiceQuestConfig, ChoiceQuestStatus } from "./choice-quest";
import type { DefaultQuestConfig, DefaultQuestStatus } from "./default-quest";
import type {
  ImageMapQuestConfig,
  ImageMapQuestStatus,
} from "./image-map-quest";
import type {
  ImageMapMultiQuestConfig,
  ImageMapMultiQuestStatus,
} from "./imagemapmulti-quest";
import type {
  ImageMapPrecisionQuestConfig,
  ImageMapPrecisionQuestStatus,
} from "./imagemapprecision-quest";
import type { InputQuestConfig, InputQuestStatus } from "./input-quest";
import type {
  MultipleChoiceQuestConfig,
  MultipleChoiceQuestStatus,
} from "./multiple-choice-quest";
import type {
  MultitextQuestConfig,
  MultitextQuestStatus,
} from "./multitext-quest";
import type { NumberQuestConfig, NumberQuestStatus } from "./number-quest";
import type { ViewQuestConfig, ViewQuestStatus } from "./view-quest";

export interface BaseQuestConfig {
  ref: string;
  reveal?: string[];
}

export type BaseQuestStatus = StepStatus & {};

export type QuestConfig =
  | DefaultQuestConfig
  | ViewQuestConfig
  | ChoiceQuestConfig
  | MultipleChoiceQuestConfig
  | InputQuestConfig
  | NumberQuestConfig
  | MultitextQuestConfig
  | ImageMapQuestConfig
  | ImageMapMultiQuestConfig
  | ImageMapPrecisionQuestConfig;

export type QuestStatus =
  | DefaultQuestStatus
  | ViewQuestStatus
  | ChoiceQuestStatus
  | MultipleChoiceQuestStatus
  | InputQuestStatus
  | NumberQuestStatus
  | MultitextQuestStatus
  | ImageMapQuestStatus
  | ImageMapMultiQuestStatus
  | ImageMapPrecisionQuestStatus;

export type QuestVariantKey =
  | "default"
  | "view"
  | "choice"
  | "multiplechoice"
  | "input"
  | "number"
  | "multitext"
  | "imagemap"
  | "imagemapmulti"
  | "imagemapprecision";

export interface QuestVariantProps<
  C extends QuestConfig = QuestConfig,
  S extends QuestStatus = QuestStatus,
> {
  status: S;
  config: C;
  onFinalize: (weight: number, reveal: string[]) => void;
  onChange: (updates: Partial<S>) => void;
}

export type QuestVariant<
  C extends QuestConfig = QuestConfig,
  S extends QuestStatus = QuestStatus,
> = Component<QuestVariantProps<C, S>>;
