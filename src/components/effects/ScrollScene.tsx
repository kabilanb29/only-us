import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useSceneStore } from '../../store/sceneStore';

/**
 * Coordinates Lenis smooth scrolling, GSAP ScrollTrigger camera choreography,
 * subtle mouse parallax, and a non-intrusive scroll progress telemetry bar.
 */
export function ScrollScene() {
  useMouseParallax();
  useScrollAnimation('#scroll-experience');

  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const activeProjectIndex = useSceneStore((s) => s.activeProjectIndex);

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 right-6 z-30 hidden items-center gap-3 md:flex"
    >
      <span className="font-mono-tech text-[10px] tracking-[0.22em] text-white/45">
        CAM // 0{activeProjectIndex + 1}
      </span>
      <div className="h-[1px] w-24 overflow-hidden bg-white/15">
        <div
          className="h-full bg-[#ff5a1f] transition-transform duration-150 ease-out origin-left"
          style={{ transform: `scaleX(${Math.max(0.04, scrollProgress)})` }}
        />
      </div>
      <span className="font-mono-tech text-[10px] text-white/50">
        {Math.round(scrollProgress * 100)
          .toString()
          .padStart(3, '0')}
        %
      </span>
    </aside>
  );
}

