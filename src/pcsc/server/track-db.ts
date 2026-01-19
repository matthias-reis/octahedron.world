import { TrackModel, type Track } from '../model/track';
import { db, toSerialisedDate } from './firebase';

export const fbReadAllTracks = async () => {
  // read all tracks from firebase
  const collection = db.collection('tracks');
  const snapshot = await collection.get();
  const tracks: Track[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data() as Track;
    delete data.votes; // remove votes from data
    data.releaseDate = toSerialisedDate(data.releaseDate);
    data.dateAdded = toSerialisedDate(data.dateAdded);
    tracks.push(data);
  });
  return tracks;
};

export const fbReadTracksByLatestRating = async (limit: number) => {
  // Query tracks ordered by latest rating date
  const collection = db.collection('tracks');
  const snapshot = await collection
    .orderBy('lastVoteDate', 'desc')
    .limit(limit)
    .get();

  const tracks = snapshot.docs.map((doc) => {
    const data = doc.data() as Track;
    return data;
  });
  return tracks;
};

export const fbReadFullTrack = async (id: string) => {
  try {
    // Query a single track by ID
    const track = await db.collection('tracks').doc(id).get();

    if (!track.exists) {
      return null;
    }

    return track.data() as Track;
  } catch (error) {
    console.error('[FIREBASE] Error in getFullTrackById:', error);
    throw error;
  }
};

export const fbWriteTrack = async (track: TrackModel) => {
  const serialized = track.serialised;

  try {
    await db
      .collection('tracks')
      .doc(track.id)
      .set(serialized, { merge: true });
  } catch (error) {
    console.error('[FIREBASE] Error in writeTrack:', error);
    throw error;
  }
};

export const fbReadTracksByArtist = async (artist: string) => {
  try {
    // Query tracks by artist
    const collection = db.collection('tracks');
    const snapshot = await collection.where('artist', '==', artist).get();

    if (snapshot.empty) {
      return [];
    }

    const tracks: Track[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Track;
      tracks.push(data);
    });

    return tracks;
  } catch (error) {
    console.error('[FIREBASE] Error in fbReadTracksByArtist:', error);
    throw error;
  }
};

export const fbReadTracksByAlbum = async (album: string) => {
  try {
    // Query tracks by artist
    const collection = db.collection('tracks');
    const snapshot = await collection.where('album', '==', album).get();

    if (snapshot.empty) {
      return [];
    }

    const tracks: Track[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Track;
      tracks.push(data);
    });

    return tracks;
  } catch (error) {
    console.error('[FIREBASE] Error in fbReadTracksByAlbum:', error);
    throw error;
  }
};

export const fbReadRatingsHistory = async (limit: number = 100) => {
  try {
    // Query tracks ordered by latest rating date, including vote history
    const collection = db.collection('tracks');
    const snapshot = await collection
      .orderBy('lastVoteDate', 'desc')
      .limit(limit)
      .get();

    const tracks = snapshot.docs.map((doc) => {
      const data = doc.data() as Track;
      data.releaseDate = toSerialisedDate(data.releaseDate);
      data.dateAdded = toSerialisedDate(data.dateAdded);
      // Keep votes array for rating history
      return data;
    });

    return tracks;
  } catch (error) {
    console.error('[FIREBASE] Error in fbReadRatingsHistory:', error);
    throw error;
  }
};
