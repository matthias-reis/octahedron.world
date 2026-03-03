import { Racer } from "./racer";

/** Run a full 7-day, 100-racer race week and return racers sorted by total points. */
export function simulateWeek(): Racer[] {
  const racers = Array.from({ length: 100 }, (_, i) => new Racer(i + 1));

  // Ravers have produced results. Now calculate points.
  for (let day = 0; day < 7; day++) {
    for (let stage = 0; stage < 8; stage++) {
      // sort racers by score of stage
      const sorted = [...racers].sort(
        (a, b) =>
          b.days[day].stages[stage].countableScore -
          a.days[day].stages[stage].countableScore,
      );
      // assign points to top 30
      sorted.slice(0, 30).forEach((racer, rank) => {
        const rankPoints = 30 - rank; // rank 0 → 30pts, rank 29 → 1pt
        racer.days[day].stages[stage].points = rankPoints;
      });
    }

    // Points are there, now bonus points
    const sorted = [...racers].sort(
      (a, b) => b.days[day].stagePoints - a.days[day].stagePoints,
    );
    sorted.slice(0, 30).forEach((racer, rank) => {
      const rankPoints = 30 - rank; // rank 0 → 30pts, rank 29 → 1pt
      racer.days[day].bonusPoints = rankPoints;
    });
  }

  // Return sorted by weekly total, descending
  return racers.sort((a, b) => b.points - a.points);
}
