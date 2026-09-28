import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * TRUE stacked card effect:
 * - Each card wrapper is position:sticky (same top for all)
 * - Each card has a vertical offset based on index (i * OFFSET_PX)
 *   so the next card peeks from below the current one
 * - As you scroll, the current card scales down (shrinks back)
 *   revealing the next card sliding up
 */

const CARD_OFFSET = 22; // px — how much each card peeks below the previous
const CARD_TOP = 80;    // px from top viewport — where cards anchor

const StickyCard = ({ i, title, src, desc, tags, github, demo, progress, total }) => {
  // Scale: this card shrinks as the NEXT cards come in
  const scaleEnd = Math.max(0.78, 1 - (total - i - 1) * 0.045);
  const scale = useTransform(
    progress,
    [i / total, (i + 1) / total],
    [1, scaleEnd]
  );

  return (
    // Each wrapper gives 100vh of scroll space
    <div className="sticky-project-wrapper">
      <motion.div
        className="sticky-project-card"
        style={{
          scale,
          // Offset each card down so the next one peeks below
          top: `calc(${CARD_TOP}px + ${i * CARD_OFFSET}px)`,
          transformOrigin: "top center",
        }}
      >
        {/* Image Side */}
        <div className="sticky-project-image-wrap">
          <img src={src} alt={title} className="sticky-project-img" loading="lazy" />
          <div className="sticky-project-number">0{i + 1}</div>
        </div>

        {/* Content Side */}
        <div className="sticky-project-content">
          <h3 className="sticky-project-title">{title}</h3>
          <p className="sticky-project-desc">{desc}</p>
          <div className="sticky-project-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="sticky-project-tag">{tag}</span>
            ))}
          </div>
          <div className="sticky-project-links">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="sticky-project-btn sticky-project-btn-outline"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.33.72-4.03-1.61-4.03-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
              GitHub
            </a>
            {demo && demo !== "#" && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className="sticky-project-btn sticky-project-btn-gold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ImagesScrollingAnimation = ({ projects = [] }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="sticky-projects-main">
      {projects.map((project, i) => (
        <StickyCard
          key={project.id}
          i={i}
          total={projects.length}
          title={project.title}
          src={project.src}
          desc={project.desc}
          tags={project.tags}
          github={project.github}
          demo={project.demo}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
};

export { ImagesScrollingAnimation, StickyCard };
export default ImagesScrollingAnimation;
