# AuraWebs — Agencia de Diseño Web en Medellín

Sitio web estático bilingüe (ES/EN) desplegado en Vercel, optimizado para SEO local en Medellín.

## Estructura del proyecto

```
/
├── index.html              # Homepage (ES, idioma principal)
├── es/                     # Páginas en español
│   └── medellin/           # Cluster SEO local Medellín
├── en/                     # Páginas en inglés
├── assets/
│   └── images/
│       └── optimized/      # WebP responsivo (480/800/1200px)
├── src/
│   └── input.css           # Fuente Tailwind CSS
├── styles.css              # CSS compilado (no editar directamente)
├── script.js               # JS principal
├── scripts/                # Herramientas de desarrollo (no desplegadas)
│   ├── seo/                # Schema markup, sitemap
│   ├── content/            # Extracción y limpieza de contenido
│   ├── translation/        # Scripts de traducción ES→EN
│   ├── fixes/              # Correcciones de texto en español
│   ├── images/             # Optimización de imágenes
│   └── updates/            # Actualizaciones masivas de HTML
├── docs/                   # Auditorías y documentación interna
├── archive/                # Archivos históricos (no activos)
│   ├── old-pages/          # Versiones anteriores de páginas
│   ├── dev-scripts/        # Scripts únicos de la carpeta dev original
│   └── dev-duplicates/     # Duplicados archivados de dev/
├── robots.txt
├── sitemap.xml
├── vercel.json             # Redirects y headers SEO
└── tailwind.config.js
```

## Desarrollo

```bash
# Servidor local
npm run dev

# Compilar CSS (Tailwind)
npm run css:build

# Compilar CSS en modo watch
npm run css:watch
```

## Deploy

El sitio se despliega automáticamente en Vercel al hacer push a `main`.
