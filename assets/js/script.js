/* =============================================
   PRAVEEN RAJU K — PORTFOLIO JAVASCRIPT
   Premium Interactions & Animations
   ============================================= */

"use strict";

/* ===== 0. LUXURY FULL-SCREEN PHOTOREALISTIC HANDSHAKE INTRO ENGINE ===== */
(function initHandshakeIntro() {
  const overlay = document.getElementById('handshakeIntroOverlay');
  if (!overlay) return;

  const stage = document.getElementById('fullscreenHandshakeStage') || document.getElementById('introHandsArena');
  const flash = document.getElementById('fullscreenClaspFlash') || document.getElementById('handsClaspFlash');
  const statusLabel = document.getElementById('introStatusText') || document.getElementById('introStatusLabel');
  const btnText = document.getElementById('introBtnText');
  const skipBtn = document.getElementById('introSkipBtn');
  const enterBtn = document.getElementById('introEnterBtn');
  const timerNum = document.getElementById('introTimerNumber');
  const timerProg = document.getElementById('introTimerProgress');
  const canvas = document.getElementById('introCanvas');

  let isDismissed = false;
  let timeLeft = 5;
  let audioPlayed = false;

  // Lock body scroll
  document.body.style.overflow = 'hidden';

  // Audio Chime Synthesis
  function playLuxuryChime() {
    if (audioPlayed) return;
    audioPlayed = true;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const actx = new AudioCtx();
      if (actx.state === 'suspended') actx.resume();

      const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
      freqs.forEach((f, idx) => {
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, actx.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0, actx.currentTime + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.05, actx.currentTime + idx * 0.04 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + idx * 0.04 + 2.0);

        osc.connect(gain);
        gain.connect(actx.destination);

        osc.start(actx.currentTime + idx * 0.04);
        osc.stop(actx.currentTime + idx * 0.04 + 2.1);
      });
    } catch (e) {
      // Audio autoplay fallback
    }
  }

  // Dismiss Function
  function dismissIntro() {
    if (isDismissed) return;
    isDismissed = true;
    playLuxuryChime();
    document.body.style.overflow = '';
    overlay.classList.add('intro-dismissed');

    setTimeout(() => {
      overlay.style.display = 'none';
    }, 850);
  }

  // Timeline Choreography
  setTimeout(() => {
    if (isDismissed) return;
    if (stage) {
      stage.classList.remove('phase-approaching');
      stage.classList.add('phase-clasped');
    }
    if (flash) flash.classList.add('active');
    if (statusLabel) statusLabel.textContent = 'EXECUTIVE HANDSHAKE INITIATED';
    playLuxuryChime();
    triggerShockwaves();
  }, 1200);

  setTimeout(() => {
    if (isDismissed) return;
    if (stage) {
      stage.classList.remove('phase-clasped');
      stage.classList.add('phase-shaking');
    }
    if (statusLabel) statusLabel.textContent = 'SEALING THE DEAL • MUTUAL TRUST';
  }, 1500);

  setTimeout(() => {
    if (isDismissed) return;
    if (stage) {
      stage.classList.remove('phase-shaking');
      stage.classList.add('phase-sealed');
    }
    if (statusLabel) statusLabel.textContent = '✦ PARTNERSHIP CONFIRMED • WELCOME ✦';
    if (btnText) btnText.innerHTML = 'Welcome &bull; Enter Portfolio';
  }, 3800);

  setTimeout(() => {
    dismissIntro();
  }, 5000);

  // Countdown Ticker
  const countdownInterval = setInterval(() => {
    if (isDismissed) {
      clearInterval(countdownInterval);
      return;
    }
    timeLeft--;
    if (timerNum) timerNum.textContent = Math.max(0, timeLeft) + 's';
    if (timerProg) {
      const offset = ((5 - timeLeft) / 5) * 100;
      timerProg.style.strokeDashoffset = offset;
    }
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  // Event Listeners
  overlay.addEventListener('click', () => dismissIntro());
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissIntro();
    });
  }
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissIntro();
    });
  }

  // Canvas Particles
  let triggerShockwaves = () => {};
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = 1;
    const embers = [];
    const shockwaves = [];
    const sparks = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);

      embers.length = 0;
      const count = Math.floor(width / 24);
      for (let i = 0; i < count; i++) {
        embers.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 0.7 + 0.3),
          radius: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.6 + 0.2,
          color: Math.random() > 0.4 ? 'rgba(255, 223, 0,' : 'rgba(212, 175, 55,'
        });
      }
    };

    triggerShockwaves = () => {
      shockwaves.push({ x: width / 2, y: height / 2, radius: 10, maxRadius: 340, speed: 3.5, alpha: 0.9, color: '255, 215, 0' });
      shockwaves.push({ x: width / 2, y: height / 2, radius: 10, maxRadius: 220, speed: 3.5, alpha: 0.9, color: '255, 215, 0' });
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        sparks.push({
          x: width / 2, y: height / 2,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, decay: Math.random() * 0.025 + 0.015,
          size: Math.random() * 3.5 + 1.5,
          color: Math.random() > 0.3 ? 'rgba(255, 223, 0,' : 'rgba(245, 215, 127,'
        });
      }
    };

    function renderParticles() {
      if (isDismissed && overlay.style.display === 'none') return;
      ctx.clearRect(0, 0, width, height);

      // Embers
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.x += e.vx; e.y += e.vy;
        if (e.y < 0) { e.y = height + 10; e.x = Math.random() * width; }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = e.color + e.alpha + ')';
        ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        const progress = sw.radius / sw.maxRadius;
        sw.alpha = Math.max(0, (1 - progress) * 0.9);
        if (progress >= 1 || sw.alpha <= 0) { shockwaves.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${sw.color}, ${sw.alpha})`;
        ctx.lineWidth = Math.max(1, 3.5 * (1 - progress));
        ctx.stroke();
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy;
        s.vx *= 0.95; s.vy *= 0.95;
        s.life -= s.decay;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color + s.life + ')';
        ctx.fill();
      }

      requestAnimationFrame(renderParticles);
    }

    resize();
    window.addEventListener('resize', resize);
    renderParticles();
  }
})();

/* ===== 0.5 ABOUT ME & TESTIMONIAL CAROUSEL ENGINE ===== */
(function initAboutCarousel() {
  const testimonials = [
    {
      name: 'Praveen Raju K',
      title: 'AI & Machine Learning Engineer • Full Stack Developer',
      description: "I'm a passionate AI & Machine Learning engineer pursuing my degree at Sri Eshwar College of Engineering. I specialize in building intelligent systems that combine data, algorithms, and scalable architectures — solving real-world problems with impactful, reliable software.",
      imageUrl: 'assets/images/profile/myimage.jpg',
      githubUrl: 'https://github.com/Praveenraju1707',
      twitterUrl: 'https://twitter.com',
      youtubeUrl: 'https://youtube.com',
      linkedinUrl: 'https://www.linkedin.com/in/praveen-raju-k-88b1b2292'
    },
    {
      name: 'Michael Chen',
      title: 'Senior Software Engineer, Cloud Infrastructure',
      description: 'Working with Praveen completely changed our infrastructure game. The support and technical expertise were incredible. Delivered beyond our expectations and helped us scale to millions of users.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      githubUrl: 'https://github.com',
      twitterUrl: 'https://twitter.com',
      youtubeUrl: 'https://youtube.com',
      linkedinUrl: 'https://linkedin.com'
    },
    {
      name: 'Jessica Roberts',
      title: 'Lead Data Scientist, InsightX',
      description: 'The data analytics platform and ML pipelines built gave our team the confidence and tools needed for true data-driven decisions. The dashboarding capabilities went above and beyond our expectations.',
      imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80',
      githubUrl: 'https://github.com',
      twitterUrl: 'https://twitter.com',
      youtubeUrl: 'https://youtube.com',
      linkedinUrl: 'https://linkedin.com'
    },
    {
      name: 'William Carter',
      title: 'VP Product, NovaLabs',
      description: 'NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every delivery milestone and provided exceptional technical leadership in AI development.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
      githubUrl: 'https://github.com',
      twitterUrl: 'https://twitter.com',
      youtubeUrl: 'https://youtube.com',
      linkedinUrl: 'https://linkedin.com'
    }
  ];

  let currentIndex = 0;
  const avatarImg = document.getElementById('staticAboutAvatarImg');
  const cardInner = document.getElementById('staticAboutCardInner');
  const nameEl = document.getElementById('staticAboutName');
  const titleEl = document.getElementById('staticAboutTitle');
  const descEl = document.getElementById('staticAboutDesc');
  const prevBtn = document.getElementById('staticAboutPrevBtn');
  const nextBtn = document.getElementById('staticAboutNextBtn');
  const dotsContainer = document.getElementById('staticAboutDots');

  if (!avatarImg || !cardInner || !nameEl) return;

  function renderSlide(index) {
    const item = testimonials[index];
    if (!item) return;

    avatarImg.classList.add('slide-fade-out');
    cardInner.classList.add('slide-fade-out');

    setTimeout(() => {
      avatarImg.src = item.imageUrl;
      avatarImg.alt = item.name;
      nameEl.textContent = item.name;
      titleEl.textContent = item.title;
      descEl.textContent = item.description;

      avatarImg.classList.remove('slide-fade-out');
      cardInner.classList.remove('slide-fade-out');
      avatarImg.classList.add('slide-fade-in');
      cardInner.classList.add('slide-fade-in');

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((d, idx) => {
          if (idx === index) d.classList.add('active');
          else d.classList.remove('active');
        });
      }
    }, 300);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      renderSlide(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      renderSlide(currentIndex);
    });
  }

  if (dotsContainer) {
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = idx;
        renderSlide(currentIndex);
      });
    });
  }
})();

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
  const header     = document.getElementById('header');
  const navLinks   = document.querySelectorAll('.nav-link');
  const allAnchors = document.querySelectorAll('.nav-link, .nav-cta-btn, .nav-logo');
  const sections   = document.querySelectorAll('section[id]');
  const hamburger  = document.getElementById('hamburger');
  const navMenu    = document.getElementById('navMenu');

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
  allAnchors.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (navMenu) navMenu.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
    });
  });

  // Hamburger toggle
  if (hamburger && navMenu) {
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
  }
})();


/* ===== 3. HERO TYPING EFFECT ===== */
(function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'AI & Machine Learning Engineer',
    'Full Stack Web Architect',
    'Data Analytics Specialist',
    'Dr. Kalam Young Achiever Awardee',
    'Intelligent Systems Builder'
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


/* ===== 0. LUXURY HANDSHAKE INTRO OVERLAY ENGINE ===== */
(function initHandshakeIntro() {
  const overlay = document.getElementById('handshakeIntroOverlay');
  const canvas = document.getElementById('introCanvas');
  const card = document.getElementById('introHandshakeCard');
  const enterBtn = document.getElementById('introEnterBtn');
  if (!overlay || !canvas) return;

  // Lock body scroll while intro is visible
  document.body.style.overflow = 'hidden';

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let isDismissed = false;

  const embers = [];
  const introRings = [];
  const introSparks = [];
  let animId;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    initEmbers();
  }

  function initEmbers() {
    embers.length = 0;
    const count = Math.floor(width / 22);
    for (let i = 0; i < count; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.8 + 0.4),
        radius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.4 ? 'rgba(255, 223, 0,' : 'rgba(212, 175, 55,'
      });
    }
  }

  function addIntroRing(x, y, maxR = 320) {
    introRings.push({
      x: x || width / 2,
      y: y || height / 2,
      radius: 8,
      maxRadius: maxR,
      speed: 2.2,
      alpha: 0.9,
      color: '255, 215, 0'
    });
  }

  function addIntroSparks(x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      introSparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 3 + 1.5,
        color: Math.random() > 0.3 ? 'rgba(255, 223, 0,' : 'rgba(245, 215, 127,'
      });
    }
  }

  // Synthesize rich harmonic luxury chime using Web Audio API
  function playLuxuryChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const actx = new AudioCtx();
      if (actx.state === 'suspended') actx.resume();

      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C Major luxury chord (C5, E5, G5, C6, E6)
      freqs.forEach((f, idx) => {
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, actx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0, actx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, actx.currentTime + idx * 0.06 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + idx * 0.06 + 1.6);

        osc.connect(gain);
        gain.connect(actx.destination);

        osc.start(actx.currentTime + idx * 0.06);
        osc.stop(actx.currentTime + idx * 0.06 + 1.7);
      });
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  let lastRing = 0;

  function render(timestamp) {
    if (isDismissed && introSparks.length === 0 && introRings.length === 0) {
      cancelAnimationFrame(animId);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Periodic pulse rings
    if (!isDismissed && timestamp - lastRing > 1400) {
      addIntroRing(width / 2, height / 2 + 10, 260);
      lastRing = timestamp;
    }

    // 2. Render rising gold embers
    for (let i = 0; i < embers.length; i++) {
      const e = embers[i];
      e.x += e.vx;
      e.y += e.vy;
      if (e.y < 0) {
        e.y = height + 10;
        e.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
      ctx.fillStyle = e.color + e.alpha + ')';
      ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 3. Render pulse rings
    for (let i = introRings.length - 1; i >= 0; i--) {
      const ring = introRings[i];
      ring.radius += ring.speed;
      const progress = ring.radius / ring.maxRadius;
      ring.alpha = Math.max(0, (1 - progress) * 0.85);

      if (progress >= 1 || ring.alpha <= 0) {
        introRings.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.ellipse(ring.x, ring.y, ring.radius * 1.25, ring.radius * 0.75, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ring.color}, ${ring.alpha})`;
      ctx.lineWidth = Math.max(1, 3 * (1 - progress));
      ctx.stroke();
    }

    // 4. Render shockwave sparks
    for (let i = introSparks.length - 1; i >= 0; i--) {
      const s = introSparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.96;
      s.vy *= 0.96;
      s.life -= s.decay;

      if (s.life <= 0) {
        introSparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fillStyle = s.color + s.life + ')';
      ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    animId = requestAnimationFrame(render);
  }

  // Dismiss intro and reveal portfolio
  function dismissIntro(clickX, clickY) {
    if (isDismissed) return;
    isDismissed = true;

    const targetX = clickX || width / 2;
    const targetY = clickY || height / 2;

    // Trigger explosive shockwave and chime
    addIntroRing(targetX, targetY, 600);
    addIntroRing(targetX, targetY, 400);
    addIntroSparks(targetX, targetY, 45);
    playLuxuryChime();

    // Trigger card zoom animation
    if (card) {
      card.style.transform = 'scale(1.1) translateY(-10px)';
      card.style.borderColor = 'rgba(255, 223, 0, 1)';
      card.style.boxShadow = '0 0 100px rgba(255, 215, 0, 0.8)';
    }

    // Smooth dissolve
    setTimeout(() => {
      overlay.classList.add('intro-dismissed');
      document.body.style.overflow = '';

      // Clean up overlay after transition finishes
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 900);
    }, 350);
  }

  // Click bindings
  if (card) {
    card.addEventListener('click', (e) => {
      dismissIntro(e.clientX, e.clientY);
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissIntro(e.clientX, e.clientY);
    });
  }

  overlay.addEventListener('click', (e) => {
    dismissIntro(e.clientX, e.clientY);
  });

  window.addEventListener('resize', resize, { passive: true });
  resize();
  animId = requestAnimationFrame(render);
})();


/* ===== 3.5 HERO HANDSHAKE BACKGROUND ANIMATION ENGINE (GOLD EDITION) ===== */
(function initHandshakeAnimation() {
  const canvas = document.getElementById('handshakeCanvas');
  const imgLayer = document.getElementById('heroHandshakeImg');
  const heroSection = document.getElementById('home');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;

  // Center clasp coordinate
  let centerX = 0;
  let centerY = 0;

  // Mouse & Parallax tracking
  let mouseX = -1000;
  let mouseY = -1000;
  let isMouseInHero = false;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  // Animation entities
  const pulseRings = [];
  const streamParticles = [];
  const sparks = [];
  const ambientNodes = [];

  function resize() {
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    centerX = width * 0.5;
    centerY = height * 0.48;

    initAmbientNodes();
  }

  function initAmbientNodes() {
    ambientNodes.length = 0;
    const count = Math.floor(width / 40);
    for (let i = 0; i < count; i++) {
      ambientNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(255, 223, 0,' : 'rgba(212, 175, 55,',
        alpha: Math.random() * 0.45 + 0.15
      });
    }
  }

  // Ring class for gold synergy pulses
  function createPulseRing(x, y, maxRadius = 280, color = 'gold') {
    pulseRings.push({
      x: x || centerX,
      y: y || centerY,
      radius: 5,
      maxRadius: maxRadius,
      speed: 1.5,
      color: color === 'gold' ? '255, 223, 0' : '212, 175, 55',
      alpha: 0.85
    });
  }

  // Stream particle class for bilateral convergence
  function spawnStreamParticle(side) {
    const isLeft = side === 'left';
    const startX = isLeft ? -10 : width + 10;
    const startY = centerY + (Math.random() - 0.5) * (height * 0.6);
    
    // Control points for smooth bezier curve toward handshake center
    const cp1x = isLeft ? width * 0.25 : width * 0.75;
    const cp1y = startY + (Math.random() - 0.5) * 120;
    const cp2x = isLeft ? width * 0.4 : width * 0.6;
    const cp2y = centerY + (Math.random() - 0.5) * 60;

    streamParticles.push({
      startX,
      startY,
      cp1x,
      cp1y,
      cp2x,
      cp2y,
      targetX: centerX + (Math.random() - 0.5) * 30,
      targetY: centerY + (Math.random() - 0.5) * 25,
      progress: 0,
      speed: 0.005 + Math.random() * 0.007,
      size: Math.random() * 2.2 + 1.2,
      color: isLeft ? '#F5D77F' : '#FFDF00', // Light gold for customer, Bright metallic gold for developer
      trail: [],
      side: side
    });
  }

  // Micro spark burst when stream particle reaches handshake center
  function spawnSparks(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 0.8;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.03 + 0.02,
        size: Math.random() * 2.2 + 1,
        color: Math.random() > 0.4 ? 'rgba(255, 223, 0,' : 'rgba(245, 215, 127,'
      });
    }
  }

  let lastRingSpawn = 0;
  let lastParticleSpawn = 0;

  // Bezier calculation
  function getBezierPoint(t, p0, p1, p2, p3) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    return uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3;
  }

  function animate(timestamp) {
    ctx.clearRect(0, 0, width, height);

    // 1. Parallax update on image layer
    if (imgLayer) {
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;
      imgLayer.style.transform = `scale(1.04) translate(${currentTiltX}px, ${currentTiltY}px)`;
    }

    // 2. Periodic spawn of synergy rings & streams
    if (timestamp - lastRingSpawn > 1800) {
      createPulseRing(centerX, centerY, 300, Math.random() > 0.5 ? 'gold' : 'champagne');
      lastRingSpawn = timestamp;
    }

    if (timestamp - lastParticleSpawn > 220) {
      spawnStreamParticle(Math.random() > 0.5 ? 'left' : 'right');
      lastParticleSpawn = timestamp;
    }

    // 3. Render Ambient Constellation Nodes
    for (let i = 0; i < ambientNodes.length; i++) {
      const node = ambientNodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0) node.x = width;
      if (node.x > width) node.x = 0;
      if (node.y < 0) node.y = height;
      if (node.y > height) node.y = 0;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color + node.alpha + ')';
      ctx.fill();

      // Connect near nodes
      for (let j = i + 1; j < ambientNodes.length; j++) {
        const other = ambientNodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const lineAlpha = (1 - dist / 100) * 0.14;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 4. Render Synergy Pulse Rings
    for (let i = pulseRings.length - 1; i >= 0; i--) {
      const ring = pulseRings[i];
      ring.radius += ring.speed;
      const progress = ring.radius / ring.maxRadius;
      ring.alpha = Math.max(0, (1 - progress) * 0.75);

      if (progress >= 1 || ring.alpha <= 0) {
        pulseRings.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.ellipse(ring.x, ring.y, ring.radius * 1.3, ring.radius * 0.75, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ring.color}, ${ring.alpha})`;
      ctx.lineWidth = Math.max(1, 2.5 * (1 - progress));
      ctx.stroke();
    }

    // 5. Render Bilateral Stream Particles
    for (let i = streamParticles.length - 1; i >= 0; i--) {
      const p = streamParticles[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        spawnSparks(p.targetX, p.targetY, 5);
        streamParticles.splice(i, 1);
        continue;
      }

      const currX = getBezierPoint(p.progress, p.startX, p.cp1x, p.cp2x, p.targetX);
      const currY = getBezierPoint(p.progress, p.startY, p.cp1y, p.cp2y, p.targetY);

      p.trail.push({ x: currX, y: currY });
      if (p.trail.length > 8) p.trail.shift();

      // Draw particle trail
      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let t = 1; t < p.trail.length; t++) {
          ctx.lineTo(p.trail[t].x, p.trail[t].y);
        }
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size * 0.8;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // Draw glowing particle head
      ctx.beginPath();
      ctx.arc(currX, currY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 6. Render Micro Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;

      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fillStyle = s.color + s.life + ')';
      ctx.shadowColor = s.color + '0.9)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 7. Center Aura / Core Sparkle
    const time = timestamp * 0.002;
    const corePulse = Math.sin(time) * 0.2 + 0.8;
    const auraGrad = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 80 * corePulse
    );
    auraGrad.addColorStop(0, 'rgba(255, 223, 0, 0.28)');
    auraGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
    auraGrad.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(centerX, centerY, 80 * corePulse, 0, Math.PI * 2);
    ctx.fillStyle = auraGrad;
    ctx.fill();

    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', resize, { passive: true });

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      isMouseInHero = true;
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const normX = (mouseX / width) - 0.5;
      const normY = (mouseY / height) - 0.5;

      targetTiltX = -normX * 18;
      targetTiltY = -normY * 14;
    });

    heroSection.addEventListener('mouseleave', () => {
      isMouseInHero = false;
      targetTiltX = 0;
      targetTiltY = 0;
    });

    heroSection.addEventListener('click', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Burst rings & sparks
      createPulseRing(clickX, clickY, 360, 'gold');
      createPulseRing(clickX, clickY, 280, 'champagne');
      spawnSparks(clickX, clickY, 16);
    });
  }

  resize();
  requestAnimationFrame(animate);
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
    background: 'linear-gradient(90deg, #D4AF37, #FFDF00, #F5D77F, #AA7C11)',
    boxShadow:  '0 0 10px rgba(212, 175, 55, 0.7), 0 0 20px rgba(255, 223, 0, 0.3)',
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


/* ===== 15. SKILLS FILTER & ANIMATED PROGRESS BARS ===== */
(function initSkillsInteractions() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const domainCards = document.querySelectorAll('.skill-domain-card');
  const techCards = document.querySelectorAll('.tech-icon-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      // Filter domain cards
      domainCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });

      // Highlight/dim tech cards
      techCards.forEach(tc => {
        const cats = tc.getAttribute('data-cat') || '';
        if (filter === 'all' || cats.includes(filter)) {
          tc.style.opacity = '1';
          tc.style.pointerEvents = 'auto';
        } else {
          tc.style.opacity = '0.35';
        }
      });
    });
  });

  // Animated progress bars with IntersectionObserver
  const progressBars = document.querySelectorAll('.skill-bar-fill');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.classList.add('animated');

          // Animate number count
          const parentItem = fill.closest('.skill-bar-item');
          if (parentItem) {
            const percentEl = parentItem.querySelector('.skill-percent');
            if (percentEl && !percentEl.dataset.counted) {
              percentEl.dataset.counted = 'true';
              const target = parseInt(percentEl.getAttribute('data-target') || '0', 10);
              let current = 0;
              const step = Math.max(1, Math.floor(target / 30));
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                percentEl.textContent = `${current}%`;
              }, 25);
            }
          }
          obs.unobserve(fill);
        }
      });
    }, { threshold: 0.15 });

    progressBars.forEach(bar => observer.observe(bar));
  } else {
    // Fallback
    progressBars.forEach(bar => bar.classList.add('animated'));
  }
})();

/* ===== 16. CERTIFICATIONS FILTER & LIGHTBOX MODAL ===== */
(function initCertsInteractions() {
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-deluxe-card');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-cert-filter');

      certCards.forEach(card => {
        const cat = card.getAttribute('data-cert-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // Lightbox Modal functions
  window.openCertModal = function(imgSrc, title, issuer, driveLink) {
    const backdrop = document.getElementById('certModalBackdrop');
    const modalImg = document.getElementById('modalCertImg');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalIssuer = document.getElementById('modalCertIssuer');
    const modalDriveLink = document.getElementById('modalCertDriveLink');

    if (!backdrop || !modalImg) return;

    modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title;
    if (modalIssuer) modalIssuer.textContent = issuer;
    if (modalDriveLink) modalDriveLink.href = driveLink;

    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeCertModal = function(e) {
    if (e && e.target && e.target.id !== 'certModalBackdrop' && !e.target.closest('.cert-modal-close') && !e.target.classList.contains('cert-modal-btn-close')) {
      return;
    }
    const backdrop = document.getElementById('certModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  };

  // Keyboard Escape listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const backdrop = document.getElementById('certModalBackdrop');
      if (backdrop && backdrop.classList.contains('open')) {
        window.closeCertModal();
      }
    }
  });
})();
