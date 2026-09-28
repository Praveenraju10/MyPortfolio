import { useState, useEffect } from 'react';
import {
  TbRosetteDiscountCheck,
  TbExternalLink,
  TbEye,
  TbX
} from 'react-icons/tb';

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  const certificationsList = [
    {
      id: 'aws',
      category: ['cloud', 'web'],
      platform: 'Amazon Web Services (AWS)',
      issuer: 'AMAZON WEB SERVICES',
      title: 'AWS Certified Cloud Practitioner',
      desc: 'Industry-standard accreditation validating foundational understanding of AWS Cloud infrastructure, security models, compliance, high-availability architecture, and cloud economics.',
      image: '/images/aws-certified-cloud-practitioner.png',
      floatingBadge: '☁️ AWS Certified',
      floatingBadgeClass: 'aws-badge',
      skills: ['AWS Cloud', 'Cloud Architecture', 'Security & Compliance', 'Cloud Economics'],
      link: 'https://drive.google.com/drive/u/0/folders/13jzQzDjB5t0ZhrevsMUzrd9d8dD6c0kZ',
      verified: true
    },
    {
      id: 'nielit',
      category: ['ai', 'govt'],
      platform: 'NIELIT Calicut',
      issuer: 'NIELIT CALICUT',
      title: 'AI & Data Analytics Internship',
      desc: 'Advanced 4-week offline specialization in Artificial Intelligence, Machine Learning models, dataset engineering, and Django-based web integration at NIELIT Calicut.',
      image: '/images/NIELT certificate_page-0001.jpg',
      floatingBadge: '🏛️ Govt. of India',
      floatingBadgeClass: 'govt-badge',
      skills: ['AI & Machine Learning', 'OpenCV', 'Data Analytics', 'Django'],
      link: 'https://drive.google.com/drive/u/0/folders/13jzQzDjB5t0ZhrevsMUzrd9d8dD6c0kZ',
      verified: true
    },
    {
      id: 'python',
      category: ['ai', 'govt'],
      platform: 'GUVI / IIT-M Research Park',
      issuer: 'GUVI / IIT-M RESEARCH PARK',
      title: 'Python Programming & Algorithmic Foundations',
      desc: 'Rigorous certification validating core Python architecture, data structures, modular software design, object-oriented concepts, and computational problem solving.',
      image: '/images/python.png',
      floatingBadge: '🎓 IIT-M Incubated',
      floatingBadgeClass: 'iit-badge',
      skills: ['Python', 'Data Structures', 'OOP', 'Algorithms'],
      link: 'https://drive.google.com/drive/u/0/folders/13jzQzDjB5t0ZhrevsMUzrd9d8dD6c0kZ',
      verified: true
    },
    {
      id: 'django',
      category: ['web'],
      platform: 'Udemy',
      issuer: 'UDEMY',
      title: 'Django Web Development & REST APIs',
      desc: 'End-to-end web framework mastery including Django ORM modeling, RESTful API endpoints, robust user authentication, views, templates, and database migrations.',
      image: '/images/Django.png',
      floatingBadge: '🌐 Udemy Verified',
      floatingBadgeClass: 'udemy-badge',
      skills: ['Django', 'REST API', 'ORM', 'Backend Auth'],
      link: 'https://drive.google.com/drive/u/0/folders/13jzQzDjB5t0ZhrevsMUzrd9d8dD6c0kZ',
      verified: true
    },
    {
      id: 'excel',
      category: ['ai', 'govt'],
      platform: 'GUVI / Google Partner',
      issuer: 'GUVI / GOOGLE PARTNER',
      title: 'MS Excel for Advanced Data Analysis',
      desc: 'Advanced data processing, multi-variable lookup formulas, dynamic PivotTables, data aggregation models, and executive chart presentations for analytics workflows.',
      image: '/images/MS EXCEL.png',
      floatingBadge: '🎓 GUVI Verified',
      floatingBadgeClass: 'iit-badge',
      skills: ['Data Analytics', 'Pivot Tables', 'Formulas & Modeling', 'Visualization'],
      link: 'https://drive.google.com/drive/u/0/folders/13jzQzDjB5t0ZhrevsMUzrd9d8dD6c0kZ',
      verified: true
    },
    {
      id: 'html',
      category: ['web', 'govt'],
      platform: 'GUVI / Google Partner',
      issuer: 'GUVI / GOOGLE PARTNER',
      title: 'HTML5 & CSS3 Modern Design Mastery',
      desc: 'Comprehensive frontend design engineering including Flexbox, CSS Grid layouts, media queries, cross-browser compatibility, and modern UI transitions.',
      image: '/images/HTML CSS.png',
      floatingBadge: '🎓 GUVI Verified',
      floatingBadgeClass: 'iit-badge',
      skills: ['HTML5', 'CSS3 Grid & Flexbox', 'Responsive UI', 'Web Standards'],
      link: 'https://drive.google.com/drive/u/0/folders/13jzQzDjB5t0ZhrevsMUzrd9d8dD6c0kZ',
      verified: true
    }
  ];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  const filteredCerts =
    activeFilter === 'all'
      ? certificationsList
      : certificationsList.filter((c) => c.category.includes(activeFilter));

  const filters = [
    { id: 'all', label: 'All Credentials (6)' },
    { id: 'cloud', label: 'Cloud & Infrastructure' },
    { id: 'ai', label: 'AI & Data Science' },
    { id: 'web', label: 'Full-Stack & Web' },
    { id: 'govt', label: 'Govt & Academic' }
  ];

  return (
    <section id="certifications" className="section certs-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">CREDENTIALS &amp; SPECIALIZATIONS</div>
          <h2 className="section-title">
            Licenses &amp; <span className="text-accent">Certifications</span>
          </h2>
          <p className="section-desc">
            Industry-validated technical certifications and accredited specializations across modern software development, AI, and data engineering.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="certs-filter-bar reveal">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`cert-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="filter-dot"></span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Deluxe Certifications Grid */}
        <div className="certs-deluxe-grid">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="cert-deluxe-card reveal"
              id={`cert-${cert.id}`}
            >
              <div className="cert-card-shine" />

              {/* Certificate Image Thumbnail */}
              <div
                className="cert-thumb-container"
                onClick={() => setSelectedCert(cert)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-thumb-img"
                  loading="lazy"
                />
                <div className="cert-thumb-overlay">
                  <span className="cert-zoom-btn">
                    <TbEye size={18} />
                    <span>Preview Certificate</span>
                  </span>
                </div>
                <span className={`cert-badge-floating ${cert.floatingBadgeClass}`}>
                  <span>{cert.floatingBadge}</span>
                </span>
              </div>

              {/* Certificate Card Body */}
              <div className="cert-card-body">
                <div className="cert-meta-row">
                  <span className="cert-issuer-name">{cert.issuer}</span>
                  <span className="cert-status-pill">
                    <span className="verified-check">✓</span> Verified
                  </span>
                </div>

                <h3 className="cert-card-title">{cert.title}</h3>
                <p className="cert-card-desc">{cert.desc}</p>

                {/* Skills Tags */}
                <div className="cert-skills-tags">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx}>{skill}</span>
                  ))}
                </div>

                {/* Actions Row: Quick View + Verify */}
                <div className="cert-actions-row">
                  <button
                    type="button"
                    className="cert-btn-preview"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <TbEye size={16} />
                    <span>Quick View</span>
                  </button>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-btn-verify"
                    title="Verify on Google Drive"
                  >
                    <span>Verify</span>
                    <TbExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="cert-modal-backdrop open"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="cert-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="cert-modal-header">
              <div className="cert-modal-header-meta">
                <span className="cert-modal-badge">✓ VERIFIED CREDENTIAL</span>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                <p className="cert-modal-issuer">{selectedCert.issuer}</p>
              </div>
              <button
                type="button"
                className="cert-modal-close"
                onClick={() => setSelectedCert(null)}
                aria-label="Close Preview"
              >
                <TbX size={20} />
              </button>
            </div>

            {/* Modal Body: Image */}
            <div className="cert-modal-body">
              <div className="cert-modal-image-wrap">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="cert-modal-img"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="cert-modal-footer">
              <span className="cert-modal-hint">
                Press <kbd>ESC</kbd> or click outside to exit
              </span>
              <div className="cert-modal-footer-btns">
                <button
                  type="button"
                  className="btn btn-outline cert-modal-btn-close"
                  onClick={() => setSelectedCert(null)}
                >
                  Close
                </button>
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary cert-modal-btn-drive"
                >
                  <TbExternalLink size={16} />
                  <span>Open Original in Google Drive</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
