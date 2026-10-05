/**
 * Dry-run diff (default) or migration (--apply) for the PCSC vote formula.
 *
 *   bun scripts/pcsc-votes.ts            # report how stored votes would shift
 *   bun scripts/pcsc-votes.ts --apply    # write the new vote + appleRating
 *
 * Old: the formula as it ran — `^` was XOR, so every weight was 1 (a plain
 * mean), except a vote exactly 999 days older than the newest, which got 0.
 * New: `voteWeight` in src/pcsc/model/track.ts. Single-vote tracks never
 * change. Reads every track (with votes) from Firestore; writes only with
 * --apply, and only `vote` and `appleRating` of tracks that shift.
 */
import dayjs from "dayjs";
import {
  p1toStarRating,
  type Track,
  TrackModel,
  type Vote,
} from "../src/pcsc/model/track";
import { db } from "../src/pcsc/server/firebase";

const apply = process.argv.includes("--apply");

const legacyVote = (votes: Vote[]) => {
  const latest = votes
    .map((vote) => vote.date)
    .sort()
    .reverse()[0];
  let sum = 0;
  let weights = 0;
  for (const vote of votes) {
    const age = dayjs(latest).diff(vote.date, "day");
    // reproduces the old bug: ^ is XOR, not a power
    const weight = (1 / (1000 - age)) ^ (2 * 0.8 + 0.2);
    sum += vote.rating * weight;
    weights += weight;
  }
  return Math.round((sum * 10) / weights) / 10;
};

const band = (vote: number) =>
  vote >= 15 ? "15+" : vote >= 10 ? "10+" : "<10";

const snapshot = await db.collection("tracks").get();
type Row = {
  id: string;
  label: string;
  votes: number;
  stored: number;
  before: number;
  after: number;
};
const rows: Row[] = [];
snapshot.forEach((doc) => {
  const data = doc.data() as Track;
  const model = new TrackModel(data);
  if (model.votes.length === 0) return;
  rows.push({
    id: doc.id,
    label: `${model.artist} – ${model.title}`,
    votes: model.votes.length,
    stored: data.vote,
    before: legacyVote(model.votes),
    after: model.vote,
  });
});

const multi = rows.filter((row) => row.votes > 1);
const shifted = rows.filter((row) => row.after !== row.before);
const crossed = shifted.filter((row) => band(row.after) !== band(row.before));
const stars = shifted.filter(
  (row) => p1toStarRating(row.after) !== p1toStarRating(row.before),
);
const deltas = shifted.map((row) => Math.abs(row.after - row.before));
const bucket = (lo: number, hi: number) =>
  deltas.filter((d) => d >= lo && d < hi).length;

console.log(`tracks with votes   ${rows.length}`);
console.log(`multi-vote tracks   ${multi.length}`);
console.log(
  `stored ≠ old formula ${rows.filter((r) => r.stored !== r.before).length}  (drift before any change)`,
);
console.log(
  `shift               ${shifted.length}  (up ${shifted.filter((r) => r.after > r.before).length}, down ${shifted.filter((r) => r.after < r.before).length})`,
);
console.log(
  `  |Δ| <0.5: ${bucket(0, 0.5)}  0.5–1: ${bucket(0.5, 1)}  1–2: ${bucket(1, 2)}  2–4: ${bucket(2, 4)}  ≥4: ${bucket(4, Infinity)}`,
);
console.log(`  change band (<10 / 10+ / 15+)  ${crossed.length}`);
console.log(`  change appleRating             ${stars.length}`);
console.log("\nlargest shifts:");
for (const row of [...shifted]
  .sort((a, b) => Math.abs(b.after - b.before) - Math.abs(a.after - a.before))
  .slice(0, 20)) {
  console.log(
    `  ${row.before.toFixed(1).padStart(5)} → ${row.after.toFixed(1).padStart(5)}  (${row.votes} votes)  ${row.label}`,
  );
}
console.log("\nband changes:");
for (const row of crossed.slice(0, 20)) {
  console.log(
    `  ${band(row.before)} → ${band(row.after)}  ${row.before.toFixed(1)} → ${row.after.toFixed(1)}  ${row.label}`,
  );
}

if (apply) {
  const changed = rows.filter((row) => row.after !== row.stored);
  for (let start = 0; start < changed.length; start += 400) {
    const batch = db.batch();
    for (const row of changed.slice(start, start + 400)) {
      batch.set(
        db.collection("tracks").doc(row.id),
        { vote: row.after, appleRating: p1toStarRating(row.after) },
        { merge: true },
      );
    }
    await batch.commit();
  }
  console.log(`\napplied: ${changed.length} tracks rewritten`);
} else {
  console.log("\ndry run — nothing written (pass --apply to write)");
}
process.exit(0);
