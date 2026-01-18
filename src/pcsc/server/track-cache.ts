'use server';
import { TrackModel } from '../model/track';
import { TrackMapModel } from '../model/track-map';
import { fbReadAllTracks } from './track-db';

/**
 * Fills the tracks cache from Firebase (SERVER-SIDE ONLY).
 */
export async function fillTracksCache() {
  console.log('[PCSC] Start filling Tracks Cache...');
  const tracks = await fbReadAllTracks();
  const trackModels = tracks.map((t) => {
    const model = new TrackModel(t);

    return model;
  });
  console.log('[PCSC] Tracks Cache filled with', trackModels.length, 'tracks');
  return new TrackMapModel(trackModels);
}

let tracksCache = fillTracksCache();

/**
 * Gets all tracks from cache (SERVER-SIDE ONLY).
 * Initializes cache on first call.
 */
export async function getAllTracks() {
  const res = await tracksCache;
  return res;
}
