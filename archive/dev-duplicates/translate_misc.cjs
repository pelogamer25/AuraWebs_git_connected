const fs = require('fs');
const path = require('path');

const replacements = [
    [/>Start Project<\/a>/g, '>Iniciar Proyecto</a>'],
    [/>Let&#x27;s Talk<\/span>/g, '>Hablemos</span>'],
    [/>Let&#x27;s Talk<\/a>/g, '>Hablemos</a>']
];

function translateMisc(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            translateMisc(fullPath);
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
                console.log(`Translated misc in ${fullPath}`);
            }
        }
    }
}

translateMisc('./es');
