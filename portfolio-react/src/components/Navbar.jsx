import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'achievements', label: 'Awards' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      let current = 'home';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 150) current = item.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const header = document.getElementById('header');
      if (header && !header.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
      <nav className="navbar">

        <a href="#home" className="nav-logo" aria-label="Praveen Raju Portfolio Home" onClick={(e) => handleLinkClick(e, 'home')}>
          <div className="logo-symbol">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">Raju</span>
            <span className="logo-bracket">/&gt;</span>
          </div>
          <span className="nav-status-badge" title="Available for opportunities">
            <span className="status-pulse-dot"></span>
            <span className="status-text">Available</span>
          </span>
        </a>

        <div className="nav-capsule">
          <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`} id="navMenu">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  id={`nav-${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-right-actions">
          <a href="#contact" className="nav-cta-btn" id="navCtaBtn" aria-label="Contact Praveen" onClick={(e) => handleLinkClick(e, 'contact')}>
            <span>Let&#39;s Talk</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} id="hamburger" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>

      </nav>
    </header>
  );
}
