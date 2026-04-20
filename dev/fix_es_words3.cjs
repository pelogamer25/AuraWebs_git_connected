const fs = require('fs');

const esIndexPath = './es/index.html';
let content = fs.readFileSync(esIndexPath, 'utf8');

content = content.replace(/SEO Dominance/g, 'Posicionamiento SEO Local');
content = content.replace(/Technical SEO is baked in\. Structure, speed, and schema\s+markup to rank you higher\./g, 'El SEO técnico está integrado desde el inicio. Optimizamos la estructura y velocidad para que tu negocio domine las búsquedas en Medellín.');
content = content.replace(/A glimpse into our digital craftsmanship\./g, 'Un vistazo a nuestro trabajo en diseño y desarrollo web.');

fs.writeFileSync(esIndexPath, content, 'utf8');
console.log('Fixed remaining English words in es/index.html');
