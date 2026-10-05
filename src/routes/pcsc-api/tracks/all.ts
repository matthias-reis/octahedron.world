import { p1toStarRating } from "~/pcsc/model/track";
import { getAllTracks } from "~/pcsc/server/track-cache";

export type PcscExportTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArtist: string | null;
  vote: number;
  voteCount: number;
  lastVoteDate: string | null;
  /** 0–100, what a voter writes into Music's rating. */
  appleRating: number;
  appleId: string | null;
  songUrl: string;
  year: number;
};

/**
 * GET /pcsc-api/tracks/all — every track in one compact list, for clients
 * that mirror PCSC (Life Brain's music module) instead of paging.
 */
export async function GET() {
  const tracks = (await getAllTracks()).all.map((model): PcscExportTrack => {
    const vote = Number.isFinite(model.storedVoteAsNumber)
      ? model.storedVoteAsNumber
      : 0;
    const serialised = model.serialised;
    return {
      id: model.id,
      title: model.title,
      artist: model.artist,
      album: model.album,
      albumArtist: serialised.albumArtist ?? null,
      vote,
      voteCount: model.voteCount,
      lastVoteDate: model.lastVoteDate ?? null,
      appleRating: p1toStarRating(vote),
      appleId: model.appleId,
      songUrl: model.songUrl,
      year: model.year,
    };
  });
  return { tracks };
}
