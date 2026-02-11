#!/usr/bin/env node
/**
 * Watch project files and auto-commit + push after changes (debounced).
 * Pushes to main trigger GitHub Actions → deploy to gh-pages.
 * Run: npm run watch:push (or node scripts/watch-and-push.js)
 */

import chokidar from 'chokidar';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DEBOUNCE_MS = 8000;  // wait 8s after last change before commit+push
const COMMIT_MSG = 'chore: auto sync';

let timeout = null;

function run(cmd, opts = {}) {
  try {
    execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts });
    return true;
  } catch (e) {
    return false;
  }
}

function commitAndPush() {
  console.log('\n[watch-and-push] Changes detected, syncing...');
  run('git add -A');
  // Only commit if there are staged changes
  const hasStaged = run('git diff --staged --quiet', { stdio: 'pipe' }) === false;
  if (hasStaged) {
    if (run(`git commit -m "${COMMIT_MSG}"`) && run('git push')) {
      console.log('[watch-and-push] Pushed. GitHub Actions will deploy to gh-pages.');
    } else {
      console.error('[watch-and-push] Commit or push failed (e.g. nothing to commit, or push rejected).');
    }
  }
}

function schedule() {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(commitAndPush, DEBOUNCE_MS);
}

// Watch only source/config (avoids node_modules and reduces file handles)
const watchDirs = [
  path.join(ROOT, 'src'),
  path.join(ROOT, 'public'),
  path.join(ROOT, '.github'),
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'vite.config.ts'),
  path.join(ROOT, 'tsconfig.json'),
  path.join(ROOT, 'package.json'),
];

const watcher = chokidar.watch(watchDirs, {
  persistent: true,
  ignoreInitial: true,
});

watcher.on('change', (p) => {
  console.log(`[watch] ${path.relative(ROOT, p)}`);
  schedule();
});
watcher.on('add', (p) => {
  console.log(`[watch] + ${path.relative(ROOT, p)}`);
  schedule();
});
watcher.on('unlink', (p) => {
  console.log(`[watch] - ${path.relative(ROOT, p)}`);
  schedule();
});
watcher.on('error', (err) => {
  if (err.code === 'EMFILE') {
    console.error('[watch-and-push] Too many open files. Try: ulimit -n 10240');
  }
  console.error('[watch-and-push]', err.message);
});

console.log(`[watch-and-push] Watching for changes (debounce ${DEBOUNCE_MS / 1000}s). Push target: main → gh-pages.`);
console.log('[watch-and-push] Edit files and wait a few seconds to auto-commit and push.\n');
