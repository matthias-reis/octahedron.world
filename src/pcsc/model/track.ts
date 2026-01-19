import dayjs from 'dayjs';
import { slugify } from './slugify';

export class TrackModel {
  private track: Track | CompactTrack;
  public votes: Vote[];

  constructor(track: Track | CompactTrack, votes?: Vote[]) {
    if (!track.title) {
      track.title = 'No Title';
    }
    this.track = track;
    const potentialVotes: (Vote | SerialisedVote)[] =
      votes || (track as Track).votes || [];

    this.votes = potentialVotes
      .map((vote) => {
        if (
          vote.date &&
          typeof vote.date === 'object' &&
          'toDate' in vote.date &&
          typeof vote.date.toDate === 'function'
        ) {
          return {
            date: (vote.date as any).toDate(),
            rating: vote.rating,
          };
        }
        if (typeof vote.date === 'string') {
          return {
            date: new Date(vote.date),
            rating: vote.rating,
          };
        }
        return vote as Vote;
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  addVote(vote: number) {
    const newVote = {
      date: new Date(),
      rating: vote,
    };
    this.votes.push(newVote);
    return newVote;
  }

  augment(other: TrackModel) {
    const t = this.track as Track;
    const o = other.track as Track;
    if (!t.discCount) {
      t.discCount = o.discCount;
    }
    if (!t.discNumber) {
      t.discNumber = o.discNumber;
    }
    if (!t.trackCount) {
      t.trackCount = o.trackCount;
    }
    if (!t.trackNumber) {
      t.trackNumber = o.trackNumber;
    }
    //we take the earliest release date
    this.releaseDate = earliest(this.releaseDate, other.releaseDate);
    this.dateAdded = earliest(this.dateAdded, other.dateAdded);
  }

  isEarlierOnAlbum(other: TrackModel) {
    const t = this.track as Track;
    const o = other.track as Track;
    if (t.discNumber !== o.discNumber) {
      return (t.discNumber || 0) < (o.discNumber || 0);
    } else {
      return (t.trackNumber || 0) < (o.trackNumber || 0);
    }
  }

  get releaseDate() {
    return this.track.releaseDate
      ? new Date(this.track.releaseDate)
      : this.dateAdded;
  }
  set releaseDate(value: Date) {
    this.track.releaseDate = value.toISOString();
  }
  get dateAdded() {
    return this.track.dateAdded ? new Date(this.track.dateAdded) : new Date();
  }
  set dateAdded(value: Date) {
    this.track.dateAdded = value.toISOString();
  }
  get id() {
    return slugify(`${this.title}--${this.artist}--${this.album}`);
  }

  get title() {
    return this.track.title.trim();
  }

  get songUrl() {
    return `/pcsc-one/songs/${this.id}`;
  }

  get year() {
    return this.releaseDate?.getFullYear() ?? 0;
  }
  get yearUrl() {
    return `/pcsc-one/years/${this.year}`;
  }

  get artist() {
    return this.track.artist?.trim();
  }

  get artistUrl() {
    return `/pcsc-one/artists/${encodeURIComponent(this.artist)}`;
  }

  get album() {
    return this.track.album?.trim();
  }

  get albumUrl() {
    return `/pcsc-one/albums/${encodeURIComponent(this.album)}`;
  }

  get appleRating() {
    return (this.track as Track).appleRating ?? 0;
  }

  get vote() {
    const latestDate = this.votes
      .map((vote) => vote.date)
      .sort()
      .reverse()[0];

    const [voteSum, weightSum] = this.votes
      .map((vote) => {
        const ageInDays = dayjs(latestDate).diff(vote.date, 'day');
        const weight = (1 / (1000 - ageInDays)) ^ (2 * 0.8 + 0.2);
        return [vote.rating * weight, weight];
      })
      .reduce(
        (acc, [voteSum, weightSum]) => {
          acc[0] += voteSum;
          acc[1] += weightSum;
          return acc;
        },
        [0, 0]
      );
    return Math.round((voteSum * 10) / weightSum) / 10;
  }

  get lastVoteDate() {
    return this.lastVote?.date.toISOString() ?? this.track.lastVoteDate;
  }

  get lastVote() {
    const latestVote = this.votes.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    )[0];
    return latestVote;
  }

  get storedVote() {
    return this.storedVoteAsNumber.toFixed(1) ?? '-';
  }

  get storedVoteAsNumber() {
    return this.track.vote;
  }

  get r7Vote() {
    return p1toR7Vote(this.vote);
  }

  get starRating() {
    return p1toStarRating(this.vote);
  }

  get discCount() {
    return (this.track as Track).discCount || 1;
  }

  get trackNumber() {
    const t = this.track as Track;
    if (this.discCount === 1) {
      return `Track ${t.trackNumber} / ${t.trackCount}`;
    } else {
      return `(Disc ${t.discNumber}/${t.discCount}) Track ${t.trackNumber} / ${t.trackCount}`;
    }
  }
  get compactTrackNumber() {
    const t = this.track as Track;
    if (this.discCount === 1) {
      return `${t.trackNumber}`;
    } else {
      return `${t.discNumber}/${t.trackNumber}`;
    }
  }
  get albumSortKey() {
    const t = this.track as Track;
    const discNum = t.discNumber || 0;
    const trackNum = t.trackNumber || 0;
    return discNum * 1000 + trackNum;
  }
  get serialisedVotes() {
    return this.votes.map((vote) => ({
      date: vote.date.toISOString(),
      rating: vote.rating,
    }));
  }

  get compact(): CompactTrack {
    // Safeguard against NaN values
    const vote = isNaN(this.storedVoteAsNumber) ? 0 : this.storedVoteAsNumber;
    const year = isNaN(this.year) ? 0 : this.year;

    return {
      id: this.id,
      title: this.title,
      album: this.album,
      artist: this.artist,
      dateAdded: this.dateAdded.toISOString(),
      vote,
      releaseDate: this.releaseDate.toISOString(),
      lastVoteDate: this.lastVoteDate,
      songUrl: this.songUrl,
      artistUrl: this.artistUrl,
      albumUrl: this.albumUrl,
      yearUrl: this.yearUrl,
      year,
      compactTrackNumber: this.compactTrackNumber,
      albumSortKey: this.albumSortKey,
    };
  }

  get serialised(): Track {
    const t = this.track as Track;

    return {
      ...this.compact,
      appleRating: this.starRating,
      albumArtist: t.albumArtist || null,
      discNumber: t.discNumber,
      discCount: t.discCount,
      trackNumber: t.trackNumber,
      trackCount: t.trackCount,
      vote: this.vote,
      votes: this.serialisedVotes,
    };
  }
  get json() {
    return JSON.stringify(
      {
        id: '000',
        title: this.title,
        album: this.album,
        artist: this.artist,
        year: this.year,
        elo: 100,
        trackId: this.id,
        videoId: '',
        contests: 0,
        lastContestDate: '',
        compactTrackNumber: this.compactTrackNumber,
        albumSortKey: this.albumSortKey,
      },
      null,
      2
    );
  }
}

export const earliest = (a: Date = new Date(), b: Date = new Date()) => {
  const aa = new Date(a);
  const bb = new Date(b);
  if (aa.getTime() < bb.getTime()) {
    return aa;
  } else {
    return bb;
  }
};

export const p1toStarRating = (x: number) => {
  if (x < 0) {
    return 0;
  } else if (x <= 10) {
    return Math.round(x * 9);
  } else if (x <= 15) {
    return 90 + Math.round((x - 10) * 2);
  } else {
    return 100;
  }
};

export const r8toR7Vote = (x: number) => {
  return Math.round((x * 90) / 20);
};
export const r7toR8Vote = (x: number) => {
  return Math.round((x * 20) / 90);
};

export const r8toP1Vote = (x: number) => {
  if (x < 0) {
    return 0;
  } else if (x <= 20) {
    return Math.round(x / 2);
  } else {
    return Math.round((x - 20) * 1.5 + 10);
  }
};

export const p1toR8Vote = (x: number) => {
  if (x < 0) {
    return 0;
  } else if (x <= 10) {
    return x * 2;
  } else {
    return Math.round((x - 10) / 1.5 + 20);
  }
};

export const p1toR7Vote = (x: number) => {
  let linear = 0;
  if (x <= 10) {
    linear = x * 2;
  } else {
    linear = (x - 10) / 1.5 + 20;
  }
  return (linear * 90) / 20;
};

export type CompactTrack = {
  id: string;
  title: string; // synonym to name
  album: string;
  artist: string;
  vote: number;
  dateAdded: string;
  releaseDate: string;
  lastVoteDate: string;
  songUrl: string;
  artistUrl: string;
  albumUrl: string;
  yearUrl: string;
  year: number;
  compactTrackNumber: string;
  albumSortKey: number;
};

export type Track = CompactTrack & {
  albumArtist?: string | null;
  vote: number;
  appleRating?: number | null;
  discNumber: number | null;
  discCount: number | null;
  trackNumber: number | null;
  trackCount: number | null;
  votes?: SerialisedVote[] | null;
};

export const toTrack = (
  track: Omit<Track, 'releaseDate' | 'dateAdded'> & {
    releaseDate: Date;
    dateAdded: Date;
  }
): Track => {
  return {
    ...track,
    releaseDate: track.releaseDate.toISOString(),
    dateAdded: track.dateAdded.toISOString(),
  };
};

export type SerialisedVote = {
  date: string;
  rating: number;
};

export type Vote = {
  date: Date;
  rating: number;
};
