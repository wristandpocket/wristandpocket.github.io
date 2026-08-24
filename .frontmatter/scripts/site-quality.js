#!/usr/bin/env node
/**
 * Deterministic quality gates for the generated public site.
 *
 * This is intentionally dependency-free: it runs after the production build
 * on GitHub-hosted runners without downloading a browser or relying on a
 * remote service. HTML Proofer remains the link/asset gate; this script adds
 * generated-page accessibility and browser-contract checks that are stable in
 * pull requests and local verification.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(process.cwd());
const SITE = path.join(ROOT, '_site');
const LANGS = new Set(['en', 'uk', 'ru', 'ko']);
const errors = [];
const warnings = [];
const passes = [];

function relative(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function listHtml(dir) {
  if (!fs.existsSync(dir)) return [];
  const result = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) result.push(full);
    }
  }
  return result.sort();
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'is'));
  return match ? match[2].trim() : null;
}

function hasAttribute(tag, name) {
  return new RegExp(`\\b${name}\\s*=`, 'i').test(tag);
}

function visibleText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function addError(file, message) {
  errors.push(`${relative(file)}: ${message}`);
}

function addWarning(file, message) {
  warnings.push(`${relative(file)}: ${message}`);
}

function checkHtml(file, html) {
  const label = relative(file);
  const lang = (html.match(/<html\b[^>]*\blang\s*=\s*["']([^"']+)["']/i) || [])[1];
  if (!lang || !LANGS.has(lang)) addError(file, `html[lang] must be one of ${Array.from(LANGS).join(', ')}.`);

  if (!/<main\b/i.test(html)) addError(file, 'generated page is missing a <main> landmark.');
  if (!/<nav\b/i.test(html)) addWarning(file, 'generated page has no <nav> landmark.');
  if (!/<h1\b/i.test(html)) addError(file, 'generated page is missing a level-one heading.');
  if ((html.match(/<h1\b/gi) || []).length > 1) addError(file, 'generated page has more than one level-one heading.');

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!hasAttribute(match[0], 'alt')) addError(file, 'every <img> must declare alt (empty alt is valid for decoration).');
  }

  for (const match of html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)) {
    const tag = match[0];
    const name = attribute(tag, 'aria-label');
    const text = visibleText(match[1]);
    if (!name && !text && !hasAttribute(tag, 'title')) addError(file, '<button> has no accessible name.');
  }

  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const tag = `<a${match[1]}>`;
    const href = attribute(tag, 'href');
    if (href === null || href.length === 0) addError(file, '<a> has an empty or missing href.');
    if (href && /^javascript:/i.test(href)) addError(file, '<a> must not use javascript: URLs.');
    const name = attribute(tag, 'aria-label') || attribute(tag, 'title');
    const text = visibleText(match[2]);
    const imageAlt = (match[2].match(/<img\b[^>]*\balt\s*=\s*["']([^"']*)["']/i) || [])[1];
    if (!name && !text && !imageAlt) addError(file, '<a> has no accessible name.');
  }

  const formControls = html.match(/<(input|select|textarea)\b[^>]*>/gi) || [];
  for (const tag of formControls) {
    if (/\btype\s*=\s*["']hidden["']/i.test(tag)) continue;
    const id = attribute(tag, 'id');
    const aria = attribute(tag, 'aria-label') || attribute(tag, 'aria-labelledby');
    const labelFor = id && new RegExp(`<label\\b[^>]*\\bfor\\s*=\\s*["']${id.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}["']`, 'i').test(html);
    if (!aria && !labelFor) addError(file, `${tag.slice(0, 80)} has no associated label.`);
  }

  const headings = Array.from(html.matchAll(/<h([1-6])\b/gi)).map(match => Number(match[1]));
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] - headings[index - 1] > 1) {
      addError(file, `heading levels skip from h${headings[index - 1]} to h${headings[index]}.`);
      break;
    }
  }

  const canonical = html.match(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/i);
  if (!canonical || !attribute(canonical[0], 'href')) addError(file, 'generated page is missing a canonical link.');
  if (!/<meta\b[^>]*\bname\s*=\s*["']description["']/i.test(html)) addWarning(file, 'generated page has no meta description.');

  if (label.endsWith('/404.html')) warnings.push(`${label}: 404 page is excluded from canonical/accessibility strictness where applicable.`);
}

if (!fs.existsSync(SITE)) {
  console.error(`Missing generated site directory: ${SITE}`);
  process.exit(1);
}

const pages = listHtml(SITE);
if (pages.length === 0) {
  console.error(`No generated HTML pages found in ${SITE}`);
  process.exit(1);
}

for (const file of pages) checkHtml(file, fs.readFileSync(file, 'utf8'));

if (pages.length >= 4) passes.push(`Checked ${pages.length} generated HTML pages.`);
else errors.push(`Expected at least four generated HTML pages; found ${pages.length}.`);

const localePages = pages.filter(file => {
  const text = fs.readFileSync(file, 'utf8');
  return /\/(en|uk|ru|ko)\//i.test(file)
    || /-(en|uk|ru|ko)\.html$/i.test(file)
    || /<html\b[^>]*\blang\s*=\s*["'](?:en|uk|ru|ko)["']/i.test(text);
});
if (localePages.length === 0) warnings.push('No localized generated paths were detected; verify locale routing manually.');
else passes.push(`Detected ${localePages.length} localized generated page(s).`);

console.log('Wrist & Pocket generated-site quality gate');
console.log('============================================');
console.log(`PASS (${passes.length})`);
for (const item of passes) console.log(`  - ${item}`);
if (warnings.length) {
  console.log(`WARN (${warnings.length})`);
  for (const item of warnings.slice(0, 30)) console.log(`  - ${item}`);
  if (warnings.length > 30) console.log(`  - +${warnings.length - 30} more warning(s)`);
}
if (errors.length) {
  console.error(`FAIL (${errors.length})`);
  for (const item of errors.slice(0, 50)) console.error(`  - ${item}`);
  if (errors.length > 50) console.error(`  - +${errors.length - 50} more failure(s)`);
  process.exit(1);
}
console.log('Generated-site quality gate passed.');
