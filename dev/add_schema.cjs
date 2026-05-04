const fs = require('fs');

const schema = `
    <!-- Schema.org Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebDesignAgency",
      "name": "AuraWebs",
      "image": "https://aurawebs.site/assets/images/novemodel.png",
      "@id": "https://aurawebs.site/",
      "url": "https://aurawebs.site/",
      "telephone": "+573217466755",
      "email": "aura@aurawebs.site",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Medellín",
        "addressCountry": "CO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.2442,
        "longitude": -75.5812
      },
      "sameAs": [
        "https://www.instagram.com/theaurawebs/"
      ],
      "priceRange": "$$",
      "description": "Agencia de diseño de páginas web y desarrollo de software en Medellín. Especialistas en React, Tailwind, Next.js y estrategias de SEO local.",
      "areaServed": "Medellín, Colombia",
      "services": [
        "Diseño Web",
        "Desarrollo Frontend",
        "Optimización SEO",
        "Identidad de Marca"
      ]
    }
    </script>
`;

let content = fs.readFileSync('es/index.html', 'utf8');
if (!content.includes('application/ld+json')) {
    content = content.replace('</head>', schema + '\n  </head>');
    fs.writeFileSync('es/index.html', content, 'utf8');
    console.log('Added Schema to es/index.html');
}

let contentEn = fs.readFileSync('en/index.html', 'utf8');
const schemaEn = schema.replace('Agencia de diseño de páginas web y desarrollo de software en Medellín.', 'Web design and software development agency in Medellin.')
                       .replace('"Diseño Web"', '"Web Design"')
                       .replace('"Desarrollo Frontend"', '"Frontend Development"')
                       .replace('"Optimización SEO"', '"SEO Optimization"')
                       .replace('"Identidad de Marca"', '"Brand Identity"');
if (!contentEn.includes('application/ld+json')) {
    contentEn = contentEn.replace('</head>', schemaEn + '\n  </head>');
    fs.writeFileSync('en/index.html', contentEn, 'utf8');
    console.log('Added Schema to en/index.html');
}
