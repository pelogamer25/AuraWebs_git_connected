document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const languageRouteMap = {
    '/': { en: '/', es: '/es/index.html' },
    '/index.html': { en: '/', es: '/es/index.html' },
    '/contact.html': { en: '/en/contact.html', es: '/es/contacto.html' },
    '/faq.html': { en: '/en/faq.html', es: '/es/faq.html' },
    '/services.html': { en: '/en/services.html', es: '/es/servicios.html' },
    '/showcase.html': { en: '/en/showcase.html', es: '/es/portafolio.html' },
    '/sitemap.html': { en: '/en/sitemap.html', es: '/es/mapa-del-sitio.html' },
    '/en/index.html': { en: '/', es: '/es/index.html' },
    '/en/contact.html': { en: '/en/contact.html', es: '/es/contacto.html' },
    '/en/faq.html': { en: '/en/faq.html', es: '/es/faq.html' },
    '/en/privacy.html': { en: '/en/privacy.html', es: '/es/privacidad.html' },
    '/en/services.html': { en: '/en/services.html', es: '/es/servicios.html' },
    '/en/showcase.html': { en: '/en/showcase.html', es: '/es/portafolio.html' },
    '/en/sitemap.html': { en: '/en/sitemap.html', es: '/es/mapa-del-sitio.html' },
    '/en/terms.html': { en: '/en/terms.html', es: '/es/terminos.html' },
    '/en/web-design.html': { en: '/en/web-design.html', es: '/es/medellin.html' },
    '/es/index.html': { en: '/', es: '/es/index.html' },
    '/es/contacto.html': { en: '/en/contact.html', es: '/es/contacto.html' },
    '/es/faq.html': { en: '/en/faq.html', es: '/es/faq.html' },
    '/es/mapa-del-sitio.html': { en: '/en/sitemap.html', es: '/es/mapa-del-sitio.html' },
    '/es/medellin.html': { en: '/en/web-design.html', es: '/es/medellin.html' },
    '/es/portafolio.html': { en: '/en/showcase.html', es: '/es/portafolio.html' },
    '/es/privacidad.html': { en: '/en/privacy.html', es: '/es/privacidad.html' },
    '/es/servicios.html': { en: '/en/services.html', es: '/es/servicios.html' },
    '/es/terminos.html': { en: '/en/terms.html', es: '/es/terminos.html' }
  };
  const localizedRoutes = languageRouteMap[currentPath] || languageRouteMap['/'];

  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('nav');
  const navInner = navbar?.querySelector('.glass-panel');
  
  if (navbar && navInner) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.remove('py-6');
        navbar.classList.add('py-4');
        navInner.classList.remove('bg-opacity-30');
        navInner.classList.add('bg-opacity-60', 'shadow-lg', 'shadow-aura-purple/10');
      } else {
        navbar.classList.add('py-6');
        navbar.classList.remove('py-4');
        navInner.classList.add('bg-opacity-30');
        navInner.classList.remove('bg-opacity-60', 'shadow-lg', 'shadow-aura-purple/10');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  
  if (mobileMenuBtn && mobileMenuOverlay) {
    let isOpen = false;
    
    // The SVG for Menu and X
    const menuIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>`;
    const xIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;
    
    mobileMenuBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        mobileMenuOverlay.classList.remove('hidden');
        mobileMenuOverlay.classList.add('block');
        mobileMenuBtn.innerHTML = xIcon;
      } else {
        mobileMenuOverlay.classList.add('hidden');
        mobileMenuOverlay.classList.remove('block');
        mobileMenuBtn.innerHTML = menuIcon;
      }
    });
  }

  // 3. DecryptedText Effect
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const decryptedTexts = document.querySelectorAll('.decrypted-text');
  
  decryptedTexts.forEach(el => {
    const originalText = el.getAttribute('data-text') || el.textContent;
    const speed = parseInt(el.getAttribute('data-speed') || '30', 10);
    const useOriginalColors = el.getAttribute('data-original-colors') === 'true';
    
    let intervalId = null;
    let iterations = 0;
    
    const startScramble = () => {
      if (!useOriginalColors) {
        el.classList.add('text-aura-cyan');
      }
      iterations = 0;
      if (intervalId) clearInterval(intervalId);
      
      intervalId = setInterval(() => {
        el.textContent = originalText.split("").map((letter, index) => {
          if (index < iterations) {
            return originalText[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        }).join("");
        
        if (iterations >= originalText.length) {
          clearInterval(intervalId);
        }
        
        iterations += 1 / 3;
      }, speed);
    };
    
    const stopScramble = () => {
      if (!useOriginalColors) {
        el.classList.remove('text-aura-cyan');
      }
      if (intervalId) clearInterval(intervalId);
      el.textContent = originalText;
    };
    
    el.addEventListener('mouseenter', startScramble);
    el.addEventListener('mouseleave', stopScramble);
  });

  // 4. TypewriterText Effect
  const typewriterTexts = document.querySelectorAll('.typewriter-text');
  
  typewriterTexts.forEach(el => {
    const text = el.getAttribute('data-text') || '';
    const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
    const speed = parseInt(el.getAttribute('data-speed') || '50', 10);
    
    const contentEl = el.querySelector('.typewriter-content');
    const cursorEl = el.querySelector('.typewriter-cursor');
    
    if (!contentEl) return;
    
    contentEl.textContent = '';
    
    setTimeout(() => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          contentEl.textContent += text.charAt(currentIndex);
          currentIndex++;
        } else {
          clearInterval(intervalId);
          if (cursorEl) {
            cursorEl.classList.add('hidden');
          }
        }
      }, speed);
    }, delay);
  });

  // 5. Canvas Background Animation
  const canvas = document.querySelector('canvas');
  if (canvas) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallViewport = window.innerWidth < 768;
    if (prefersReducedMotion || isSmallViewport) {
      canvas.style.display = 'none';
    } else {
      const ctx = canvas.getContext('2d');
      let width, height;
      let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.1 - 0.05; // Slow drift
        this.speedY = Math.random() * 0.1 - 0.05;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDir;
        if (this.opacity >= 1) {
          this.opacity = 1;
          this.twinkleDir = -1;
        } else if (this.opacity <= 0.1) {
          this.opacity = 0.1;
          this.twinkleDir = 1;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((width * height) / 6000); // More stars
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Star());
      }
    };

    initParticles();

    const animate = () => {
      if (document.hidden) {
        requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();
    }
  }

  // --- 6. Global Language System ---
  const initLanguageSystem = () => {
    const isSpanishPage = currentPath.startsWith('/es');
    
    // Determine browser language
    const userBrowserLang = navigator.language || navigator.userLanguage;
    const isBrowserSpanish = userBrowserLang.toLowerCase().startsWith('es');
    
    // Inject Language Switcher into Nav (Desktop & Mobile)
    const injectLanguageSwitcher = () => {
      const navInner = document.querySelector('nav .glass-panel');
      if (!navInner || document.getElementById('lang-switcher')) return;

      const switcherHTML = `
        <div id="lang-switcher" class="flex items-center bg-white/5 rounded-full p-1 border border-white/10 shrink-0 ml-2 sm:ml-6">
          <a href="${localizedRoutes.en}" class="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${isSpanishPage ? 'text-gray-400 hover:text-white' : 'bg-aura-purple/50 text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]'}">EN</a>
          <a href="${localizedRoutes.es}" class="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${isSpanishPage ? 'bg-aura-purple/50 text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]' : 'text-gray-400 hover:text-white'}">ES</a>
        </div>
      `;

      // Desktop insertion (before 'Let's Talk' button, or at the end of items)
      const desktopMenu = navInner.querySelector('.hidden.md\\:block');
      if (desktopMenu) {
        desktopMenu.insertAdjacentHTML('beforebegin', switcherHTML);
      } else {
        // Fallback if structure is slightly different
        navInner.insertAdjacentHTML('beforeend', switcherHTML);
      }

      // Mobile Menu insertion
      const mobileNav = document.querySelector('#mobile-menu-overlay .flex.flex-col');
      if (mobileNav && !document.getElementById('mobile-lang-switcher')) {
        const mobileSwitcherHTML = `
          <div id="mobile-lang-switcher" class="flex items-center justify-center space-x-4 mt-6 pt-6 border-t border-white/10">
            <span class="text-sm font-medium text-gray-400">Language:</span>
            <div class="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
              <a href="${localizedRoutes.en}" class="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${isSpanishPage ? 'text-gray-400' : 'bg-aura-purple/50 text-white'}">EN</a>
              <a href="${localizedRoutes.es}" class="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${isSpanishPage ? 'bg-aura-purple/50 text-white' : 'text-gray-400'}">ES</a>
            </div>
          </div>
        `;
        mobileNav.insertAdjacentHTML('beforeend', mobileSwitcherHTML);
      }
    };

    injectLanguageSwitcher();

    // 1. Language Detection & Banner
    const storedPref = localStorage.getItem('preferredLanguage');
    
    // Logic: If no preference is saved, verify if the browser language conflicts with the current page.
    if (!storedPref) {
      if (isBrowserSpanish && !isSpanishPage) {
        showLanguageBanner('es');
      } else if (!isBrowserSpanish && isSpanishPage) {
        showLanguageBanner('en');
      }
    }

    function showLanguageBanner(suggestedLang) {
      if (document.getElementById('lang-banner')) return;

      const banner = document.createElement('div');
      banner.id = 'lang-banner';
      // Initial state is hidden below viewport (translate-y-full)
      banner.className = 'fixed bottom-0 left-0 w-full z-[100] bg-[#050115]/90 backdrop-blur-xl border-t border-white/10 p-4 transform translate-y-full transition-transform duration-[600ms] flex flex-col sm:flex-row items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]';
      
      const text = suggestedLang === 'es' 
        ? 'Parece que hablas espa?ol. ?Prefieres navegar la versi?n en tu idioma?'
        : 'It looks like you speak English. Would you prefer our English version?';
        
      const switchBtnText = suggestedLang === 'es' ? 'Cambiar a Espa?ol' : 'Switch to English';
      const dismissText = suggestedLang === 'es' ? 'Continuar aqu?' : 'Stay here';
      const switchUrl = suggestedLang === 'es' ? localizedRoutes.es : localizedRoutes.en;

      banner.innerHTML = `
        <div class="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-200 font-medium">${text}</p>
          <div class="flex items-center space-x-4 shrink-0 mt-2 sm:mt-0">
            <button id="lang-dismiss" class="text-xs font-semibold text-gray-400 hover:text-white transition-colors duration-300 px-2 py-2">
              ${dismissText}
            </button>
            <a href="${switchUrl}" id="lang-switch-btn" class="px-5 py-2.5 text-xs font-semibold text-white bg-aura-purple hover:bg-aura-magenta rounded-full shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all duration-300">
              ${switchBtnText}
            </a>
          </div>
        </div>
      `;

      document.body.appendChild(banner);

      // Animate banner into view
      requestAnimationFrame(() => {
        setTimeout(() => {
          banner.classList.remove('translate-y-full');
        }, 800); // Slight delay for smoother UX on load
      });

      // Dismiss keeps them on the current language
      document.getElementById('lang-dismiss').addEventListener('click', () => {
        localStorage.setItem('preferredLanguage', suggestedLang === 'es' ? 'en' : 'es'); 
        banner.classList.add('translate-y-full');
        setTimeout(() => banner.remove(), 600);
      });

      // Switch accepts the new language
      document.getElementById('lang-switch-btn').addEventListener('click', () => {
        localStorage.setItem('preferredLanguage', suggestedLang);
      });
      
      // Also listen to any switcher clicks globally to store preference
      document.addEventListener('click', (e) => {
        const switcherLink = e.target.closest('#lang-switcher a, #mobile-lang-switcher a');
        if (switcherLink) {
          const isES = switcherLink.getAttribute('href').includes('/es');
          localStorage.setItem('preferredLanguage', isES ? 'es' : 'en');
        }
      });
    }
  };

  initLanguageSystem();
});
