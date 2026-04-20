const fs = require('fs');

let content = fs.readFileSync('es/index.html', 'utf8');
content = content.replace(/View All Projects/g, 'Ver Todos los Proyectos');
content = content.replace(/>Branding</g, '>Marca<');
fs.writeFileSync('es/index.html', content, 'utf8');
console.log('Fixed View All Projects and Branding in index.html');
