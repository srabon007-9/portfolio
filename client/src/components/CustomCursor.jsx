import { useEffect, useMemo, useRef, useState } from 'react';

function CustomCursor() {
  const [isActive, setIsActive] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });

  const isTouchDevice = useMemo(
    () => window.matchMedia && window.matchMedia('(pointer: coarse)').matches,
    []
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const paint = () => {
      const ringEl = ringRef.current;
      const dotEl = dotRef.current;

      if (ringEl) {
        ringEl.style.transform = `translate3d(${posRef.current.x - 20}px, ${posRef.current.y - 20}px, 0)`;
      }
      if (dotEl) {
        dotEl.style.transform = `translate3d(${posRef.current.x - 4}px, ${posRef.current.y - 4}px, 0)`;
      }

      rafRef.current = null;
    };

    const handleMouseMove = (event) => {
      posRef.current = { x: event.clientX, y: event.clientY };
      setIsActive(true);

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(paint);
      }
    };

    const handleMouseLeave = () => setIsActive(false);

    const handleMouseOver = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const interactiveSelector =
        'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]';

      setIsPointer(Boolean(target.closest(interactiveSelector)));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isActive ? 'opacity-100' : 'opacity-0'} ${
          isPointer ? 'custom-cursor-ring--hover' : ''
        }`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isActive ? 'opacity-100' : 'opacity-0'} ${
          isPointer ? 'custom-cursor-dot--hover' : ''
        }`}
        aria-hidden="true"
      />
    </>
  );
}

export default CustomCursor;
