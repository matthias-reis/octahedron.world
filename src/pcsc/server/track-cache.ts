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

export let tracksCache = fillTracksCache();

/**
 * Refreshes the tracks cache by re-fetching from Firebase.
 */
export function refreshTracksCache() {
  console.log('[PCSC] Refreshing tracks cache...');
  tracksCache = fillTracksCache();
  return tracksCache;
}

/**
 * Gets all tracks from cache (SERVER-SIDE ONLY).
 * Initializes cache on first call.
 */
export async function getAllTracks() {
  const res = await tracksCache;
  return res;
}
