#!/usr/bin/env node
/**
 * check-seo.js
 * Front Matter CMS Custom Action
 *
 * Comprehensive SEO validation for Figarist posts.
 * Checks: title, description, keywords, images, permalink, lang,
 * page_id, heading structure, body keyword usage, and more.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

var rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
  console.error('No arguments provided by Front Matter CMS.');
  process.exit(1);
}

var filePath = null;
for (var i = 0; i < rawArgs.length; i++) {
  var arg = rawArgs[i];
  if (arg.trim().startsWith('{') && arg.trim().endsWith('}')) {
    try {
      var parsed = JSON.parse(arg);
      if (parsed.path || parsed.filePath) {
        filePath = parsed.path || parsed.filePath;
      }
    } catch (_) {}
  }
}

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
var body = content.slice(fmMatch[0].length);

function getFmValue(block, key) {
  var lines = block.split(/\r?\n/);
  var prefix = key + ':';
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.substring(0, prefix.length) === prefix) {
      var val = line.substring(prefix.length).trim();
      val = val.replace(/^["']|["']$/g, '').trim();
      if (val === 'null' || val === '') return null;
      return val;
    }
  }
  return null;
}

var title          = getFmValue(fmBlock, 'title') || '';
var description    = getFmValue(fmBlock, 'description') || '';
var focus_keyword  = getFmValue(fmBlock, 'focus_keyword') || '';
var image          = getFmValue(fmBlock, 'image') || '';
var image_alt      = getFmValue(fmBlock, 'image_alt') || '';
var permalink      = getFmValue(fmBlock, 'permalink') || '';
var lang           = getFmValue(fmBlock, 'lang') || '';
var page_id        = getFmValue(fmBlock, 'page_id') || '';
var author         = getFmValue(fmBlock, 'author') || '';
var seo_title      = getFmValue(fmBlock, 'seo_title') || '';

var warnings = [];
var successes = [];
var tips = [];

// ────── TITLE ──────
if (!title) {
  warnings.push('❌ Title is missing.');
} else {
  var effectiveTitle = seo_title || title;
  if (effectiveTitle.length > 60) {
    warnings.push('Title is too long (' + effectiveTitle.length + '/60 chars).' + (seo_title ? ' (Using seo_title)' : ' Consider setting seo_title.'));
  } else if (effectiveTitle.length < 20) {
    warnings.push('Title is very short (' + effectiveTitle.length + '/60 chars). Aim for 30-60.');
  } else {
    successes.push('Title length OK (' + effectiveTitle.length + '/60).');
  }
}

// ────── DESCRIPTION ──────
if (!description) {
  warnings.push('❌ Description is missing.');
} else if (description.length < 120) {
  warnings.push('Description too short (' + description.length + '/160 chars). Aim for 120-160.');
} else if (description.length > 160) {
  warnings.push('Description too long (' + description.length + '/160 chars).');
} else {
  successes.push('Description length OK (' + description.length + '/160).');
}

// ────── FOCUS KEYWORD ──────
if (focus_keyword) {
  var kwLower = focus_keyword.toLowerCase();
  
  if (title.toLowerCase().indexOf(kwLower) === -1) {
    warnings.push('Keyword "' + focus_keyword + '" not found in title.');
  } else {
    successes.push('Keyword found in title.');
  }
  
  if (description.toLowerCase().indexOf(kwLower) === -1) {
    warnings.push('Keyword "' + focus_keyword + '" not found in description.');
  } else {
    successes.push('Keyword found in description.');
  }

  // Body keyword density
  var bodyLower = body.toLowerCase();
  var kwCount = 0;
  var searchIdx = 0;
  while ((searchIdx = bodyLower.indexOf(kwLower, searchIdx)) !== -1) {
    kwCount++;
    searchIdx += kwLower.length;
  }
  var wordCount = body.split(/\s+/).filter(function(w) { return w.length > 0; }).length;
  
  if (kwCount === 0) {
    warnings.push('Keyword "' + focus_keyword + '" not used in article body.');
  } else if (wordCount > 0) {
    var density = ((kwCount / wordCount) * 100).toFixed(1);
    if (density > 3) {
      tips.push('Keyword density is high (' + density + '%). Avoid keyword stuffing.');
    } else {
      successes.push('Keyword used ' + kwCount + 'x in body (' + density + '% density).');
    }
  }
} else {
  warnings.push('No focus_keyword defined.');
}

// ────── IMAGE ──────
if (!image) {
  warnings.push('Cover image is missing.');
} else {
  if (!image.endsWith('.webp')) {
    warnings.push('Cover image is not .webp format: ' + path.basename(image));
  } else {
    successes.push('Cover image is WebP.');
  }
}

if (image && !image_alt) {
  warnings.push('Cover image alt text is missing (A11Y issue).');
} else if (image_alt) {
  successes.push('Cover image has alt text.');
}

// ────── PERMALINK ──────
if (!permalink) {
  warnings.push('Permalink is not set. Use 🔗 Auto Permalink button.');
} else {
  if (!permalink.startsWith('/')) {
    warnings.push('Permalink should start with /');
  }
  if (!permalink.endsWith('/')) {
    warnings.push('Permalink should end with / (trailing slash).');
  }
  if (/[A-Z]/.test(permalink)) {
    warnings.push('Permalink contains uppercase letters — use lowercase only.');
  }
  if (/[^a-z0-9\-\/]/.test(permalink)) {
    tips.push('Permalink contains special chars. Prefer only a-z, 0-9, hyphens.');
  }
  if (permalink.match(/^\/[a-z]{2}\/(blog|education)\/[\w-]+\/$/)) {
    successes.push('Permalink format looks correct.');
  } else if (permalink.match(/^\/(blog|education)\/[\w-]+\/$/)) {
    successes.push('Permalink format (default lang) looks correct.');
  }
}

// ────── LANG ──────
if (!lang) {
  warnings.push('Language (lang) is not set.');
} else if (!['en', 'uk', 'ru', 'ko'].includes(lang)) {
  warnings.push('Unknown language: "' + lang + '". Expected: en, uk, ru, ko.');
} else {
  successes.push('Language: ' + lang);
}

// ────── PAGE_ID ──────
if (!page_id) {
  warnings.push('page_id is missing. Use 🔄 Sync All Languages to auto-generate.');
} else {
  successes.push('page_id: ' + page_id);
}

// ────── AUTHOR ──────
if (!author) {
  warnings.push('Author is not set.');
} else {
  successes.push('Author: ' + author);
}

// ────── HEADING STRUCTURE ──────
var h1Count = (body.match(/^#\s+/gm) || []).length;
if (h1Count > 0) {
  warnings.push('Found ' + h1Count + ' x H1 (# ) in body. Use ## (H2) for sections — H1 is the title.');
}

var hasH2 = /^##\s+/m.test(body);
if (body.trim().length > 500 && !hasH2) {
  tips.push('Long article with no H2 headings. Consider adding section structure.');
}

// ────── INTERNAL LINKS ──────
var internalLinks = body.match(/\]\(\//g) || [];
if (internalLinks.length === 0 && body.trim().length > 300) {
  tips.push('No internal links found. Consider adding cross-references to related posts.');
}

// ────── OUTPUT ──────
var score = Math.round((successes.length / (successes.length + warnings.length)) * 100) || 0;
var output = '';

output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
output += '  SEO SCORE: ' + score + '/100\n';
output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

if (warnings.length > 0) {
  output += '⚠️ WARNINGS (' + warnings.length + '):\n';
  warnings.forEach(function(w) { output += '  • ' + w + '\n'; });
  output += '\n';
}

if (tips.length > 0) {
  output += '💡 TIPS:\n';
  tips.forEach(function(t) { output += '  • ' + t + '\n'; });
  output += '\n';
}

if (successes.length > 0) {
  output += '✅ PASSED (' + successes.length + '):\n';
  successes.forEach(function(s) { output += '  • ' + s + '\n'; });
}

console.log(output);
