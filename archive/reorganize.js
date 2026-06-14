import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enDir = path.join(__dirname, 'en');
const esDir = path.join(__dirname, 'es');

if (!fs.existsSync(enDir)) fs.mkdirSync(enDir);
if (!fs.existsSync(esDir)) fs.mkdirSync(esDir);

const files = ['index.html', 'services.html', 'showcase.html', 'faq.html', 'contact.html', 'sitemap.html'];

const esMap = {
  'index.html': 'index.html',
  'services.html': 'servicios.html',
  'showcase.html': 'portafolio.html',
  'faq.html': 'faq.html',
  'contact.html': 'contacto.html',
  'sitemap.html': 'mapa-del-sitio.html'
};

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace CSS/JS
  let enContent = content
    .replace(/href="\/styles\.css"/g, 'href="../styles.css"')
    .replace(/src="\/script\.js"/g, 'src="../script.js"');

  // Replace internal links for EN
  enContent = enContent
    .replace(/href="\/index\.html"/g, 'href="/en/index.html"')
    .replace(/href="\/services\.html"/g, 'href="/en/services.html"')
    .replace(/href="\/showcase\.html"/g, 'href="/en/showcase.html"')
    .replace(/href="\/faq\.html"/g, 'href="/en/faq.html"')
    .replace(/href="\/contact\.html"/g, 'href="/en/contact.html"')
    .replace(/href="\/sitemap\.html"/g, 'href="/en/sitemap.html"');

  fs.writeFileSync(path.join(enDir, file), enContent);

  // Replace internal links for ES
  let esContent = content
    .replace(/href="\/styles\.css"/g, 'href="../styles.css"')
    .replace(/src="\/script\.js"/g, 'src="../script.js"');

  esContent = esContent
    .replace(/href="\/index\.html"/g, 'href="/es/index.html"')
    .replace(/href="\/services\.html"/g, 'href="/es/servicios.html"')
    .replace(/href="\/showcase\.html"/g, 'href="/es/portafolio.html"')
    .replace(/href="\/faq\.html"/g, 'href="/es/faq.html"')
    .replace(/href="\/contact\.html"/g, 'href="/es/contacto.html"')
    .replace(/href="\/sitemap\.html"/g, 'href="/es/mapa-del-sitio.html"');

  fs.writeFileSync(path.join(esDir, esMap[file]), esContent);
});

// Create /en/web-design.html (copy of services)
if (fs.existsSync(path.join(enDir, 'services.html'))) {
  let wdContent = fs.readFileSync(path.join(enDir, 'services.html'), 'utf8');
  wdContent = wdContent.replace(/<title>.*?<\/title>/, '<title>Web Design Services | AuraWebs</title>');
  fs.writeFileSync(path.join(enDir, 'web-design.html'), wdContent);
}

// Create /es/medellin.html (copy of index)
if (fs.existsSync(path.join(esDir, 'index.html'))) {
  let medContent = fs.readFileSync(path.join(esDir, 'index.html'), 'utf8');
  medContent = medContent.replace(/<title>.*?<\/title>/, '<title>Diseño Web en Medellín | AuraWebs</title>');
  fs.writeFileSync(path.join(esDir, 'medellin.html'), medContent);
}

// Update root index.html to redirect
const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/en/index.html">
  <title>Redirecting to AuraWebs...</title>
</head>
<body>
  <script>window.location.href = "/en/index.html";</script>
  <p>If you are not redirected automatically, <a href="/en/index.html">click here</a>.</p>
</body>
</html>`;
fs.writeFileSync('index.html', redirectHtml);

// Clean up old root files except index.html, styles.css, script.js, sitemap.xml
['services.html', 'showcase.html', 'faq.html', 'contact.html', 'sitemap.html'].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

// Update sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://aurawebs.site/en/index.html</loc></url>
  <url><loc>https://aurawebs.site/en/services.html</loc></url>
  <url><loc>https://aurawebs.site/en/showcase.html</loc></url>
  <url><loc>https://aurawebs.site/en/faq.html</loc></url>
  <url><loc>https://aurawebs.site/en/contact.html</loc></url>
  <url><loc>https://aurawebs.site/en/sitemap.html</loc></url>
  <url><loc>https://aurawebs.site/en/web-design.html</loc></url>
  <url><loc>https://aurawebs.site/es/index.html</loc></url>
  <url><loc>https://aurawebs.site/es/servicios.html</loc></url>
  <url><loc>https://aurawebs.site/es/portafolio.html</loc></url>
  <url><loc>https://aurawebs.site/es/faq.html</loc></url>
  <url><loc>https://aurawebs.site/es/contacto.html</loc></url>
  <url><loc>https://aurawebs.site/es/mapa-del-sitio.html</loc></url>
  <url><loc>https://aurawebs.site/es/medellin.html</loc></url>
</urlset>`;
fs.writeFileSync('sitemap.xml', sitemapContent);

console.log('Reorganization complete.');
