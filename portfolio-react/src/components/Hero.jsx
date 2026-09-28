import { useEffect, useState, useRef } from 'react';
import {
  TbSparkles,
  TbArrowRight,
  TbDownload,
  TbCode,
  TbAward,
  TbCertificate,
  TbBrain
} from 'react-icons/tb';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export default function Hero() {
  // --- 1. Dynamic Roles Typing Effect ---
  const roles = [
    'AI & Machine Learning Engineer',
    'Full Stack Web Architect',
    'Data Analytics Specialist',
    'Dr. Kalam Young Achiever Awardee',
    'Intelligent Systems Builder'
  ];
  const [typingText, setTypingText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = roles[roleIdx];

    if (!isDeleting) {
      if (charIdx < currentWord.length) {
        timer = setTimeout(() => {
          setTypingText(currentWord.substring(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        }, 70);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setTypingText(currentWord.substring(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIdx((roleIdx + 1) % roles.length);
        setCharIdx(0);
        timer = setTimeout(() => {}, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx]);

  const heroRef = useRef(null);

  // --- 2. Hero Stats Counter ---
  const [stats, setStats] = useState({ projects: 0, awards: 0, certs: 0 });
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1200;
          const steps = 30;
          const stepTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            setStats({
              projects: Math.min(Math.floor((3 / steps) * step), 3),
              awards: Math.min(Math.floor((2 / steps) * step), 2),
              certs: Math.min(Math.floor((5 / steps) * step), 5)
            });
            if (step >= steps) {
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScrollDown = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* Static Luxury Handshake Background (No animations, theme blended) */}
      <div className="hero-handshake-bg-wrapper">
        <div 
          className="hero-handshake-bg-img" 
          style={{ backgroundImage: `url('/images/gold_handshake.jpg')` }} 
        />
        <div className="hero-handshake-vignette" />
        <div className="hero-handshake-gold-tint" />
      </div>

      {/* Subtle Luxury Ambient Glow */}
      <div className="hero-bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="hero-content">
        {/* Availability Badge */}
        <div className="hero-badge">
          <span className="badge-dot" />
          <span className="badge-text">Available for Full-Time & High-Impact Opportunities</span>
        </div>

        {/* Executive Sub-Header */}
        <p className="hero-greeting">
          <span className="gold-accent-dash">—</span> AI & FULL STACK SOFTWARE ENGINEER <span className="gold-accent-dash">—</span>
        </p>

        {/* Main Title */}
        <h1 className="hero-name">
          Praveen Raju K
        </h1>

        {/* Dynamic Typing Title */}
        <div className="hero-roles-bar">
          <span className="role-prefix">Specialized in</span>
          <span className="typing-text-wrapper">
            <span className="typing-text">{typingText}</span>
            <span className="typing-cursor">|</span>
          </span>
        </div>

        {/* Executive Description */}
        <p className="hero-desc">
          Designing and deploying <strong>intelligent machine learning pipelines</strong>, computer vision systems,
          and robust <strong>full-stack architectures</strong> engineered for scalability, speed, and real-world impact.
        </p>

        {/* Action CTAs & Social Links */}
        <div className="hero-cta-group">
          <a
            href="#projects"
            className="btn btn-primary btn-hero-primary"
            id="btn-hero-projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>View Featured Projects</span>
            <TbArrowRight className="btn-icon" />
          </a>

          <a
            href="https://drive.google.com/drive/folders/1c2jxx1ns_pO7IHiKqVTFc0dJvKn63Lll"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-hero-secondary"
            id="btn-hero-resume"
          >
            <TbDownload className="btn-icon" />
            <span>Download Executive CV</span>
          </a>

          <div className="hero-social-pill-row">
            <a
              href="https://github.com/Praveenraju10"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/praveen-raju-k/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Executive Metrics Highlight Bar */}
        <div className="hero-stats-card">
          <div className="stat-item">
            <div className="stat-icon-wrap">
              <TbCode className="stat-svg" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.projects}+</span>
              <span className="stat-label">Full Stack & AI Projects</span>
            </div>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <div className="stat-icon-wrap">
              <TbAward className="stat-svg" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.awards}+</span>
              <span className="stat-label">Honors & National Awards</span>
            </div>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <div className="stat-icon-wrap">
              <TbCertificate className="stat-svg" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.certs}+</span>
              <span className="stat-label">Verified Certifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Scroll Indicator */}
      <div className="hero-scroll-indicator" onClick={handleScrollDown}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>EXPLORE PORTFOLIO</span>
      </div>
    </section>
  );
}
