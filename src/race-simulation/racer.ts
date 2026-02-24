import { Day } from "./day";

// ─── Racer class (central element) ───────────────────────────────────────────

export class Racer {
  readonly id: number;
  readonly skill: number; // 0..1
  readonly reliability: number; // 0..1
  readonly risk: number; // 0..1
  days: Day[] = [];

  constructor(id: number) {
    this.id = id;
    this.skill = Math.random();
    this.reliability = Math.random();
    this.risk = Math.random();

    // 7 days
    for (let d = 0; d < 7; d++) {
      this.days.push(new Day(d, this));
    }
  }

  pickBestDays(): void {
    // find best five days
    [...this.days]
      .sort((a, b) => b.points - a.points)
      .slice(0, 5)
      .forEach((day) => {
        day.picked = true;
      });
  }

  get points(): number {
    this.pickBestDays();
    return this.days.reduce((sum, day) => sum + day.pointsIfPicked, 0);
  }
}
