const fs = require('fs');

const esIndexPath = './es/index.html';
let content = fs.readFileSync(esIndexPath, 'utf8');

content = content.replace(/Your business deserves a website that sells\. We blend deep\s+aesthetic mastery with technical SEO precision\./g, 'Tu negocio merece una página web que venda. Combinamos diseño estético de vanguardia con precisión técnica y SEO local para destacar tu marca.');

fs.writeFileSync(esIndexPath, content, 'utf8');
console.log('Fixed remaining English words in es/index.html');
