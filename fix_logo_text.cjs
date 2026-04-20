const fs = require('fs');

let content = fs.readFileSync('es/index.html', 'utf8');
content = content.replace(/>Medellín<span class="font-light opacity-80">Webs<\/span><\/span>/g, '>Aura<span class="font-light opacity-80">Webs</span></span>');
content = content.replace(/>Medellín<span class="font-light opacity-80"/g, '>Aura<span class="font-light opacity-80"');
fs.writeFileSync('es/index.html', content, 'utf8');
console.log('Fixed AuraWebs logo text in index.html');
