/* =============================================
   PRAVEEN RAJU K — PORTFOLIO JAVASCRIPT
   Premium Interactions & Animations
   ============================================= */

"use strict";

/* ===== 1. CURSOR GLOW ===== */
(function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();


/* ===== 2. NAVBAR: SCROLL GLASS + ACTIVE LINKS ===== */
(function initNavbar() {
  const header    = document.getElementById('header');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  // Scroll → add glass effect
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
    toggleBackToTop();
  }, { passive: true });

  // Active nav link on scroll
  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active',
        link.getAttribute('href') === `#${current}`
      );
    });
  }

  // Smooth scroll + close mobile menu
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    }
  });
})();


/* ===== 3. HERO TYPING EFFECT ===== */
(function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'Full Stack Developer',
    'AI & ML Engineer',
    'Data Analyst',
    'Dr. Kalam Young Achiever 🏆',
    'Problem Solver'
  ];

  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let paused   = false;

  function tick() {
    const word = roles[roleIdx];

    if (!deleting) {
      el.textContent = word.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; tick(); }, 1800);
        return;
      }
    } else {
      el.textContent = word.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting  = false;
        roleIdx   = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
    }

    if (!paused) setTimeout(tick, deleting ? 38 : 75);
  }

  setTimeout(tick, 800);
})();


/* ===== 4. HERO PARTICLES ===== */
(function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const COUNT = 40;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 20;
    const opacity = Math.random() * 0.6 + 0.2;

    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${left}%;
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
      opacity:${opacity};
    `;
    container.appendChild(p);
  }
})();


/* ===== 5. SCROLL REVEAL ANIMATIONS ===== */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid children
        const siblings = Array.from(entry.target.parentElement.children)
          .filter(el => el.classList.contains('reveal') ||
                        el.classList.contains('reveal-left') ||
                        el.classList.contains('reveal-right'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  targets.forEach(el => observer.observe(el));
})();


/* ===== 6. BACK TO TOP ===== */
function toggleBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 500);
}

document.getElementById('backToTop')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ===== 7. ACTIVE NAV HIGHLIGHT ON PAGE LOAD ===== */
window.addEventListener('DOMContentLoaded', () => {
  // Trigger scroll-based logic once on load
  window.dispatchEvent(new Event('scroll'));
});


/* ===== 8. CONTACT FORM HANDLER ===== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('contactSubmit');
  if (!form || !btn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('contactName')?.value.trim();
    const email   = document.getElementById('contactEmail')?.value.trim();
    const subject = document.getElementById('contactSubject')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Animate button
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Sending...
    `;

    // Simulate send (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Success
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Message Sent!
    `;
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.style.boxShadow  = '0 8px 24px rgba(16,185,129,0.4)';

    showToast('Your message has been sent! I\'ll get back to you shortly. 🚀', 'success');
    form.reset();

    setTimeout(() => {
      btn.disabled = false;
      btn.style.background = '';
      btn.style.boxShadow  = '';
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Send Message
      `;
    }, 4000);
  });
})();


/* ===== 9. TOAST NOTIFICATIONS ===== */
function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : '❌'}</span>
    <span>${message}</span>
  `;

  Object.assign(toast.style, {
    position:      'fixed',
    bottom:        '32px',
    left:          '50%',
    transform:     'translateX(-50%) translateY(80px)',
    background:    type === 'success'
                     ? 'rgba(16,185,129,0.95)'
                     : 'rgba(239,68,68,0.95)',
    color:         '#fff',
    padding:       '14px 24px',
    borderRadius:  '12px',
    fontSize:      '14px',
    fontWeight:    '600',
    display:       'flex',
    alignItems:    'center',
    gap:           '10px',
    backdropFilter:'blur(12px)',
    boxShadow:     '0 12px 40px rgba(0,0,0,0.4)',
    zIndex:        '9999',
    transition:    'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    whiteSpace:    'nowrap',
    fontFamily:    "'Inter', sans-serif"
  });

  document.body.appendChild(toast);

  // Slide in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Auto-remove
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}


/* ===== 10. SPIN KEYFRAME (for button loading spinner) ===== */
(function injectSpinStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .spin {
      animation: spin360 0.8s linear infinite;
    }
    @keyframes spin360 {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();


/* ===== 11. NAVBAR SCROLL PROGRESS BAR ===== */
(function initProgressBar() {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position:   'fixed',
    top:        '0',
    left:       '0',
    height:     '3px',
    width:      '0%',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
    zIndex:     '9999',
    transition: 'width 0.1s ease',
    pointerEvents: 'none'
  });
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = progress + '%';
  }, { passive: true });
})();


/* ===== 12. SMOOTH SECTION ENTRANCE - HERO STATS COUNTER ===== */
(function initCounters() {
  const stats = [
    { selector: '.stat-item:nth-child(1) .stat-number', target: 3, suffix: '+' },
    { selector: '.stat-item:nth-child(3) .stat-number', target: 2, suffix: '+' },
    { selector: '.stat-item:nth-child(5) .stat-number', target: 5, suffix: '+' },
  ];

  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      stats.forEach(({ selector, target, suffix }) => {
        const el = document.querySelector(selector);
        if (!el) return;
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 40);
      });
    }
  }, { threshold: 0.5 });

  observer.observe(heroSection);
})();


/* ===== 13. SKILL CARD HOVER GLOW ===== */
(function initSkillCardEffects() {
  const cards = document.querySelectorAll('.tech-icon-card, .skill-category');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = ((e.clientX - rect.left) / rect.width) * 100;
      const y      = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
})();


/* ===== 14. PROJECT CARD TILT EFFECT ===== */
(function initTiltEffect() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-10px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
      card.style.transition = 'none';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = '';
    });
  });
})();
