import { useEffect, useRef } from 'react';

// Subtle futuristic cursor glow that follows mouse movement
function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glowEl = glowRef.current;
    if (!glowEl) return;

    const moveGlow = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      glowEl.style.transform = `translate(${x - 160}px, ${y - 160}px)`;
    };

    window.addEventListener('mousemove', moveGlow);

    return () => {
      window.removeEventListener('mousemove', moveGlow);
    };
  }, []);

  return <div ref={glowRef} className="mouse-glow" aria-hidden="true" />;
}

export default MouseGlow;
