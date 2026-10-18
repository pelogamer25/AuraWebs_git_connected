#!/usr/bin/env node
/**
 * Writes the shared header and footer (partials/{header,footer}.{es,en}.html) into every page.
 *
 *   npm run partials:sync
 *
 * Edit the partials, never the copies inside pages: the copy sits between
 * <!-- site-header:start/end --> and <!-- site-footer:start/end --> markers and is overwritten
 * on every run. First run on a page without markers replaces its old <nav class="fixed …"> and
 * first <footer>. Per page it fills in: active link (aria-current), language-switch URLs (from the
 * page's hreflang alternates), and a WhatsApp link pre-filled with the page title, so every lead
 * arrives saying which page it came from. Bare wa.me links in the page body get the same text.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WA = 'https://wa.me/573217466755';

const SERVICES_ES = [
  ['/es/medellin.html', 'Diseño web en Medellín', 'Sitios profesionales que consiguen clientes'],
  ['/es/medellin/desarrollo-web-medellin.html', 'Desarrollo web', 'A medida, rápido y escalable'],
  ['/es/medellin/landing-pages-medellin.html', 'Landing pages', 'Páginas de campaña que convierten'],
  ['/es/medellin/seo-local-medellin.html', 'SEO local', 'Aparece en Google y Google Maps'],
  ['/es/medellin/redisenio-web-medellin.html', 'Rediseño web', 'Moderniza sin perder posicionamiento'],
  ['/es/medellin/mantenimiento-web-medellin.html', 'Mantenimiento web', 'Soporte, seguridad y actualizaciones'],
  ['/es/bogota.html', 'Diseño web en Bogotá', 'Proyectos para empresas en Bogotá'],
];
const SERVICES_CLUSTER = new Set([...SERVICES_ES.map(s => s[0]), '/es/servicios.html', '/es/medellin/index.html']);

const read = p => readFileSync(join(ROOT, p), 'utf8').replace(/^﻿/, '');
const partials = {
  header: { es: read('partials/header.es.html'), en: read('partials/header.en.html') },
  footer: { es: read('partials/footer.es.html'), en: read('partials/footer.en.html') },
};

function pages() {
  const out = [];
  const walk = dir => readdirSync(join(ROOT, dir)).forEach(name => {
    const rel = dir ? `${dir}/${name}` : name;
    if (statSync(join(ROOT, rel)).isDirectory()) { if (['es', 'en'].includes(rel.split('/')[0])) walk(rel); }
    else if (name.endsWith('.html')) out.push(rel);
  });
  walk('');
  return out.filter(p => !p.includes('/') ? ['index.html', '404.html'].includes(p) : true);
}

const escapeAttr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function render(tpl, ctx) {
  const cur = (target, section) => {
    if (target && target === ctx.path) return ' aria-current="page"';
    if (section && section === ctx.section) return ' data-current';
    return '';
  };
  const li = ([href, title, desc]) =>
    `<li><a href="${href}" class="nav-dd-item"${cur(href)}><span class="nav-dd-title">${title}</span><span class="nav-dd-desc">${desc}</span></a></li>`;
  return tpl
    .replace('{{services}}', SERVICES_ES.map(li).join('\n              '))
    .replace('{{services_mobile}}', SERVICES_ES.map(([h, t]) => `<li><a href="${h}"${cur(h)}>${t}</a></li>`).join('\n            '))
    .replace('{{services_footer}}', SERVICES_ES.map(([h, t]) => `<li><a href="${h}"${cur(h)}>${t}</a></li>`).join('\n          '))
    .replace(/\{\{page:([^}]+)\}\}/g, (_, p) => cur(p))
    .replace(/\{\{cur:([^}]+)\}\}/g, (_, s) => cur(s === 'blog' ? '/es/blog/index.html' : null, s))
    .replace(/\{\{open:([^}]+)\}\}/g, (_, s) => (s === ctx.section ? ' open' : ''))
    .replace(/\{\{en_url\}\}/g, ctx.enUrl)
    .replace(/\{\{es_url\}\}/g, ctx.esUrl)
    .replace(/\{\{wa\}\}/g, escapeAttr(ctx.wa));
}

/** Index range [start, end) of the element opened at `start`, honouring nesting of the same tag. */
function elementRange(html, start, tag) {
  const re = new RegExp(`<${tag}\\b|</${tag}>`, 'gi');
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0) return [start, m.index + m[0].length];
  }
  throw new Error(`unclosed <${tag}>`);
}

function replaceBlock(html, name, block, findLegacy, insertAt) {
  const startMark = `<!-- site-${name}:start (generated from partials/ by npm run partials:sync — edit the partial) -->`;
  const endMark = `<!-- site-${name}:end -->`;
  const wrapped = `${startMark}\n${block.trimEnd()}\n${endMark}`;
  const s = html.indexOf(`<!-- site-${name}:start`);
  if (s !== -1) {
    const e = html.indexOf(endMark, s);
    return html.slice(0, s) + wrapped + html.slice(e + endMark.length);
  }
  const legacy = findLegacy(html);
  if (legacy) return html.slice(0, legacy[0]) + wrapped + html.slice(legacy[1]);
  const at = insertAt(html);
  return html.slice(0, at) + '\n' + wrapped + '\n' + html.slice(at);
}

let changed = 0;
for (const rel of pages()) {
  const file = join(ROOT, rel);
  const raw = readFileSync(file, 'utf8');
  const bom = raw.startsWith('﻿');
  let html = bom ? raw.slice(1) : raw;
  const before = html;

  const path = rel === 'index.html' ? '/' : '/' + rel.split(sep).join('/');
  const lang = /<html[^>]*\blang="es/i.test(html) ? 'es' : 'en';
  const alt = Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="(en|es)[^"]*" href="https:\/\/aurawebs\.site([^"]*)"/g)].map(m => [m[1], m[2]]));
  const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] || '').split('|')[0].trim()
    .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
  const msg = lang === 'es'
    ? `Hola AuraWebs, quiero cotizar un proyecto. (Vengo de: ${title})`
    : `Hi AuraWebs, I'd like a quote. (From: ${title})`;
  const ctx = {
    path,
    section: path.startsWith('/es/blog/') ? 'blog' : SERVICES_CLUSTER.has(path) ? 'servicios' : null,
    enUrl: alt.en || (lang === 'en' ? path : '/'),
    esUrl: alt.es || (lang === 'es' ? path : '/es/index.html'),
    wa: `${WA}?text=${encodeURIComponent(msg)}`,
  };

  // Header: replaces the old fixed <nav>, or goes right after <body>.
  html = replaceBlock(html, 'header', render(partials.header[lang], ctx),
    h => { const i = h.search(/<nav class="fixed top-0[^"]*"/); return i === -1 ? null : elementRange(h, i, 'nav'); },
    h => { const m = h.match(/<body[^>]*>/); return m.index + m[0].length; });

  // Footer: the 404 page is a centred full-screen card, so it gets the header only.
  if (rel !== '404.html') {
    html = replaceBlock(html, 'footer', render(partials.footer[lang], ctx),
      h => { const i = h.search(/<footer\b/); return i === -1 ? null : elementRange(h, i, 'footer'); },
      h => h.lastIndexOf('</body>'));
  }

  // Skip-link target.
  const targetId = lang === 'es' ? 'contenido' : 'main-content';
  if (!html.includes(`id="${targetId}"`)) html = html.replace(/<main\b(?![^>]*\bid=)/, `<main id="${targetId}"`);

  // Bare WhatsApp links in the body get the same page-attributed message.
  html = html.replace(/href="https:\/\/wa\.me\/573217466755\/?"/g, `href="${escapeAttr(ctx.wa)}"`);

  if (html !== before) {
    writeFileSync(file, (bom ? '﻿' : '') + html);
    changed++;
    console.log(`updated ${rel}`);
  }
}
console.log(`${changed} page(s) updated`);
