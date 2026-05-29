#!/usr/bin/env node
/**
 * auto-permalink.js
 * Front Matter CMS Custom Action
 *
 * Generates a permalink from the markdown filename.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

// -- Config ---
// DEBUG LOGGING
fs.appendFileSync(
  path.join(__dirname, 'debug.log'),
  '--- RUN ' + new Date().toISOString() + ' ---\n' + process.argv.join('\n') + '\n\n'
);

var DEFAULT_LANG   = 'en';
var LANG_SUFFIXES  = ['en', 'uk', 'ru', 'ko'];
var TYPE_TO_PATH   = { post: '/blog', education: '/education' };

var rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
  console.error('No arguments provided by Front Matter CMS.');
  process.exit(1);
}

// Find the file path
// Strategy 1: Look for the JSON payload, it almost always contains the true file path
var filePath = null;
var fmContentType = null;

for (var i = 0; i < rawArgs.length; i++) {
  var arg = rawArgs[i];
  
  // Is it a JSON payload?
  if (arg.trim().startsWith('{') && arg.trim().endsWith('}')) {
    try {
      var parsed = JSON.parse(arg);
      if (parsed.path || parsed.filePath) {
        filePath = parsed.path || parsed.filePath;
      }
      
      // We can also extract the content type early from the JSON
      if (parsed.fmContentType) {
        fmContentType = parsed.fmContentType;
      }
    } catch (_) {
      // Ignore JSON parse errors
    }
  }
}

// Strategy 2: If we didn't find a JSON payload with a path, 
// look for the first argument that is a valid existing file ending in .md
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

function getFmValue(block, key) {
  var lines = block.split(/\r?\n/);
  var prefix = key + ':';
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.substring(0, prefix.length) === prefix) {
      var val = line.substring(prefix.length).trim();
      var quoteMatch = val.match(/^(["'])(.*?)\1\s*(?:#.*)?$/);
      if (quoteMatch) {
        val = quoteMatch[2];
      } else {
        var commentIdx = val.indexOf(' #');
        if (commentIdx !== -1) val = val.substring(0, commentIdx).trim();
        val = val.replace(/^["']|["']$/g, '').trim();
      }
      return val.length > 0 ? val : null;
    }
  }
  return null;
}

// -- Extract slug from filename ---
var extname  = path.extname(filePath);
var basename = path.basename(filePath, extname);

var slugRaw = basename
  .replace(/^\d{4}-\d{2}-\d{2}-/, '')
  .replace(new RegExp('-(' + LANG_SUFFIXES.join('|') + ')$'), '');

if (!slugRaw) {
  console.error('Cannot extract slug from filename: ' + basename);
  process.exit(1);
}

// -- Determine content type ---
var rawType  = fmContentType || getFmValue(fmBlock, 'fmContentType') || getFmValue(fmBlock, 'layout') || 'post';
var basePath = TYPE_TO_PATH[rawType.toLowerCase()] || '/blog';

// -- Determine language ---
var lang = getFmValue(fmBlock, 'lang') || DEFAULT_LANG;

// -- Build permalink ---
// Polyglot handles language prefixes automatically. Permalink MUST be universal.
var permalink = basePath + '/' + slugRaw + '/';

// -- Write back ---
var PERMALINK_RE = /^permalink:\s*.*$/m;

var newContent;
if (PERMALINK_RE.test(fmBlock)) {
  newContent = content.replace(PERMALINK_RE, 'permalink: "' + permalink + '"');
} else {
  newContent = content.replace(
    /^(lang:\s*.+)$/m,
    '$1\npermalink: "' + permalink + '"'
  );
}

try {
  fs.writeFileSync(filePath, newContent, 'utf-8');
} catch (e) {
  console.error('Cannot write file: ' + e.message);
  process.exit(1);
}

console.log('Permalink set: ' + permalink);
