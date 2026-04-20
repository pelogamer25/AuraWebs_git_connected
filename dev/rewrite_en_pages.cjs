const fs = require('fs');

const servicesMain = `
<main class="flex-grow relative z-10">
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center mb-24">
                <h1 class="text-5xl md:text-6xl font-bold mb-6">Our <span class="inline-block bg-clip-text text-transparent bg-gradient-to-r from-aura-purple via-aura-magenta to-aura-cyan animate-gradient-x ">Services &amp; Pricing</span></h1>
                <p class="text-xl text-gray-400">Transparent, structured, and scalable solutions for businesses of all sizes. Find the right package to elevate your digital presence.</p>
            </div>

            <!-- Core Services Breakdown -->
            <div class="mb-32">
                <h2 class="text-3xl font-bold text-center mb-12 text-white">Comprehensive <span class="text-aura-cyan">Digital Capabilities</span></h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Service 1 -->
                    <div class="glass-panel p-8 rounded-2xl border border-white/5">
                        <div class="w-12 h-12 rounded-lg bg-aura-purple/20 flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-aura-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                        </div>
                        <h3 class="text-2xl font-bold mb-3 text-white">Custom Web Architecture</h3>
                        <p class="text-gray-400 mb-4 text-sm leading-relaxed">We develop using modern stacks (React, Next.js, Node.js) to ensure your website is lightning fast, highly secure, and built to scale.</p>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-purple rounded-full mr-2"></span> Single Page Applications (SPAs)</li>
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-purple rounded-full mr-2"></span> Headless CMS Integration</li>
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-purple rounded-full mr-2"></span> Custom Back-End Logic</li>
                        </ul>
                    </div>
                    <!-- Service 2 -->
                    <div class="glass-panel p-8 rounded-2xl border border-white/5">
                        <div class="w-12 h-12 rounded-lg bg-aura-magenta/20 flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-aura-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <h3 class="text-2xl font-bold mb-3 text-white">E-Commerce Development</h3>
                        <p class="text-gray-400 mb-4 text-sm leading-relaxed">Turn traffic into revenue. We build frictionless, high-converting online stores that provide an exceptional shopping experience.</p>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-magenta rounded-full mr-2"></span> Shopify / WooCommerce / Custom</li>
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-magenta rounded-full mr-2"></span> Payment Gateway Integrations</li>
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-magenta rounded-full mr-2"></span> Inventory Management Systems</li>
                        </ul>
                    </div>
                    <!-- Service 3 -->
                    <div class="glass-panel p-8 rounded-2xl border border-white/5">
                        <div class="w-12 h-12 rounded-lg bg-aura-cyan/20 flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-aura-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <h3 class="text-2xl font-bold mb-3 text-white">Technical SEO &amp; Analytics</h3>
                        <p class="text-gray-400 mb-4 text-sm leading-relaxed">Dominate search rankings with code-level optimization. We ensure your site is readable by Google and optimized for peak performance.</p>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-cyan rounded-full mr-2"></span> Schema Markup &amp; Meta Strategy</li>
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-cyan rounded-full mr-2"></span> Core Web Vitals Optimization</li>
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-aura-cyan rounded-full mr-2"></span> GA4 &amp; Behavioral Tracking</li>
                        </ul>
                    </div>
                    <!-- Service 4 -->
                    <div class="glass-panel p-8 rounded-2xl border border-white/5">
                        <div class="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                        </div>
                        <h3 class="text-2xl font-bold mb-3 text-white">Brand &amp; UI/UX Design</h3>
                        <p class="text-gray-400 mb-4 text-sm leading-relaxed">Don't just look good; feel right to your users. We design interfaces that tell your story while maintaining logical user flows.</p>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span> High-Fidelity Wireframes</li>
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span> Interactive Prototyping</li>
                            <li class="flex items-center"><span class="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span> Visual Identity Kits</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Packages -->
            <div class="mb-20">
                <h2 class="text-3xl font-bold text-center mb-4 text-white">Investment <span class="text-aura-magenta">Packages</span></h2>
                <p class="text-center text-gray-400 mb-12 max-w-2xl mx-auto">We offer clear-cut deliverables so you know exactly what value you are getting. Choose the tier that matches your current business stage.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    <!-- Package 1 -->
                    <div class="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-aura-purple/30 transition-all">
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Startup Presence</h3>
                            <p class="text-sm text-gray-400 mb-6">Perfect for new businesses needing a reliable, professional anchor online.</p>
                            <div class="text-4xl font-black text-white mb-8">From $900</div>
                            <ul class="space-y-3 mb-8 text-sm text-gray-300">
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-purple mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Up to 5 Custom Pages</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-purple mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Mobile Responsive Design</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-purple mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Basic On-Page SEO</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-purple mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Contact Forms &amp; Lead Capture</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-purple mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> 2 Rounds of Revisions</li>
                            </ul>
                        </div>
                        <a href="/en/contact.html" class="block w-full py-3 px-6 text-center rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all">Select Package</a>
                    </div>

                    <!-- Package 2 -->
                    <div class="glass-panel p-8 rounded-2xl border-2 border-aura-purple relative flex flex-col justify-between transform md:-translate-y-4 shadow-[0_0_40px_rgba(124,58,237,0.2)]">
                        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-aura-purple to-aura-magenta text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Corporate Growth</h3>
                            <p class="text-sm text-gray-400 mb-6">Designed for scale. Ideal for growing businesses needing performance and active lead gen.</p>
                            <div class="text-4xl font-black text-white mb-8">From $2,500</div>
                            <ul class="space-y-3 mb-8 text-sm text-gray-300">
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-magenta mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Up to 15 Custom Pages</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-magenta mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Advanced technical SEO &amp; Schema</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-magenta mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> CMS Integration (Blog/Portfolio)</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-magenta mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> GA4 Analytics Setup</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-magenta mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Priority Support &amp; Maintenance</li>
                            </ul>
                        </div>
                        <a href="/en/contact.html" class="block w-full py-3 px-6 text-center rounded-full bg-gradient-to-r from-aura-purple to-aura-magenta text-white font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-105 transition-all">Select Package</a>
                    </div>

                    <!-- Package 3 -->
                    <div class="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-aura-cyan/30 transition-all">
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Custom SaaS/Platform</h3>
                            <p class="text-sm text-gray-400 mb-6">Fully bespoke applications, complex e-commerce, or custom SaaS dashboards with unique specs.</p>
                            <div class="text-4xl font-black text-white mb-8">Let's Quote</div>
                            <ul class="space-y-3 mb-8 text-sm text-gray-300">
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Web Apps / SaaS Dashboards</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> API &amp; Database Engineering</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Custom Authentication Models</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Enterprise E-Commerce</li>
                                <li class="flex items-center"><svg class="w-4 h-4 text-aura-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Dedicated Project Manager</li>
                            </ul>
                        </div>
                        <a href="/en/contact.html" class="block w-full py-3 px-6 text-center rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all">Request Proposal</a>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-12 bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 class="text-2xl font-bold text-white mb-2">Not sure what you need?</h3>
                <p class="text-gray-400 mb-6">Let's hop on a 20-minute discovery call to map out exactly what will drive results for your specific industry.</p>
                <a href="/en/contact.html" class="inline-flex font-semibold text-aura-purple hover:text-aura-cyan transition-colors items-center">
                    Talk to an Architect <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>

        </div>
    </div>
</main>
`;

const webDesignMain = `
<main class="flex-grow relative z-10">
    <!-- Hero / Hook Section -->
    <div class="pt-32 pb-16 relative">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-aura-purple/20 via-transparent to-transparent opacity-50"></div>
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-4xl mx-auto text-center mb-16">
                <div class="inline-flex items-center px-4 py-2 rounded-full border border-aura-cyan/30 bg-aura-cyan/10 text-aura-cyan text-sm font-semibold mb-6 uppercase tracking-wider">
                    Stop Losing Customers to Ugly, Slow Websites
                </div>
                <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                    We Build <span class="bg-clip-text text-transparent bg-gradient-to-r from-aura-purple to-aura-cyan">Sales-Generating Machines</span> Disguised as Websites.
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    Most web design agencies sell you "pretty". We engineer high-converting digital assets proven to capture leads, command authority, and close deals globally.
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="/en/contact.html" class="px-8 py-4 text-lg font-bold text-white bg-aura-purple hover:bg-aura-magenta transition-all rounded-full shadow-[0_0_30px_rgba(124,58,237,0.5)] transform hover:scale-105">
                        Get Your Free Conversion Audit
                    </a>
                    <a href="/en/showcase.html" class="px-8 py-4 text-lg font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all rounded-full">
                        See Client Results
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- The Problem & Solution -->
    <div class="py-20 bg-black/50 border-y border-white/5">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-tr from-aura-magenta/40 to-aura-purple/40 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div class="relative glass-panel rounded-2xl border border-white/10 overflow-hidden transform transition-all group-hover:-translate-y-2">
                        <img src="/assets/images/boldata.png" alt="High Conversion Dashboard Example" class="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
                <div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Traffic Means Nothing if They <span class="text-aura-magenta">Don't Buy.</span></h2>
                    <p class="text-gray-400 text-lg mb-6 leading-relaxed">
                        If your current website loads slowly, looks dated, or confuses users, you are actively burning marketing dollars. In today's digital landscape, users judge your business credibility in exactly 0.05 seconds.
                    </p>
                    <p class="text-gray-400 text-lg mb-8 leading-relaxed">
                        At AuraWebs, we fuse neuromarketing, psychological pricing, and bleeding-edge React architecture to build websites that guide users effortlessly to the checkout button.
                    </p>
                    
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div class="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center mr-4 mt-1"><svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
                            <p class="text-white"><strong>Conversion Rate Optimization (CRO):</strong> Data-backed micro-interactions and heat-map tested layouts.</p>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center mr-4 mt-1"><svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
                            <p class="text-white"><strong>Laser-Targeted SEO Context:</strong> Native code structure that Google loves, rocketing you up search rankings.</p>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center mr-4 mt-1"><svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
                            <p class="text-white"><strong>Zero-Friction UX:</strong> Eliminating every objection or obstacle between your prospect and your contact form.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Trust / Outcomes Section -->
    <div class="py-24">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-5xl font-bold text-center text-white mb-16">The AuraWebs <span class="text-aura-cyan">Advantage</span></h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center p-8 rounded-2xl glass-panel border border-white/5 hover:border-aura-purple/30 transition-colors">
                    <div class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-aura-purple to-aura-magenta mb-4">40%</div>
                    <h3 class="text-xl font-bold text-white mb-2">Average Bounce Rate Drop</h3>
                    <p class="text-gray-400 text-sm">By speeding up load times and matching user intent immediately.</p>
                </div>
                <div class="text-center p-8 rounded-2xl glass-panel border border-white/5 hover:border-aura-cyan/30 transition-colors">
                    <div class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-aura-cyan to-blue-500 mb-4">3x</div>
                    <h3 class="text-xl font-bold text-white mb-2">Lead Multiplier</h3>
                    <p class="text-gray-400 text-sm">Through strategic call-to-actions and persuasive, benefit-driven copywriting.</p>
                </div>
                <div class="text-center p-8 rounded-2xl glass-panel border border-white/5 hover:border-aura-purple/30 transition-colors">
                    <div class="text-5xl font-black text-white mb-4">A+</div>
                    <h3 class="text-xl font-bold text-white mb-2">Global Credibility</h3>
                    <p class="text-gray-400 text-sm">Premium aesthetic design that positions you instantly as an industry leader.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Objection Handling CTA -->
    <div class="container mx-auto px-6 pb-24">
        <div class="glass-panel rounded-3xl p-12 text-center border border-aura-purple/50 relative overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.15)]">
            <div class="absolute inset-0 bg-gradient-to-b from-aura-purple/20 to-transparent"></div>
            <div class="relative z-10">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Stop Leaving Money on the Table.</h2>
                <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    Your competitors are investing heavily in digital real estate. It's time to outrank, out-design, and out-sell them. 
                </p>
                <a href="/en/contact.html" class="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-aura-bg transition-all duration-300 bg-white rounded-full hover:bg-gray-200 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    Claim Your Free Strategy Call
                </a>
                <p class="mt-6 text-sm text-gray-400">No commitment. 100% actionable insights for your business.</p>
            </div>
        </div>
    </div>
</main>
`;

function replaceMainTag(filePath, newMainContent) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Explicit string splitting without regex to bypass parsing bugs
    const mainStart = html.indexOf('<main');
    if (mainStart !== -1) {
        const startEnd = html.indexOf('>', mainStart) + 1;
        const mainEnd = html.indexOf('</main>', startEnd);
        if (mainEnd !== -1) {
            const topHtml = html.substring(0, startEnd - 5); // remove the <main> part entirely since my payload includes it
            const bottomHtml = html.substring(mainEnd + 7);
            const finalHtml = topHtml + newMainContent + bottomHtml;
            fs.writeFileSync(filePath, finalHtml, 'utf8');
            console.log("Successfully updated " + filePath);
        } else {
             console.log("Could not find </main> tag in " + filePath);
        }
    } else {
        console.log("Could not find <main> tag in " + filePath);
    }
}

replaceMainTag('en/services.html', servicesMain);
replaceMainTag('en/web-design.html', webDesignMain);
