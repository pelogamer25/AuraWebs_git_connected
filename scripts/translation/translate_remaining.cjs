const fs = require('fs');
const path = require('path');

const replacements = [
    [/We build digital experiences that blend aesthetic mastery with\s*technical precision\. Your business deserves a website that\s*sells\./g, 'Creamos experiencias digitales que combinan dominio estético con precisión técnica. Tu negocio merece una página web que venda.'],
    [/>Sitemap<\/a>/g, '>Mapa del Sitio</a>'],
    [/>View All Projects</g, '>Ver Todos los Proyectos<']
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
                console.log(`Translated remaining in ${fullPath}`);
            }
        }
    }
}

translateFooterLinks('./es');
