import type { APIEvent } from '@solidjs/start/server';
import { getAllTracks } from '~/pcsc/server/track-cache';

export async function GET() {
  const tracks = await getAllTracks();
  return tracks.getTop(100);
}
