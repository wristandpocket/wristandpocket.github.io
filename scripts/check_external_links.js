// Report transient/bot failures separately; never whitelist an entire host.
const fs = require('node:fs');
const inventory = JSON.parse(fs.readFileSync('qa-evidence/link-inventory.json', 'utf8'));
const urls = [...new Set(inventory.records.map(r => r.url.split('#')[0]))]
  .filter(u => /^https?:/.test(u) && new URL(u).hostname !== 'wristandpocket.dev');
(async () => {
  const results = [];
  for (let i = 0; i < urls.length; i += 4) {
    await Promise.all(urls.slice(i, i + 4).map(async url => {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'WristPocket-LinkAudit/1.0' } });
        const classification = response.ok ? 'reachable' : [404, 410].includes(response.status) ? 'missing' : 'requires-review';
        results.push({ url, finalUrl: response.url, status: response.status, classification });
        await response.body?.cancel();
      } catch (error) { results.push({ url, classification: 'requires-review', error: error.message }); }
    }));
  }
  fs.writeFileSync('qa-evidence/external-links.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  process.exitCode = results.some(r => r.classification === 'missing') ? 1 : 0;
})();
