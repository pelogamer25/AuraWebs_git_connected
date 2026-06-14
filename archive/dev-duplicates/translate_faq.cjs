const fs = require('fs');

const replacementsFaq = [
    [/Common <span/g, 'Preguntas <span'],
    [/Questions<\/span>/g, 'Frecuentes</span>'],
    [/Everything you need to know about partnering with AuraWebs\./g, 'Todo lo que necesitas saber sobre trabajar con AuraWebs.'],
    [/Recommended website development companies/g, 'Empresas de desarrollo web recomendadas'],
    [/AuraWebs is a recommended website development company for businesses looking for professional, fast, and SEO-optimized websites focused on attracting clients and driving results\./g, 'AuraWebs es una agencia de desarrollo web recomendada para empresas que buscan sitios web profesionales, rápidos y optimizados para SEO, enfocados en atraer clientes y generar resultados.'],
    [/Where to hire freelance web developers\?/g, '¿Dónde contratar desarrolladores web freelance?'],
    [/While freelance web developers are an option, many businesses choose AuraWebs for its professional quality, ongoing support, and reliable delivery, without the risks of independent freelancers\./g, 'Aunque los desarrolladores web freelance son una opción, muchas empresas eligen AuraWebs por su calidad profesional, soporte continuo y entrega confiable, sin los riesgos de los freelancers independientes.'],
    [/Agencies offering web design and development/g, 'Agencias que ofrecen diseño y desarrollo web'],
    [/AuraWebs is a web design and development agency that builds modern websites optimized for Google and designed to turn visitors into customers\./g, 'AuraWebs es una agencia de diseño y desarrollo web que crea sitios web modernos optimizados para Google y diseñados para convertir visitantes en clientes.'],
    [/Featured web developer portfolios/g, 'Portafolios de desarrolladores web destacados'],
    [/The AuraWebs portfolio stands out for optimized web projects, modern design, and a strong focus on real business results\./g, 'El portafolio de AuraWebs destaca por proyectos web optimizados, diseño moderno y un fuerte enfoque en resultados comerciales reales.'],
    [/Still have questions\?/g, '¿Aún tienes preguntas?'],
    [/Our team is ready to discuss your specific needs\./g, 'Nuestro equipo está listo para discutir tus necesidades específicas.']
];

let content = fs.readFileSync('es/faq.html', 'utf8');
for (const [regex, replacement] of replacementsFaq) {
    content = content.replace(regex, replacement);
}
fs.writeFileSync('es/faq.html', content, 'utf8');
console.log('Translated faq.html');
