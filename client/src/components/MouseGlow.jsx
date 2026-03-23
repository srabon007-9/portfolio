import { useEffect, useRef } from 'react';

// Subtle futuristic cursor glow that follows mouse movement
function MouseGlow() {
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: -160, y: -160 });

  useEffect(() => {
    const glowEl = glowRef.current;
    if (!glowEl) return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isCoarsePointer) return;

    const paint = () => {
      glowEl.style.transform = `translate(${posRef.current.x - 160}px, ${posRef.current.y - 160}px)`;
      rafRef.current = null;
    };

    const moveGlow = (event) => {
      posRef.current = { x: event.clientX, y: event.clientY };

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(paint);
      }
    };

    window.addEventListener('mousemove', moveGlow, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveGlow);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <div ref={glowRef} className="mouse-glow" aria-hidden="true" />;
}

export default MouseGlow;
