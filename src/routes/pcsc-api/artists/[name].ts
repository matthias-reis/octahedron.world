import { json } from '@solidjs/router';
import type { APIEvent } from '@solidjs/start/server';
import { getAllTracks } from '~/pcsc/server/track-cache';

export async function GET(event: APIEvent) {
  const artistName = event.params.name;

  if (!artistName) {
    return json({ error: 'Artist name is required' }, { status: 400 });
  }

  const decodedArtistName = decodeURIComponent(artistName);
  const tracks = await getAllTracks();

  // Filter tracks by artist and sort by rating
  const artistTracks = tracks.all
    .filter((track) => track.artist === decodedArtistName)
    .map((track) => track.compact)
    .sort((a, b) => b.vote - a.vote);

  return json(artistTracks);
}
