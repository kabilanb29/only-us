import { useEffect } from 'react';
import { useSceneStore } from '../store/sceneStore';

/**
 * Tracks normalized pointer coordinates [-1..1] for subtle damped camera/scene parallax.
 * Disabled automatically on touch-only mobile viewports or when prefers-reduced-motion is active.
 */
export function useMouseParallax() {
  const setPointer = useSceneStore((s) => s.setPointer);
  const reducedMotion = useSceneStore((s) => s.reducedMotion);
  const isMobile = useSceneStore((s) => s.isMobile);

  useEffect(() => {
    if (reducedMotion || isMobile) {
      setPointer(0, 0);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      setPointer(nx, ny);
    };

    const handlePointerLeave = () => {
      setPointer(0, 0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [isMobile, reducedMotion, setPointer]);
}

