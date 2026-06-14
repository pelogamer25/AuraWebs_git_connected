const fs = require('fs');
const path = require('path');

const altReplacementsEs = [
    [/alt="AuraWebs Logo"/g, 'alt="AuraWebs - Agencia de Diseño Web en Medellín"'],
    [/alt="Neato Handyman App"/g, 'alt="Neato Handyman App - Desarrollo Web y Apps en Medellín"'],
    [/alt="Cazuelitas El Rancho"/g, 'alt="Cazuelitas El Rancho - Diseño de Tienda Online y Branding"'],
    [/alt="Clinical Research Interface"/g, 'alt="Clinical Research Interface - Desarrollo de Software y Dashboards"'],
    [/alt="Bold Data Insights"/g, 'alt="Bold Data Insights - Diseño de Plataformas SaaS en Medellín"'],
    [/alt="Web3 Closer Hunt"/g, 'alt="Web3 Closer Hunt - Desarrollo Web Avanzado"'],
    [/alt="SunVault Solar"/g, 'alt="SunVault Solar - Diseño Web Interactivo"']
];

const altReplacementsEn = [
    [/alt="AuraWebs Logo"/g, 'alt="AuraWebs - High-Performance Web Design Agency"'],
    [/alt="Neato Handyman App"/g, 'alt="Neato Handyman App - Mobile App Development Portfolio"'],
    [/alt="Cazuelitas El Rancho"/g, 'alt="Cazuelitas El Rancho - E-commerce Web Design Portfolio"'],
    [/alt="Clinical Research Interface"/g, 'alt="Clinical Research Interface - Custom Software Dashboard"'],
    [/alt="Bold Data Insights"/g, 'alt="Bold Data Insights - SaaS Platform Design Portfolio"'],
    [/alt="Web3 Closer Hunt"/g, 'alt="Web3 Closer Hunt - High-Performance Web Application"'],
    [/alt="SunVault Solar"/g, 'alt="SunVault Solar - Interactive Web Design Portfolio"']
];

function processDir(dir, replacements) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath, replacements);
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
                console.log(`Updated alts in ${fullPath}`);
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
        for (const [regex, replacement] of altReplacementsEn) {
            if (regex.test(content)) {
                content = content.replace(regex, replacement);
                modified = true;
            }
        }
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated alts in ${file}`);
        }
    }
}

processDir('./es', altReplacementsEs);
processDir('./en', altReplacementsEn);
