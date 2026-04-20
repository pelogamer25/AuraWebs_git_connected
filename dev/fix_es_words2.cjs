const fs = require('fs');

const esIndexPath = './es/index.html';
let content = fs.readFileSync(esIndexPath, 'utf8');

content = content.replace(/Ready to/g, 'Impulsa tu');
content = content.replace(/Let&#x27;s transform your digital presence into a powerful\s+asset\. Schedule a consultation with our senior architects\s+today\./g, 'Transformemos tu presencia online en un activo poderoso. Agenda una consultoría con nuestros expertos en diseño web hoy mismo.');

fs.writeFileSync(esIndexPath, content, 'utf8');
console.log('Fixed remaining English words in es/index.html');
