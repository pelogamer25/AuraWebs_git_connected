const fs = require('fs');
const content = fs.readFileSync('es/index.html', 'utf8');
const matches = content.match(/>([^<]+)</g);
if (matches) {
    const texts = matches.map(m => m.slice(1, -1).trim()).filter(t => t.length > 0);
    console.log(texts.slice(0, 50).join('\n'));
}
