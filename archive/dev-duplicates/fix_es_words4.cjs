const fs = require('fs');

const esIndexPath = './es/index.html';
let content = fs.readFileSync(esIndexPath, 'utf8');

content = content.replace(/Visionary Design/g, 'Diseño Web Vanguardista');
content = content.replace(/We don&#x27;t just design websites; we craft immersive\s+brand environments using glassmorphism and depth\./g, 'No solo hacemos páginas web; creamos experiencias digitales inmersivas que capturan la esencia de tu marca y convierten visitantes en clientes.');
content = content.replace(/React Architecture/g, 'Desarrollo Web a Medida');
content = content.replace(/Built on modern stacks\. Fast, scalable, and animated with\s+precision-engineered code\./g, 'Construimos con tecnologías modernas como React. Sitios web rápidos, escalables y con animaciones de alta precisión.');

fs.writeFileSync(esIndexPath, content, 'utf8');
console.log('Fixed remaining English words in es/index.html');
