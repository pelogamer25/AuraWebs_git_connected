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
  ['/es/medellin', 'Diseño web en Medellín', 'Sitios profesionales que consiguen clientes'],
  ['/es/medellin/desarrollo-web-medellin', 'Desarrollo web', 'A medida, rápido y escalable'],
  ['/es/medellin/landing-pages-medellin', 'Landing pages', 'Páginas de campaña que convierten'],
  ['/es/medellin/seo-local-medellin', 'SEO local', 'Aparece en Google y Google Maps'],
  ['/es/medellin/redisenio-web-medellin', 'Rediseño web', 'Moderniza sin perder posicionamiento'],
  ['/es/medellin/mantenimiento-web-medellin', 'Mantenimiento web', 'Soporte, seguridad y actualizaciones'],
  ['/es/diseno-web-bogota', 'Diseño web en Bogotá', 'Proyectos para empresas en Bogotá'],
];
const SERVICES_CLUSTER = new Set([...SERVICES_ES.map(s => s[0]), '/es/servicios']);

// "Sigue explorando" block before </main>: three related pages so every page leads somewhere.
const CARDS = {
  med: ['/es/medellin', 'Diseño web en Medellín', 'Sitios profesionales que consiguen clientes desde Google.'],
  dev: ['/es/medellin/desarrollo-web-medellin', 'Desarrollo web', 'Sitios y aplicaciones a medida, rápidos y escalables.'],
  land: ['/es/medellin/landing-pages-medellin', 'Landing pages', 'Páginas de campaña que convierten visitas en contactos.'],
  seo: ['/es/medellin/seo-local-medellin', 'SEO local', 'Aparece en Google y Google Maps en tu ciudad.'],
  redis: ['/es/medellin/redisenio-web-medellin', 'Rediseño web', 'Moderniza tu sitio sin perder posicionamiento.'],
  mant: ['/es/medellin/mantenimiento-web-medellin', 'Mantenimiento web', 'Soporte, seguridad y actualizaciones cada mes.'],
  precios: ['/es/medellin/cuanto-cuesta-pagina-web-medellin', '¿Cuánto cuesta una página web?', 'Rangos de precio 2026 y qué debe incluir una cotización.'],
  port: ['/es/portafolio', 'Portafolio', 'Proyectos reales de diseño y desarrollo web.'],
  serv: ['/es/servicios', 'Todos los servicios', 'Diseño, desarrollo, SEO, apps y analítica en un solo lugar.'],
  faq: ['/es/faq', 'Preguntas frecuentes', 'Tiempos, proceso, pagos y soporte, respondidos.'],
  blog: ['/es/blog/', 'Blog', 'Guías prácticas sobre diseño web y SEO local.'],
  en_web: ['/en/web-design', 'Web design', 'Websites built to rank on Google and convert visitors.'],
  en_serv: ['/en/services', 'Services & pricing', 'What we build and what it costs.'],
  en_work: ['/en/showcase', 'Our work', 'Selected design and development projects.'],
  en_faq: ['/en/faq', 'FAQ', 'Timelines, process, payments and support.'],
  en_contact: ['/en/contact', 'Contact', 'Tell us about your project. We reply within 24 hours.'],
};
const NEXT = {
  '/es/medellin': ['port', 'precios', 'serv'],
  '/es/medellin/desarrollo-web-medellin': ['land', 'redis', 'precios'],
  '/es/medellin/landing-pages-medellin': ['seo', 'dev', 'precios'],
  '/es/medellin/seo-local-medellin': ['med', 'land', 'precios'],
  '/es/medellin/redisenio-web-medellin': ['seo', 'mant', 'precios'],
  '/es/medellin/mantenimiento-web-medellin': ['redis', 'seo', 'precios'],
  '/es/medellin/cuanto-cuesta-pagina-web-medellin': ['med', 'land', 'port'],
  '/es/diseno-web-bogota': ['port', 'precios', 'serv'],
  '/es/servicios': ['port', 'faq', 'blog'],
  '/es/portafolio': ['serv', 'precios', 'med'],
  '/es/faq': ['precios', 'serv', 'port'],
  '/es/blog/': ['med', 'serv', 'port'],
  '/es/blog/agencias-diseno-web-medellin': ['med', 'precios', 'port'],
  '/es/blog/desarrollo-web-medellin': ['dev', 'precios', 'port'],
  '/es/blog/diseno-web-pymes-medellin': ['med', 'land', 'precios'],
  '/es/blog/paginas-web-medellin': ['med', 'precios', 'port'],
  '/es/blog/redisenio-web-medellin': ['redis', 'precios', 'port'],
  '/es/blog/seo-local-medellin': ['seo', 'med', 'precios'],
  '/es/blog/tienda-online-medellin': ['dev', 'precios', 'port'],
  '/en/services': ['en_web', 'en_work', 'en_faq'],
  '/en/web-design': ['en_serv', 'en_work', 'en_faq'],
  '/en/showcase': ['en_serv', 'en_web', 'en_contact'],
  '/en/faq': ['en_serv', 'en_work', 'en_contact'],
};

function renderNext(path, lang) {
  const keys = NEXT[path];
  if (!keys) return null;
  const items = keys.map(k => CARDS[k]).map(([href, title, desc]) =>
    `      <li><a href="${href}" class="hub-card"><span class="hub-card-title">${title}</span><span class="hub-card-desc">${desc}</span><span class="hub-card-link" aria-hidden="true">${lang === 'es' ? 'Ver más' : 'Learn more'} →</span></a></li>`);
  const heading = lang === 'es' ? 'Sigue explorando' : 'Keep exploring';
  return `<section class="next-step container mx-auto px-6 py-20" aria-labelledby="next-step-title">
  <h2 id="next-step-title" class="next-step-title">${heading}</h2>
  <ul class="mt-6 grid gap-4 md:grid-cols-3">
${items.join('\n')}
  </ul>
</section>`;
}

/** Visible breadcrumb rendered from the page's own BreadcrumbList schema, so the two never disagree. */
function renderBreadcrumb(html, lang) {
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch { continue; }
    const stack = [data];
    while (stack.length) {
      const x = stack.pop();
      if (Array.isArray(x)) { stack.push(...x); continue; }
      if (!x || typeof x !== 'object') continue;
      if (x['@type'] === 'BreadcrumbList') {
        const items = [];
        for (const it of x.itemListElement || []) {
          const href = String(it.item?.['@id'] || it.item || '').replace('https://aurawebs.site', '');
          if (items.length && items.at(-1).href === href) items.pop(); // schema repeats a URL: keep the deeper name
          items.push({ name: it.name, href });
        }
        if (items.length < 2) return null;
        const lis = items.map((it, i) => i === items.length - 1
          ? `<li aria-current="page">${it.name}</li>`
          : `<li><a href="${it.href}">${it.name}</a></li>`).join('');
        return `<nav aria-label="${lang === 'es' ? 'Ruta de navegación' : 'Breadcrumb'}" class="breadcrumbs"><ol>${lis}</ol></nav>`;
      }
      stack.push(...Object.values(x));
    }
  }
  return null;
}

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
    .replace(/\{\{cur:([^}]+)\}\}/g, (_, s) => cur(s === 'blog' ? '/es/blog/' : null, s))
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

  // Pages are linked by clean URL: /x for x.html, /dir/ for dir/index.html (Netlify serves both).
  const path = rel === 'index.html' ? '/' : '/' + rel.split(sep).join('/').replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
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
    esUrl: alt.es || (lang === 'es' ? path : '/es/'),
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

  // "Sigue explorando" block, right before </main>.
  const next = renderNext(path, lang);
  if (next && html.includes('</main>')) {
    html = replaceBlock(html, 'next', next, () => null, h => h.lastIndexOf('</main>'));
  }

  // Breadcrumb only where the page doesn't already show one (blog, medellin.html and the price guide do).
  const withoutOurs = html.replace(/<!-- site-breadcrumb:start[\s\S]*?<!-- site-breadcrumb:end -->/, '');
  if (!/aria-label="[Bb]readcrumb"/.test(withoutOurs)) {
    const crumb = renderBreadcrumb(html, lang);
    if (crumb && /<h1\b/.test(html)) {
      html = replaceBlock(html, 'breadcrumb', crumb, () => null, h => {
        const h1 = h.search(/<h1\b/);
        const badge = h.lastIndexOf('<span class="inline-flex', h1);
        return badge !== -1 && h1 - badge < 600 ? badge : h1;
      });
    }
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
