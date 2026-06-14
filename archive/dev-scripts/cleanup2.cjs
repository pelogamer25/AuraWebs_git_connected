const fs = require('fs');
const path = require('path');

const allowedFiles = [
    'index.html', 'sitemap.xml', 'styles.css', 'script.js', 
    'robots.txt', 'assets', 'es', 'en', 'dev', 
    'package.json', 'package-lock.json', 'tailwind.config.js',
    'input.css', 'metadata.json', '.gitignore', 'migrated_prompt_history'
];

const root = process.cwd();
const allFiles = fs.readdirSync(root);

for (const file of allFiles) {
    if (!allowedFiles.includes(file)) {
        fs.renameSync(path.join(root, file), path.join(root, 'dev', 'old_' + file));
        console.log(`Moved extra item: ${file} to dev/old_${file}`);
    }
}
