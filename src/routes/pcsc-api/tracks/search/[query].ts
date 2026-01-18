import type { APIEvent } from '@solidjs/start/server';
import { getAllTracks } from '~/pcsc/server/track-cache';

export async function GET({ params }: APIEvent) {
  const tracks = await getAllTracks();
  return tracks.find(params.query);
}
