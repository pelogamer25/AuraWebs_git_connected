const fs = require('fs');
const path = require('path');

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace header logo
    const headerLogoRegex = /<img src="(https:\/\/i\.imgur\.com\/LyN2afy\.png)" alt="AuraWebs Logo" class="w-10 h-10([^"]*)"\/>/g;
    if (headerLogoRegex.test(content)) {
        content = content.replace(headerLogoRegex, '<img src="$1" alt="AuraWebs Logo" width="40" height="40" class="w-10 h-10$2"/>');
        modified = true;
    }

    // Replace footer logo
    const footerLogoRegex = /<img src="(https:\/\/i\.imgur\.com\/LyN2afy\.png)" alt="AuraWebs Logo" class="w-8 h-8([^"]*)"\/>/g;
    if (footerLogoRegex.test(content)) {
        content = content.replace(footerLogoRegex, '<img src="$1" alt="AuraWebs Logo" width="32" height="32" loading="lazy" class="w-8 h-8$2"/>');
        modified = true;
    }

    // Replace showcase images
    const showcaseRegex = /<img src="(https:\/\/i\.imgur\.com\/(?:6LgkK22|smu6EgZ|kIV4Wzy|Axuwrag|A077AMh|YvWTB7H)\.png)" alt="([^"]+)" class="w-full h-full object-cover([^"]*)"\/>/g;
    if (showcaseRegex.test(content)) {
        content = content.replace(showcaseRegex, '<img src="$1" alt="$2" width="800" height="600" loading="lazy" class="w-full h-full object-cover$3"/>');
        modified = true;
    }

    // Replace unsplash image
    const unsplashRegex = /<img src="(https:\/\/images\.unsplash\.com\/photo-[^"]+)" alt="([^"]+)" class="rounded-xl w-full h-auto shadow-2xl"\s*\/>/g;
    if (unsplashRegex.test(content)) {
        content = content.replace(unsplashRegex, '<img src="$1" alt="$2" width="1000" height="667" loading="lazy" class="rounded-xl w-full h-auto shadow-2xl" />');
        modified = true;
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
