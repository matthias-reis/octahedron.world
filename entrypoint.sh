#!/bin/sh
set -e

# Start cron daemon in background
crond

# Run log analysis once at startup (non-blocking)
node /app/scripts/analyze-logs.js &

# Hand off to main application (signals forwarded correctly via exec)
exec node server/index.mjs
