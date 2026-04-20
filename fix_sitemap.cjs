const fs = require('fs');

let content = fs.readFileSync('es/index.html', 'utf8');
content = content.replace(/>Sitemap<\/a/g, '>Mapa del Sitio</a');
fs.writeFileSync('es/index.html', content, 'utf8');
console.log('Fixed Sitemap in index.html');
