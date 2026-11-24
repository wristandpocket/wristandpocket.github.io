#!/usr/bin/env node
// IndexNow for a Jekyll site deployed to GitHub Pages.
//
//   node scripts/indexnow.mjs plan   --site _site --origin https://example.com --prev .indexnow/manifest.json --out .indexnow
//   node scripts/indexnow.mjs submit --dir .indexnow --origin https://example.com
//
// `plan` hashes every page listed in the built sitemap and compares it with the manifest of the last
// successful submission (restored from the Actions cache). New and changed URLs go to urls.txt; the
// new manifest is written next to it. Without a previous manifest every sitemap URL is submitted once.
// Build-time cache busters (`?v=<unix time>`) and the footer year are ignored so a plain rebuild is
// not treated as a change.
//
// `submit` posts urls.txt to api.indexnow.org (shared by Bing, Yandex, Seznam, Naver, Yep) in batches
// of up to 10,000. The key is read from the `<key>.txt` file at the site root, which must be published.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_FILE = /^[a-f0-9]{32}\.txt$/;

function args(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) out[argv[i].slice(2)] = argv[++i];
    else out._.push(argv[i]);
  }
  return out;
}

function findKey(root) {
  const file = readdirSync(root).find((f) => KEY_FILE.test(f));
  if (!file) throw new Error(`No IndexNow key file (<32 hex>.txt) in ${root}`);
  const key = file.slice(0, -4);
  const body = readFileSync(join(root, file), "utf8").trim();
  if (body !== key) throw new Error(`${file} must contain exactly its own key`);
  return key;
}

function sitemapUrls(site, origin) {
  const xml = readFileSync(join(site, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1].replace(/&amp;/g, "&"))
    .filter((u) => u.startsWith(`${origin}/`));
}

function fileFor(site, url) {
  let path = decodeURI(new URL(url).pathname);
  if (path.endsWith("/")) path += "index.html";
  const candidates = [join(site, path), join(site, `${path}.html`), join(site, path, "index.html")];
  return candidates.find((p) => existsSync(p) && statSync(p).isFile()) || null;
}

function pageHash(file) {
  const html = readFileSync(file, "utf8")
    .replace(/\?v=\d{9,11}/g, "?v=")
    .replace(/&copy;\s*\d{4}/g, "&copy;");
  return createHash("sha256").update(html).digest("hex");
}

function plan(opts) {
  const { site, origin, prev, out } = opts;
  if (!site || !origin || !out) throw new Error("plan needs --site, --origin and --out");
  findKey(site);
  const previous = prev && existsSync(prev) ? JSON.parse(readFileSync(prev, "utf8")) : null;
  const urls = sitemapUrls(site, origin);
  if (!urls.length) throw new Error(`sitemap.xml in ${site} has no ${origin}/ URLs (not a production build?)`);
  const manifest = {};
  const changed = [];
  for (const url of urls) {
    const file = fileFor(site, url);
    if (!file) { console.warn(`indexnow: no built file for ${url}, skipped`); continue; }
    manifest[url] = pageHash(file);
    if (!previous || previous[url] !== manifest[url]) changed.push(url);
  }
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 1));
  writeFileSync(join(out, "urls.txt"), changed.join("\n") + (changed.length ? "\n" : ""));
  console.log(`indexnow: ${Object.keys(manifest).length} sitemap URLs, ${changed.length} to submit`
    + (previous ? "" : " (no previous manifest: first full submission)"));
}

async function submit(opts) {
  const { dir, origin, site = "." } = opts;
  if (!dir || !origin) throw new Error("submit needs --dir and --origin");
  const key = findKey(site);
  const urls = readFileSync(join(dir, "urls.txt"), "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
  if (!urls.length) { console.log("indexnow: nothing changed, no submission"); return; }
  const host = new URL(origin).host;
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000);
    const body = JSON.stringify({ host, key, keyLocation: `${origin}/${key}.txt`, urlList: batch });
    let res;
    for (let attempt = 1; attempt <= 3; attempt++) {
      res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body });
      if (res.status !== 429 && res.status < 500) break;
      await new Promise((r) => setTimeout(r, 5000 * attempt));
    }
    // 200 = accepted, 202 = accepted while the key is being validated.
    if (res.status !== 200 && res.status !== 202) {
      throw new Error(`IndexNow HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    }
    console.log(`indexnow: submitted ${batch.length} URLs (HTTP ${res.status})`);
  }
}

const opts = args(process.argv.slice(2));
const cmd = opts._[0];
try {
  if (cmd === "plan") plan(opts);
  else if (cmd === "submit") await submit(opts);
  else throw new Error("usage: indexnow.mjs plan|submit ...");
} catch (err) {
  console.error(`indexnow: ${err.message}`);
  process.exit(1);
}
