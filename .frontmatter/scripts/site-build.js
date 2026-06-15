#!/usr/bin/env node
/**
 * Runs the production Jekyll build with the same destination used by CI.
 */

'use strict';

const cp = require('child_process');

const result = cp.spawnSync('ruby', ['-S', 'bundle', 'exec', 'jekyll', 'build', '--destination', './_site'], {
  cwd: process.cwd(),
  env: Object.assign({}, process.env, { JEKYLL_ENV: 'production' }),
  stdio: 'inherit'
});

process.exit(result.status === null ? 1 : result.status);
