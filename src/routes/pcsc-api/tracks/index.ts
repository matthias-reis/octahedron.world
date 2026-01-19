import { type APIEvent } from '@solidjs/start/server';
import { TrackModel, type Track } from '~/pcsc/model/track';
import { fbReadFullTrack, fbWriteTrack } from '~/pcsc/server/track-db';
import { refreshTracksCache } from '~/pcsc/server/track-cache';

type PostRequestBody = {
  vote?: number;
  track?: Track & { name?: string };
};

type PostResponse = {
  success: boolean;
  message?: string;
  payload?: {
    id: string;
    newVote: {
      date: Date;
      rating: number;
    };
    track: Track;
  };
};

export async function POST({ request }: APIEvent): Promise<PostResponse> {
  try {
    const body = (await request.json()) as PostRequestBody;

    if (!body.track || body.vote === undefined) {
      return {
        success: false,
        message: 'Missing track or vote data',
      };
    }

    // Create model from incoming track
    // Handle both 'title' and 'name' fields for compatibility
    const incomingTrackModel = new TrackModel({
      ...body.track,
      title: body.track.title || body.track.name || 'No Title',
    });

    const t0 = Date.now();
    const existingRawTrackModel = await fbReadFullTrack(incomingTrackModel.id);

    console.log('[POST] track read', Date.now() - t0, 'ms');

    let saveableModel: TrackModel;
    if (!existingRawTrackModel) {
      console.log('[POST] track does not exist yet', incomingTrackModel.id);
      // No previous track in db
      saveableModel = incomingTrackModel;
    } else {
      console.log('[POST] track does already exist', incomingTrackModel.id);
      const existingTrackModel = new TrackModel(existingRawTrackModel);
      existingTrackModel.augment(incomingTrackModel);
      saveableModel = existingTrackModel;
    }

    const newVote = saveableModel.addVote(body.vote);

    await fbWriteTrack(saveableModel);
    console.log('[POST] DONE', saveableModel.id, Date.now() - t0, 'ms');

    // Refresh the cache after updating a track
    refreshTracksCache();

    const responseData: PostResponse = {
      success: true,
      payload: {
        id: `https://pcsc.rocks/songs/${saveableModel.id}`,
        newVote,
        track: saveableModel.serialised,
      },
    };

    return responseData;
  } catch (error) {
    console.error('[POST] Error processing vote:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
}
