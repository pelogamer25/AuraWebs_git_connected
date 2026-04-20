const fs = require('fs');

const esIndexPath = './es/index.html';
let content = fs.readFileSync(esIndexPath, 'utf8');

content = content.replace(/Selected/g, 'Proyectos');
content = content.replace(/Start Your/g, 'Impulsa tu');
content = content.replace(/Web Project/g, 'Presencia Digital');
content = content.replace(/Let's transform your digital presence into a powerful asset\. Schedule a consultation with our senior architects today\./g, 'Transformemos tu presencia online en un activo poderoso. Agenda una consultoría con nuestros expertos en diseño web hoy mismo.');

fs.writeFileSync(esIndexPath, content, 'utf8');
console.log('Fixed remaining English words in es/index.html');
