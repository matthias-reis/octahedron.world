import { json } from '@solidjs/router';
import { refreshTracksCache } from '~/pcsc/server/track-cache';

export async function DELETE() {
  console.log('[PCSC API] Cache refresh requested');

  // Trigger cache refresh
  refreshTracksCache();

  return json({
    success: true,
    message: 'Cache refresh triggered',
    timestamp: new Date().toISOString()
  });
}
