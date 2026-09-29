export default function About() {
  const profile = {
    name: 'Praveen Raju K',
    title: 'AI & Machine Learning Engineer • Full Stack Developer',
    paragraphs: [
      'I build intelligent, scalable, and user-centric applications by combining Artificial Intelligence, Machine Learning, data engineering, and modern software development. My interests span Generative AI, Deep Learning, LLMs, Data Analytics, and Full Stack Development.',
      'I enjoy transforming ideas into impactful solutions — from designing AI-powered applications and building intelligent systems to developing robust, end-to-end web applications. Driven by curiosity and a passion for continuous learning, I strive to create technology that solves real-world problems and makes a meaningful difference.'
    ],
    tagline: 'Curiosity drives me. Innovation inspires me. Building is how I grow.',
    imageUrl: '/about image/myimage.jpg',
    githubUrl: 'https://github.com/Praveenraju10',
    twitterUrl: 'https://twitter.com',
    linkedinUrl: 'https://www.linkedin.com/in/praveen-raju-k/',
  };

  const socialIcons = [
    {
      label: 'GitHub',
      url: profile.githubUrl,
      icon: (
        <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      url: profile.linkedinUrl,
      icon: (
        <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header about-header-single-line">
          <div className="section-label">ABOUT ME</div>
          <h2 className="section-title single-line-title">
            Turning Ideas into <span className="text-accent">Intelligent Solutions</span>
          </h2>
          <p className="section-desc">
            Passionate about building scalable AI systems and high-impact web architectures
          </p>
        </div>

        {/* Showcase Container */}
        <div className="testimonial-carousel-wrap about-single-showcase">
          <div className="testimonial-carousel-desktop">
            {/* Full Portrait Image Box */}
            <div className="testimonial-avatar-box full-portrait-avatar">
              <img
                src={profile.imageUrl}
                alt={profile.name}
                className="testimonial-avatar-img full-photo-img"
                draggable={false}
              />
              <div className="avatar-gold-border-glow" />
            </div>

            {/* Overlapping Floating Modern Dark Card */}
            <div className="testimonial-card-overlap">
              <div className="testimonial-card-inner">
                <div className="testimonial-card-header">
                  <span className="testimonial-quote-badge">“</span>
                  <h3 className="testimonial-name">{profile.name}</h3>
                  <p className="testimonial-title">{profile.title}</p>
                </div>

                <div className="testimonial-desc">
                  {profile.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                  {profile.tagline && (
                    <p className="testimonial-tagline" style={{ fontWeight: 700, color: 'var(--text-gold, #F5D77F)', marginTop: '12px' }}>
                      {profile.tagline}
                    </p>
                  )}
                </div>

                {/* Social Icons Row (YouTube Removed) */}
                <div className="testimonial-socials-row">
                  {socialIcons.map(({ icon, url, label }) => (
                    <a
                      key={label}
                      href={url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="testimonial-social-circle"
                      aria-label={label}
                      title={label}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
