const fs = require('fs');

const replacementsTags = [
    [/>Mobile</g, '>Móvil<'],
    [/>Experience</g, '>Experiencia<'],
    [/>Dashboard</g, '>Panel de Control<'],
    [/>Healthcare</g, '>Salud<'],
    [/>Data</g, '>Datos<'],
    [/>Analytics</g, '>Analítica<'],
    [/>Platform</g, '>Plataforma<'],
    [/>Hiring</g, '>Contratación<'],
    [/>Sustainability</g, '>Sostenibilidad<']
];

let content = fs.readFileSync('es/portafolio.html', 'utf8');
for (const [regex, replacement] of replacementsTags) {
    content = content.replace(regex, replacement);
}
fs.writeFileSync('es/portafolio.html', content, 'utf8');
console.log('Translated tags in portafolio.html');

let contentIndex = fs.readFileSync('es/index.html', 'utf8');
for (const [regex, replacement] of replacementsTags) {
    contentIndex = contentIndex.replace(regex, replacement);
}
fs.writeFileSync('es/index.html', contentIndex, 'utf8');
console.log('Translated tags in index.html');
