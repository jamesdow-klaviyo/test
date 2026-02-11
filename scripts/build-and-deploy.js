#!/usr/bin/env node
/**
 * Build locally (with correct GitHub Pages base path) and push dist to the
 * gh-pages branch. Use when you want to deploy from your machine instead of
 * GitHub Actions.
 *
 * Requires: GitHub Pages set to "Deploy from a branch" → gh-pages branch.
 * Run: npm run deploy
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts });
}

// Repo name from origin URL (e.g. "test" for .../jamesdow-klaviyo/test.git)
const origin = execSync('git config --get remote.origin.url', { encoding: 'utf-8', cwd: ROOT }).trim();
const match = origin.match(/([^/]+?)(\.git)?$/);
const repoName = match ? match[1] : 'ibm-homepage';
const basePath = `/${repoName}/`;

console.log(`[deploy] Building with base: ${basePath}`);
run(`npm run build`, { env: { ...process.env, BASE_PATH: basePath } });

console.log('[deploy] Pushing dist to gh-pages branch...');
run(`npx gh-pages -d dist`);
console.log('[deploy] Done. Site will update at your GitHub Pages URL shortly.');
console.log(`[deploy] If you use ...github.io/${repoName}/, check: https://<user>.github.io/${repoName}/`);