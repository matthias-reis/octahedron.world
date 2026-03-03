import { query } from "@solidjs/router";
import type { RatingHistoryItem } from "~/routes/pcsc-api/ratings";
import { fetchLocal } from "./fetch";

/**
 * Fetches the rating history sorted by most recent rating date.
 * This bypasses the cache and queries Firebase directly for real-time data.
 *
 * @returns Promise<RatingHistoryItem[]> - Array of tracks with their latest ratings and dates
 */
export const fetchRatings = query(async (): Promise<RatingHistoryItem[]> => {
  const ratings = await fetchLocal("/pcsc-api/ratings");
  return ratings;
}, "fetchRatings");
