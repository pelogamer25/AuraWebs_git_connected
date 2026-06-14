const fs = require('fs');

const replacementsMap = [
    [/Site <span/g, 'Mapa del <span'],
    [/Map<\/span>/g, 'Sitio</span>'],
    [/An overview of the available content on AuraWebs\./g, 'Una visión general del contenido disponible en AuraWebs.'],
    [/Main Pages/g, 'Páginas Principales'],
    [/>Home</g, '>Inicio<'],
    [/>Services</g, '>Servicios<'],
    [/>Showcase</g, '>Portafolio<'],
    [/>Contact Us</g, '>Contacto<'],
    [/>FAQ</g, '>Preguntas Frecuentes<'],
    [/>Web Development</g, '>Desarrollo Web<'],
    [/>App Development</g, '>Desarrollo de Apps<'],
    [/>Analytics</g, '>Analítica<'],
    [/>Projects</g, '>Proyectos<'],
    [/>Legal &amp; Support</g, '>Legal y Soporte<'],
    [/>Privacy Policy</g, '>Política de Privacidad<'],
    [/>Terms of Service</g, '>Términos de Servicio<'],
    [/>Sitemap</g, '>Mapa del Sitio<']
];

let content = fs.readFileSync('es/mapa-del-sitio.html', 'utf8');
for (const [regex, replacement] of replacementsMap) {
    content = content.replace(regex, replacement);
}
fs.writeFileSync('es/mapa-del-sitio.html', content, 'utf8');
console.log('Translated mapa-del-sitio.html');
