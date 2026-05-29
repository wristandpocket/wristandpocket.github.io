#!/usr/bin/env node
/**
 * check-images.js
 * Frontmatter CMS Custom Action (type: mediaFolder)
 *
 * Scans the /assets/images/ folder and reports all
 * non-WebP images that should be converted.
 *
 * FM passes: node check-images.js <folderPath>
 */

const fs = require('fs');
const path = require('path');

const folderPath = process.argv[2] || path.join(__dirname, '../../assets/images');

if (!fs.existsSync(folderPath)) {
    console.error(`Folder not found: ${folderPath}`);
    process.exit(1);
}

const ALLOWED_EXT = new Set(['.webp', '.svg']);
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.avif']);

function scanDir(dir) {
    const results = { bad: [], good: 0 };
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const sub = scanDir(fullPath);
            results.bad.push(...sub.bad);
            results.good += sub.good;
        } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (IMAGE_EXTS.has(ext)) {
                results.bad.push(path.relative(folderPath, fullPath));
            } else if (ALLOWED_EXT.has(ext)) {
                results.good++;
            }
        }
    }
    return results;
}

const { bad, good } = scanDir(folderPath);

if (bad.length === 0) {
    console.log(`✅ All ${good} image(s) are already WebP or SVG. Perfect!`);
} else {
    console.log(`⚠️ Found ${bad.length} non-WebP image(s) that should be converted:\n`);
    bad.forEach(f => console.log(`  • ${f}`));
    console.log(`\n✅ WebP/SVG count: ${good}`);
    console.log('\nHint: Use Squoosh, cwebp, or jekyll-webp to convert.');
}
