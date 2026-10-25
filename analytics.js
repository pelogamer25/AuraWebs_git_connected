// Google Analytics 4 + lead tracking. Loaded by the shared header (partials/header.*.html), so it
// runs on every page. In GA4, mark the `whatsapp_click` event as a key event: that's the lead count.
//
//   whatsapp_click  { cta_location, cta_text }  every click on a wa.me link + contact-form sends
//   email_click     { cta_location }            mailto: links
//
// cta_location: menu, menu_movil, hero, contenido, sigue_explorando, footer, formulario.
(() => {
  const ID = 'G-73S4S5RYNJ';
  const live = location.hostname === 'aurawebs.site';  // local QA runs never reach GA

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  if (!live) return;

  gtag('js', new Date());
  gtag('config', ID);

  // Load the library after the page has rendered so it never competes with the first paint.
  const load = () => {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    document.head.appendChild(s);
  };
  if (document.readyState === 'complete') load(); else window.addEventListener('load', load, { once: true });

  const locationOf = el => {
    if (el.closest('#nav-mobile')) return 'menu_movil';
    if (el.closest('.site-nav')) return 'menu';
    if (el.closest('.site-footer')) return 'footer';
    if (el.closest('.next-step')) return 'sigue_explorando';
    if (el.closest('form')) return 'formulario';
    const firstSection = document.querySelector('main section');
    return firstSection && firstSection.contains(el) ? 'hero' : 'contenido';
  };
  const label = el => el.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    if (a.href.startsWith('https://wa.me/')) gtag('event', 'whatsapp_click', { cta_location: locationOf(a), cta_text: label(a) });
    else if (a.href.startsWith('mailto:')) gtag('event', 'email_click', { cta_location: locationOf(a) });
  });
})();
