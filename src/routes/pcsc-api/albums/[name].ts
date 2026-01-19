import { json } from '@solidjs/router';
import type { APIEvent } from '@solidjs/start/server';
import { getAllTracks } from '~/pcsc/server/track-cache';
import { TrackModel } from '~/pcsc/model/track';

export async function GET(event: APIEvent) {
  const albumName = event.params.name;

  if (!albumName) {
    return json({ error: 'Album name is required' }, { status: 400 });
  }

  const decodedAlbumName = decodeURIComponent(albumName);
  const tracks = await getAllTracks();

  // Filter tracks by album and sort by disc/track number
  const albumTracks = tracks.all
    .filter((track) => track.album === decodedAlbumName)
    .map((track) => track.compact)
    .sort((a, b) => {
      return a.albumSortKey - b.albumSortKey;
    });

  return json(albumTracks);
}
