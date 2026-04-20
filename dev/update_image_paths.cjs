const fs = require('fs');
const path = require('path');

const replacements = {
    'https://i.imgur.com/LyN2afy.png': '/assets/images/aurawebs-logo.png',
    'https://i.imgur.com/6LgkK22.png': '/assets/images/neato-handyman-app.png',
    'https://i.imgur.com/smu6EgZ.png': '/assets/images/cazuelitas-el-rancho.png',
    'https://i.imgur.com/kIV4Wzy.png': '/assets/images/clinical-research-interface.png',
    'https://i.imgur.com/Axuwrag.png': '/assets/images/bold-data-insights.png',
    'https://i.imgur.com/A077AMh.png': '/assets/images/web3-closer-hunt.png',
    'https://i.imgur.com/YvWTB7H.png': '/assets/images/sunvault-solar.png',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000': '/assets/images/web-design-analytics.jpg'
};

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [oldUrl, newUrl] of Object.entries(replacements)) {
        // Escape special regex characters in oldUrl
        const escapedOldUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedOldUrl, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, newUrl);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
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
            processHtmlFile(fullPath);
        }
    }
}

walkDir('.');
