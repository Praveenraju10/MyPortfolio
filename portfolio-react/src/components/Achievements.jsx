import { CircularTestimonials } from './ui/circular-testimonials';

const achievementsList = [
  {
    name: 'Dr. Kalam Young Achiever Award',
    designation: 'National Recognition • AI & Research Excellence (2025)',
    quote:
      'Honored with the prestigious Dr. Kalam Young Achiever Award by World Youth Federation for pioneering innovation in Artificial Intelligence, predictive data modeling, and societal technology solutions.',
    src: '/Awards/Kalam Awards.jpeg',
  },
  {
    name: 'First Place – Project Presentation',
    designation: 'State Level Technical Symposium • Kongu Engineering College (2025)',
    quote:
      'Won 1st Place for presenting an end-to-end intelligent machine learning solution with scalable backend architecture, accurate deep learning algorithms, and high-impact industry relevance.',
    src: '/Awards/KONGU.jpeg',
  },
  {
    name: 'National Level AI Internship & Project',
    designation: 'NIELIT Calicut • Ministry of Electronics and IT (2025)',
    quote:
      'Completed intensive advanced internship and practical AI deployment at the National Institute of Electronics and Information Technology (NIELIT), Calicut.',
    src: '/Awards/INTERN CALICUT.jpeg',
  },

    {
      name: '2nd Prize – Project Expo 3.0',
      designation: 'Freshothan • Sri Eshwar College of Engineering (2026)',
      quote:
        'Our team Tech X secured the 2nd Prize in Project Expo 3.0 at Freshothan, Sri Eshwar College of Engineering. We presented "IntelliFarm", an agriculture-focused innovation helping farmers make smarter, tech-driven decisions.\n\nTeam: Yogesh Waran, Sriram .S, PRIYAVARSHINI V\n\nThanks to mentors Sindhuja S & Kalaivani Thangavel, and HOD Dr.Sumathi S for their support.',
      src: '/images/Achivements/Freshthon.jpg',
    },
    {
      name: 'Devspark Hackathon – IEEE',
      designation: '24-Hour Coding Marathon • IEEE (2026)',
      quote:
        'Participated in the Devspark Hackathon, a 24-hour coding marathon organized by IEEE. Great experience of learning, collaboration, and innovation with teammates Yogeshwaran K, Vishnu R M, and SRIRAM S.\n\nThanks to mentor Sindhuja S for guidance, and IEEE for the platform.',
      src: '/images/Achivements/KPR hackthon.jpg',
    },
    {
      name: 'Hack Fusion – StartupTN',
      designation: 'VET Institute of Arts and Science • Thindal, Erode (2026)',
      quote:
        'Hack Fusion — a premier hackathon organized by StartupTN in collaboration with VET Institute of Arts and Science (Co-education) College, Thindal, Erode. Featuring 12 problem tracks spanning Smart Mobility, AI, Digital Governance, Sustainable Energy, and more. Collaborate. Innovate. Impact.',
      src: '/images/Achivements/TN.jpeg',
    },
  ];

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">RECOGNITION & AWARDS</div>
          <h2 className="section-title">
            Key Honors & <span className="text-accent">Milestones</span>
          </h2>
          <p className="section-desc">
            Explore national awards, hackathon victories, and milestones that define my engineering journey
          </p>
        </div>

        {/* 3D Circular Testimonials Showcase */}
        <div className="achievements-circular-wrapper">
          <CircularTestimonials
            testimonials={achievementsList}
            autoplay={true}
            colors={{
              name: '#FFFFFF',
              designation: '#D4AF37',
              testimony: '#CBD5E1',
              arrowBackground: '#111319',
              arrowForeground: '#FFFFFF',
              arrowHoverBackground: '#D4AF37',
            }}
            fontSizes={{
              name: 'clamp(24px, 2.5vw, 32px)',
              designation: '14px',
              quote: '16px',
            }}
          />
        </div>
      </div>
    </section>
  );
}
