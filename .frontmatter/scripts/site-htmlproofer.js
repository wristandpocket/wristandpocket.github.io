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
  '--disable-external',
  // WearView is deployed from its own repository at /wearview/, outside this Jekyll build.
  '--ignore-urls',
  '/^\\/wearview\\//'
];

const result = cp.spawnSync('ruby', args, {
  cwd: process.cwd(),
  stdio: 'inherit'
});

process.exit(result.status === null ? 1 : result.status);
