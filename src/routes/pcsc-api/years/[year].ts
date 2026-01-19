import type { APIEvent } from '@solidjs/start/server';
import { getAllTracks } from '~/pcsc/server/track-cache';

export async function GET({ params }: APIEvent) {
  const year = parseInt(params.year || '0', 10);

  if (!year) {
    return new Response('Invalid year', { status: 400 });
  }

  const tracks = await getAllTracks();
  const yearTracks = tracks.getYear(year);

  return yearTracks;
}
