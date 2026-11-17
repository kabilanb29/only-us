import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, Award, FileText } from 'lucide-react';
import { useSceneStore } from '../../store/sceneStore';
import { scrollToTarget } from '../../hooks/useScrollAnimation';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useSceneStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        '.hero-stagger',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.12,
          delay: 0.55,
          ease: 'power3.out',
        }
      );
    },
    { scope: heroRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-12 pt-28 md:px-12 md:pb-16"
    >
      {/* Top micro status & accolades */}
      <div className="hero-stagger mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 font-mono-tech text-[11px] tracking-[0.25em] text-white/65">
          <span className="inline-block h-[1px] w-7 bg-[#ff5a1f]" />
          <span>KABILAN B × PRAGADEESHWARAN S S</span>
        </div>

        <div className="flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-1 font-mono-tech text-[10px] text-white/60 backdrop-blur-sm">
          <Award className="h-3.5 w-3.5 text-[#ff5a1f]" />
          <span>BRICS-FS-26 1ST PRIZE &bull; SMART INDIA HACKATHON FINALISTS</span>
        </div>
      </div>

      {/* Main editorial typography anchored bottom-left so 3D workstation remains open */}
      <div className="mx-auto mt-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <div className="hero-stagger mb-3 inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.25em] text-[#ff5a1f]">
            <span>ENGINEERING &bull; RESEARCH &bull; PRODUCT</span>
          </div>

          <h1 className="hero-stagger font-display text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            WE BUILD
            <br />
            <span className="text-white/90">DIGITAL EXPERIENCES</span>
          </h1>

          <p className="hero-stagger mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Applied Artificial Intelligence, Computer Vision, Biotechnology systems, and
            high-impact interactive digital products crafted by Kabilan B &amp; Pragadeeshwaran S S.
          </p>

          <div className="hero-stagger mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToTarget('#work')}
              className="group inline-flex items-center gap-3 bg-[#ff5a1f] px-6 py-3.5 font-mono-tech text-xs font-medium tracking-[0.18em] text-black transition-all duration-300 hover:bg-white"
            >
              <span>EXPLORE WORK</span>
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('#about')}
              className="inline-flex items-center gap-2 border border-white/20 bg-black/40 px-6 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-white/90 backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white/10"
            >
              <FileText className="h-3.5 w-3.5 text-[#ff5a1f]" />
              <span>RESEARCH &amp; PROFILES</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('#contact')}
              className="inline-flex items-center border border-white/10 bg-transparent px-5 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              CONTACT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
