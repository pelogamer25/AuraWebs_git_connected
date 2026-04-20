const fs = require('fs');
const path = require('path');

const replacementsEs = [
    // Fix Portafolio Portafolio in es/portafolio.html
    [/<h1 class="text-5xl md:text-7xl font-bold mb-6">Portafolio <span([^>]*)>Portafolio<\/span><\/h1>/, '<h1 class="text-5xl md:text-7xl font-bold mb-6">Proyectos de <span$1>Diseño Web</span></h1>'],
    // Fix Servicios in es/servicios.html
    [/<h1 class="text-5xl md:text-6xl font-bold mb-6">Nuestras <span([^>]*)>Especialidades<\/span><\/h1>/, '<h1 class="text-5xl md:text-6xl font-bold mb-6">Servicios de <span$1>Desarrollo Web</span></h1>'],
    // General SEO Schema Addition
];

const replacementsEn = [
    [/<h1 class="text-5xl md:text-7xl font-bold mb-6">Showcase <span([^>]*)>Aura<\/span><\/h1>/, '<h1 class="text-5xl md:text-7xl font-bold mb-6">Web Design <span$1>Portfolio</span></h1>'],
    [/<h1 class="text-5xl md:text-6xl font-bold mb-6">Our <span([^>]*)>Expertise<\/span><\/h1>/, '<h1 class="text-5xl md:text-6xl font-bold mb-6">Our <span$1>Services</span></h1>']
];

function updateHeadings() {
    // ES
    let portafolioEs = fs.readFileSync('es/portafolio.html', 'utf8');
    portafolioEs = portafolioEs.replace(/<h1 class="text-5xl md:text-7xl font-bold mb-6">Portafolio <span([^>]*)>Portafolio<\/span><\/h1>/, '<h1 class="text-5xl md:text-7xl font-bold mb-6 text-center">Proyectos de <span$1>Diseño Web</span></h1>');
    fs.writeFileSync('es/portafolio.html', portafolioEs);

    let serviciosEs = fs.readFileSync('es/servicios.html', 'utf8');
    serviciosEs = serviciosEs.replace(/<h1 class="text-5xl md:text-6xl font-bold mb-6">Nuestras <span([^>]*)>Especialidades<\/span><\/h1>/, '<h1 class="text-5xl md:text-6xl font-bold mb-6 text-center">Servicios de <span$1>Desarrollo Web</span></h1>');
    fs.writeFileSync('es/servicios.html', serviciosEs);

    if (fs.existsSync('en/showcase.html')) {
        let portEn = fs.readFileSync('en/showcase.html', 'utf8');
        portEn = portEn.replace(/<h1 class="text-5xl md:text-7xl font-bold mb-6">Showcase <span([^>]*)>Aura<\/span><\/h1>/, '<h1 class="text-5xl md:text-7xl font-bold mb-6 text-center">Web Design <span$1>Portfolio</span></h1>');
        fs.writeFileSync('en/showcase.html', portEn);
    }
}
updateHeadings();
console.log('Done updating headings');
