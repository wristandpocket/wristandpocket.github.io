#!/usr/bin/env node
/**
 * Narrow regression guard for owner-provided product claims.
 *
 * This intentionally scans both renderable sources (including front matter)
 * and the generated site. It does not ban neutral technical discussion: a
 * claim is reported only when a product is presented as measuring/reporting
 * a performance result, promising a concrete device minimum/support matrix,
 * or linking to a store/test listing.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const rootIndex = args.indexOf('--root');
const ROOT = path.resolve(rootIndex >= 0 && args[rootIndex + 1] ? args[rootIndex + 1] : process.cwd());
const failures = [];
const PRODUCT_NAME = '(?:cyberpunk\\s*3d|feed\\s*me[, ]+loser)';

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile()) files.push(full);
    }
  }
  return files.sort();
}

function relative(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function sourceFiles() {
  const files = [];
  for (const directory of ['games', '_posts', '_includes', '_layouts', '_data']) {
    files.push(...walk(path.join(ROOT, directory)));
  }
  for (const entry of fs.existsSync(ROOT) ? fs.readdirSync(ROOT, { withFileTypes: true }) : []) {
    if (entry.isFile() && /\.(?:md|html)$/i.test(entry.name)) {
      files.push(path.join(ROOT, entry.name));
    }
  }
  return [...new Set(files)].filter(file => /\.(?:md|html|json|ya?ml)$/i.test(file));
}

function generatedFiles() {
  return walk(path.join(ROOT, '_site')).filter(file => file.endsWith('.html'));
}

const rules = [
  {
    label: 'asserted performance measurement/result',
    patterns: [
      /\b(?:it|this app|the app|the application|cyberpunk 3d)\s+(?:measures?|reports?|records?|tracks?|shows?)\b[^.!?\n]{0,220}\b(?:gpu|fps|frame|thermal|stutter)\b/i,
      /\b(?:measures?|reports?|records?|tracks?)\b[^.!?\n]{0,120}\b(?:gpu rendering performance|sustained fps|thermal (?:data|throttling)|live fps|frame(?:[- ]stutter| timing))\b/i,
      /\b(?:real performance power|real performance of your smartwatch|actual performance of your smartwatch)\b/i,
      /\b(?:він|застосунок|програма|кіберпанк 3d|он|приложение|киберпанк 3d)\s+(?:вимірює|показує|відстежує|измеряет|показывает|отслеживает)\b[^.!?\n]{0,220}\b(?:gpu|fps|терм|троттл|заїкан|заик|кадр)\b/i,
      /\b(?:вимірює|измеряет|показывает)\b[^.!?\n]{0,120}\b(?:продуктивність gpu|производительность gpu|стабільний fps|устойчивый fps)\b/i,
      /(?:측정합니다|보고합니다|측정해요|보고해요)[^.!?\n]{0,180}(?:GPU|FPS|온도|서멀|프레임|끊김)/i,
      /\b(?:\d+\s*fps|fps)\b[^.!?\n]{0,80}\b(?:achieved|measured|stable|sustained|average|recorded|вимір|стабіль|середн|измер|стабиль|средн|측정|안정)\b/i
    ]
  },
  {
    label: 'unconfirmed device minimum or support matrix',
    patterns: [
      new RegExp(`\\b${PRODUCT_NAME}\\b[^.!?\\n]{0,160}\\bwear\\s*os\\s*(?:\\d+(?:\\.\\d+)?)(?:\\+|\\s+(?:or|and)\\s+(?:newer|later))`, 'i'),
      new RegExp(`\\b${PRODUCT_NAME}\\b[^.!?\\n]{0,160}\\bwear\\s*os\\s*(?:\\d+(?:\\.\\d+)?)(?:\\s*(?:або|или)\\s+(?:новіш|нов))\\w*`, 'i'),
      new RegExp(`\\b${PRODUCT_NAME}\\b[^.!?\\n]{0,160}wear\\s*os\\s*(?:\\d+(?:\\.\\d+)?).*?(?:이상|또는\\s+그\\s+이상)`, 'i'),
      /^\s*(?:minimum_os|supported_os|supported_models|compatibility_matrix)\s*:\s*\S+/i,
      new RegExp(`\\b${PRODUCT_NAME}\\b[^<.!?\\n]{0,140}\\b(?:supports?|compatible with|works with|runs on|designed for)\\b[^<.!?\\n]{0,100}\\b(?:smartwatch|smartwatches|watch|wear\\s*os|galaxy watch|pixel watch)\\b`, 'i'),
      new RegExp(`\\b(?:smartwatch|smartwatches|watch|wear\\s*os|galaxy watch|pixel watch)\\b[^<.!?\\n]{0,100}\\b(?:supports?|compatible with|works with|runs on|designed for)\\b[^<.!?\\n]{0,140}\\b${PRODUCT_NAME}\\b`, 'i'),
      new RegExp(`\\b${PRODUCT_NAME}\\b[^<.!?\\n]{0,140}\\b(?:підтримує|сумісн\\w*|створюється для|розроблен\\w* для)\\b[^<.!?\\n]{0,100}\\b(?:годинник|годинників|wear\\s*os)\\b`, 'i'),
      new RegExp(`\\b${PRODUCT_NAME}\\b[^<.!?\\n]{0,140}\\b(?:поддерж\\w*|совместим\\w*|созда\\w*ся для)\\b[^<.!?\\n]{0,100}\\b(?:часов|часы|wear\\s*os)\\b`, 'i'),
      new RegExp(`\\b${PRODUCT_NAME}\\b[^<.!?\\n]{0,140}(?:смарт-?워치|스마트워치|시계)[^<.!?\\n]{0,100}(?:지원|호환|실행)`, 'i'),
      new RegExp(`(?:스마트워치|시계)[^<.!?\\n]{0,100}(?:지원|호환)[^<.!?\\n]{0,140}\\b${PRODUCT_NAME}\\b`, 'i')
    ]
  },
  {
    label: 'unverified store/test listing',
    patterns: [
      /^\s*(?:play_store_url|store_url|download_url|test_url)\s*:\s*\S+/im,
      /https?:\/\/(?:play\.google\.com|apps\.apple\.com)\//i,
      /\b(?:cyberpunk 3d|feed me[, ]+loser)\b[^.!?\n]{0,140}\b(?:available|downloadable|released|published|listed|coming soon)\b[^.!?\n]{0,140}\b(?:play store|google play|app store|store listing)\b/i,
      /\b(?:play store|google play|app store|store listing)\b[^.!?\n]{0,140}\b(?:cyberpunk 3d|feed me[, ]+loser)\b[^.!?\n]{0,140}\b(?:available|downloadable|released|published|listed|coming soon)\b/i
    ]
  }
];

function inspect(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const rule of rules) {
      if (rule.label === 'unconfirmed device minimum or support matrix' && line.includes('?')) continue;
      const pattern = rule.patterns.find(candidate => candidate.test(line));
      if (pattern) {
        failures.push(`${relative(file)}:${index + 1}: ${rule.label}`);
        break;
      }
    }
  });
}

const files = [...sourceFiles(), ...generatedFiles()];
files.forEach(inspect);

console.log('Wrist & Pocket source-claim regression guard');
console.log('==============================================');
console.log(`Scanned ${sourceFiles().length} source file(s) and ${generatedFiles().length} generated HTML file(s).`);
if (failures.length) {
  console.error(`FAIL (${failures.length})`);
  for (const failure of failures.slice(0, 80)) console.error(`  - ${failure}`);
  if (failures.length > 80) console.error(`  - +${failures.length - 80} more failure(s)`);
  process.exit(1);
}
console.log('PASS: no unconfirmed product performance, device, or store claims found.');
