// Behaviour for the shared header (partials/header.*.html). Loaded by the header itself,
// so it works on every page, including the blog pages that don't load script.js.
(() => {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.getElementById('nav-toggle');
  const panel = document.getElementById('nav-mobile');
  const openLabel = toggle?.getAttribute('aria-label');
  const setMenu = open => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : openLabel);
  };
  toggle?.addEventListener('click', () => setMenu(panel.hidden));

  // Desktop dropdowns: mouse hover opens them via CSS; click/Enter toggles; leaving with Tab closes.
  const dropdowns = [...nav.querySelectorAll('[data-dropdown]')];
  const setDropdown = (dd, open) => {
    dd.classList.toggle('is-open', open);
    dd.querySelector('button').setAttribute('aria-expanded', String(open));
  };
  dropdowns.forEach(dd => {
    dd.querySelector('button').addEventListener('click', () => setDropdown(dd, !dd.classList.contains('is-open')));
    dd.addEventListener('focusout', e => { if (!dd.contains(e.relatedTarget)) setDropdown(dd, false); });
  });
  document.addEventListener('click', e => dropdowns.forEach(dd => { if (!dd.contains(e.target)) setDropdown(dd, false); }));

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    dropdowns.forEach(dd => setDropdown(dd, false));
    if (panel && !panel.hidden) { setMenu(false); toggle.focus(); }
  });
})();
