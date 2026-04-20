const fs = require('fs');
const path = require('path');

console.log('--- Fixing Homepage Structure ---');

// 1. Check if en/index.html exists
if (!fs.existsSync('en/index.html')) {
    console.error('en/index.html not found! Aborting.');
    process.exit(1);
}

// 2. Read en/index.html
let enIndexContent = fs.readFileSync('en/index.html', 'utf8');

// 3. Fix relative paths inside the new index.html (since it moves from /en/ to /)
enIndexContent = enIndexContent.replace(/\.\.\/styles\.css/g, '/styles.css');
enIndexContent = enIndexContent.replace(/\.\.\/script\.js/g, '/script.js');
enIndexContent = enIndexContent.replace(/href="\/en\/index\.html"/g, 'href="/"');
// Also update canonical & alternate
enIndexContent = enIndexContent.replace(/https:\/\/aurawebs\.site\/en\/index\.html/g, 'https://aurawebs.site/');

// 4. Overwrite index.html
fs.writeFileSync('index.html', enIndexContent, 'utf8');
console.log('✅ Overwrote index.html with the content of en/index.html (with fixed paths)');

// 5. Delete en/index.html and en/index.min.html (if it exists)
fs.unlinkSync('en/index.html');
console.log('✅ Deleted en/index.html');
if (fs.existsSync('en/index.min.html')) {
    fs.unlinkSync('en/index.min.html');
    console.log('✅ Deleted en/index.min.html');
}

// 6. Update all HTML files globally
let updatedFiles = [];

function updateLinksInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    if (content.includes('href="/en/index.html"')) {
        content = content.replace(/href="\/en\/index\.html"/g, 'href="/"');
        hasChanges = true;
    }
    
    // Some links might be 'href="/en/"'
    if (content.includes('href="/en/"')) {
        content = content.replace(/href="\/en\/"/g, 'href="/"');
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedFiles.push(filePath);
    }
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (file === 'node_modules' || file === '.git' || file === 'dev') continue; // skip dev scripts mostly, except we want to fix HTML
            processDirectory(fullPath);
        } else if (file.endsWith('.html')) {
            updateLinksInFile(fullPath);
        }
    }
}

processDirectory('.');

console.log('✅ Links updated in the following files:');
updatedFiles.forEach(f => console.log('  - ' + f));

console.log('--- Done ---');
