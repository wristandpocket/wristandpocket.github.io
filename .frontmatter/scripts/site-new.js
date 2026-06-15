#!/usr/bin/env node
/**
 * Creates localized content stubs for posts, pages, and game pages.
 *
 * Examples:
 *   node .frontmatter/scripts/site-new.js post --slug cyberpunk-devlog --title "Cyberpunk Devlog"
 *   node .frontmatter/scripts/site-new.js page --slug press-kit --title "Press Kit"
 *   node .frontmatter/scripts/site-new.js game --slug new-game --title "New Game" --badge "Prototype"
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const LANGS = ['en', 'uk', 'ru', 'ko'];
const DEFAULT_LANG = 'en';

function usage() {
  console.log([
    'Usage:',
    '  node .frontmatter/scripts/site-new.js post --slug <slug> --title "<title>" [--date YYYY-MM-DD] [--tag "Game"]',
    '  node .frontmatter/scripts/site-new.js page --slug <slug> --title "<title>"',
    '  node .frontmatter/scripts/site-new.js game --slug <slug> --title "<title>" [--badge "Prototype"] [--order 3]',
    '',
    'Options:',
    '  --force  Overwrite existing files.'
  ].join('\n'));
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      out._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    if (key === 'force') {
      out.force = true;
      continue;
    }
    out[key] = argv[i + 1];
    i++;
  }
  return out;
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function writeFile(relPath, content, force) {
  const fullPath = path.join(ROOT, relPath);
  if (fs.existsSync(fullPath) && !force) {
    throw new Error(relPath + ' already exists. Re-run with --force to overwrite.');
  }
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  return relPath;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function frontMatter(fields) {
  const lines = ['---'];
  for (const field of fields) {
    if (field === null) {
      lines.push('');
    } else if (Array.isArray(field)) {
      lines.push(field[0] + ':');
      for (const item of field[1]) lines.push('  - ' + yamlString(item));
    } else {
      lines.push(field[0] + ': ' + field[1]);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

function localizedTitle(baseTitle, lang) {
  return lang === DEFAULT_LANG ? baseTitle : '[TRANSLATE] ' + baseTitle;
}

function createPost(args) {
  const slug = slugify(args.slug);
  const title = args.title;
  const date = args.date || todayIsoDate();
  const tag = args.tag || 'Wrist & Pocket';
  if (!slug || !title) throw new Error('post requires --slug and --title.');

  const created = [];
  for (const lang of LANGS) {
    const relPath = path.join('_posts', `${date}-${slug}-${lang}.md`);
    const fm = frontMatter([
      ['layout', yamlString('post')],
      ['title', yamlString(localizedTitle(title, lang))],
      ['description', yamlString('TODO: Write a 120-160 character search description.')],
      ['date', yamlString(date + 'T12:00:00.000Z')],
      ['lang', lang],
      ['page_id', yamlString(slug)],
      ['permalink', yamlString('/blog/' + slug + '/')],
      ['tags', [tag]],
      ['author', 'ihor'],
      ['image', yamlString('/assets/images/default-social-card.webp')],
      ['image_alt', yamlString('TODO: Describe the social preview image.')],
      ['focus_keyword', yamlString('TODO')],
      ['seo_type', yamlString('BlogPosting')],
      ['sitemap', 'true'],
      ['toc', 'true'],
      ['published', 'true'],
      ['fmContentType', yamlString('Post')]
    ]);
    const body = '\n\n## TODO\n\nWrite the English source copy first, then translate this version.\n';
    created.push(writeFile(relPath, fm + body, args.force));
  }
  return created;
}

function createPage(args) {
  const slug = slugify(args.slug);
  const title = args.title;
  if (!slug || !title) throw new Error('page requires --slug and --title.');

  const created = [];
  for (const lang of LANGS) {
    const relPath = `${slug}-${lang}.md`;
    const fm = frontMatter([
      ['layout', yamlString('default')],
      ['title', yamlString(localizedTitle(title, lang))],
      ['description', yamlString('TODO: Write a 120-160 character search description.')],
      ['lang', lang],
      ['page_id', yamlString('page-' + slug)],
      ['permalink', yamlString('/' + slug + '/')],
      ['image', yamlString('/assets/images/default-social-card.webp')],
      ['sitemap', 'true'],
      ['fmContentType', yamlString('Page')]
    ]);
    const body = '\n\n<div class="page-content fade-in">\n  <h1>' + localizedTitle(title, lang) + '</h1>\n  <p>TODO: Write page content.</p>\n</div>\n';
    created.push(writeFile(relPath, fm + body, args.force));
  }
  return created;
}

function createGame(args) {
  const slug = slugify(args.slug);
  const title = args.title;
  const badge = args.badge || 'Prototype';
  const order = args.order || '99';
  if (!slug || !title) throw new Error('game requires --slug and --title.');

  const created = [];
  for (const lang of LANGS) {
    const relPath = path.join('games', `${slug}-${lang}.md`);
    const fm = [
      '---',
      'layout: game',
      'title: ' + yamlString(localizedTitle(title, lang)),
      'badge: ' + yamlString(badge),
      'banner: "/assets/images/default-social-card.webp"',
      'image: "/assets/images/default-social-card.webp"',
      'thumbnail: "/assets/images/default-social-card.webp"',
      'game_icon: "/assets/images/icons/beta.png"',
      'description: "TODO: Write a concise game description for search and listings."',
      'order: ' + order,
      'tester_cta: false',
      'page_id: "game-' + slug + '"',
      'permalink: "/games/' + slug + '/"',
      'lang: ' + lang,
      'specs:',
      '  platform: "Wear OS 3+"',
      '  engine: "Unity"',
      '  performance: "TODO"',
      '  rotary: "TODO"',
      '  status: "Prototype"',
      'screenshots:',
      '  - type: image',
      '    thumb: "/assets/images/default-social-card.webp"',
      '    full: "/assets/images/default-social-card.webp"',
      'fmContentType: "Game"',
      '---'
    ].join('\n');
    const body = '\n\n### TODO\n\nWrite the game pitch and feature sections.\n';
    created.push(writeFile(relPath, fm + body, args.force));
  }
  return created;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const type = args._[0];
  if (!type || type === 'help' || type === '--help') {
    usage();
    return;
  }

  let created;
  if (type === 'post') created = createPost(args);
  else if (type === 'page') created = createPage(args);
  else if (type === 'game') created = createGame(args);
  else throw new Error('Unknown content type: ' + type);

  console.log('Created ' + created.length + ' file(s):');
  for (const file of created) console.log('  - ' + file.replace(/\\/g, '/'));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  console.error('');
  usage();
  process.exit(1);
}
