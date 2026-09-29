import { useState } from 'react';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaJava,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaTerminal
} from 'react-icons/fa6';
import {
  SiJavascript,
  SiDjango,
  SiFlask,
  SiOpencv,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiPostman,
  SiLinux,
  SiVercel,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiFlutter,
  SiRedis,
  SiPytorch,
  SiTailwindcss
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import {
  TbBrain,
  TbCode,
  TbDatabase,
  TbTools,
  TbSparkles,
  TbServer,
  TbEyeCheck,
  TbLayersLinked,
  TbDeviceAnalytics,
  TbTerminal2,
  TbAward,
  TbCheck
} from 'react-icons/tb';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const skillDomains = [
    {
      id: 'fullstack',
      title: 'Full Stack Web Development',
      badge: 'Architecture & Microservices',
      icon: <TbCode className="domain-icon-svg" />,
      accentColor: '#D4AF37',
      summary:
        'Architecting responsive, high-performance web applications with modular frontends, secure backend APIs, and scalable microservices.',
      stats: '10+ Frameworks & Tools',
      coreSkills: [
        { name: 'React.js', level: 'Specialized', progress: 92, icon: <FaReact style={{ color: '#61DAFB' }} />, type: 'Frontend' },
        { name: 'JavaScript (ES6+)', level: 'Specialized', progress: 94, icon: <SiJavascript style={{ color: '#F7DF1E' }} />, type: 'Core Lang' },
        { name: 'Django', level: 'Specialized', progress: 90, icon: <SiDjango style={{ color: '#092E20' }} />, type: 'Backend Framework' },
        { name: 'Node.js & Express', level: 'Practiced', progress: 85, icon: <FaNodeJs style={{ color: '#5FA04E' }} />, type: 'Server API' },
        { name: 'HTML5 & Modern CSS', level: 'Production-Grade', progress: 96, icon: <FaHtml5 style={{ color: '#E34F26' }} />, type: 'UI / UX' },
        { name: 'RESTful API Architecture', level: 'Specialized', progress: 92, icon: <TbServer style={{ color: '#F5D77F' }} />, type: 'Architecture' },
        { name: 'Flask', level: 'Practiced', progress: 84, icon: <SiFlask style={{ color: '#FFFFFF' }} />, type: 'Microservices' },
        { name: 'Tailwind CSS', level: 'Specialized', progress: 90, icon: <SiTailwindcss style={{ color: '#06B6D4' }} />, type: 'Design System' }
      ]
    },
    {
      id: 'aiml',
      title: 'AI & Machine Learning',
      badge: 'Intelligent Systems & Vision',
      icon: <TbBrain className="domain-icon-svg" />,
      accentColor: '#FFDF00',
      summary:
        'Developing production-grade ML pipelines, real-time computer vision models, neural networks, and automated data processing workflows.',
      stats: '8+ AI Libraries & Models',
      coreSkills: [
        { name: 'Python', level: 'Production-Grade', progress: 96, icon: <FaPython style={{ color: '#3776AB' }} />, type: 'Primary Language' },
        { name: 'Machine Learning', level: 'Specialized', progress: 90, icon: <TbBrain style={{ color: '#F5D77F' }} />, type: 'Algorithms' },
        { name: 'Deep Learning', level: 'Specialized', progress: 88, icon: <TbSparkles style={{ color: '#FFDF00' }} />, type: 'Neural Nets' },
        { name: 'Computer Vision', level: 'Specialized', progress: 90, icon: <TbEyeCheck style={{ color: '#58D68D' }} />, type: 'Image Analysis' },
        { name: 'OpenCV', level: 'Specialized', progress: 88, icon: <SiOpencv style={{ color: '#5C3EE8' }} />, type: 'CV Processing' },
        { name: 'YOLOv5 Object Detection', level: 'Specialized', progress: 89, icon: <TbLayersLinked style={{ color: '#FF7F50' }} />, type: 'Real-Time Vision' },
        { name: 'Scikit-Learn', level: 'Specialized', progress: 91, icon: <SiScikitlearn style={{ color: '#F7931E' }} />, type: 'Predictive Modeling' },
        { name: 'Pandas & NumPy', level: 'Production-Grade', progress: 95, icon: <SiPandas style={{ color: '#150458' }} />, type: 'Data Science' }
      ]
    },
    {
      id: 'databases',
      title: 'Databases & Storage',
      badge: 'Data Architecture & Modeling',
      icon: <TbDatabase className="domain-icon-svg" />,
      accentColor: '#F5D77F',
      summary:
        'Designing normalized relational schemas, scalable NoSQL databases, fast query indexing, and real-time cloud data storage.',
      stats: '6+ Storage Engines',
      coreSkills: [
        { name: 'SQL & Query Design', level: 'Specialized', progress: 93, icon: <FaDatabase style={{ color: '#F5D77F' }} />, type: 'Relational' },
        { name: 'MySQL', level: 'Specialized', progress: 91, icon: <SiMysql style={{ color: '#4479A1' }} />, type: 'RDBMS' },
        { name: 'PostgreSQL', level: 'Practiced', progress: 86, icon: <SiPostgresql style={{ color: '#4169E1' }} />, type: 'RDBMS' },
        { name: 'MongoDB', level: 'Specialized', progress: 88, icon: <SiMongodb style={{ color: '#47A248' }} />, type: 'NoSQL Document' },
        { name: 'Firebase Firestore', level: 'Specialized', progress: 89, icon: <SiFirebase style={{ color: '#FFCA28' }} />, type: 'Realtime Cloud' },
        { name: 'Data Analytics & ETL', level: 'Specialized', progress: 90, icon: <TbDeviceAnalytics style={{ color: '#00D2FF' }} />, type: 'Analytics' }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & DevOps Ecosystem',
      badge: 'DevOps & Workflow',
      icon: <TbTools className="domain-icon-svg" />,
      accentColor: '#D4AF37',
      summary:
        'Standardizing development lifecycles with Git collaboration, Docker containerization, REST API testing, and automated cloud deployments.',
      stats: '8+ Platforms & Utilities',
      coreSkills: [
        { name: 'Git & GitHub', level: 'Specialized', progress: 95, icon: <FaGithub style={{ color: '#FFFFFF' }} />, type: 'Version Control' },
        { name: 'VS Code IDE', level: 'Production-Grade', progress: 96, icon: <VscVscode style={{ color: '#007ACC' }} />, type: 'Development' },
        { name: 'Postman', level: 'Specialized', progress: 92, icon: <SiPostman style={{ color: '#FF6C37' }} />, type: 'API Testing' },
        { name: 'Docker', level: 'Competent', progress: 80, icon: <FaDocker style={{ color: '#2496ED' }} />, type: 'Containers' },
        { name: 'Linux / Bash', level: 'Practiced', progress: 85, icon: <SiLinux style={{ color: '#FCC624' }} />, type: 'OS & Scripting' },
        { name: 'Vercel / Cloud Deploy', level: 'Specialized', progress: 91, icon: <SiVercel style={{ color: '#FFFFFF' }} />, type: 'Deployment' },
        { name: 'Java (OOP)', level: 'Practiced', progress: 84, icon: <FaJava style={{ color: '#EA2D2E' }} />, type: 'OOP & Core' },
        { name: 'MS Excel Analytics', level: 'Specialized', progress: 92, icon: <TbTerminal2 style={{ color: '#107C41' }} />, type: 'Data Tools' }
      ]
    }
  ];

  // Quick brand showcase icons
  const techStackArsenal = [
    { name: 'Python', icon: <FaPython />, color: '#3776AB', category: 'AI & Core Backend' },
    { name: 'React', icon: <FaReact />, color: '#61DAFB', category: 'Frontend Architecture' },
    { name: 'Django', icon: <SiDjango />, color: '#092E20', category: 'Backend Framework' },
    { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', category: 'Full Stack' },
    { name: 'OpenCV', icon: <SiOpencv />, color: '#5C3EE8', category: 'Computer Vision' },
    { name: 'YOLOv5', icon: <TbLayersLinked />, color: '#FF7F50', category: 'Deep Learning' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#5FA04E', category: 'Server Runtime' },
    { name: 'SQL', icon: <FaDatabase />, color: '#F5D77F', category: 'Databases' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', category: 'NoSQL' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28', category: 'Cloud Database' },
    { name: 'Postman', icon: <SiPostman />, color: '#FF6C37', category: 'API Testing' },
    { name: 'Docker', icon: <FaDocker />, color: '#2496ED', category: 'Containers' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032', category: 'Version Control' },
    { name: 'VS Code', icon: <VscVscode />, color: '#007ACC', category: 'IDE Workflow' },
    { name: 'Pandas', icon: <SiPandas />, color: '#150458', category: 'Data Analysis' },
    { name: 'Linux', icon: <SiLinux />, color: '#FCC624', category: 'OS & CLI' }
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const filteredDomains =
    activeTab === 'all'
      ? skillDomains
      : skillDomains.filter((d) => d.id === activeTab);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">TECHNICAL EXPERTISE & ARSENAL</div>
          <h2 className="section-title">
            Skills & <span className="text-accent">Domain Specializations</span>
          </h2>
          <p className="section-desc">
            Organized across 4 core engineering domains — engineered for scalable full-stack web applications, machine learning systems, and enterprise data architectures.
          </p>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="skills-filter-nav reveal">
          <button
            className={`skills-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <TbSparkles className="tab-btn-icon" />
            <span>All Domains</span>
            <span className="tab-count-badge">4</span>
          </button>
          {skillDomains.map((domain) => (
            <button
              key={domain.id}
              className={`skills-tab-btn ${activeTab === domain.id ? 'active' : ''}`}
              onClick={() => setActiveTab(domain.id)}
            >
              <span className="tab-btn-icon">{domain.icon}</span>
              <span>{domain.title}</span>
            </button>
          ))}
        </div>

        {/* Separated Skills Domain Cards */}
        <div className={`skills-domain-grid ${activeTab !== 'all' ? 'single-domain-view' : ''}`}>
          {filteredDomains.map((domain) => (
            <div
              key={domain.id}
              className="domain-card"
              onMouseMove={handleMouseMove}
            >
              {/* Card Spotlight Border Glow */}
              <div className="domain-card-glow-border" />

              {/* Card Header */}
              <div className="domain-card-header">
                <div className="domain-icon-wrapper">
                  <div className="domain-icon-glow" />
                  {domain.icon}
                </div>
                <div className="domain-header-info">
                  <div className="domain-top-meta">
                    <span className="domain-badge">{domain.badge}</span>
                    <span className="domain-stats-pill">{domain.stats}</span>
                  </div>
                  <h3 className="domain-title">{domain.title}</h3>
                </div>
              </div>

              {/* Domain Summary */}
              <p className="domain-summary">{domain.summary}</p>

              {/* Core Technologies Grid */}
              <div className="domain-core-skills-block">
                <div className="domain-subheading">Core Technologies & Tools</div>
                <div className="skills-chip-grid">
                  {domain.coreSkills.map((tech, tIdx) => (
                    <div key={tIdx} className="tech-skill-chip" title={tech.name}>
                      <div className="tech-chip-icon-box">{tech.icon}</div>
                      <div className="tech-chip-details">
                        <span className="tech-chip-name">{tech.name}</span>
                        <span className="tech-chip-type">{tech.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tech Stack Arsenal Showcase */}
        <div className="tech-arsenal-wrapper reveal">
          <div className="tech-arsenal-header">
            <div className="arsenal-badge">
              <TbSparkles /> COMPLETE TECH STACK ARSENAL
            </div>
            <h3 className="arsenal-title">Technologies & Frameworks</h3>
            <p className="arsenal-desc">
              Comprehensive overview of languages, frameworks, libraries, and developer tools in active practice.
            </p>
          </div>

          <div className="tech-arsenal-grid">
            {techStackArsenal.map((tech, idx) => (
              <div
                key={idx}
                className="arsenal-card reveal"
                onMouseMove={handleMouseMove}
              >
                <div className="arsenal-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <div className="arsenal-name">{tech.name}</div>
                <div className="arsenal-cat">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Engineering Proficiency Highlights */}
        <div className="skills-metrics-row reveal">
          <div className="metric-box">
            <span className="metric-number">4</span>
            <span className="metric-label">Engineering Domains</span>
            <span className="metric-sub">Full Stack, AI/ML, DBs, Tools</span>
          </div>
          <div className="metric-box">
            <span className="metric-number">25+</span>
            <span className="metric-label">Technologies Mastered</span>
            <span className="metric-sub">Languages, Frameworks, DBs</span>
          </div>
          <div className="metric-box">
            <span className="metric-number">100%</span>
            <span className="metric-label">Clean Code & Architecture</span>
            <span className="metric-sub">Scalable & Maintainable</span>
          </div>
          <div className="metric-box">
            <span className="metric-number">AI+Web</span>
            <span className="metric-label">End-to-End Delivery</span>
            <span className="metric-sub">From Model to Production UI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
