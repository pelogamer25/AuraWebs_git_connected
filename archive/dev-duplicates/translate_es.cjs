const fs = require('fs');
const path = require('path');

// 1. Fix Footers in EN and ES
const enFooter = `<div class="flex space-x-6 mt-4 md:mt-0">
  <a class="hover:text-gray-400 transition-colors" href="/en/privacy.html">Privacy Policy</a>
  <a class="hover:text-gray-400 transition-colors" href="/en/terms.html">Terms of Service</a>
</div>`;

const esFooter = `<div class="flex space-x-6 mt-4 md:mt-0">
  <a class="hover:text-gray-400 transition-colors" href="/es/privacidad.html">Política de Privacidad</a>
  <a class="hover:text-gray-400 transition-colors" href="/es/terminos.html">Términos de Servicio</a>
</div>`;

function fixFooters(dir, isEs) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
                fixFooters(fullPath, isEs);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const regex = /<div class="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">[\s\S]*?<\/div>/g;
            if (regex.test(content)) {
                content = content.replace(regex, isEs ? esFooter : enFooter);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed footer in ${fullPath}`);
            }
        }
    }
}

fixFooters('./en', false);
fixFooters('./es', true);

// 2. Translate and SEO Optimize es/index.html
const esIndexPath = './es/index.html';
if (fs.existsSync(esIndexPath)) {
    let content = fs.readFileSync(esIndexPath, 'utf8');

    const replacements = [
        // Meta & Title
        [/<html lang="en"/g, '<html lang="es"'],
        [/<title>Aura \| High-Performance Web Design & Development<\/title>/g, '<title>Diseño Web en Medellín | Agencia SEO y Desarrollo | AuraWebs</title>'],
        [/content="Aura Webs is a web design and development agency creating high-performance, SEO-optimized websites that help businesses attract clients and grow online."/g, 'content="AuraWebs es una agencia de diseño web en Medellín. Creamos páginas web de alto rendimiento, tiendas online y estrategias SEO para hacer crecer tu negocio."'],
        [/content="web design, web development, SEO, agency, react, digital experiences, frontend, ui\/ux"/g, 'content="diseño web en medellín, desarrollo web medellín, agencia seo medellín, diseño de páginas web, react, frontend"'],
        [/property="og:title"\s*content="Aura \| High-Performance Web Design & Development"/g, 'property="og:title" content="Diseño Web en Medellín | Agencia SEO y Desarrollo | AuraWebs"'],
        [/property="twitter:title"\s*content="Aura \| High-Performance Web Design & Development"/g, 'property="twitter:title" content="Diseño Web en Medellín | Agencia SEO y Desarrollo | AuraWebs"'],
        
        // Nav
        [/data-text="Home"/g, 'data-text="Inicio"'],
        [/>Home</g, '>Inicio<'],
        [/data-text="Services"/g, 'data-text="Servicios"'],
        [/>Services</g, '>Servicios<'],
        [/data-text="Showcase"/g, 'data-text="Portafolio"'],
        [/>Showcase</g, '>Portafolio<'],
        [/data-text="FAQ"/g, 'data-text="Preguntas Frecuentes"'],
        [/>FAQ</g, '>Preguntas Frecuentes<'],
        [/data-text="Let&#x27;s Talk"/g, 'data-text="Hablemos"'],
        [/>Let&#x27;s Talk</g, '>Hablemos<'],
        [/>Start Project</g, '>Iniciar Proyecto<'],

        // Hero
        [/>Available for new projects</g, '>Disponibles para nuevos proyectos<'],
        [/>We build</g, '>Diseño Web en<'],
        [/>Aura</g, '>Medellín<'],
        [/>Your business deserves a website that sells\. We blend deep aesthetic mastery with technical SEO precision\.</g, '>Tu negocio merece una página web que venda. Combinamos diseño estético de vanguardia con precisión técnica y SEO local para destacar tu marca.<'],
        [/data-text="View Showcase"/g, 'data-text="Ver Portafolio"'],
        [/>View Showcase</g, '>Ver Portafolio<'],
        [/>Start a Project</g, '>Iniciar Proyecto<'],

        // Features
        [/>Visionary Design</g, '>Diseño Web Vanguardista<'],
        [/>We don&#x27;t just design websites; we craft immersive brand environments using glassmorphism and depth\.</g, '>No solo hacemos páginas web; creamos experiencias digitales inmersivas que capturan la esencia de tu marca y convierten visitantes en clientes.<'],
        [/>React Architecture</g, '>Desarrollo Web a Medida<'],
        [/>Built on modern stacks\. Fast, scalable, and animated with precision-engineered code\.</g, '>Construimos con tecnologías modernas como React. Sitios web rápidos, escalables y con animaciones de alta precisión.<'],
        [/>SEO Dominance</g, '>Posicionamiento SEO Local<'],
        [/>Technical SEO is baked in\. Structure, speed, and schema markup to rank you higher\.</g, '>El SEO técnico está integrado desde el inicio. Optimizamos la estructura y velocidad para que tu negocio domine las búsquedas en Medellín.<'],

        // Showcase
        [/>Selected </g, '>Proyectos <'],
        [/>Works</g, '>Destacados<'],
        [/>A glimpse into our digital craftsmanship\.</g, '>Un vistazo a nuestro trabajo en diseño y desarrollo web.<'],
        [/>View All Projects</g, '>Ver Todos los Proyectos<'],
        [/>On-Demand Service</g, '>Servicio On-Demand<'],
        [/>Here to mend your world with care and a smile\. A complete mobile platform for on-demand handyman services\.</g, '>Una plataforma móvil completa para servicios de mantenimiento bajo demanda, diseñada para una experiencia de usuario impecable.<'],
        [/>Culinary Brand</g, '>Marca Culinaria<'],
        [/>It is not just food\. It is a ceremony\. An immersive, cinematic landing page for a limited-edition culinary experience\.</g, '>No es solo comida, es una ceremonia. Una landing page inmersiva y cinematográfica para una experiencia culinaria exclusiva.<'],

        // Stats
        [/>Client Retention</g, '>Retención de Clientes<'],
        [/>Projects Live</g, '>Proyectos Activos<'],
        [/>Avg Traffic Growth</g, '>Crecimiento de Tráfico<'],
        [/>Support</g, '>Soporte<'],

        // CTA
        [/>Ready to </g, '>Impulsa tu <'],
        [/>Ascend\?</g, '>Presencia Digital<'],
        [/>Let&#x27;s transform your digital presence into a powerful asset\. Schedule a consultation with our senior architects today\.</g, '>Transformemos tu presencia online en un activo poderoso. Agenda una consultoría con nuestros expertos en diseño web hoy mismo.<'],
        [/>Start Your Journey</g, '>Comenzar Proyecto<'],

        // Footer
        [/>We build digital experiences that blend aesthetic mastery with technical precision\. Your business deserves a website that sells\.</g, '>Creamos experiencias digitales que combinan dominio estético con precisión técnica. Tu negocio merece una página web que venda.<'],
        [/>Explore</g, '>Explorar<'],
        [/>Expertise</g, '>Especialidades<'],
        [/>Connect</g, '>Contacto<'],
        [/>Web Design</g, '>Diseño Web<'],
        [/>Development</g, '>Desarrollo Frontend<'],
        [/>SEO Optimization</g, '>Optimización SEO<'],
        [/>Brand Identity</g, '>Identidad de Marca<'],
        [/>All rights reserved\.</g, '>Todos los derechos reservados.<']
    ];

    for (const [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
    }

    fs.writeFileSync(esIndexPath, content, 'utf8');
    console.log('Translated and SEO-optimized es/index.html');
}
