import type { APIEvent } from "@solidjs/start/server";
import { TrackModel } from "~/pcsc/model/track";
import { rejectUnauthorizedWrite } from "~/pcsc/server/auth";
import { refreshTracksCache } from "~/pcsc/server/track-cache";
import {
  fbDeleteTracks,
  fbReadFullTrack,
  fbWriteTrack,
} from "~/pcsc/server/track-db";

type MergeBody = { keep?: string; merge?: string[] };

const fail = (status: number, message: string) =>
  Response.json({ success: false, message }, { status });

/**
 * POST /pcsc-api/tracks/merge {keep, merge[]} — folds duplicates (a song
 * stored twice, e.g. under a remastered album name) into one track: their
 * votes join the kept track, missing metadata is filled from them, and the
 * merged documents are deleted.
 */
export async function POST({ request }: APIEvent) {
  const rejected = rejectUnauthorizedWrite(request);
  if (rejected) return rejected;
  try {
    const body = (await request.json()) as MergeBody;
    const merge = [...new Set(body.merge ?? [])].filter(
      (id) => id !== body.keep,
    );
    if (!body.keep || merge.length === 0) {
      return fail(400, "keep and a non-empty merge list are required");
    }

    const keptRaw = await fbReadFullTrack(body.keep);
    if (!keptRaw) return fail(404, `No track ${body.keep}`);
    const mergedRaw = await Promise.all(merge.map((id) => fbReadFullTrack(id)));
    const missing = merge.filter((_, index) => !mergedRaw[index]);
    if (missing.length) return fail(404, `No track ${missing.join(", ")}`);

    const kept = new TrackModel(keptRaw);
    const seen = new Set(
      kept.votes.map((vote) => `${vote.date.getTime()}:${vote.rating}`),
    );
    for (const raw of mergedRaw) {
      if (!raw) continue;
      const other = new TrackModel(raw);
      kept.augment(other);
      for (const vote of other.votes) {
        const key = `${vote.date.getTime()}:${vote.rating}`;
        if (seen.has(key)) continue;
        seen.add(key);
        kept.votes.push(vote);
      }
    }
    kept.votes.sort((a, b) => b.date.getTime() - a.date.getTime());

    await fbWriteTrack(kept);
    await fbDeleteTracks(merge);
    refreshTracksCache();

    return { success: true, track: kept.serialised, deleted: merge };
  } catch (error) {
    console.error("[MERGE] Error merging tracks:", error);
    return fail(500, "Internal server error");
  }
}
