#!/usr/bin/env node
'use strict';

// ─── Dry-run tests for fixed getFmValue + all logic ────────────────────────

const LANG_SUFFIXES = ['en', 'uk', 'ru', 'ko'];
const langRe = new RegExp('-(' + LANG_SUFFIXES.join('|') + ')$');

// THE FIXED VERSION — same as in both scripts now
function getFmValue(block, key) {
  var re = new RegExp('^' + key + ':\\s*(.*)$', 'm');
  var m = block.match(re);
  if (!m) return null;
  var val = m[1].trim().replace(/^["']|["']$/g, '').trim();
  return val.length > 0 ? val : null;
}

var pass = 0, fail = 0;
function check(label, got, expected) {
  var ok = got === expected;
  console.log('  ' + (ok ? '✅' : '❌') + ' ' + label + ' → ' + JSON.stringify(got) +
    (ok ? '' : '  (expected: ' + JSON.stringify(expected) + ')'));
  ok ? pass++ : fail++;
}

// ═══ Test 1: Slug extraction ═══
console.log('=== SLUG EXTRACTION ===');
var slugTests = [
  ['2026-03-06-how-to-make-game',        'how-to-make-game'],
  ['2026-03-06-how-to-make-game-uk',      'how-to-make-game'],
  ['2026-03-06-how-to-make-game-en',      'how-to-make-game'],
  ['wearos-zero-gc-mindset-ko',           'wearos-zero-gc-mindset'],
  ['2026-02-27-personal-blackout-thursday-ru', 'personal-blackout-thursday'],
  ['2026-01-01-my-broken-link',           'my-broken-link'],
];
for (var i = 0; i < slugTests.length; i++) {
  var bn = slugTests[i][0], exp = slugTests[i][1];
  var slug = bn.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(langRe, '');
  check(bn, slug, exp);
}

// ═══ Test 2: getFmValue — THE CRITICAL FIX ═══
console.log('\n=== getFmValue TESTS ===');
check('lang: uk',                'getFmValue', getFmValue('lang: uk', 'lang'),               'uk');
check('lang: en',                'getFmValue', getFmValue('lang: en', 'lang'),               'en');
check('permalink: ""  (empty!)', 'getFmValue', getFmValue('permalink: ""', 'permalink'),      null);
check("permalink: ''  (empty!)", 'getFmValue', getFmValue("permalink: ''", 'permalink'),      null);
check('permalink:     (bare)',   'getFmValue', getFmValue('permalink:', 'permalink'),          null);
check('permalink:  "" (spaced)', 'getFmValue', getFmValue('permalink:  ""', 'permalink'),     null);
check('permalink: /blog/test/',  'getFmValue', getFmValue('permalink: /blog/test/', 'permalink'), '/blog/test/');
check('permalink: "/blog/t/"',   'getFmValue', getFmValue('permalink: "/blog/t/"', 'permalink'), '/blog/t/');
check('title: how to make game', 'getFmValue', getFmValue('title: how to make game', 'title'), 'how to make game');
check('title: "Two Cats"',      'getFmValue', getFmValue('title: "Two Cats"', 'title'),       'Two Cats');
check("title: 'Single'",        'getFmValue', getFmValue("title: 'Single'", 'title'),         'Single');
check('fmContentType: Post',    'getFmValue', getFmValue('fmContentType: Post', 'fmContentType'), 'Post');

// Overloaded check — redo with correct signature
pass = 0; fail = 0;

function check2(label, got, expected) {
  var ok = got === expected;
  console.log('  ' + (ok ? '✅' : '❌') + ' ' + label + ' → ' + JSON.stringify(got) +
    (ok ? '' : '  (expected: ' + JSON.stringify(expected) + ')'));
  ok ? pass++ : fail++;
}

console.log('\n=== FULL RE-TEST ===');

// Slug
var slugTests2 = [
  ['2026-03-06-how-to-make-game', 'how-to-make-game'],
  ['2026-03-06-how-to-make-game-uk', 'how-to-make-game'],
  ['wearos-zero-gc-mindset-ko', 'wearos-zero-gc-mindset'],
];
for (var j = 0; j < slugTests2.length; j++) {
  var bname = slugTests2[j][0], exps = slugTests2[j][1];
  var sl = bname.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(langRe, '');
  check2('slug: ' + bname, sl, exps);
}

// getFmValue
check2('empty ""',   getFmValue('permalink: ""', 'permalink'), null);
check2("empty ''",   getFmValue("permalink: ''", 'permalink'), null);
check2('bare empty', getFmValue('permalink:', 'permalink'), null);
check2('with value', getFmValue('permalink: /blog/x/', 'permalink'), '/blog/x/');
check2('quoted val', getFmValue('permalink: "/blog/x/"', 'permalink'), '/blog/x/');

// Permalink build
var DEFAULT_LANG = 'en';
var TYPE_TO_PATH = { post: '/blog', education: '/education' };
function makePermalink(slug, type, lang) {
  var bp = TYPE_TO_PATH[type] || '/blog';
  return lang === DEFAULT_LANG ? bp + '/' + slug + '/' : '/' + lang + bp + '/' + slug + '/';
}
check2('post/uk',  makePermalink('how-to-make-game', 'post', 'uk'), '/uk/blog/how-to-make-game/');
check2('post/en',  makePermalink('how-to-make-game', 'post', 'en'), '/blog/how-to-make-game/');
check2('post/ru',  makePermalink('how-to-make-game', 'post', 'ru'), '/ru/blog/how-to-make-game/');
check2('edu/ko',   makePermalink('wearos-zero-gc', 'education', 'ko'), '/ko/education/wearos-zero-gc/');

// PERMALINK_RE
var PERMALINK_RE = /^permalink:\s*.*$/m;
check2('RE: empty', PERMALINK_RE.test('permalink: ""'), true);
check2('RE: bare',  PERMALINK_RE.test('permalink:'), true);
check2('RE: val',   PERMALINK_RE.test('permalink: /x/'), true);

console.log('\n=== RESULTS: ' + pass + ' passed, ' + fail + ' failed ===');
process.exit(fail > 0 ? 1 : 0);
