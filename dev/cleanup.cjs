const fs = require('fs');
const path = require('path');

const devDir = path.join(__dirname, 'dev');
if (!fs.existsSync(devDir)) {
    fs.mkdirSync(devDir);
}

const filesToMove = [];
const allFiles = fs.readdirSync(__dirname);

for (const file of allFiles) {
    if (file.endsWith('.cjs') || file === 'reorganize.js') {
        filesToMove.push(file);
    }
}

for (const file of filesToMove) {
    fs.renameSync(path.join(__dirname, file), path.join(devDir, file));
    console.log(`Moved: ${file}`);
}
