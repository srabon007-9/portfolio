import { useEffect, useMemo, useState } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const isTouchDevice = useMemo(
    () => window.matchMedia && window.matchMedia('(pointer: coarse)').matches,
    []
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsActive(true);
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
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        className={`custom-cursor-ring ${isActive ? 'opacity-100' : 'opacity-0'} ${
          isPointer ? 'custom-cursor-ring--hover' : ''
        }`}
        style={{ transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className={`custom-cursor-dot ${isActive ? 'opacity-100' : 'opacity-0'} ${
          isPointer ? 'custom-cursor-dot--hover' : ''
        }`}
        style={{ transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)` }}
        aria-hidden="true"
      />
    </>
  );
}

export default CustomCursor;
