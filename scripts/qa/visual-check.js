// Site-wide QA, run before every deploy:
//
//   npm run qa:serve      (terminal 1: serves the repo on http://127.0.0.1:8765)
//   npm run qa            (terminal 2: playwright-cli run-code --filename=scripts/qa/visual-check.js)
//
// Pages come from sitemap.xml (+ 404), so new pages are covered automatically. For each page, on
// desktop (1440) and mobile (390), it fails on: content left invisible by the scroll-reveal
// animation, horizontal overflow, Inter not loaded, JS/console errors, missing shared header/footer,
// more than one <h1>, bare WhatsApp links (no page-attributed ?text=), broken internal links, and
// axe-core WCAG 2 AA violations (axe is loaded from cdnjs, so that part needs network).
async page => {
  const BASE = 'http://127.0.0.1:8765';
  const RUN_AXE = true;

  const sitemap = await (await page.request.get(BASE + '/sitemap.xml')).text();
  const paths = [...sitemap.matchAll(/<loc>https:\/\/aurawebs\.site([^<]*)<\/loc>/g)].map(m => m[1] || '/');
  paths.push('/404.html');

  const problems = [];
  const errors = [];
  const links = new Set();
  page.on('pageerror', e => errors.push(`${page.url()} JS: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`${page.url()} console: ${m.text().slice(0, 160)}`); });

  for (const [tag, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    await page.setViewportSize({ width, height });
    for (const path of paths) {
      await page.goto(BASE + path, { waitUntil: 'load' });
      // scroll like a person so IntersectionObserver reveals fire
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < total; y += Math.floor(height * 0.5)) {
        await page.evaluate(v => window.scrollTo(0, v), y);
        await page.waitForTimeout(90);
      }
      await page.waitForTimeout(900);
      // A missing CSS rule hides dozens of elements on every page; a fast scroll can leave a few
      // mid-animation. Give stragglers a slower second pass before counting them as broken.
      const stragglers = await page.evaluate(() => [...document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')]
        .filter(e => parseFloat(getComputedStyle(e).opacity) < 0.99).length);
      if (stragglers) {
        for (let y = 0; y < total; y += Math.floor(height * 0.3)) {
          await page.evaluate(v => window.scrollTo(0, v), y);
          await page.waitForTimeout(150);
        }
        await page.waitForTimeout(1200);
      }
      const r = await page.evaluate(async () => {
        await document.fonts.ready;
        const c = document.createElement('canvas').getContext('2d');
        const w = f => { c.font = '40px ' + f; return c.measureText('Diseño web Medellín').width; };
        const html = document.documentElement.outerHTML;
        return {
          hidden: [...document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')]
            .filter(e => !e.closest('[hidden]') && parseFloat(getComputedStyle(e).opacity) < 0.99).length,
          inter: w('Inter, monospace') !== w('monospace'),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          header: html.includes('<!-- site-header:start'),
          footer: html.includes('<!-- site-footer:start'),
          h1: document.querySelectorAll('h1').length,
          bareWhatsApp: [...document.querySelectorAll('a[href^="https://wa.me/"]')].filter(a => !a.href.includes('?text=')).length,
          links: [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => h.startsWith(location.origin)),
        };
      });
      const where = `${tag} ${path}`;
      if (r.hidden) problems.push(`${where}: ${r.hidden} element(s) still invisible after scrolling`);
      if (!r.inter) problems.push(`${where}: Inter font not loaded`);
      if (r.overflow > 0) problems.push(`${where}: horizontal overflow ${r.overflow}px`);
      if (!r.header) problems.push(`${where}: shared header missing (npm run partials:sync)`);
      if (!r.footer && !path.includes('404')) problems.push(`${where}: shared footer missing (npm run partials:sync)`);
      if (r.h1 !== 1) problems.push(`${where}: ${r.h1} <h1> elements`);
      if (r.bareWhatsApp) problems.push(`${where}: ${r.bareWhatsApp} WhatsApp link(s) without ?text= (npm run partials:sync)`);
      r.links.forEach(h => links.add(h.split('#')[0]));

      if (RUN_AXE && tag === 'mobile') {
        await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js' });
        const violations = await page.evaluate(async () => (await axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }, resultTypes: ['violations'],
        })).violations.map(v => `${v.id} x${v.nodes.length} (${v.nodes[0].target.join(' ').slice(0, 70)})`));
        violations.forEach(v => problems.push(`${where}: axe ${v}`));
      }
    }
  }

  for (const href of links) {
    const status = (await page.request.get(href, { maxRedirects: 5 })).status();
    if (status >= 400) problems.push(`broken internal link (${status}): ${href.replace(BASE, '')}`);
  }

  const lines = [`${paths.length} pages x 2 viewports, ${links.size} internal links checked`];
  lines.push(problems.length ? `PROBLEMS (${problems.length}):` : 'ALL CHECKS PASSED');
  lines.push(...problems, ...[...new Set(errors)].slice(0, 30));
  return lines.join('\n');
}
