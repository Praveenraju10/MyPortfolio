export default function Footer() {
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#home" className="footer-logo" onClick={handleLogoClick}>
          <span className="logo-bracket">&lt;</span>Raju<span className="logo-bracket">/&gt;</span>
        </a>
        <p className="footer-copy">© 2025 Praveen Raju K. Crafted with passion & code.</p>
        <div className="footer-socials">
          <a href="https://github.com/Praveenraju10" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="/images/github.svg" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/praveen-raju-k/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/images/linkedin-square-logo-svgrepo-com.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
}
