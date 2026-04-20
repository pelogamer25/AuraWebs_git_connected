const fs = require('fs');

const replacementsContacto = [
    [/Let&#x27;s Build <br\/>/g, 'Construyamos <br/>'],
    [/Something Great/g, 'Algo Increíble'],
    [/Ready to elevate your digital presence\? We are currently accepting new partnerships for Q4\. Tell us about your project, budget, and timeline\./g, '¿Listo para elevar tu presencia digital? Actualmente estamos aceptando nuevos proyectos. Cuéntanos sobre tu proyecto, presupuesto y plazos.'],
    [/Email Us/g, 'Envíanos un Correo'],
    [/Response time: &lt; 24 hours/g, 'Tiempo de respuesta: &lt; 24 horas'],
    [/WhatsApp Us/g, 'Escríbenos por WhatsApp'],
    [/Mon-Fri, 9am - 6pm EST/g, 'Lun-Vie, 9am - 6pm EST'],
    [/Full Name/g, 'Nombre Completo'],
    [/Business Email/g, 'Correo Electrónico'],
    [/Project Type/g, 'Tipo de Proyecto'],
    [/Web Design &amp; Development/g, 'Diseño y Desarrollo Web'],
    [/SEO &amp; Marketing/g, 'SEO y Marketing'],
    [/E-commerce/g, 'Comercio Electrónico'],
    [/Application Development/g, 'Desarrollo de Aplicaciones'],
    [/Other/g, 'Otro'],
    [/Project Details/g, 'Detalles del Proyecto'],
    [/Tell us about your goals\.\.\./g, 'Cuéntanos sobre tus objetivos...'],
    [/Send Message/g, 'Enviar Mensaje']
];

let content = fs.readFileSync('es/contacto.html', 'utf8');
for (const [regex, replacement] of replacementsContacto) {
    content = content.replace(regex, replacement);
}
fs.writeFileSync('es/contacto.html', content, 'utf8');
console.log('Translated contacto.html');
