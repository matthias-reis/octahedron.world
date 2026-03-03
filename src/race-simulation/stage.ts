import type { Day } from "./day";

// Target: ~10% dropout rate per day, ~15% DNF rate per stage
export const DROPOUT_THRESHOLD = 0.0037; // reliability * luck < this → dropout
export const DNF_THRESHOLD = 0.09; // (1 - risk) * luck < this → DNF

// ─── Result types ────────────────────────────────────────────────────────────
export class Stage {
  readonly id: number;
  readonly day: Day;
  readonly luck: number;
  readonly achievement: number;

  constructor(id: number, day: Day) {
    this.id = id;
    this.day = day;
    this.luck = Math.random();
    this.achievement = Math.random();
  }

  get score() {
    return (
      this.day.baseAchievement *
      this.achievement *
      this.day.racer.skill *
      this.day.racer.risk
    );
  }

  get countableScore() {
    if (this.noScore) return 0;
    return this.score;
  }

  get dropped() {
    return this.day.racer.reliability * this.luck < DROPOUT_THRESHOLD;
  }

  get eliminated(): boolean {
    return this.dropped || (this.previousStage?.eliminated ?? false);
  }

  get dnf() {
    return (1 - this.day.racer.risk) * this.luck < DNF_THRESHOLD;
  }

  get noScore() {
    return this.dropped || this.dnf || this.eliminated;
  }

  private _points: number = 0;

  set points(points: number) {
    this._points = points;
  }

  get points() {
    return this._points;
  }

  get previousStage(): Stage | undefined {
    return this.day.stages[this.id - 1];
  }

  get token(): string {
    if (this.dropped) return "DO";
    if (this.eliminated) return "..";
    if (this.dnf) return "NF";
    return this.points.toString().padStart(2, "0");
  }
}
