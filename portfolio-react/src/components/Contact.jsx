import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitState, setSubmitState] = useState('idle'); // idle, sending, success
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    
    // Auto hide toast
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitState('sending');

    try {
      // Send real email via FormSubmit API to Praveen's inbox
      const response = await fetch('https://formsubmit.co/ajax/praveenraju192006@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact Message from Portfolio',
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}: ${formData.subject || 'General Inquiry'}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitState('success');
        showToast("Your message has been sent! I'll get back to you shortly. 🚀", 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      // Fallback notification & mailto option
      setSubmitState('idle');
      showToast('Could not deliver directly. Opening your mail client...', 'error');
      const mailtoUrl = `mailto:praveenraju192006@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.open(mailtoUrl, '_blank');
      return;
    }

    // Reset button after 4 seconds
    setTimeout(() => {
      setSubmitState('idle');
    }, 4000);
  };

  const toastStyle = {
    position: 'fixed',
    bottom: '32px',
    left: '50%',
    transform: toast.visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100px)',
    opacity: toast.visible ? 1 : 0,
    background: toast.type === 'success' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    zIndex: '9999',
    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    whiteSpace: 'nowrap',
    fontFamily: "'Inter', sans-serif",
    pointerEvents: toast.visible ? 'auto' : 'none'
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">CONTACT</div>
          <h2 className="section-title">
            Let's <span className="text-accent">Connect</span>
          </h2>
          <p className="section-desc">Open to collaborations, internships, and building cool things together</p>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-wrap reveal-left">
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactName">Full Name</label>
                  <input
                    type="text"
                    id="contactName"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    disabled={submitState === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Email Address</label>
                  <input
                    type="email"
                    id="contactEmail"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    disabled={submitState === 'sending'}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contactSubject">Subject</label>
                <input
                  type="text"
                  id="contactSubject"
                  placeholder="Let's collaborate on..."
                  value={formData.subject}
                  onChange={(e) => handleInputChange(e, 'subject')}
                  disabled={submitState === 'sending'}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactMessage">Message</label>
                <textarea
                  id="contactMessage"
                  rows="5"
                  placeholder="Tell me about your project or idea..."
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange(e, 'message')}
                  disabled={submitState === 'sending'}
                ></textarea>
              </div>

              {submitState === 'idle' && (
                <button type="submit" className="btn btn-primary btn-full" id="contactSubmit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </button>
              )}

              {submitState === 'sending' && (
                <button type="submit" className="btn btn-primary btn-full" id="contactSubmit" disabled>
                  <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Sending...
                </button>
              )}

              {submitState === 'success' && (
                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  id="contactSubmit"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 8px 24px rgba(16,185,129,0.4)',
                    cursor: 'default'
                  }}
                  disabled
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Message Sent!
                </button>
              )}
            </form>
          </div>

          {/* Details */}
          <div className="contact-info-wrap reveal-right">
            <div className="contact-card">
              <h3>Get In Touch</h3>
              <p className="contact-card-desc">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
              </p>

              <div className="contact-info-items">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="info-label">Phone</span>
                    <a href="tel:+919361314071" className="info-value" style={{ color: 'inherit', textDecoration: 'none' }}>
                      +91 9361314071
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <span className="info-label">Email</span>
                    <a href="mailto:praveenraju192006@gmail.com" className="info-value" style={{ color: 'inherit', textDecoration: 'none' }}>
                      praveenraju192006@gmail.com
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="info-label">Location</span>
                    <span className="info-value">Tamil Nadu, India</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <span className="info-label">Response Time</span>
                    <span className="info-value">Within 24 Hours</span>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Find Me On</h4>
                <div className="social-row">
                  <a
                    href="https://github.com/Praveenraju10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    id="social-github"
                    aria-label="GitHub"
                  >
                    <img src="/images/github.svg" alt="GitHub" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/praveen-raju-k/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    id="social-linkedin"
                    aria-label="LinkedIn"
                  >
                    <img src="/images/linkedin-square-logo-svgrepo-com.svg" alt="LinkedIn" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    id="social-instagram"
                    aria-label="Instagram"
                  >
                    <img src="/images/instagram.svg" alt="Instagram" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styled React Toast */}
      <div style={toastStyle}>
        <span>{toast.type === 'success' ? '✅' : '❌'}</span>
        <span>{toast.message}</span>
      </div>
    </section>
  );
}
