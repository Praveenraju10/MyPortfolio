import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const animateCursor = () => {
      const dx = mousePos.current.x - glowPos.current.x;
      const dy = mousePos.current.y - glowPos.current.y;
      
      // Interpolate position with 0.08 damping factor
      glowPos.current.x += dx * 0.08;
      glowPos.current.y += dy * 0.08;

      if (glowRef.current) {
        glowRef.current.style.left = `${glowPos.current.x}px`;
        glowRef.current.style.top = `${glowPos.current.y}px`;
      }

      animationId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div className="cursor-glow" id="cursorGlow" ref={glowRef}></div>;
}
