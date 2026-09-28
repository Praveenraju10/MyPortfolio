import { useEffect } from 'react';
import HandshakeIntro from './components/HandshakeIntro';
import CursorGlow from './components/CursorGlow';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

import './App.css';

function App() {
  useEffect(() => {
    // --- Scroll Reveal Animations ---
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger reveal animations for grid siblings
            const parent = entry.target.parentElement;
            const siblings = Array.from(parent.children).filter(
              (el) =>
                el.classList.contains('reveal') ||
                el.classList.contains('reveal-left') ||
                el.classList.contains('reveal-right')
            );
            const idx = siblings.indexOf(entry.target);
            const delay = Math.min(idx * 80, 400);

            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <HandshakeIntro />
      <CursorGlow />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
