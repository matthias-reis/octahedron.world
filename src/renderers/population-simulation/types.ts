import { age } from "./plugins/randoms";

const initialHealthShape = age({ 0: 0.8, 10: 1, 50: 1, 70: 0.8, 100: 0.12 });

export class Citizen {
  id: number;
  isMale: boolean;
  age: number;
  robustness: number;
  health: number;
  born: number;
  died: number | null;
  dead: boolean;
  socialScore: number;
  partnerId: number;
  fatherId: number;
  motherId: number;
  children: number[];

  constructor(id: number) {
    this.id = id;
    this.isMale = Math.random() < 0.512; // 48.8% female
    this.age = Math.floor(Math.random() * (30 - 18 + 1)) + 18;
    this.robustness = Math.random();
    this.health = initialHealthShape(this.age);
    this.born = 0 - this.age;
    this.died = null;
    this.dead = false;
    this.socialScore = Math.random();
    this.partnerId = -1;
    this.fatherId = -1;
    this.motherId = -1;
    this.children = [];
  }
}

export interface SimulationState {
  citizens: Record<number, Citizen>;
}

export interface PopulationPlugin {
  transformer: (state: SimulationState, year: number) => void;
  extractors: Record<string, (state: SimulationState, year: number) => number>;
}
