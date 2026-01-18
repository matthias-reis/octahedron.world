import { slugify } from './slugify';
import type { CompactTrack, Track, TrackModel } from './track';

export class TrackMapModel {
  private tracks: TrackModel[];
  constructor(tracks: TrackModel[]) {
    this.tracks = tracks;
  }

  get all(): TrackModel[] {
    return this.tracks.sort((a, b) => {
      return b.storedVoteAsNumber - a.storedVoteAsNumber;
    });
  }

  get hasTracks(): boolean {
    return this.tracks.length > 0;
  }

  getArtists(): TrackCollectionItem[] {
    const artistList: Record<
      string,
      { songs: TrackModel[]; data: TrackCollectionItem }
    > = {};
    this.tracks.forEach((track) => {
      if (!artistList[track.artist]) {
        artistList[track.artist] = {
          songs: [],
          data: {
            name: track.artist,
            url: track.artistUrl,
            count: 0,
            v3: null,
            v5: null,
            v7: null,
            v9: null,
          },
        };
      }
      artistList[track.artist].songs.push(track);
    });
    Object.values(artistList).forEach((i) => {
      const songs = i.songs.sort(
        (a, b) => parseFloat(b.storedVote) - parseFloat(a.storedVote)
      );
      i.data.name = songs[0].artist;
      i.data.url = songs[0].artistUrl;
      i.data.count = songs.length;
      i.data.v3 = i.songs.length > 2 ? averageVote(songs.slice(0, 3)) : null;
      i.data.v5 = i.songs.length > 4 ? averageVote(songs.slice(0, 5)) : null;
      i.data.v7 = i.songs.length > 6 ? averageVote(songs.slice(0, 7)) : null;
      i.data.v9 = i.songs.length > 8 ? averageVote(songs.slice(0, 9)) : null;
    });
    return Object.values(artistList).map((i) => i.data);
  }
  getAlbums(): TrackCollectionItem[] {
    const albumList: Record<
      string,
      { songs: TrackModel[]; data: TrackCollectionItem }
    > = {};
    this.tracks
      .filter((t) => t.album)
      .forEach((track) => {
        if (!albumList[track.album]) {
          albumList[track.album] = {
            songs: [],
            data: {
              name: track.album,
              sub: track.artist,
              url: track.albumUrl,
              count: 0,
              v3: null,
              v5: null,
              v7: null,
              v9: null,
            },
          };
        }
        albumList[track.album].songs.push(track);
      });
    Object.values(albumList).forEach((i) => {
      const songs = i.songs.sort(
        (a, b) => parseFloat(b.storedVote) - parseFloat(a.storedVote)
      );
      i.data.name = songs[0].album;
      i.data.sub = songs[0].artist;
      i.data.url = songs[0].albumUrl;
      i.data.count = songs.length;
      i.data.v3 = i.songs.length > 2 ? averageVote(songs.slice(0, 3)) : null;
      i.data.v5 = i.songs.length > 4 ? averageVote(songs.slice(0, 5)) : null;
      i.data.v7 = i.songs.length > 6 ? averageVote(songs.slice(0, 7)) : null;
      i.data.v9 = i.songs.length > 8 ? averageVote(songs.slice(0, 9)) : null;
    });
    return Object.values(albumList).map((i) => i.data);
  }
  getYears(): TrackCollectionItem[] {
    const yearsList: Record<
      string,
      { songs: TrackModel[]; data: TrackCollectionItem }
    > = {};
    this.tracks
      .filter((t) => t.year)
      .forEach((track) => {
        if (!yearsList[track.year]) {
          yearsList[track.year] = {
            songs: [],
            data: {
              name: track.year.toString(),
              url: `/pcsc-one/years/${track.year}`,
              count: 0,
              v3: null,
              v5: null,
              v7: null,
              v9: null,
            },
          };
        }
        yearsList[track.year].songs.push(track);
      });
    Object.values(yearsList).forEach((i) => {
      const songs = i.songs.sort(
        (a, b) => parseFloat(b.storedVote) - parseFloat(a.storedVote)
      );
      i.data.sub = `${songs[0].artist} - ${songs[0].title} (${songs[0].storedVote})`;
      i.data.count = songs.length;
      i.data.v3 = i.songs.length > 29 ? averageVote(songs.slice(0, 30)) : null;
      i.data.v5 = i.songs.length > 49 ? averageVote(songs.slice(0, 50)) : null;
      i.data.v7 = i.songs.length > 69 ? averageVote(songs.slice(0, 70)) : null;
      i.data.v9 = i.songs.length > 89 ? averageVote(songs.slice(0, 90)) : null;
    });
    return Object.values(yearsList).map((i) => i.data);
  }

  getYear(year: number): Track[] {
    return this.tracks
      .filter((t) => t.year === year)
      .sort((a, b) => b.storedVoteAsNumber - a.storedVoteAsNumber)
      .map((t) => t.serialised);
  }

  getYearDistinct(year: number): Track[] {
    const tracksOfTheYear = this.getYear(year);
    const artistMap: Record<string, Track> = {};
    tracksOfTheYear.forEach((track) => {
      if (!artistMap[track.artist]) {
        artistMap[track.artist] = track;
      }
    });

    return Object.values(artistMap);
  }

  getTop(i: number): CompactTrack[] {
    const tracks = this.tracks
      .sort((a, b) => b.storedVoteAsNumber - a.storedVoteAsNumber)
      .slice(0, i)
      .map((t) => t.compact);

    // Force plain object serialization to prevent prototype chain issues
    let res = [];
    try {
      res = JSON.parse(JSON.stringify(tracks)) as CompactTrack[];
    } catch (e) {
      console.error('TrackMapModel.find serialization error:', e);
      res = tracks;
    }
    return res;
  }

  find(query: string): CompactTrack[] {
    const q = slugify(query);
    if (!q) return [];
    const tracks = this.tracks
      .map((item) => {
        const place = item.id.indexOf(q);
        return [place, item] as [number, TrackModel];
      })
      .filter((i) => i[0] > -1)
      .sort((a, b) => b[1].storedVoteAsNumber - a[1].storedVoteAsNumber)
      .map((i) => i[1].compact);

    // Force plain object serialization to prevent prototype chain issues
    let res = [];
    try {
      res = JSON.parse(JSON.stringify(tracks)) as CompactTrack[];
    } catch (e) {
      console.log('TrackMapModel.find serialization error:', e);
      res = tracks;
    }
    return res;
  }
}

// can be an artist, am album or even a year
export type TrackCollectionItem = {
  name: string;
  sub?: string;
  sub2?: string;
  url: string;
  count: number;
  v3: number | null;
  v5: number | null;
  v7: number | null;
  v9: number | null;
};

const averageVote = (tracks: TrackModel[]) => {
  const total = tracks.reduce(
    (acc, track) => acc + parseFloat(track.storedVote),
    0
  );
  return total / tracks.length;
};
