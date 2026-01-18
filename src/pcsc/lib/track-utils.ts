"use server";
import { TrackModel } from "../model/track";
import { fbReadAllTracks } from "../service/track";

let allTracks: TrackModel[] = [];

export const getAllTracks = async () => {
  if (allTracks.length > 0) {
    return allTracks;
  } else {
    const tracks = await fbReadAllTracks();
    allTracks = tracks.map((t) => new TrackModel(t));
    return allTracks;
  }
};
