import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { rejectUnauthorizedWrite } from "~/pcsc/server/auth";
import { refreshTracksCache } from "~/pcsc/server/track-cache";

export async function DELETE({ request }: APIEvent) {
  const rejected = rejectUnauthorizedWrite(request);
  if (rejected) return rejected;
  console.log("[PCSC API] Cache refresh requested");

  // Trigger cache refresh
  refreshTracksCache();

  return json({
    success: true,
    message: "Cache refresh triggered",
    timestamp: new Date().toISOString(),
  });
}
