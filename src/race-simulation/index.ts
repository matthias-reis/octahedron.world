// ─── Configurable thresholds ────────────────────────────────────────────────
// Target: ~10% dropout rate per day, ~15% DNF rate per stage
export const DROPOUT_THRESHOLD = 0.0025; // reliability * luck < this → dropout
export const DNF_THRESHOLD = 0.15; // (1 - risk) * luck < this → DNF

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

  set points(points: number) {
    this.points = points;
  }

  get points() {
    return this.points;
  }

  get previousStage(): Stage | undefined {
    return this.day.stages[this.id - 1];
  }

  get token(): string {
    if (this.dropped) return 'DO';
    if (this.dnf) return 'NF';
    if (this.eliminated) return '..';
    return this.points.toString().padStart(2, '0');
  }
}

export class Day {
  readonly id: number;
  readonly stages: Stage[];

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
    this.baseAchievement = baseAchievement;
  }
  get baseAchievement() {
    return this.baseAchievement;
  }
  get racer() {
    return this.racer;
  }
  set racer(racer: Racer) {
    this.racer = racer;
  }
  set bonusPoints(bonusPoints: number) {
    this.bonusPoints = bonusPoints;
  }
  get bonusPoints() {
    return this.bonusPoints;
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
    return this.picked;
  }
  set picked(picked: boolean) {
    this.picked = picked;
  }
  get dropped() {
    return this.stages[7].eliminated;
  }
  get noScoreCount() {
    return this.stages.filter((s) => s.noScore).length;
  }
}

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

// ─── Week orchestration ──────────────────────────────────────────────────────

/** Run a full 7-day, 100-racer race week and return racers sorted by total points. */
export function simulateWeek(): Racer[] {
  const racers = Array.from({ length: 100 }, (_, i) => new Racer(i + 1));

  for (let day = 0; day < 7; day++) {
    for (let stage = 0; stage < 8; stage++) {
      // sort racers by score of stage
      const sorted = [...racers].sort(
        (a, b) =>
          b.days[day].stages[stage].score - a.days[day].stages[stage].score
      );
      // assign points to top 30
      sorted.slice(0, 30).forEach((racer, rank) => {
        const rankPoints = 30 - rank; // rank 0 → 30pts, rank 29 → 1pt
        racer.days[day].stages[stage].points = rankPoints;
      });
    }

    const sorted = [...racers].sort(
      (a, b) => b.days[day].stagePoints - a.days[day].stagePoints
    );
    sorted.slice(0, 30).forEach((racer, rank) => {
      const rankPoints = 30 - rank; // rank 0 → 30pts, rank 29 → 1pt
      racer.days[day].bonusPoints = rankPoints;
    });
  }

  // Return sorted by weekly total, descending
  return racers.sort((a, b) => b.points - a.points);
}
