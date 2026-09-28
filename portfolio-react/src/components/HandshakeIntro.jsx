import { useEffect, useRef, useState } from 'react';

export default function HandshakeIntro() {
  const [phase, setPhase] = useState('approaching'); // 'approaching' | 'clasped' | 'shaking' | 'sealed' | 'dismissed'
  const [timeLeft, setTimeLeft] = useState(5);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const canvasRef = useRef(null);
  const audioPlayedRef = useRef(false);

  // Lock body scroll while intro is visible
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDismissed]);

  // Audio Chime Synthesis (Web Audio API)
  const playLuxuryChime = () => {
    if (audioPlayedRef.current) return;
    audioPlayedRef.current = true;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const actx = new AudioCtx();
      if (actx.state === 'suspended') actx.resume();

      // Deep, rich luxury executive chord
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
      // Audio autoplay policy fallback
    }
  };

  // 5-Second Animation Choreography Timeline
  useEffect(() => {
    if (isDismissed) return;

    // 1.2s: Hands Meet & Lock into Clasp
    const tClasp = setTimeout(() => {
      setPhase('clasped');
      playLuxuryChime();
    }, 1200);

    // 1.5s: Handshake Shaking Pumps Start
    const tShake = setTimeout(() => {
      setPhase('shaking');
    }, 1500);

    // 3.8s: Handshake Sealed & Deal Confirmed
    const tSealed = setTimeout(() => {
      setPhase('sealed');
    }, 3800);

    // 5.0s: Auto Dismiss & Enter Portfolio
    const tDismiss = setTimeout(() => {
      handleDismiss();
    }, 5000);

    // 1-second countdown ticker
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(tClasp);
      clearTimeout(tShake);
      clearTimeout(tSealed);
      clearTimeout(tDismiss);
      clearInterval(timerInterval);
    };
  }, [isDismissed]);

  // Full-Screen Particle Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;

    const embers = [];
    const shockwaves = [];
    const sparks = [];
    let animId;

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
      const count = Math.floor(width / 18);
      for (let i = 0; i < count; i++) {
        embers.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(Math.random() * 0.8 + 0.3),
          radius: Math.random() * 2.5 + 0.8,
          alpha: Math.random() * 0.7 + 0.2,
          color: Math.random() > 0.4 ? 'rgba(255, 223, 0,' : 'rgba(212, 175, 55,'
        });
      }
    };

    const addShockwave = (x, y, maxR = 380) => {
      shockwaves.push({
        x: x || width / 2,
        y: y || height / 2,
        radius: 12,
        maxRadius: maxR,
        speed: 4.2,
        alpha: 0.95,
        color: '255, 215, 0'
      });
    };

    const addSparks = (x, y, count = 40) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2.5;
        sparks.push({
          x: x || width / 2,
          y: y || height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: Math.random() * 0.025 + 0.015,
          size: Math.random() * 4 + 1.5,
          color: Math.random() > 0.3 ? 'rgba(255, 223, 0,' : 'rgba(245, 215, 127,'
        });
      }
    };

    let shockwaveTriggered = false;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Trigger shockwave and sparks on hand contact
      if (phase !== 'approaching' && !shockwaveTriggered) {
        shockwaveTriggered = true;
        addShockwave(width / 2, height / 2, 420);
        addShockwave(width / 2, height / 2, 280);
        addSparks(width / 2, height / 2, 50);
      }

      // Add gentle pulses during shaking
      if (phase === 'shaking' && Math.random() < 0.06) {
        addShockwave(width / 2, height / 2, 240);
      }

      // 1. Embers
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
        ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        const progress = sw.radius / sw.maxRadius;
        sw.alpha = Math.max(0, (1 - progress) * 0.95);

        if (progress >= 1 || sw.alpha <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${sw.color}, ${sw.alpha})`;
        ctx.lineWidth = Math.max(1.5, 4 * (1 - progress));
        ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
        ctx.shadowBlur = 16;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 3. Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy *= 0.95;
        s.life -= s.decay;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color + s.life + ')';
        ctx.shadowColor = 'rgba(255, 215, 0, 0.95)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [phase]);

  const handleDismiss = () => {
    if (isDismissed) return;
    setIsDismissed(true);
    playLuxuryChime();

    setTimeout(() => {
      setIsHidden(true);
    }, 900);
  };

  if (isHidden) return null;

  return (
    <div
      className={`handshake-intro-overlay fullscreen-experience ${isDismissed ? 'intro-dismissed' : ''}`}
      id="handshakeIntroOverlay"
      onClick={handleDismiss}
      title="Click anywhere to enter portfolio"
    >
      {/* ─── FULL-SCREEN CINEMATIC PHOTOREALISTIC HANDSHAKE STAGE ─── */}
      <div className={`fullscreen-handshake-stage phase-${phase}`}>
        {/* Layer 1: Left Suited Arm (Sliding in from Left Edge) */}
        <div className="hand-split-side side-left">
          <img
            src="/images/gold_handshake.jpg"
            alt="Executive Left Hand"
            className="fullscreen-handshake-photo photo-left"
          />
        </div>

        {/* Layer 2: Right Suited Arm (Sliding in from Right Edge) */}
        <div className="hand-split-side side-right">
          <img
            src="/images/gold_handshake.jpg"
            alt="Executive Right Hand"
            className="fullscreen-handshake-photo photo-right"
          />
        </div>

        {/* Layer 3: Unified Full-Screen Handshake on Clasp & Shake */}
        <div className="hand-unified-layer">
          <img
            src="/images/gold_handshake.jpg"
            alt="Executive Fullscreen Handshake"
            className="fullscreen-handshake-photo photo-unified"
          />
          <div className="photo-cinematic-vignette" />
          <div className="photo-gold-light-sweep" />
        </div>

        {/* Central Gold Aura & Clasp Flash */}
        <div className="fullscreen-gold-aura" />
        <div className={`fullscreen-clasp-flash ${phase !== 'approaching' ? 'active' : ''}`} />
      </div>

      {/* Background Floating Particle Dust Canvas */}
      <canvas ref={canvasRef} id="introCanvas" className="intro-canvas" />

      {/* ─── TOP HUD: COUNTDOWN & SKIP BUTTON ─── */}
      <div className="intro-hud-top">
        <div className="intro-countdown-chip">
          <div className="intro-timer-ring">
            <svg viewBox="0 0 36 36">
              <path
                className="timer-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="timer-progress"
                strokeDasharray="100, 100"
                style={{
                  strokeDashoffset: `${((5 - timeLeft) / 5) * 100}`
                }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="timer-number">{timeLeft}s</span>
          </div>
          <span className="timer-label">Entering Portfolio</span>
        </div>

        <button
          className="intro-skip-btn"
          id="introSkipBtn"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          aria-label="Skip Intro"
        >
          <span>Skip Intro</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ─── CENTER / BRAND OVERLAY ─── */}
      <div className="fullscreen-brand-overlay">
        <div className="intro-badge-top">
          <span className="gold-sparkle">✦</span>
          <span>EXECUTIVE PARTNERSHIP • AI & SOFTWARE LEADERSHIP</span>
          <span className="gold-sparkle">✦</span>
        </div>
        <h1 className="intro-title">Praveen Raju K</h1>
        <p className="intro-subtitle">AI & ML Engineer • Full Stack Developer</p>
      </div>

      {/* ─── BOTTOM CONTROLS & STATUS ─── */}
      <div className="fullscreen-bottom-hud">
        {/* Dynamic Status Pill */}
        <div className="fullscreen-status-pill">
          <div className="status-pulse-dot" />
          <span className="status-text">
            {phase === 'approaching' && 'CONNECTING PARTNERSHIP...'}
            {phase === 'clasped' && 'EXECUTIVE HANDSHAKE INITIATED'}
            {phase === 'shaking' && 'SEALING THE DEAL • MUTUAL TRUST'}
            {phase === 'sealed' && '✦ PARTNERSHIP CONFIRMED • WELCOME ✦'}
          </span>
        </div>

        {/* Partnership Footnotes */}
        <div className="fullscreen-partnership-badges">
          <div className="intro-badge badge-client">
            <span className="badge-gold-dot" />
            <span>Visionary Client • Enterprise</span>
          </div>
          <div className="intro-badge badge-center-vs">
            <span>AGREEMENT • TRUST • EXCELLENCE</span>
          </div>
          <div className="intro-badge badge-developer">
            <span className="badge-gold-dot" />
            <span>Praveen Raju • AI Solutions</span>
          </div>
        </div>

        {/* CTA Enter Button */}
        <button
          className="intro-enter-btn"
          id="introEnterBtn"
          aria-label="Enter Portfolio"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
        >
          <span className="intro-btn-shimmer" />
          <span className="intro-btn-icon">🤝</span>
          <span className="intro-btn-text">
            {phase === 'sealed' ? 'Welcome • Enter Portfolio' : 'Shake Hands & Enter Portfolio'}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <p className="intro-hint">Click anywhere or button above to explore instantly</p>
      </div>
    </div>
  );
}
