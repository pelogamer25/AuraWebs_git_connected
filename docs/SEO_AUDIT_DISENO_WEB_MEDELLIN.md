# Informe SEO para posicionar "Diseño Web Medellín"

Proyecto auditado: `C:\Users\TUF\Desktop\AURA_WEBS\aura_webs_v5(AISTUIO)`
Fecha: 2026-05-31
Keyword objetivo: **Diseño Web Medellín**

## Resumen ejecutivo

AuraWebs ya tiene una base útil: landing local en `es/medellin.html`, sitemap XML, robots.txt, canonical, hreflang, imágenes optimizadas WebP, CTAs a WhatsApp, portafolio y copy orientado a conversión. El principal bloqueo para competir por Top 3 no es la ausencia total de SEO, sino la falta de una arquitectura semántica clara: varias URLs atacan la misma intención, la landing local usa "Web Design Medellín" antes que la keyword exacta en español, el schema local está incompleto y faltan señales fuertes de negocio local, pruebas, NAP y clusters de servicios.

Los competidores tienen ventajas claras:

- Webcreativa refuerza autoridad local con NAP visible, dirección física en Medellín, teléfono, clientes, Google Partner y navegación de servicios.
- BP Agencia tiene una landing exact-match con H1 "Diseño de Páginas Web Medellín", precios, características, FAQ, proceso y mucho contenido semántico.
- Mostacho tiene una landing extensa con tipos de página, beneficios, portafolio, equipo, servicios relacionados y contenido local actualizado.

La oportunidad de AuraWebs es posicionarse como una alternativa más técnica y moderna: velocidad, React/Next.js, SEO técnico, CRO, medición de leads, Core Web Vitals y diseño orientado a conversión. Esa ventaja debe hacerse explícita y estructurarse mejor.

Fuentes externas revisadas:

- https://www.webcreativa.com.co/
- https://www.bpagencia.com/diseno-de-paginas-web-medellin/
- https://mostachomarketing.com/diseno-paginas-web-medellin/

## Estado del proyecto

Importante: el repositorio no es una aplicación Next.js actualmente. Es un sitio estático HTML/CSS/JS servido con `npx serve . -p 3000`. `package.json` no tiene dependencias de React/Next.js. Por eso, las recomendaciones incluyen archivos HTML actuales y, cuando aplica, equivalentes si se migra a Next.js.

Archivos críticos auditados:

- `robots.txt`
- `sitemap.xml`
- `index.html`
- `es/index.html`
- `es/medellin.html`
- `es/servicios.html`
- `es/faq.html`
- `es/portafolio.html`
- `en/web-design.html`
- `styles.css`
- `script.js`

## 1. SEO técnico

### CRÍTICO: canibalización entre home y landing local

Problema:

- `es/index.html` usa `<title>Diseño Web en Medellín | AuraWebs</title>` y H1 "Diseño Web en Medellín".
- `es/medellin.html` también apunta a la misma intención, pero con title "Web Design Medellín | Diseño Web SEO | AuraWebs" y H1 "Web Design Medellín".
- `index.html` también contiene muchas menciones a Medellín.

Por qué afecta rankings:

Google puede no saber qué URL debe rankear para "Diseño Web Medellín". La autoridad interna, anchor text y señales de relevancia quedan divididas.

Solución exacta:

- Definir `https://aurawebs.site/es/medellin.html` como URL principal para la keyword.
- Retirar la keyword exacta del title/H1 de `es/index.html` y convertir la home en página de marca.
- Enlazar desde home, servicios, portafolio, FAQ y footer hacia `es/medellin.html` con anchor "Diseño Web Medellín".

Archivos a modificar:

- `es/medellin.html`
- `es/index.html`
- `index.html`
- `es/servicios.html`
- `es/faq.html`
- `es/portafolio.html`
- `es/mapa-del-sitio.html`

Código sugerido para `es/index.html`:

```html
<title>AuraWebs | Agencia de Desarrollo Web y SEO Local</title>
<meta name="description" content="AuraWebs diseña sitios web rápidos, medibles y orientados a conversión para empresas que quieren vender mejor en internet." />
```

Código sugerido para el enlace interno:

```html
<a href="/es/medellin.html" title="Diseño Web Medellín">Diseño Web Medellín</a>
```

### CRÍTICO: title y H1 de la landing no usan la keyword exacta como señal principal

Problema:

`es/medellin.html` prioriza "Web Design Medellín", una mezcla inglés/español. Para Colombia y Medellín, los competidores usan "Diseño de páginas web Medellín" o "Páginas web en Medellín".

Por qué afecta rankings:

La coincidencia de intención y lenguaje importa. La keyword objetivo está en español; la landing debe liderar con español.

Solución exacta:

Actualizar title, meta, OG/Twitter y H1 para priorizar "Diseño Web Medellín" y variantes naturales.

Archivo a modificar:

- `es/medellin.html`

Código sugerido:

```html
<title>Diseño Web Medellín | Páginas Web Profesionales | AuraWebs</title>
<meta name="description" content="Diseño web en Medellín para empresas que necesitan páginas rápidas, SEO local, UX, medición de leads y más clientes desde Google y WhatsApp." />
<meta property="og:title" content="Diseño Web Medellín | Páginas Web Profesionales | AuraWebs" />
<meta property="og:description" content="Creamos páginas web profesionales en Medellín con SEO local, velocidad, diseño UX y foco en conversión." />
<meta property="twitter:title" content="Diseño Web Medellín | Páginas Web Profesionales | AuraWebs" />
<meta property="twitter:description" content="Páginas web rápidas, modernas y optimizadas para captar clientes en Medellín." />
```

H1 sugerido:

```html
<h1>Diseño Web Medellín <span>Páginas rápidas para captar más clientes</span></h1>
```

### ALTO IMPACTO: sitemap XML básico, sin `lastmod`, `priority`, `changefreq` ni separación de páginas indexables

Problema:

`sitemap.xml` lista páginas, pero no indica fecha de actualización ni prioridad. Además incluye páginas en inglés y español sin agrupar hreflang dentro del sitemap.

Por qué afecta rankings:

No impide indexar, pero limita señales de rastreo. Para una keyword local competida, conviene priorizar la landing local.

Archivo a modificar:

- `sitemap.xml`

Código sugerido:

```xml
<url>
  <loc>https://aurawebs.site/es/medellin.html</loc>
  <lastmod>2026-05-31</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://aurawebs.site/es/servicios.html</loc>
  <lastmod>2026-05-31</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### ALTO IMPACTO: Open Graph usa imagen relativa

Problema:

Las páginas usan `og:image` y `twitter:image` con `/assets/images/novemodel.png`.

Por qué afecta rankings:

No afecta directamente rankings orgánicos, pero puede afectar CTR social y validación de previews. Las plataformas recomiendan URLs absolutas.

Archivos a modificar:

- Todas las páginas HTML principales.

Código sugerido:

```html
<meta property="og:image" content="https://aurawebs.site/assets/images/optimized/Web3-1200.webp" />
<meta property="twitter:image" content="https://aurawebs.site/assets/images/optimized/Web3-1200.webp" />
```

### ALTO IMPACTO: schema LocalBusiness incompleto

Problema:

`es/medellin.html` tiene `LocalBusiness`, pero sin `telephone`, `sameAs`, `priceRange`, `openingHours`, `image`, `logo`, `description`, `hasOfferCatalog`, `aggregateRating`, `geo` ni `contactPoint`. Además no hay NAP visible completo en la página.

Por qué afecta rankings:

El SEO local necesita consistencia entre página, Google Business Profile, schema y citaciones. El schema actual comunica "existimos en Medellín", pero no consolida entidad local.

Archivo a modificar:

- `es/medellin.html`

Código sugerido:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://aurawebs.site/es/medellin.html#localbusiness",
  "name": "AuraWebs",
  "url": "https://aurawebs.site/es/medellin.html",
  "logo": "https://aurawebs.site/assets/images/optimized/novemodel-256.webp",
  "image": "https://aurawebs.site/assets/images/optimized/Web3-1200.webp",
  "description": "Agencia de diseño web en Medellín especializada en páginas rápidas, SEO local, UX, desarrollo frontend y conversión.",
  "telephone": "+57 321 746 6755",
  "priceRange": "$$",
  "areaServed": [
    { "@type": "City", "name": "Medellín" },
    { "@type": "AdministrativeArea", "name": "Antioquia" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Medellín",
    "addressRegion": "Antioquia",
    "addressCountry": "CO"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+57 321 746 6755",
    "contactType": "sales",
    "areaServed": "CO",
    "availableLanguage": ["es", "en"]
  },
  "sameAs": [
    "https://www.instagram.com/theaurawebs/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de diseño web en Medellín",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diseño de páginas web corporativas" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Landing pages para campañas" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO local para empresas en Medellín" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rediseño web orientado a conversión" } }
    ]
  }
}
</script>
```

### ALTO IMPACTO: falta BreadcrumbList schema

Problema:

No se encontró schema de breadcrumbs.

Por qué afecta rankings:

Ayuda a Google a entender jerarquía y puede mejorar presentación en SERP.

Archivo a modificar:

- `es/medellin.html`

Código sugerido:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://aurawebs.site/es/index.html"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Diseño Web Medellín",
      "item": "https://aurawebs.site/es/medellin.html"
    }
  ]
}
</script>
```

### ALTO IMPACTO: falta FAQPage schema en landing

Problema:

La landing compite contra páginas que incluyen FAQ o bloques de preguntas. AuraWebs tiene `es/faq.html`, pero la landing local necesita FAQ específico de "Diseño Web Medellín".

Por qué afecta rankings:

Las FAQs cubren intención informacional y comercial: precios, tiempos, qué incluye, SEO, hosting, WordPress/Next.js, mantenimiento.

Archivo a modificar:

- `es/medellin.html`

Código sugerido:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta una página web en Medellín?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El costo depende del alcance, número de secciones, integración con formularios, SEO, contenido, analítica y funcionalidades. En AuraWebs recomendamos cotizar según objetivos de captación y conversión."
      }
    },
    {
      "@type": "Question",
      "name": "¿El diseño web incluye SEO local?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. La estructura incluye titles, metadescripciones, encabezados, velocidad, indexabilidad, schema, arquitectura interna y contenido orientado a búsquedas locales en Medellín."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tarda el diseño de una página web profesional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un sitio corporativo puede tomar entre 2 y 6 semanas según la cantidad de páginas, contenidos, aprobaciones e integraciones necesarias."
      }
    }
  ]
}
</script>
```

### MEDIO IMPACTO: robots.txt correcto pero mínimo

Problema:

`robots.txt` permite rastreo y declara sitemap. Está bien, pero no bloquea carpetas de desarrollo si se despliegan accidentalmente.

Por qué afecta rankings:

Si `/dev/` queda público, puede generar URLs duplicadas, antiguas o de baja calidad.

Archivo a modificar:

- `robots.txt`

Código sugerido:

```txt
User-agent: *
Allow: /
Disallow: /dev/
Disallow: /migrated_prompt_history/

Sitemap: https://aurawebs.site/sitemap.xml
```

### MEDIO IMPACTO: Core Web Vitals con riesgo por JS visual, canvas, GTM y fuentes externas

Problema:

`es/medellin.html` carga GTM en el head, Google Fonts, una textura externa de `transparenttextures.com`, canvas de fondo y animaciones. La página pesa 79 KB de HTML antes de CSS/JS/imágenes.

Por qué afecta rankings:

Para búsquedas locales competidas, rendimiento móvil y UX influyen en conversión y pueden afectar visibilidad. Los competidores son WordPress pesados, así que AuraWebs puede ganar si se vuelve claramente más rápida.

Archivos a modificar:

- `es/medellin.html`
- `styles.css`
- `script.js`

Solución exacta:

- Mover GTM a carga diferida o consent mode si aplica.
- Eliminar textura externa o servirla localmente.
- Desactivar canvas/animaciones en móvil o con `prefers-reduced-motion`.
- Preload del CSS principal.
- Usar `font-display: swap` ya viene en Google Fonts, pero idealmente self-host fonts.

Código sugerido:

```html
<link rel="preload" href="../styles.css" as="style" />
<link rel="stylesheet" href="../styles.css" />
```

```css
@media (prefers-reduced-motion: reduce), (max-width: 768px) {
  canvas,
  .animate-blob,
  .animate-blob-slow,
  .animate-gradient-x {
    animation: none !important;
  }
}
```

### MEDIO IMPACTO: redirecciones no documentadas

Problema:

No hay archivo de redirecciones. Existen URLs con `.html`, home raíz, `/es/index.html`, carpetas `/en/`, `/es/` y copias raíz con `noindex`.

Por qué afecta rankings:

Sin estrategia, se pueden indexar variantes o perder señales por URLs duplicadas.

Archivo recomendado si se despliega en Vercel:

- `vercel.json`

Código sugerido:

```json
{
  "redirects": [
    { "source": "/es", "destination": "/es/index.html", "permanent": true },
    { "source": "/diseno-web-medellin", "destination": "/es/medellin.html", "permanent": true },
    { "source": "/diseño-web-medellin", "destination": "/es/medellin.html", "permanent": true }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Robots-Tag", "value": "index, follow" }
      ]
    }
  ]
}
```

## 2. SEO On-Page

### CRÍTICO: intención principal no está totalmente cubierta

Problema:

La landing habla bien de conversión, pero le faltan bloques que Google y usuarios esperan para "Diseño Web Medellín":

- Precios o rangos.
- Tipos de sitios: corporativa, ecommerce, landing page, catálogo, reservas, inmobiliaria, restaurantes, salud, abogados.
- Qué incluye el servicio.
- Comparación WordPress vs desarrollo a medida vs Next.js.
- Proceso detallado.
- Tiempos de entrega.
- Garantías/soporte/mantenimiento.
- Casos reales con resultados medibles.
- FAQ local.

Por qué afecta rankings:

Los competidores cubren más subintenciones. BP Agencia tiene precios, planes, características, proceso y FAQ. Mostacho cubre tipos de páginas, beneficios, portafolio, equipo y servicios relacionados.

Archivo a modificar:

- `es/medellin.html`

Secciones sugeridas:

```html
<section id="planes-diseno-web-medellin">
  <h2>Planes de diseño web en Medellín</h2>
  <article>
    <h3>Landing page para captar leads</h3>
    <p>Ideal para campañas, servicios específicos y validación de ofertas.</p>
  </article>
  <article>
    <h3>Página web corporativa</h3>
    <p>Para empresas que necesitan presentar servicios, equipo, casos y canales de contacto.</p>
  </article>
  <article>
    <h3>Sitio web SEO local</h3>
    <p>Arquitectura preparada para posicionar servicios por Medellín, Antioquia y zonas cercanas.</p>
  </article>
</section>
```

### ALTO IMPACTO: falta densidad semántica local natural

Problema:

`es/medellin.html` menciona Medellín 16 veces, pero el H1/title no priorizan "Diseño Web Medellín" exacto. Además faltan barrios, zonas y contexto empresarial local.

Por qué afecta rankings:

El SEO local necesita entidades geográficas y comerciales. No basta con repetir Medellín; hay que conectar la oferta con necesidades locales.

Solución exacta:

Agregar menciones naturales a:

- Medellín, Antioquia, Valle de Aburrá.
- El Poblado, Laureles, Envigado, Sabaneta, Itagüí, Bello.
- Empresas B2B, restaurantes, clínicas, inmobiliarias, ecommerce, servicios profesionales.
- WhatsApp, Google Business Profile, SEO local, mapas, reseñas, conversiones.

Archivo a modificar:

- `es/medellin.html`

Copy sugerido:

```html
<p>
  Trabajamos con empresas de Medellín y el Valle de Aburrá que necesitan una página web profesional para aparecer en Google, generar confianza y recibir más solicitudes por WhatsApp o formulario.
</p>
```

### ALTO IMPACTO: meta descriptions poco orientadas a CTR

Problema:

La description actual es correcta, pero genérica. Debe vender mejor el clic con beneficio, ubicación y diferenciador.

Archivo a modificar:

- `es/medellin.html`

Meta sugerida:

```html
<meta name="description" content="Diseño Web Medellín: creamos páginas profesionales, rápidas y optimizadas para SEO local, WhatsApp y generación de clientes. Agenda diagnóstico gratis." />
```

### ALTO IMPACTO: contenido de portafolio sin suficientes resultados

Problema:

Hay proyectos visuales, pero faltan métricas verificables o descripciones orientadas a SEO: sector, problema, solución, tecnología, resultado.

Por qué afecta rankings:

Los casos reales fortalecen E-E-A-T, conversión y relevancia semántica.

Archivos a modificar:

- `es/medellin.html`
- `es/portafolio.html`

Código sugerido:

```html
<article>
  <h3>Diseño web para restaurante en Medellín</h3>
  <p>Rediseñamos la experiencia móvil, mejoramos el acceso a menú, WhatsApp y reservas, y dejamos medición de conversiones.</p>
</article>
```

### MEDIO IMPACTO: keywords relacionadas faltantes

Agregar de forma natural:

- diseño de páginas web en Medellín
- creación de páginas web Medellín
- desarrollo web Medellín
- agencia de diseño web Medellín
- páginas web profesionales Medellín
- diseño web para empresas
- rediseño web
- diseño UX/UI
- diseño responsive
- ecommerce Medellín
- landing pages Medellín
- SEO local Medellín
- mantenimiento web
- optimización de velocidad web
- páginas web con WhatsApp
- páginas web para restaurantes, inmobiliarias, clínicas, abogados, startups

## 3. SEO local

### CRÍTICO: NAP visible incompleto

Problema:

La landing tiene WhatsApp `+57 321 746 6755`, pero no muestra un bloque NAP completo con nombre, teléfono, ciudad, país, correo y horario. Webcreativa sí muestra teléfono y dirección física en Medellín.

Por qué afecta rankings:

Google cruza señales de entidad local. Un NAP consistente ayuda a confianza, GBP, citaciones y conversión.

Archivo a modificar:

- `es/medellin.html`
- Footer compartido en páginas `es/*.html`

Código sugerido:

```html
<section id="contacto-local" aria-labelledby="contacto-local-title">
  <h2 id="contacto-local-title">Agencia de diseño web en Medellín</h2>
  <p><strong>AuraWebs</strong></p>
  <p>Medellín, Antioquia, Colombia</p>
  <p>WhatsApp: <a href="https://wa.me/573217466755">+57 321 746 6755</a></p>
  <p>Instagram: <a href="https://www.instagram.com/theaurawebs/">@theaurawebs</a></p>
</section>
```

### ALTO IMPACTO: Google Business Profile

Oportunidades:

- Crear o optimizar perfil de Google Business Profile como "AuraWebs".
- Categoría primaria: "Diseñador de sitios web" o equivalente disponible.
- Categorías secundarias: "Agencia de marketing", "Servicio de marketing por Internet", "Consultor de marketing".
- Servicios: Diseño web, desarrollo web, SEO local, landing pages, rediseño web, mantenimiento web.
- Subir casos/portafolio como fotos.
- Publicar 1 post semanal con proyectos, tips y ofertas.
- Conseguir 15-30 reseñas reales con texto que mencione "diseño web", "página web", "Medellín", "SEO", "rápida", "WhatsApp".

### ALTO IMPACTO: citaciones locales

Crear perfiles consistentes en:

- Cámara de Comercio local si aplica.
- Clutch, Sortlist, GoodFirms.
- Directorios colombianos de agencias.
- LinkedIn Company Page.
- Facebook Page.
- Instagram con bio consistente.
- Behance/Dribbble si hay diseño visual.

## 4. Arquitectura e internal linking

### CRÍTICO: falta cluster de servicios locales

Problema:

Solo hay una landing local amplia. Para competir Top 3, conviene crear un cluster de páginas específicas que enlacen hacia `es/medellin.html`.

Páginas recomendadas:

- `/es/diseno-paginas-web-medellin.html`
- `/es/desarrollo-web-medellin.html`
- `/es/landing-pages-medellin.html`
- `/es/diseno-web-para-restaurantes-medellin.html`
- `/es/diseno-web-para-inmobiliarias-medellin.html`
- `/es/diseno-web-para-clinicas-medellin.html`
- `/es/seo-local-medellin.html`
- `/es/mantenimiento-web-medellin.html`
- `/es/rediseño-web-medellin.html`

Nota: si se mantiene una sola página principal, usar una URL sin `.html` o alias corto ayuda al CTR:

- `/diseno-web-medellin`
- `/es/diseno-web-medellin`

### ALTO IMPACTO: enlaces internos con anchor exacto

Problema:

El footer ya enlaza "Diseño Web Medellín", pero hay que reforzarlo desde:

- Home.
- Servicios.
- Portafolio.
- FAQ.
- Mapa del sitio.
- Artículos futuros.

Código sugerido:

```html
<p>
  Si tu prioridad es captar clientes locales, revisa nuestro servicio de
  <a href="/es/medellin.html">Diseño Web Medellín</a>.
</p>
```

## 5. Comparativa competitiva

### Webcreativa

Qué tienen ellos que AuraWebs no tiene tan fuerte:

- NAP visible: teléfono y dirección "Carrera 43C No 7D - 71, Medellín - Colombia".
- Señal de antigüedad y marca local.
- Google Partner.
- Clientes/logos.
- Servicios amplios y navegación robusta.
- Copy de agencia local desde la home.

Qué tiene AuraWebs que ellos no explotan igual:

- Mensaje más moderno y técnico.
- Mejor potencial de velocidad si se simplifica JS/animaciones.
- Enfoque en medición de conversión, WhatsApp y SEO técnico.
- Landing local más larga que la home de Webcreativa.

Quick wins contra Webcreativa:

- Mostrar NAP completo.
- Agregar badges de tecnología/velocidad.
- Publicar casos con resultados.
- Crear FAQ y schema más completo.

### BP Agencia

Qué tienen ellos:

- URL exacta `/diseno-de-paginas-web-medellin/`.
- H1 exacto "Diseño de Páginas Web Medellín".
- Precios y planes.
- Listas de características.
- Proceso paso a paso.
- FAQ.
- Servicios relacionados y enlaces internos.
- Contacto visible con teléfonos y correo.

Qué tiene AuraWebs:

- Diseño más diferencial.
- Enfoque en CRO y medición.
- Potencial de calidad técnica superior.
- Menos apariencia de keyword stuffing si se optimiza bien.

Quick wins contra BP:

- Agregar planes sin competir solo por precio.
- H1 y title exactos.
- FAQPage schema.
- Tabla "Qué incluye".
- Casos por industria.

### Mostacho Marketing

Qué tienen ellos:

- H1 "Páginas web en Medellín".
- Tipos de página: tienda virtual, sitio corporativo, landing page.
- Beneficios claros.
- Portafolio amplio.
- Equipo con nombres y cargos.
- Servicios relacionados: SEO, redes, contenido, SEM, CRM.
- Contenido tipo carta local y fecha actual.

Qué tiene AuraWebs:

- Posicionamiento técnico premium.
- Mejor argumento de velocidad y medición.
- Mayor foco en experiencia frontend.

Quick wins contra Mostacho:

- Agregar tipos de páginas y servicios 360.
- Mostrar equipo o responsable.
- Incluir fecha de actualización y autor.
- Añadir bloque "Diseño web + SEO local + conversión".

## 6. Plan de acción priorizado

### CRÍTICO

1. Resolver canibalización.
   - Problema: `es/index.html` y `es/medellin.html` compiten por la misma keyword.
   - Solución: landing local como URL objetivo; home orientada a marca.
   - Archivos: `es/index.html`, `es/medellin.html`, `index.html`.

2. Cambiar title/H1 de `es/medellin.html`.
   - Problema: "Web Design Medellín" no es la query principal en español.
   - Solución: usar "Diseño Web Medellín" en title, H1, OG y Twitter.
   - Archivo: `es/medellin.html`.

3. Completar NAP y LocalBusiness schema.
   - Problema: entidad local débil.
   - Solución: teléfono, ciudad, región, país, logo, sameAs, contactPoint y servicios.
   - Archivo: `es/medellin.html`.

4. Crear FAQ local en landing + FAQPage schema.
   - Problema: faltan respuestas a intención comercial.
   - Solución: 6-8 preguntas sobre precio, tiempos, SEO, hosting, mantenimiento y tecnologías.
   - Archivo: `es/medellin.html`.

### ALTO IMPACTO

1. Agregar bloques de planes y qué incluye.
   - Archivo: `es/medellin.html`.

2. Añadir casos reales con resultado y sector.
   - Archivos: `es/medellin.html`, `es/portafolio.html`.

3. Fortalecer enlaces internos.
   - Archivos: todas las páginas `es/*.html`.

4. Mejorar sitemap con `lastmod`, `priority` y `changefreq`.
   - Archivo: `sitemap.xml`.

5. Optimizar OG/Twitter con imagen absoluta.
   - Archivos: HTML principales.

6. Crear alias/redirección `/diseno-web-medellin`.
   - Archivo: `vercel.json` o configuración del servidor.

### IMPACTO MEDIO

1. Reducir riesgo CWV.
   - Mover o diferir GTM, servir textura local, reducir canvas en móvil.
   - Archivos: `es/medellin.html`, `styles.css`, `script.js`.

2. Bloquear `/dev/` en robots si se despliega.
   - Archivo: `robots.txt`.

3. Añadir `BreadcrumbList`.
   - Archivo: `es/medellin.html`.

4. Crear páginas cluster por servicio/industria.
   - Archivos nuevos en `es/`.

### BAJO IMPACTO

1. Eliminar `meta keywords`.
   - Google no lo usa para rankings; no hace daño crítico, pero es ruido.

2. Normalizar idioma en páginas inglesas.
   - `en/index.html` tiene descripción de schema mezclada con español.

3. Añadir `og:locale`.
   - Para `es/medellin.html`: `es_CO`.

Código sugerido:

```html
<meta property="og:locale" content="es_CO" />
```

## Hoja de ruta SEO de 90 días

### Días 1-15: base técnica y foco semántico

- Definir `es/medellin.html` como landing principal.
- Cambiar title, H1, meta description, OG y Twitter.
- Retarget `es/index.html` para marca.
- Completar LocalBusiness schema.
- Agregar NAP visible.
- Agregar FAQ local + FAQPage schema.
- Mejorar sitemap y robots.
- Agregar breadcrumbs.
- Crear redirección `/diseno-web-medellin`.
- Medir indexación en Google Search Console.

### Días 16-30: contenido transaccional

- Agregar secciones: planes, qué incluye, proceso, tiempos, tecnologías, soporte.
- Crear tabla comparativa: WordPress vs Webflow vs Next.js/desarrollo a medida.
- Reescribir portafolio con sectores, problemas, soluciones y resultados.
- Añadir CTAs específicos por intención: cotizar, diagnóstico, WhatsApp, auditoría.
- Mejorar enlazado desde home, servicios, portafolio y FAQ.

### Días 31-45: SEO local externo

- Crear u optimizar Google Business Profile.
- Publicar 4 posts en GBP.
- Conseguir primeras 10 reseñas reales.
- Crear citaciones locales y perfiles de agencia.
- Unificar NAP en web, redes y directorios.
- Añadir fotos/proyectos al GBP.

### Días 46-60: clusters de contenido

- Crear 4 páginas satélite:
  - `desarrollo-web-medellin`
  - `landing-pages-medellin`
  - `seo-local-medellin`
  - `diseno-web-para-restaurantes-medellin`
- Cada página debe enlazar a `es/medellin.html`.
- Crear 4 artículos de soporte:
  - "Cuánto cuesta una página web en Medellín"
  - "Cómo elegir una agencia de diseño web en Medellín"
  - "Diseño web para negocios locales: qué debe incluir"
  - "SEO local para páginas web en Medellín"

### Días 61-75: autoridad y conversión

- Publicar 2 casos de estudio completos.
- Conseguir backlinks locales: aliados, clientes, directorios, artículos invitados.
- Añadir testimonios verificables.
- Implementar eventos GA4/GTM para WhatsApp, formularios y clics.
- Revisar Search Console: queries, CTR, páginas con impresiones.

### Días 76-90: optimización para Top 3

- Ajustar title/meta según CTR real.
- Expandir FAQs según queries de Search Console.
- Añadir contenido por barrios/zonas solo si hay intención real.
- Mejorar CWV móvil con Lighthouse/PageSpeed.
- Comparar SERP semanalmente contra Webcreativa, BP Agencia y Mostacho.
- Priorizar backlinks y reseñas si la página ya está en Top 10 pero no sube.

## Resultado esperado

Con los cambios críticos y de alto impacto, AuraWebs debería pasar de una landing local visualmente fuerte pero semánticamente dispersa a una página claramente orientada a "Diseño Web Medellín". Para Top 3, el factor decisivo no será solo el HTML: hará falta consolidar entidad local, reseñas, citaciones, casos reales, contenido cluster y enlaces externos durante 90 días.
