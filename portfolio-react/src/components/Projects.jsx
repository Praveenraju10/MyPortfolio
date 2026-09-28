import { ImagesScrollingAnimation } from "./ui/images-scrolling-animation";

const projectsList = [
  {
    id: "inivalam",
    title: "Inivalam – Smart Agriculture Platform",
    desc: "AI-powered system providing crop advisory, disease detection, and smart irrigation management for farmers. Real-time monitoring with ML-based predictions.",
    tags: ["Python", "Machine Learning", "Firebase", "Flutter", "Computer Vision"],
    github: "https://github.com/Praveenraju10/Inivalam-Smart-Agri-Platform.git",
    src: "/images/inivalam.jpg",
  },
  {
    id: "pothole",
    title: "Pothole Detection – Computer Vision",
    desc: "Deep learning model using YOLOv5 to detect potholes from road images in real-time, improving road safety through automated infrastructure monitoring.",
    tags: ["Python", "YOLOv5", "OpenCV", "Deep Learning"],
    github: "https://github.com/Praveenraju10/Pothole-detection.git",
    src: "/images/pothole.jpg",
  },
  {
    id: "timebank",
    title: "Time Bank Community Platform",
    desc: "Web platform enabling community members to exchange services using time credits instead of money — fostering community-driven collaboration and fair skill exchange.",
    tags: ["Django", "JavaScript", "SQL", "REST API", "HTML/CSS"],
    github: "https://github.com/Praveenraju10/Time-Bank-Community.git",
    src: "/images/timebank.jpg",
  },
  {
    id: "lawshathi",
    title: "⚖️ LawShathi – Smart Legal Assistant & RAG System",
    desc: "Multi-stage Agentic AI & RAG legal consultation system designed for Indian law. Features intelligent intent routing, automated legal complaint drafting with bilingual PDF generation, similarity-based case precedent search with verdict analytics, and bilingual voice assistance (Tamil & English).",
    tags: ["Python", "Flask", "RAG / FAISS", "Llama 3.3", "React", "ReportLab"],
    github: "https://github.com/Praveenraju10/LawShathi.git",
    src: "/images/lawshathi.jpg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section projects-section projects-scroll-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">SELECTED WORK</div>
          <h2 className="section-title">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="section-desc">
            Real-world applications built with modern tech stacks and machine learning
          </p>
        </div>
      </div>

      {/* Full-width Scroll Animation */}
      <div className="projects-scroll-container">
        <ImagesScrollingAnimation projects={projectsList} />
      </div>
    </section>
  );
}
