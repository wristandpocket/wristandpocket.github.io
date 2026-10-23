#!/usr/bin/env node
/**
 * Runs the production Jekyll build with the same destination used by CI.
 */

'use strict';

const cp = require('child_process');

const rubyOpt = [process.env.RUBYOPT, '-EUTF-8:UTF-8'].filter(Boolean).join(' ');
const result = cp.spawnSync('ruby', ['-E', 'UTF-8:UTF-8', '-S', 'bundle', 'exec', 'jekyll', 'build', '--destination', './_site'], {
  cwd: process.cwd(),
  env: Object.assign({}, process.env, {
    JEKYLL_ENV: 'production',
    LANG: process.env.LANG || 'en_US.UTF-8',
    LC_ALL: process.env.LC_ALL || 'en_US.UTF-8',
    RUBYOPT: rubyOpt
  }),
  stdio: 'inherit'
});

process.exit(result.status === null ? 1 : result.status);
