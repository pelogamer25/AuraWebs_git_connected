const fs = require('fs');

const replacementsServicios = [
    [/Our <span/g, 'Nuestras <span'],
    [/Expertise<\/span>/g, 'Especialidades</span>'],
    [/Comprehensive digital solutions engineered for growth, performance, and aesthetic impact\./g, 'Soluciones digitales integrales diseñadas para el crecimiento, rendimiento y el impacto estético.'],
    [/>UI\/UX Design</g, '>Diseño UI/UX<'],
    [/We craft intuitive, emotionally resonant interfaces\. From wireframing to high-fidelity prototypes, we ensure every pixel serves a purpose\./g, 'Creamos interfaces intuitivas y emocionalmente resonantes. Desde wireframes hasta prototipos de alta fidelidad, aseguramos que cada píxel tenga un propósito.'],
    [/>Design Systems</g, '>Sistemas de Diseño<'],
    [/>Interactive Prototyping</g, '>Prototipado Interactivo<'],
    [/>User Research</g, '>Investigación de Usuarios<'],
    [/>Web Development</g, '>Desarrollo Web<'],
    [/Modern frontend architecture using React and TypeScript\. Fast, secure, and scalable solutions built to handle traffic and transactions\./g, 'Arquitectura frontend moderna usando React y TypeScript. Soluciones rápidas, seguras y escalables construidas para manejar tráfico y transacciones.'],
    [/>React &amp; Next\.js</g, '>React y Next.js<'],
    [/>Headless CMS</g, '>CMS Headless<'],
    [/>API Integration</g, '>Integración de APIs<'],
    [/>Advanced SEO</g, '>SEO Avanzado<'],
    [/Data-driven strategies to dominate search results\. We optimize technical structure, content, and authority to drive organic growth\./g, 'Estrategias basadas en datos para dominar los resultados de búsqueda. Optimizamos la estructura técnica, el contenido y la autoridad para impulsar el crecimiento orgánico.'],
    [/>Technical Audits</g, '>Auditorías Técnicas<'],
    [/>On-Page Optimization</g, '>Optimización On-Page<'],
    [/>Content Strategy</g, '>Estrategia de Contenido<'],
    [/>App Development</g, '>Desarrollo de Apps<'],
    [/Progressive Web Apps \(PWA\) and cross-platform mobile solutions that provide native-like experiences on the web\./g, 'Aplicaciones Web Progresivas (PWA) y soluciones móviles multiplataforma que brindan experiencias similares a las nativas en la web.'],
    [/>React Native</g, '>React Native<'],
    [/>PWA Architecture</g, '>Arquitectura PWA<'],
    [/>Localization</g, '>Localización<'],
    [/Expanding your reach globally\. We implement multi-language support and cultural adaptation strategies\./g, 'Ampliando tu alcance a nivel mundial. Implementamos soporte multilingüe y estrategias de adaptación cultural.'],
    [/>i18n Implementation</g, '>Implementación i18n<'],
    [/>Multi-region SEO</g, '>SEO Multirregional<'],
    [/>Analytics</g, '>Analítica<'],
    [/Comprehensive tracking setup to understand user behavior and measure ROI accurately\./g, 'Configuración integral de seguimiento para comprender el comportamiento del usuario y medir el ROI con precisión.'],
    [/>GA4 Setup</g, '>Configuración GA4<'],
    [/>Custom Dashboards</g, '>Dashboards Personalizados<']
];

let content = fs.readFileSync('es/servicios.html', 'utf8');
for (const [regex, replacement] of replacementsServicios) {
    content = content.replace(regex, replacement);
}
fs.writeFileSync('es/servicios.html', content, 'utf8');
console.log('Translated servicios.html');
