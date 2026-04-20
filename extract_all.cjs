const fs = require('fs');
const path = require('path');

function extractText(file) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/>([^<]+)</g);
    if (matches) {
        const texts = matches.map(m => m.slice(1, -1).trim()).filter(t => t.length > 0);
        console.log(`\n--- ${file} ---`);
        console.log(texts.join('\n'));
    }
}

extractText('es/contacto.html');
extractText('es/faq.html');
extractText('es/mapa-del-sitio.html');
extractText('es/portafolio.html');
extractText('es/servicios.html');
