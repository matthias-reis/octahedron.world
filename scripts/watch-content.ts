import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { glob } from 'glob';

let isRunning = false;
let debounceTimer: NodeJS.Timeout | null = null;

async function runContentScript() {
  if (isRunning) {
    console.log('[WATCH] Content script already running, skipping...');
    return;
  }

  isRunning = true;
  console.log('[WATCH] 🔄 Running content script...');

  const child = spawn('pnpm', ['content'], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('close', (code) => {
    isRunning = false;
    if (code === 0) {
      console.log('[WATCH] ✅ Content script completed');
    } else {
      console.log(`[WATCH] ❌ Content script exited with code ${code}`);
    }
  });
}

async function startWatcher() {
  console.log('[WATCH] 🔍 Watching for content changes in _content/**/*.md');
  console.log('[WATCH] Press Ctrl+C to stop\n');

  // Initial run
  await runContentScript();

  // Find all markdown files to watch
  const files = await glob('_content/**/*.md', {
    cwd: process.cwd(),
    absolute: true,
  });

  // Watch the _content directory recursively
  const watcher = watch(
    '_content',
    { recursive: true },
    (eventType, filename) => {
      if (filename && filename.endsWith('.md')) {
        console.log(`[WATCH] 📝 Detected change: ${filename}`);

        // Debounce to avoid running multiple times for rapid changes
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
          runContentScript();
        }, 300);
      }
    }
  );

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n[WATCH] 🛑 Stopping watcher...');
    watcher.close();
    process.exit(0);
  });
}

startWatcher();
