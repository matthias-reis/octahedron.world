import type { JSX } from 'solid-js';

export type GlobalScope = {
  slug: string;
  version?: number;
  title?: string;
  subtitle?: string;
  type?: string;
  start?: string;
  colorSpace?: 'original' | 'carmine';
  reveal?: string[];
};

export type LocalScope = {
  title?: string;
  type: 'page' | 'clue';
  weight?: 1 | 2 | 3;
  help?: () => JSX.Element;
};

export type StepStatus = {
  id: string;
  title: string;
  weight: 1 | 2 | 3;
  type: 'page' | 'clue';
  finished: boolean;
  score: number;
  revealed: boolean;
};
