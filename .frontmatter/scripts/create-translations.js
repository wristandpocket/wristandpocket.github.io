#!/usr/bin/env node
/**
 * create-translations.js
 * Front Matter CMS Custom Action
 *
 * Given the current post/education file,
 * generates stub translation files for all missing languages
 * with correctly-prefixed permalinks.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

// -- Config ---
var DEFAULT_LANG     = 'en';
var LANGS            = ['en', 'uk', 'ru', 'ko'];
var LANG_LABELS      = { en: 'English', uk: 'Ukrainian', ru: 'Russian', ko: 'Korean' };
var LANG_SUFFIXES_RE = new RegExp('-(' + LANGS.join('|') + ')$');
var TYPE_TO_PATH     = { post: '/blog', education: '/education' };
var PERMALINK_RE     = /^permalink:\s*.*$/m;

// -- Input Parsing ---
var rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
  console.error('No arguments provided by Front Matter CMS.');
  process.exit(1);
}

var filePath = null;
var fmContentType = null;

// Strategy 1: JSON Payload
for (var i = 0; i < rawArgs.length; i++) {
  var arg = rawArgs[i];
  if (arg.trim().startsWith('{') && arg.trim().endsWith('}')) {
    try {
      var parsed = JSON.parse(arg);
      if (parsed.path || parsed.filePath) {
        filePath = parsed.path || parsed.filePath;
      }
      if (parsed.fmContentType) {
        fmContentType = parsed.fmContentType;
      }
    } catch (_) {}
  }
}

// Strategy 2: Raw file path
if (!filePath) {
  for (var j = 0; j < rawArgs.length; j++) {
    var possiblePath = rawArgs[j];
    if (possiblePath.toLowerCase().endsWith('.md') && fs.existsSync(possiblePath)) {
      filePath = possiblePath;
      break;
    }
  }
}

if (!filePath || !fs.existsSync(filePath)) {
  console.error('Could not resolve a valid file path from arguments.');
  process.exit(1);
}

filePath = path.resolve(filePath);

// -- Read file ---
var content;
try {
  content = fs.readFileSync(filePath, 'utf-8');
} catch (e) {
  console.error('Cannot read file: ' + e.message);
  process.exit(1);
}

var fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error('No front matter found in file.');
  process.exit(1);
}

var fmBlock = fmMatch[1];
var body    = content.slice(fmMatch[0].length).trim();

/**
 * Extract a scalar value from a YAML front matter block.
 * Uses line-by-line search to avoid regex escaping issues.
 */
function getFmValue(block, key) {
  var lines = block.split(/\r?\n/);
  var prefix = key + ':';
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.substring(0, prefix.length) === prefix) {
      var val = line.substring(prefix.length).trim();
      val = val.replace(/^["']|["']$/g, '').trim();
      return val.length > 0 ? val : null;
    }
  }
  return null;
}

// -- Extract slug & date prefix from filename ---
var dir        = path.dirname(filePath);
var extname    = path.extname(filePath);
var basename   = path.basename(filePath, extname);
var dateMatch  = basename.match(/^\d{4}-\d{2}-\d{2}-/);
var datePrefix = dateMatch ? dateMatch[0] : '';
var slug       = basename
  .replace(/^\d{4}-\d{2}-\d{2}-/, '')
  .replace(LANG_SUFFIXES_RE, '');

if (!slug) {
  console.error('Cannot extract slug from filename: ' + basename);
  process.exit(1);
}

// -- Determine content type ---
var rawType  = fmContentType || getFmValue(fmBlock, 'fmContentType') || getFmValue(fmBlock, 'layout') || 'post';
var basePath = TYPE_TO_PATH[rawType.toLowerCase()] || '/blog';

// -- Determine source language ---
var sourceLang = getFmValue(fmBlock, 'lang') || DEFAULT_LANG;
var title      = getFmValue(fmBlock, 'title') || 'Untitled';

/** Build the correct permalink for a given language. */
function makePermalink(lang) {
  if (lang === DEFAULT_LANG) {
    return basePath + '/' + slug + '/';
  }
  return '/' + lang + basePath + '/' + slug + '/';
}

// -- Fix source file permalink if missing or empty ---
// This is done before creating translations so the source file is also valid
var sourcePermalink = getFmValue(fmBlock, 'permalink');
if (!sourcePermalink) {
  var newPermalink = makePermalink(sourceLang);
  var updatedContent;
  if (PERMALINK_RE.test(fmBlock)) {
    updatedContent = content.replace(PERMALINK_RE, 'permalink: "' + newPermalink + '"');
  } else {
    updatedContent = content.replace(
      /^(lang:\s*.+)$/m,
      '$1\npermalink: "' + newPermalink + '"'
    );
  }
  try {
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log('Source permalink set: ' + newPermalink);
  } catch (e) {
    console.error('Cannot write source file: ' + e.message);
  }
}

// -- Create translation stubs ---
var created = [];
var skipped = [];

for (var i = 0; i < LANGS.length; i++) {
  var lang = LANGS[i];
  if (lang === sourceLang) continue;

  var targetFile = path.join(dir, datePrefix + slug + '-' + lang + extname);

  if (fs.existsSync(targetFile)) {
    skipped.push(lang);
    continue;
  }

  var langPermalink = makePermalink(lang);

  // Build stub front matter: swap lang and permalink
  var stubFm = fmBlock.replace(/^lang:\s*.*$/m, 'lang: ' + lang);

  // Ensure permalink is correct for target language
  if (PERMALINK_RE.test(stubFm)) {
    stubFm = stubFm.replace(PERMALINK_RE, 'permalink: "' + langPermalink + '"');
  } else {
    stubFm = stubFm.replace(
      /^(lang:\s*.+)$/m,
      '$1\npermalink: "' + langPermalink + '"'
    );
  }

  var stubContent = '---\n' + stubFm + '\n---\n\n<!-- TODO: Translate from ' + LANG_LABELS[sourceLang] + ' -->\n\n' + body + '\n';

  try {
    fs.writeFileSync(targetFile, stubContent, 'utf-8');
    created.push(lang + ' -> ' + langPermalink);
  } catch (e) {
    console.error('Cannot write ' + lang + ' file: ' + e.message);
  }
}

// -- Report ---
if (created.length > 0) {
  console.log('Created: ' + created.join(' | '));
}
if (skipped.length > 0) {
  console.log('Already exist: ' + skipped.join(', '));
}
if (created.length === 0 && skipped.length === 0) {
  console.log('Nothing to do - all translations already exist.');
}
