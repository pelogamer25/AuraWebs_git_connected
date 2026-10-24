document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  // Language-switch targets come from the page's own hreflang alternates.
  const alternate = lang => (document.querySelector(`link[rel="alternate"][hreflang^="${lang}"]`)?.getAttribute('href') || '').replace('https://aurawebs.site', '');
  const isEsPath = currentPath.startsWith('/es');
  const localizedRoutes = { en: alternate('en') || (isEsPath ? '/' : currentPath), es: alternate('es') || (isEsPath ? currentPath : '/es/') };

  // 0. Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });

  // 1–2. Header scroll effect and mobile menu live in nav.js (shipped with the header partial).

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
      banner.setAttribute('role', 'region');
      banner.setAttribute('aria-label', suggestedLang === 'es' ? 'Sugerencia de idioma' : 'Language suggestion');
      // Initial state is hidden below viewport (translate-y-full)
      banner.className = 'fixed bottom-0 left-0 w-full z-[100] bg-[#050115]/90 backdrop-blur-xl border-t border-white/10 p-4 transform translate-y-full transition-transform duration-[600ms] flex flex-col sm:flex-row items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]';
      
      const text = suggestedLang === 'es'
        ? 'Parece que hablas español. ¿Prefieres navegar la versión en tu idioma?'
        : 'It looks like you speak English. Would you prefer our English version?';

      const switchBtnText = suggestedLang === 'es' ? 'Cambiar a Español' : 'Switch to English';
      const dismissText = suggestedLang === 'es' ? 'Continuar aquí' : 'Stay here';
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

  // --- 7. Design System: Scroll Reveal + Card Enhancements ---
  const initDesignSystem = () => {
    // Auto-apply card-hover to glass panels inside main (not nav/fixed)
    document.querySelectorAll('main .glass-panel, main [class*="glass-panel"]').forEach(el => {
      if (el.closest('nav') || el.classList.contains('rounded-full')) return;
      el.classList.add('card-hover');
    });

    // Auto-apply input-glow to form inputs/selects/textareas
    document.querySelectorAll('main input, main select, main textarea').forEach(el => {
      el.classList.add('input-glow');
    });

    // Auto-apply btn-shimmer to gradient CTA buttons
    document.querySelectorAll('main a[class*="from-aura-purple"], main button[class*="from-aura-purple"]').forEach(el => {
      el.classList.add('btn-shimmer');
    });

    // Scroll reveal: eligible elements (grid/list cards and major sections)
    const revealTargets = [
      'main .space-y-6 > div',
      'main .space-y-8 > div',
      'main .grid > div',
      'main .flex.flex-col.space-y-8 > *',
    ];

    const candidates = new Set();
    revealTargets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.closest('.fixed') || el.closest('nav') || el.tagName === 'A') return;
        candidates.add(el);
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    // Stagger reveal delays for sibling groups
    const processedParents = new Map();
    requestAnimationFrame(() => {
      candidates.forEach(el => {
        el.classList.add('reveal');
        // Stagger siblings
        const parent = el.parentElement;
        if (!processedParents.has(parent)) processedParents.set(parent, 0);
        const idx = processedParents.get(parent);
        processedParents.set(parent, idx + 1);
        const delay = Math.min(idx, 5);
        if (delay > 0) el.classList.add(`reveal-d${delay}`);

        // If already in viewport, reveal immediately (no FOUC)
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.98) {
          el.classList.add('revealed');
        } else {
          observer.observe(el);
        }
      });
    });
  };

  initDesignSystem();

  // --- 8. FAQ Accordion ---
  const initFaqAccordion = () => {
    // Support both .faq-item (new class) and plain glass-panel FAQ cards
    document.querySelectorAll('.faq-item').forEach(item => {
      const trigger = item.querySelector('.faq-trigger, h3, h4');
      if (!trigger) return;
      trigger.style.cursor = 'pointer';
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  };
  initFaqAccordion();

  // --- 9. Reveal elements explicitly marked with .reveal ---
  const initStaticReveal = () => {
    const staticRevealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!staticRevealEls.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    staticRevealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('revealed');
      } else {
        obs.observe(el);
      }
    });
  };
  initStaticReveal();

  // --- 9b. Tabs ([data-tabs]): without JS every panel shows; with JS one at a time, arrow keys move. ---
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (step) { e.preventDefault(); select(tabs[(i + step + tabs.length) % tabs.length], true); }
      });
    });
    select(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  });

  // --- 10. Contact forms send everything to WhatsApp ---
  // Without JS the form still GETs wa.me with the textarea as ?text=.
  document.querySelectorAll('form[data-whatsapp-form]').forEach(form => {
    const es = document.documentElement.lang.startsWith('es');
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const val = id => (form.querySelector('#' + id)?.value || '').trim();
      const fields = es
        ? [['Nombre', 'name'], ['Correo', 'email'], ['Tipo de proyecto', 'interest'], ['Detalles', 'message']]
        : [['Name', 'name'], ['Email', 'email'], ['Project type', 'interest'], ['Details', 'message']];
      const intro = es ? 'Hola AuraWebs, quiero cotizar un proyecto.' : 'Hi AuraWebs, I would like a quote.';
      const body = fields.filter(([, id]) => val(id)).map(([label, id]) => `${label}: ${val(id)}`).join('\n');
      const url = form.action + '?text=' + encodeURIComponent(intro + '\n\n' + body);
      const win = window.open(url, '_blank');
      if (win) win.opener = null; else window.location.href = url;
      if (status) status.textContent = es
        ? 'Listo: abrimos WhatsApp con tu mensaje. Solo pulsa enviar.'
        : 'Done: WhatsApp is open with your message. Just hit send.';
    });
  });
});
