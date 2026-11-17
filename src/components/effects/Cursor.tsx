import { useEffect, useRef, useState } from 'react';
import { useSceneStore } from '../../store/sceneStore';

/**
 * Minimal cinematic precision cursor for desktop pointers.
 * Automatically hidden on touch devices or when reduced motion is preferred.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverInteractive, setHoverInteractive] = useState(false);

  const isMobile = useSceneStore((s) => s.isMobile);
  const reducedMotion = useSceneStore((s) => s.reducedMotion);

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea')
      );
      setHoverInteractive(interactive);
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${
          hoverInteractive ? 1.55 : 1
        })`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [hoverInteractive, isMobile, reducedMotion]);

  if (isMobile || reducedMotion || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-white/30 transition-[border-color] duration-200"
        style={{
          borderColor: hoverInteractive ? '#ff5a1f' : 'rgba(255,255,255,0.28)',
        }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-0.5 -mt-0.5 h-1.5 w-1.5 rounded-full bg-[#ff5a1f]"
      />
    </div>
  );
}

