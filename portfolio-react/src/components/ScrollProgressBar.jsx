import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const barStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '3px',
    width: `${progress}%`,
    background: 'linear-gradient(90deg, #D4AF37, #FFDF00, #F5D77F, #AA7C11)',
    boxShadow: '0 0 10px rgba(212, 175, 55, 0.7), 0 0 20px rgba(255, 223, 0, 0.3)',
    zIndex: '9999',
    transition: 'width 0.1s ease',
    pointerEvents: 'none'
  };

  return <div style={barStyle}></div>;
}

