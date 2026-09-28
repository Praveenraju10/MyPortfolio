export default function Experience() {
  const experiences = [
    {
      date: 'Dec 2025',
      role: 'Data Analytics & AI Intern',
      company: 'National Institute of Electronics and Information Technology (NIELIT), Calicut',
      badge: 'Internship',
      desc: 'Completed a 4-week offline internship focused on Artificial Intelligence, Data Analytics, and Django-based web development. Worked on building AI-driven applications involving dataset preprocessing, machine learning workflows, and backend integration.',
      points: [
        'Developed AI models using Python and machine learning techniques',
        'Integrated AI solutions into Django web applications',
        'Worked on data preprocessing, visualization, and analytics pipelines',
        'Built computer vision projects using OpenCV and deep learning concepts'
      ],
      skills: ['Python', 'Django', 'OpenCV', 'Data Analytics']
    }
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">WORK EXPERIENCE</div>
          <h2 className="section-title">
            Professional <span className="text-accent">Journey</span>
          </h2>
        </div>

        <div className="timeline">
          <div className="timeline-line"></div>

          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-date">{exp.date}</span>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <span className="timeline-company">{exp.company}</span>
                  </div>
                  <div className="timeline-badge">{exp.badge}</div>
                </div>
                <p className="timeline-desc">{exp.desc}</p>
                <ul className="timeline-points">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
                <div className="timeline-skills">
                  {exp.skills.map((skill, sIdx) => (
                    <span key={sIdx}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
