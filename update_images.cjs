const fs = require('fs');
const path = require('path');

const replacements = [
    [/aurawebs-logo\.png/g, 'novemodel.png'],
    [/clinical-research-interface\.png/g, 'gestadinamia.png'],
    [/web3-closer-hunt\.png/g, 'Web3.png'],
    [/sunvault-solar\.png/g, 'solar.png'],
    [/neato-handyman-app\.png/g, 'neato.png'],
    [/cazuelitas-el-rancho\.png/g, 'cazuelitas.png'],
    [/bold-data-insights\.png/g, 'boldata.png']
];

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
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
                console.log(`Updated images in ${fullPath}`);
            }
        }
    }
}

// Check root HTML too if any exist
const rootFiles = fs.readdirSync('.');
for (const file of rootFiles) {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        for (const [regex, replacement] of replacements) {
            if (regex.test(content)) {
                content = content.replace(regex, replacement);
                modified = true;
            }
        }
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated images in ${file}`);
        }
    }
}

processDir('./es');
processDir('./en');
