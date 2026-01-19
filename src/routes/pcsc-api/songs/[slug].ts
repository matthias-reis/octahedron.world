import { fbReadFullTrack } from '~/pcsc/server/track-db';
import { Track, TrackModel } from '~/pcsc/model/track';
import { type APIEvent } from '@solidjs/start/server';

export type TrackDetail = {
  track: Track;
  voteHistory: {
    rating: number;
    date: string;
  }[];
};

export async function GET({ params }: APIEvent) {
  const slug = params.slug;

  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 });
  }

  try {
    // Fetch track directly from Firebase with full vote history
    const track = await fbReadFullTrack(slug);

    if (!track) {
      return new Response('Track not found', { status: 404 });
    }

    // Use TrackModel to process and sort votes
    const trackModel = new TrackModel(track);

    // Create response with track and vote history
    const response: TrackDetail = {
      track: trackModel.serialised,
      voteHistory: trackModel.votes.map((vote) => ({
        rating: vote.rating,
        date: vote.date.toISOString(),
      })),
    };

    return response;
  } catch (error) {
    console.error('[API] Error fetching track:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
