const fs = require('fs');
const path = require('path');

const replacements = [
    [/>Services<\/a>/g, '>Servicios</a>'],
    [/>Showcase<\/a>/g, '>Portafolio</a>'],
    [/>FAQ<\/a>/g, '>Preguntas Frecuentes</a>'],
    [/>Sitemap<\/a>/g, '>Mapa del Sitio</a>']
];

function translateFooterLinks(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            translateFooterLinks(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const [regex, replacement] of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Translated footer links in ${fullPath}`);
            }
        }
    }
}

translateFooterLinks('./es');
