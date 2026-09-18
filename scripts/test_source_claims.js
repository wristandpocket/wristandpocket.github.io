#!/usr/bin/env node
/** Negative regression tests for verify_source_claims.js. */

'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const guard = path.join(ROOT, 'scripts', 'verify_source_claims.js');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'wrist-pocket-source-claims-'));

function write(relative, content) {
  const file = path.join(temp, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function run() {
  const cases = [
    {
      name: 'source performance claim',
      file: 'games/cyberpunk-3d-en.md',
      content: 'answer: "It measures GPU rendering performance and reports live FPS."\n'
    },
    {
      name: 'front matter device minimum',
      file: 'games/feed-me-loser-en.md',
      content: '---\nminimum_os: "Wear OS 3+"\n---\n'
    },
    {
      name: 'product support matrix',
      file: 'games/cyberpunk-3d-en.md',
      content: 'answer: "Cyberpunk 3D supports smartwatches running Wear OS 3 or newer."\n'
    },
    {
      name: 'generated store URL',
      file: '_site/games/cyberpunk-3d/index.html',
      content: '<a href="https://play.google.com/store/apps/details?id=example">Install Cyberpunk 3D</a>\n'
    }
  ];

  for (const testCase of cases) {
    fs.rmSync(temp, { recursive: true, force: true });
    fs.mkdirSync(temp, { recursive: true });
    write(testCase.file, testCase.content);
    const result = cp.spawnSync(process.execPath, [guard, '--root', temp], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    if (result.status === 0) throw new Error(`Guard missed ${testCase.name}.\n${result.stdout}${result.stderr}`);
    console.log(`PASS: guard rejects ${testCase.name}`);
  }

  fs.rmSync(temp, { recursive: true, force: true });
  fs.mkdirSync(temp, { recursive: true });
  write('_posts/technical-note-en.md', 'This neutral article discusses GPU rendering performance, thermal behavior and frame-stutter frequency as possible experiment dimensions, not published results. A browser API can support smartwatches; that is not a product compatibility statement. Wear OS 3+ may appear in a standards discussion without describing a supported product.\n');
  const neutral = cp.spawnSync(process.execPath, [guard, '--root', temp], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  if (neutral.status !== 0) throw new Error(`Guard blocked neutral technical discussion.\n${neutral.stdout}${neutral.stderr}`);
  console.log('PASS: guard allows neutral technical discussion');
}

try {
  run();
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
