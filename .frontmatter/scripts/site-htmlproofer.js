#!/usr/bin/env node
/**
 * Runs the same HTML Proofer policy used by GitHub Actions.
 */

'use strict';

const cp = require('child_process');

const args = [
  '-E',
  'UTF-8:UTF-8',
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

const rubyOpt = [process.env.RUBYOPT, '-EUTF-8:UTF-8'].filter(Boolean).join(' ');
const result = cp.spawnSync('ruby', args, {
  cwd: process.cwd(),
  env: Object.assign({}, process.env, {
    LANG: process.env.LANG || 'en_US.UTF-8',
    LC_ALL: process.env.LC_ALL || 'en_US.UTF-8',
    RUBYOPT: rubyOpt
  }),
  stdio: 'inherit'
});

process.exit(result.status === null ? 1 : result.status);
