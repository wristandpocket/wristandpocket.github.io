#!/usr/bin/env node
/**
 * site-preflight.js
 *
 * Local and CI-friendly guardrail for the Wrist & Pocket Studio site.
 * It catches common SEO, localization, URL, and asset mistakes before deploy.
 *
 * Usage:
 *   node .frontmatter/scripts/site-preflight.js
 *   node .frontmatter/scripts/site-preflight.js --allow-url-change
 */

'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const LANGS = ['en', 'uk', 'ru', 'ko'];
const args = new Set(process.argv.slice(2));
const allowUrlChange = args.has('--allow-url-change');

const errors = [];
const warnings = [];
const passes = [];

function rel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath.replace(/^\//, '')));
}

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function listFiles(dirRel, predicate) {
  const dir = path.join(ROOT, dirRel);
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (!predicate || predicate(full)) {
        out.push(rel(full));
      }
    }
  }
  return out.sort();
}

function frontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const block = match[1];
  const values = {};
  const lines = block.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    value = value.replace(/^["']|["']$/g, '').trim();
    if (value === '') value = null;
    values[m[1]] = value;
  }
  values.__block = block;
  return values;
}

function grepValues(block, keys) {
  const values = [];
  for (const key of keys) {
    const re = new RegExp("^\\s*" + key + ":\\s*[\"']?([^\"'\\r\\n]+)", 'gm');
    let match;
    while ((match = re.exec(block)) !== null) {
      values.push(match[1].trim());
    }
  }
  return values;
}

function gitShowHead(relPath) {
  try {
    return cp.execFileSync('git', ['show', 'HEAD:' + relPath], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
  } catch (_) {
    return null;
  }
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function addPass(message) {
  passes.push(message);
}

function validateRobots() {
  const robotsPath = 'robots.txt';
  if (!exists(robotsPath)) {
    addError('robots.txt is missing.');
    return;
  }

  const robots = read(robotsPath);
  if (/Disallow:\s*\/\s*$/im.test(robots)) {
    addError('robots.txt blocks the whole site with "Disallow: /".');
  }
  if (!/Sitemap:\s*https:\/\/wristandpocket\.github\.io\/sitemap\.xml/im.test(robots)) {
    addWarning('robots.txt does not point to the production sitemap URL.');
  } else {
    addPass('robots.txt points to the production sitemap and does not block the site.');
  }
}

function validateDangerousSeoDirectives() {
  const scanFiles = []
    .concat(listFiles('_includes', f => f.endsWith('.html')))
    .concat(listFiles('_layouts', f => f.endsWith('.html')))
    .concat(listFiles('games', f => f.endsWith('.md') || f.endsWith('.html')))
    .concat(listFiles('_posts', f => f.endsWith('.md')))
    .concat(['index.html', 'sitemap.xml', 'robots.txt'])
    .filter(file => exists(file));

  const dangerous = [
    { re: /noindex/i, label: 'noindex' },
    { re: /nofollow/i, label: 'nofollow' },
    { re: /redirect_to:/i, label: 'redirect_to' },
    { re: /redirect_from:/i, label: 'redirect_from' }
  ];

  for (const file of scanFiles) {
    const text = read(file);
    for (const item of dangerous) {
      if (item.re.test(text)) {
        addError(`${file} contains ${item.label}; confirm this is intentional before deploy.`);
      }
    }
  }

  addPass('No dangerous SEO directives found in site templates/content.');
}

function validateHeadAndSitemapTemplates() {
  const head = exists('_includes/head.html') ? read('_includes/head.html') : '';
  const sitemap = exists('sitemap.xml') ? read('sitemap.xml') : '';
  const langRedirect = exists('_includes/lang-redirect.html') ? read('_includes/lang-redirect.html') : '';

  if (!head.includes('{% I18n_Headers %}')) {
    addError('_includes/head.html is missing Polyglot I18n_Headers.');
  }
  if (!head.includes('rel="canonical"') && !head.includes('{% seo %}')) {
    addError('_includes/head.html has no visible canonical source.');
  }
  if (!sitemap.includes('hreflang="x-default"')) {
    addError('sitemap.xml template is missing x-default hreflang.');
  }
  for (const lang of LANGS) {
    if (!sitemap.includes(`hreflang="{{ alt_lang }}"`) && !sitemap.includes(`hreflang="${lang}"`)) {
      addWarning(`sitemap.xml template may not emit hreflang for ${lang}.`);
    }
  }
  if (!/bot\|google\|baidu\|bing/i.test(langRedirect)) {
    addWarning('_includes/lang-redirect.html does not appear to guard search crawlers.');
  }

  addPass('Head, sitemap, and language redirect templates have baseline SEO guards.');
}

function contentFiles() {
  const files = []
    .concat(listFiles('games', f => f.endsWith('.md')))
    .concat(listFiles('_posts', f => f.endsWith('.md')))
    .concat(fs.readdirSync(ROOT).filter(f => /^privacy-.*\.md$/.test(f)))
    .sort();
  return files;
}

function validateFrontMatter() {
  const byPageId = new Map();
  const byPrivacyPermalink = new Map();

  for (const file of contentFiles()) {
    const text = read(file);
    const fm = frontMatter(text);
    if (!fm) {
      addError(`${file} is missing YAML front matter.`);
      continue;
    }

    if (!fm.lang || !LANGS.includes(fm.lang)) {
      addError(`${file} has missing or unsupported lang.`);
    }

    if (!fm.permalink) {
      addError(`${file} is missing permalink.`);
    } else {
      if (!fm.permalink.startsWith('/')) addError(`${file} permalink must start with "/".`);
      if (!fm.permalink.endsWith('/')) addError(`${file} permalink must end with "/".`);
      if (/[A-Z]/.test(fm.permalink)) addError(`${file} permalink contains uppercase characters.`);
    }

    const oldText = gitShowHead(file);
    if (!allowUrlChange && oldText) {
      const oldFm = frontMatter(oldText);
      if (oldFm && oldFm.permalink && fm.permalink && oldFm.permalink !== fm.permalink) {
        addError(`${file} permalink changed from ${oldFm.permalink} to ${fm.permalink}. Use --allow-url-change only with a redirect/indexing plan.`);
      }
    }

    if (fm.page_id) {
      if (!byPageId.has(fm.page_id)) byPageId.set(fm.page_id, []);
      byPageId.get(fm.page_id).push({ file, fm });
    } else if (file.startsWith('privacy-') && fm.permalink) {
      if (!byPrivacyPermalink.has(fm.permalink)) byPrivacyPermalink.set(fm.permalink, []);
      byPrivacyPermalink.get(fm.permalink).push({ file, fm });
    }

    if (fm.layout === 'game') {
      const assetKeys = ['banner', 'thumbnail', 'game_icon', 'image'];
      for (const key of assetKeys) {
        if (!fm[key]) {
          addError(`${file} game page is missing ${key}.`);
        } else if (!exists(fm[key])) {
          addError(`${file} references missing ${key}: ${fm[key]}`);
        }
      }

      const mediaRefs = grepValues(fm.__block, ['src', 'thumb', 'full']);
      for (const media of mediaRefs) {
        if (media.startsWith('/') && !exists(media)) {
          addError(`${file} references missing gallery asset: ${media}`);
        }
      }
    }
  }

  for (const [pageId, entries] of byPageId) {
    const langs = new Set(entries.map(entry => entry.fm.lang));
    const permalinks = new Set(entries.map(entry => entry.fm.permalink));
    for (const lang of LANGS) {
      if (!langs.has(lang)) addError(`page_id "${pageId}" is missing ${lang} translation.`);
    }
    if (permalinks.size !== 1) {
      addError(`page_id "${pageId}" has mismatched permalinks across translations.`);
    }
  }

  for (const [permalink, entries] of byPrivacyPermalink) {
    const langs = new Set(entries.map(entry => entry.fm.lang));
    for (const lang of LANGS) {
      if (!langs.has(lang)) addError(`privacy permalink "${permalink}" is missing ${lang} translation.`);
    }
  }

  addPass('Front matter, localization groups, URL stability, and game assets validated.');
}

function validateRoadmapAndDocs() {
  if (!exists('SITE_AUDIT_ROADMAP.md')) {
    addWarning('SITE_AUDIT_ROADMAP.md is missing. Keep the staged SEO plan in-repo.');
  }
  if (!exists('DEPLOYMENT_CHECKLIST.md')) {
    addWarning('DEPLOYMENT_CHECKLIST.md is missing. Add it before production-heavy release work.');
  }
}

function main() {
  validateRobots();
  validateDangerousSeoDirectives();
  validateHeadAndSitemapTemplates();
  validateFrontMatter();
  validateRoadmapAndDocs();

  console.log('Wrist & Pocket Studio site preflight');
  console.log('====================================\n');

  if (passes.length) {
    console.log('PASS');
    for (const item of passes) console.log('  - ' + item);
    console.log('');
  }

  if (warnings.length) {
    console.log('WARN');
    for (const item of warnings) console.log('  - ' + item);
    console.log('');
  }

  if (errors.length) {
    console.log('FAIL');
    for (const item of errors) console.log('  - ' + item);
    console.log('');
    process.exit(1);
  }

  console.log('Preflight passed.');
}

main();
