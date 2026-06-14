const fs = require('fs');

const replacementsPortafolio = [
    [/Aura <span/g, 'Portafolio <span'],
    [/Showcase<\/span>/g, 'Aura</span>'],
    [/A curated selection of our finest work\. Where technical complexity meets visual elegance\./g, 'Una selección curada de nuestro mejor trabajo. Donde la complejidad técnica se encuentra con la elegancia visual.'],
    [/>All Projects</g, '>Todos los Proyectos<'],
    [/>Branding</g, '>Marca<'],
    [/On-Demand Service/g, 'Servicio On-Demand'],
    [/Here to mend your world with care and a smile\. A complete mobile platform for on-demand handyman services, task scheduling, and service history tracking\./g, 'Una plataforma móvil completa para servicios de mantenimiento bajo demanda, programación de tareas y seguimiento del historial de servicios.'],
    [/Culinary Brand/g, 'Marca Culinaria'],
    [/It is not just food\. It is a ceremony\. An immersive, cinematic landing page for a limited-edition culinary experience, focusing on storytelling and exclusivity\./g, 'No es solo comida. Es una ceremonia. Una landing page inmersiva y cinematográfica para una experiencia culinaria exclusiva, centrada en el storytelling y la exclusividad.'],
    [/MedTech/g, 'Tecnología Médica'],
    [/Streamlining complex medical research data into an intuitive interface\. Features patient cohort tracking, real-time trial analytics, and secure data management\./g, 'Simplificando datos complejos de investigación médica en una interfaz intuitiva. Cuenta con seguimiento de cohortes de pacientes, analíticas de ensayos en tiempo real y gestión segura de datos.'],
    [/SaaS Platform/g, 'Plataforma SaaS'],
    [/Data Refined, Deeper Insights Defined\. A futuristic analytics landing page focusing on transforming raw data into meaningful business decisions\./g, 'Datos refinados, insights más profundos definidos. Una landing page de analítica futurista centrada en transformar datos sin procesar en decisiones comerciales significativas.'],
    [/Recruitment Portal/g, 'Portal de Reclutamiento'],
    [/Connecting experienced closers with verified Web3 opportunities\. A high-performance hiring ecosystem with automated filtering and premium dark UI\./g, 'Conectando cerradores experimentados con oportunidades verificadas de Web3. Un ecosistema de contratación de alto rendimiento con filtrado automatizado y una interfaz de usuario oscura premium.'],
    [/Energy Tech/g, 'Tecnología Energética'],
    [/Solar Power management interface ensuring electricity readiness\. Features 3D house visualization, weather-resistant battery monitoring, and efficiency tracking\./g, 'Interfaz de gestión de energía solar que garantiza la disponibilidad de electricidad. Cuenta con visualización de casas en 3D, monitoreo de baterías resistente a la intemperie y seguimiento de la eficiencia.']
];

let content = fs.readFileSync('es/portafolio.html', 'utf8');
for (const [regex, replacement] of replacementsPortafolio) {
    content = content.replace(regex, replacement);
}
fs.writeFileSync('es/portafolio.html', content, 'utf8');
console.log('Translated portafolio.html');
