#!/usr/bin/env node
/**
 * Keeps the shipped JavaScript bundle within the CI budget.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const budgetBytes = 20480;
const scriptPath = path.join(process.cwd(), '_site', 'assets', 'js', 'script.js');

if (!fs.existsSync(scriptPath)) {
  console.error('Missing built JS bundle: ' + scriptPath);
  process.exit(1);
}

const size = fs.statSync(scriptPath).size;
console.log('JS size: ' + size + ' bytes');

if (size > budgetBytes) {
  console.error('JS exceeds 20KB budget (' + size + ' bytes)');
  process.exit(1);
}
