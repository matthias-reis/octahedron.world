/**
 * Dry-run diff (default) or migration (--apply) after a change to the PCSC
 * vote formula (`voteWeight` / `p1toStarRating` in src/pcsc/model/track.ts).
 *
 *   bun scripts/pcsc-votes.ts            # report how stored votes would shift
 *   bun scripts/pcsc-votes.ts --apply    # write the new vote + appleRating
 *
 * "Before" is what Firestore stores today; "after" is the current formula.
 * Single-vote tracks never change their vote. Reads every track (with votes);
 * writes only with --apply, and only `vote` and `appleRating` where they differ.
 */
import {
  p1toStarRating,
  type Track,
  TrackModel,
} from "../src/pcsc/model/track";
import { db } from "../src/pcsc/server/firebase";

const apply = process.argv.includes("--apply");

const band = (vote: number) =>
  vote >= 15 ? "15+" : vote >= 10 ? "10+" : "<10";

const snapshot = await db.collection("tracks").get();
type Row = {
  id: string;
  label: string;
  votes: number;
  stored: number;
  storedRating: number | null;
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
    storedRating: data.appleRating ?? null,
    before: data.vote,
    after: model.vote,
  });
});

const multi = rows.filter((row) => row.votes > 1);
const shifted = rows.filter((row) => row.after !== row.before);
const crossed = shifted.filter((row) => band(row.after) !== band(row.before));
const stars = rows.filter(
  (row) => p1toStarRating(row.after) !== row.storedRating,
);
const deltas = shifted.map((row) => Math.abs(row.after - row.before));
const bucket = (lo: number, hi: number) =>
  deltas.filter((d) => d >= lo && d < hi).length;

console.log(`tracks with votes   ${rows.length}`);
console.log(`multi-vote tracks   ${multi.length}`);
console.log(
  `shift               ${shifted.length}  (up ${shifted.filter((r) => r.after > r.before).length}, down ${shifted.filter((r) => r.after < r.before).length})`,
);
console.log(
  `  |Δ| <0.5: ${bucket(0, 0.5)}  0.5–1: ${bucket(0.5, 1)}  1–2: ${bucket(1, 2)}  2–4: ${bucket(2, 4)}  ≥4: ${bucket(4, Infinity)}`,
);
console.log(`  change band (<10 / 10+ / 15+)  ${crossed.length}`);
console.log(`  appleRating ≠ stored (new curve) ${stars.length}`);
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
  const changed = rows.filter(
    (row) =>
      row.after !== row.stored ||
      p1toStarRating(row.after) !== row.storedRating,
  );
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
