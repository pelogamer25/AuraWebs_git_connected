const fs = require('fs');
const path = require('path');

const replacements = [
    [/We build digital experiences that blend aesthetic mastery with technical precision\. Your business deserves a website that sells\./g, 'Creamos experiencias digitales que combinan dominio estético con precisión técnica. Tu negocio merece una página web que venda.'],
    [/<h4 class="font-semibold text-white mb-6">Explore<\/h4>/g, '<h4 class="font-semibold text-white mb-6">Explorar</h4>'],
    [/<h4 class="font-semibold text-white mb-6">Expertise<\/h4>/g, '<h4 class="font-semibold text-white mb-6">Especialidades</h4>'],
    [/<h4 class="font-semibold text-white mb-6">Connect<\/h4>/g, '<h4 class="font-semibold text-white mb-6">Contacto</h4>'],
    [/>Web Design</g, '>Diseño Web<'],
    [/>Development</g, '>Desarrollo Frontend<'],
    [/>SEO Optimization</g, '>Optimización SEO<'],
    [/>Brand Identity</g, '>Identidad de Marca<'],
    [/All rights reserved\./g, 'Todos los derechos reservados.']
];

function translateFooter(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            translateFooter(fullPath);
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
                console.log(`Translated footer in ${fullPath}`);
            }
        }
    }
}

translateFooter('./es');
