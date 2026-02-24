import { Stage } from "./stage";
import type { Racer } from "./racer";


export class Day {
  readonly id: number;
  readonly stages: Stage[];
  private _racer!: Racer;
  private _baseAchievement!: number;
  private _bonusPoints: number = 0;
  private _picked: boolean = false;

  constructor(id: number, racer: Racer) {
    this.id = id;
    this.racer = racer;
    this.baseAchievement = Math.random();
    this.stages = [];

    for (let s = 0; s < 8; s++) {
      this.stages.push(new Stage(s, this));
    }
  }
  set baseAchievement(baseAchievement: number) {
    this._baseAchievement = baseAchievement;
  }
  get baseAchievement() {
    return this._baseAchievement;
  }
  get racer() {
    return this._racer;
  }
  set racer(racer: Racer) {
    this._racer = racer;
  }
  set bonusPoints(bonusPoints: number) {
    this._bonusPoints = bonusPoints;
  }
  get bonusPoints() {
    return this._bonusPoints;
  }
  get stagePoints(): number {
    return this.stages.reduce((sum, stage) => sum + stage.points, 0);
  }
  get points(): number {
    return this.stagePoints + this.bonusPoints;
  }
  get pointsIfPicked(): number {
    return this.picked ? this.points : 0;
  }
  get picked(): boolean {
    return this._picked;
  }
  set picked(picked: boolean) {
    this._picked = picked;
  }
  get dropped() {
    return this.stages[7].eliminated;
  }
  get noScoreCount() {
    return this.stages.filter((s) => s.noScore).length;
  }
}
