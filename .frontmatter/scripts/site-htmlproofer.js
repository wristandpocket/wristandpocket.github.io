#!/usr/bin/env node
/**
 * Runs the same HTML Proofer policy used by GitHub Actions.
 */

'use strict';

const cp = require('child_process');

const args = [
  '-S',
  'bundle',
  'exec',
  'htmlproofer',
  './_site',
  '--allow-hash-href',
  '--ignore-empty-alt',
  '--ignore-urls',
  '/^https:\\/\\/(wristandpocket\\.github\\.io|wristandpocket\\.dev|fonts\\.googleapis\\.com|fonts\\.gstatic\\.com|mermaid\\.ink|polyfill\\.io|icons8\\.com)/,/assets\\/images\\//'
];

const result = cp.spawnSync('ruby', args, {
  cwd: process.cwd(),
  stdio: 'inherit'
});

process.exit(result.status === null ? 1 : result.status);
