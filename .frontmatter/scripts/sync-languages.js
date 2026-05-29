#!/usr/bin/env node
/**
 * sync-languages.js
 * Front Matter CMS Custom Action
 *
 * Synchronizes translations for the current file:
 * 1. Ensures consistent page_id across all versions.
 * 2. Synchronizes permalinks (with language prefixes).
 * 3. Creates missing translation stubs.
 */

'use strict';

var fs   = require('fs');
var path = require('path');
var crypto = require('crypto');

// -- Config ---
var DEFAULT_LANG     = 'en';
var LANGS            = ['en', 'uk', 'ru', 'ko'];
var TYPE_TO_PATH     = { post: '/blog', education: '/education' };

// -- Utils ---
function getFmValue(block, key) {
  var lines = block.split(/\r?\n/);
  var prefix = key + ':';
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var trimmed = line.trim();
    if (trimmed.substring(0, prefix.length) === prefix) {
      var val = trimmed.substring(prefix.length).trim();
      val = val.replace(/^["']|["']$/g, '').trim();
      return val.length > 0 ? val : null;
    }
  }
  return null;
}

function setFmValue(content, key, value) {
  var re = new RegExp('^' + key + ':\\s*.*$', 'm');
  if (re.test(content)) {
    return content.replace(re, key + ': "' + value + '"');
  } else {
    // Insert after the first line (---)
    return content.replace(/^---(\r?\n)/, '---$1' + key + ': "' + value + '"$1');
  }
}

// -- Input Parsing ---
var rawArgs = process.argv.slice(2);
var filePath = null;

for (var i = 0; i < rawArgs.length; i++) {
  var arg = rawArgs[i];
  if (arg.trim().startsWith('{')) {
    try {
      var parsed = JSON.parse(arg);
      filePath = parsed.path || parsed.filePath;
    } catch (_) {}
  }
}

if (!filePath) {
  filePath = rawArgs[rawArgs.length - 1];
}

if (!filePath || !fs.existsSync(filePath)) {
  process.exit(1);
}

filePath = path.resolve(filePath);
var dir = path.dirname(filePath);
var ext = path.extname(filePath);
var basename = path.basename(filePath, ext);

// Extract date and slug
var dateMatch = basename.match(/^\d{4}-\d{2}-\d{2}-/);
var datePrefix = dateMatch ? dateMatch[0] : '';
var slug = basename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-(en|uk|ru|ko)$/, '');

// -- Process Files ---
var sourceContent = fs.readFileSync(filePath, 'utf-8');
var fmMatch = sourceContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) process.exit(1);

var fmBlock = fmMatch[1];
var layout = getFmValue(fmBlock, 'layout') || 'post';
var basePath = TYPE_TO_PATH[layout.toLowerCase()] || '/blog';
var pageId = getFmValue(fmBlock, 'page_id') || crypto.randomBytes(4).toString('hex');

// Update source file with page_id if missing
if (!getFmValue(fmBlock, 'page_id')) {
  var updatedSource = setFmValue(sourceContent, 'page_id', pageId);
  fs.writeFileSync(filePath, updatedSource, 'utf-8');
}

LANGS.forEach(function(lang) {
  var targetName = datePrefix + slug + '-' + lang + ext;
  if (lang === DEFAULT_LANG && datePrefix === '' && !basename.endsWith('-en') && !basename.endsWith('-uk') && !basename.endsWith('-ru') && !basename.endsWith('-ko')) {
      // Handle the case where the default lang might not have a suffix (if any)
      // But based on project rules, we prefer suffixes for clarity or follow Polyglot patterns.
  }
  
  var targetPath = path.join(dir, targetName);
  var permalink = (lang === DEFAULT_LANG) ? (basePath + '/' + slug + '/') : ('/' + lang + basePath + '/' + slug + '/');

  if (fs.existsSync(targetPath)) {
    // Update existing file
    var targetContent = fs.readFileSync(targetPath, 'utf-8');
    var updated = setFmValue(targetContent, 'page_id', pageId);
    updated = setFmValue(updated, 'permalink', permalink);
    updated = setFmValue(updated, 'lang', lang);
    fs.writeFileSync(targetPath, updated, 'utf-8');
  } else {
    // Create stub
    var stubFm = fmBlock;
    stubFm = "layout: " + layout + "\ntitle: \"[TRANSLATE] " + (getFmValue(fmBlock, 'title') || 'Untitled') + "\"\nlang: " + lang + "\npage_id: " + pageId + "\npermalink: \"" + permalink + "\"\n" + (getFmValue(fmBlock, 'image') ? ("image: " + getFmValue(fmBlock, 'image') + "\n") : "");
    var stubContent = "---\n" + stubFm + "---\n\n# TODO: Translate content\n";
    fs.writeFileSync(targetPath, stubContent, 'utf-8');
  }
});

console.log('Successfully synchronized translations and Page ID: ' + pageId);
