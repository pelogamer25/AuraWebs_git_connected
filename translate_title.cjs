const fs = require('fs');
const path = require('path');

const replacements = [
    [/<title>Aura \| High-Performance Web Design & Development<\/title>/g, '<title>Diseño Web en Medellín | Agencia SEO y Desarrollo | AuraWebs</title>'],
    [/<title>Aura \| High-Performance Web Design &amp; Development<\/title>/g, '<title>Diseño Web en Medellín | Agencia SEO y Desarrollo | AuraWebs</title>'],
    [/>Aura<\/span>/g, '>Portafolio</span>']
];

function translateTitle(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            translateTitle(fullPath);
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
                console.log(`Translated title in ${fullPath}`);
            }
        }
    }
}

translateTitle('./es');
