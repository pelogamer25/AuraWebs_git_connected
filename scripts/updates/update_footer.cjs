const fs = require('fs');
const path = require('path');

const replacementDiv = `<div class="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
  <a class="hover:text-gray-400 transition-colors" href="/en/privacy.html">Privacy Policy (EN)</a>
  <a class="hover:text-gray-400 transition-colors" href="/en/terms.html">Terms of Service (EN)</a>
  <a class="hover:text-gray-400 transition-colors" href="/es/privacidad.html">Privacidad (ES)</a>
  <a class="hover:text-gray-400 transition-colors" href="/es/terminos.html">Términos (ES)</a>
</div>`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Match both English and Spanish copyright texts
    const regex = /(<p>(?:[\s\S]*?)(?:AuraWebs Agency\. All rights reserved\.|AuraWebs Agency\. Todos los derechos reservados\.|Agencia AuraWebs\. Todos los derechos reservados\.)(?:[\s\S]*?)<\/p>\s*)<div[^>]*>[\s\S]*?<\/div>(\s*<\/div>\s*<\/div>\s*<\/footer>)/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, `$1${replacementDiv}$2`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    } else {
        console.log(`Could not find footer in ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
                walkDir(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            processFile(fullPath);
        }
    }
}

walkDir('.');
