#!/usr/bin/env node
/**
 * Rewrites <lastmod> in sitemap.xml from each page's file mtime.
 *
 * Hand-maintaining 33 dates is what let them drift ~6 weeks behind the
 * actual edits. Run this before deploy so the dates are derived, not typed.
 *
 *   node scripts/seo/sitemap-lastmod.mjs          # write
 *   node scripts/seo/sitemap-lastmod.mjs --check  # report only, exit 1 if stale
 *
 * RUN THIS LOCALLY, THEN COMMIT sitemap.xml.
 * Do not wire it into a CI/Vercel build: a fresh `git clone` sets every file's
 * mtime to the checkout time, so every page would report the same bogus
 * "modified today" date. Git does not store mtimes. If this ever needs to run
 * in CI, derive the date from `git log -1 --format=%cI -- <file>` instead.
 */

import { readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITEMAP = join(ROOT, 'sitemap.xml');
const ORIGIN = 'https://aurawebs.site/';
const checkOnly = process.argv.includes('--check');

/** Map a <loc> URL to the file on disk that serves it. */
function fileFor(loc) {
  let rel = loc.startsWith(ORIGIN) ? loc.slice(ORIGIN.length) : loc.replace(/^https?:\/\/[^/]+\//, '');
  rel = rel.split(/[?#]/)[0];
  if (rel === '' || rel.endsWith('/')) rel += 'index.html';
  return join(ROOT, rel);
}

const isoDate = (d) => new Date(d).toISOString().slice(0, 10);

let xml = readFileSync(SITEMAP, 'utf8');
const updated = [];
const missing = [];

xml = xml.replace(/<url>[\s\S]*?<\/url>/g, (entry) => {
  const loc = entry.match(/<loc>(.*?)<\/loc>/)?.[1];
  if (!loc) return entry;

  const file = fileFor(loc);
  if (!existsSync(file)) {
    missing.push(loc);
    return entry;
  }

  const mtime = isoDate(statSync(file).mtime);
  const current = entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];

  if (current === mtime) return entry;
  updated.push({ loc, from: current ?? '(none)', to: mtime });

  return current
    ? entry.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${mtime}</lastmod>`)
    : entry.replace(/(<\/loc>)/, `$1\n    <lastmod>${mtime}</lastmod>`);
});

for (const { loc, from, to } of updated) {
  console.log(`  ${from} -> ${to}  ${loc.replace(ORIGIN, '/')}`);
}
for (const loc of missing) {
  console.warn(`  ! no file on disk for ${loc}`);
}

if (checkOnly) {
  console.log(`\n${updated.length} stale, ${missing.length} missing (check mode, nothing written)`);
  process.exit(updated.length || missing.length ? 1 : 0);
}

if (updated.length) {
  writeFileSync(SITEMAP, xml);
  console.log(`\nsitemap.xml updated — ${updated.length} lastmod date(s) rewritten`);
} else {
  console.log('\nsitemap.xml already current — nothing to do');
}

if (missing.length) process.exitCode = 1;
