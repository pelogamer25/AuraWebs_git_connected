const fs = require('fs');

const esIndexPath = './es/index.html';
let content = fs.readFileSync(esIndexPath, 'utf8');

content = content.replace(/Client Retention/g, 'Retención de Clientes');
content = content.replace(/Projects Live/g, 'Proyectos Activos');
content = content.replace(/Avg Traffic Growth/g, 'Crecimiento de Tráfico');
content = content.replace(/Support/g, 'Soporte');

fs.writeFileSync(esIndexPath, content, 'utf8');
console.log('Fixed remaining English words in es/index.html');
