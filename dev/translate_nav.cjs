const fs = require('fs');
const path = require('path');

const replacements = [
    [/<title>Aura \| High-Performance Web Design &amp; Development<\/title>/g, '<title>Diseño Web en Medellín | Agencia SEO y Desarrollo | AuraWebs</title>'],
    [/data-text="Home"/g, 'data-text="Inicio"'],
    [/>Home<\/span>/g, '>Inicio</span>'],
    [/>Home<\/a>/g, '>Inicio</a>'],
    [/data-text="Services"/g, 'data-text="Servicios"'],
    [/>Services<\/span>/g, '>Servicios</span>'],
    [/>Services<\/a>/g, '>Servicios</a>'],
    [/data-text="Showcase"/g, 'data-text="Portafolio"'],
    [/>Showcase<\/span>/g, '>Portafolio</span>'],
    [/>Showcase<\/a>/g, '>Portafolio</a>'],
    [/data-text="FAQ"/g, 'data-text="Preguntas Frecuentes"'],
    [/>FAQ<\/span>/g, '>Preguntas Frecuentes</span>'],
    [/>FAQ<\/a>/g, '>Preguntas Frecuentes</a>'],
    [/data-text="Let&#x27;s Talk"/g, 'data-text="Hablemos"'],
    [/>Let&#x27;s Talk<\/span>/g, '>Hablemos</span>'],
    [/>Start Project<\/a>/g, '>Iniciar Proyecto</a>']
];

function translateNav(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            translateNav(fullPath);
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
                console.log(`Translated nav in ${fullPath}`);
            }
        }
    }
}

translateNav('./es');
