#!/usr/bin/env node
/**
 * check-images.js
 * Front Matter CMS custom action.
 *
 * Scans assets/images and reports raster images that should be converted
 * to WebP/SVG. PNG is still allowed for PWA icons, flags, and small UI icons.
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
const ALLOWED_PNG_PATTERNS = [
    /^flags\/[^/]+\.png$/,
    /^icons\/[^/]+\.png$/,
    /^pwa\/icon-\d+\.png$/
];

function normalizePath(value) {
    return value.replace(/\\/g, '/');
}

function isAllowedPng(relativePath) {
    const normalized = normalizePath(relativePath);
    return ALLOWED_PNG_PATTERNS.some(pattern => pattern.test(normalized));
}

function scanDir(dir) {
    const results = { bad: [], good: 0, allowedPng: 0 };
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            const sub = scanDir(fullPath);
            results.bad.push(...sub.bad);
            results.good += sub.good;
            results.allowedPng += sub.allowedPng;
            continue;
        }

        const ext = path.extname(entry.name).toLowerCase();
        const relativePath = path.relative(folderPath, fullPath);

        if (IMAGE_EXTS.has(ext)) {
            if (ext === '.png' && isAllowedPng(relativePath)) {
                results.allowedPng++;
            } else {
                results.bad.push(normalizePath(relativePath));
            }
        } else if (ALLOWED_EXT.has(ext)) {
            results.good++;
        }
    }

    return results;
}

const { bad, good, allowedPng } = scanDir(folderPath);

if (bad.length === 0) {
    console.log(`OK: ${good} image(s) are WebP/SVG and ${allowedPng} PNG image(s) are approved UI/PWA exceptions.`);
} else {
    console.log(`Found ${bad.length} image(s) that should be converted to WebP/SVG:\n`);
    bad.forEach(file => console.log(`  - ${file}`));
    console.log(`\nWebP/SVG count: ${good}`);
    console.log(`Approved PNG exceptions: ${allowedPng}`);
    console.log('\nHint: Use Squoosh, cwebp, or jekyll-webp to convert.');
}
