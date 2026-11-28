#!/usr/bin/env node
/**
 * check-i18n.mjs
 *
 * Verifies:
 * 1. 100% key parity across en, uk, ru, ko, pl in:
 *    - _data/site_copy.json
 *    - _data/<lang>/strings.yml
 *    - _data/<lang>/glossary.yml
 *    - _data/tag_labels.json
 * 2. Zero Ukrainian Cyrillic leaks (є, ї, і, ґ) in en, pl, ru, ko.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'uk', 'ru', 'ko', 'pl'];
const NON_UK_LANGS = ['en', 'pl', 'ru', 'ko'];
const UK_ONLY_RE = /[єіїґЄІЇҐ]/g;

const errors = [];

function readUtf8(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function collectObjectKeys(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    keys.push(full);
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...collectObjectKeys(v, full));
    }
  }
  return keys.sort();
}

function parseFlatYaml(relPath) {
  const text = readUtf8(relPath);
  const out = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const m = rawLine.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) {
      errors.push(`${relPath}: unparseable YAML line: ${rawLine}`);
      continue;
    }
    out[m[1]] = m[2];
  }
  return out;
}

function parseGlossaryYaml(relPath) {
  const text = readUtf8(relPath);
  const out = {};
  let current = null;
  for (const rawLine of text.split(/\r?\n/)) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const top = rawLine.match(/^([A-Za-z0-9_-]+):\s*$/);
    if (top) {
      current = top[1];
      out[current] = {};
      continue;
    }
    const sub = rawLine.match(/^\s{2}([A-Za-z0-9_]+):\s*(.+)$/);
    if (sub && current) {
      out[current][sub[1]] = sub[2];
      continue;
    }
    errors.push(`${relPath}: unparseable glossary line: ${rawLine}`);
  }
  return out;
}

function checkParity(label, mapByLang) {
  const baseLang = 'en';
  const baseKeys = new Set(collectObjectKeys(mapByLang[baseLang]));
  for (const lang of LANGS) {
    if (!mapByLang[lang]) {
      errors.push(`${label}: missing language "${lang}"`);
      continue;
    }
    const langKeys = new Set(collectObjectKeys(mapByLang[lang]));
    for (const key of baseKeys) {
      if (!langKeys.has(key)) {
        errors.push(`${label} [${lang}]: missing key "${key}" (present in ${baseLang})`);
      }
    }
    for (const key of langKeys) {
      if (!baseKeys.has(key)) {
        errors.push(`${label} [${lang}]: extra key "${key}" (not in ${baseLang})`);
      }
    }
  }
}

function checkNoUkLeaksInText(label, text) {
  const matches = text.match(UK_ONLY_RE);
  if (matches) {
    errors.push(`${label}: Ukrainian-only Cyrillic character(s) leaked: ${[...new Set(matches)].join(', ')}`);
  }
}

// 1. JSON files
const siteCopy = JSON.parse(readUtf8('_data/site_copy.json'));
checkParity('_data/site_copy.json', siteCopy);
for (const lang of NON_UK_LANGS) {
  if (siteCopy[lang]) {
    checkNoUkLeaksInText(`_data/site_copy.json [${lang}]`, JSON.stringify(siteCopy[lang]));
  }
}

const tagLabels = JSON.parse(readUtf8('_data/tag_labels.json'));
checkParity('_data/tag_labels.json', tagLabels);
for (const lang of NON_UK_LANGS) {
  if (tagLabels[lang]) {
    checkNoUkLeaksInText(`_data/tag_labels.json [${lang}]`, JSON.stringify(tagLabels[lang]));
  }
}

// 2. YAML files
const stringsByLang = {};
const glossaryByLang = {};
for (const lang of LANGS) {
  const stringsPath = `_data/${lang}/strings.yml`;
  const glossaryPath = `_data/${lang}/glossary.yml`;
  stringsByLang[lang] = parseFlatYaml(stringsPath);
  glossaryByLang[lang] = parseGlossaryYaml(glossaryPath);
  if (NON_UK_LANGS.includes(lang)) {
    checkNoUkLeaksInText(stringsPath, readUtf8(stringsPath));
    checkNoUkLeaksInText(glossaryPath, readUtf8(glossaryPath));
  }
}
checkParity('_data/*/strings.yml', stringsByLang);
checkParity('_data/*/glossary.yml', glossaryByLang);

// 3. Localized markdown pages (privacy, games, tools)
for (const lang of NON_UK_LANGS) {
  const candidates = [
    `privacy-${lang}.md`,
    ...fs.readdirSync(path.join(ROOT, 'games'))
      .filter((f) => f.endsWith(`-${lang}.md`))
      .map((f) => `games/${f}`),
    ...fs.readdirSync(path.join(ROOT, 'tools'))
      .filter((f) => f.endsWith(`-${lang}.md`))
      .map((f) => `tools/${f}`)
  ];
  for (const relPath of candidates) {
    if (fs.existsSync(path.join(ROOT, relPath))) {
      checkNoUkLeaksInText(relPath, readUtf8(relPath));
    }
  }
}

if (errors.length > 0) {
  console.error(`i18n parity check FAILED (${errors.length} error(s)):`);
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log(`i18n parity check PASSED: ${LANGS.join(', ')} (0 missing/extra keys, 0 Ukrainian Cyrillic leaks).`);
