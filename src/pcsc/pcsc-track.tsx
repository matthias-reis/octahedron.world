import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { type CompactTrack, TrackModel } from "./model/track";
import { PcscItem } from "./pcsc-item";

export interface PcscItemProps {
  track: CompactTrack;
  number?: string | number;
}

export function PcscTrack(props: PcscItemProps) {
  // Transform CompactTrack to TrackModel for convenience methods
  const trackModel = new TrackModel(props.track);

  return (
    <PcscItem
      number={props.number}
      url={trackModel.songUrl}
      headline={trackModel.title}
      description={trackModel.artist}
      secondaryDescription={`${trackModel.album} • ${trackModel.year}`}
      ratingTitle="Rating"
      ratingValue={trackModel.storedVote}
    />
  );
}
