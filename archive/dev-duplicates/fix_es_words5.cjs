const fs = require('fs');

const esIndexPath = './es/index.html';
let content = fs.readFileSync(esIndexPath, 'utf8');

content = content.replace(/On-Demand Service/g, 'Servicio On-Demand');
content = content.replace(/Here to mend your world with care and a smile\. A\s+complete mobile platform for on-demand handyman\s+services\./g, 'Una plataforma móvil completa para servicios de mantenimiento bajo demanda, diseñada para una experiencia de usuario impecable.');
content = content.replace(/Culinary Brand/g, 'Marca Culinaria');
content = content.replace(/It is not just food\. It is a ceremony\. An immersive,\s+cinematic landing page for a limited-edition\s+culinary experience\./g, 'No es solo comida, es una ceremonia. Una landing page inmersiva y cinematográfica para una experiencia culinaria exclusiva.');

fs.writeFileSync(esIndexPath, content, 'utf8');
console.log('Fixed remaining English words in es/index.html');
