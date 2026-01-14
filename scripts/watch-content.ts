import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { glob } from 'glob';

let isRunning = false;
let contentDebounceTimer: NodeJS.Timeout | null = null;
let imagineDebounceTimer: NodeJS.Timeout | null = null;

async function runContentScript() {
  if (isRunning) {
    console.log('[WATCH] CONTENT script already running, skipping...');
    return;
  }

  isRunning = true;
  console.log('[WATCH] 🔄 Running CONTENT script...');

  const child = spawn('pnpm', ['content'], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('close', (code) => {
    isRunning = false;
    if (code === 0) {
      console.log('[WATCH] ✅ CONTENT script completed');
    } else {
      console.log(`[WATCH] ❌ CONTENT script exited with code ${code}`);
    }
  });
}

async function runImagineScript() {
  if (isRunning) {
    console.log('[WATCH] IMAGINE script already running, skipping...');
    return;
  }

  isRunning = true;
  console.log('[WATCH] 🔄 Running IMAGINE script...');

  const child = spawn('pnpm', ['imagine'], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('close', (code) => {
    isRunning = false;
    if (code === 0) {
      console.log('[WATCH] ✅ IMAGINE script completed');
    } else {
      console.log(`[WATCH] ❌ IMAGINE script exited with code ${code}`);
    }
  });
}

async function startWatcher() {
  console.log('[WATCH] 🔍 Watching for changes in _content');

  // Initial run
  // await runContentScript();
  // await runImagineScript();

  // Watch the _content directory recursively
  const watcher = watch(
    '_content',
    { recursive: true },
    (eventType, filename) => {
      if (filename && filename.endsWith('.md')) {
        console.log(`[WATCH] 📝 Detected CONTENT change: ${filename}`);

        // Debounce to avoid running multiple times for rapid changes
        if (contentDebounceTimer) {
          clearTimeout(contentDebounceTimer);
        }

        contentDebounceTimer = setTimeout(() => {
          runContentScript();
        }, 300);
      }
      if (
        filename &&
        (filename.endsWith('.jpg') || filename.endsWith('.png'))
      ) {
        console.log(`[WATCH] 🖼️ Detected IMAGINE change: ${filename}`);

        // Debounce to avoid running multiple times for rapid changes
        if (imagineDebounceTimer) {
          clearTimeout(imagineDebounceTimer);
        }

        imagineDebounceTimer = setTimeout(() => {
          runImagineScript();
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
