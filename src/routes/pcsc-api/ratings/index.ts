import { fbReadRatingsHistory } from '~/pcsc/server/track-db';
import { CompactTrack, TrackModel } from '~/pcsc/model/track';

export type RatingHistoryItem = {
  track: CompactTrack;
  rating: number;
  ratingDate: string;
};

export async function GET() {
  // Fetch tracks directly from Firebase with their vote history
  const tracks = await fbReadRatingsHistory(100);

  // Transform into rating history items with latest vote info
  const ratingHistory: RatingHistoryItem[] = tracks
    .map((track) => {
      const trackModel = new TrackModel(track);
      const lastVote = trackModel.lastVote;

      if (!lastVote) {
        return null;
      }

      return {
        track: trackModel.compact,
        rating: lastVote.rating,
        ratingDate: lastVote.date.toISOString(),
      };
    })
    .filter((item): item is RatingHistoryItem => item !== null);

  return ratingHistory;
}
