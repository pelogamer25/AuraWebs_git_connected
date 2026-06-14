const fs = require('fs');
const path = require('path');

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove Tailwind CDN script
    const cdnRegex = /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/g;
    if (cdnRegex.test(content)) {
        content = content.replace(cdnRegex, '');
        modified = true;
    }

    // Remove Tailwind config script
    const configRegex = /<script>\s*tailwind\.config = {[\s\S]*?}\s*<\/script>\s*/g;
    if (configRegex.test(content)) {
        content = content.replace(configRegex, '');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Removed Tailwind CDN from ${filePath}`);
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
