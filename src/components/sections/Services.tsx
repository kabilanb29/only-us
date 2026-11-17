import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SERVICES } from '../../lib/constants';
import { useSceneStore } from '../../store/sceneStore';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useSceneStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from('.service-row', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="Capabilities and services"
      className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-12"
    >
      <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono-tech text-[11px] tracking-[0.28em] text-[#ff5a1f]">
            03 // CAPABILITIES
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            FULL-SPECTRUM CRAFT
          </h2>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-white/55 sm:text-sm">
          Architecture, visual direction, and production engineering unified inside one
          focused studio pipeline.
        </p>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10 bg-[#050507]/60 backdrop-blur-sm">
        {SERVICES.map((service) => (
          <div
            key={service.number}
            className="service-row group grid grid-cols-1 gap-4 px-2 py-7 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-12 md:items-center md:px-6"
          >
            <div className="font-mono-tech text-xs tracking-[0.25em] text-[#ff5a1f] md:col-span-1">
              {service.number}
            </div>

            <h3 className="font-display text-xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1 md:col-span-4 md:text-2xl">
              {service.title}
            </h3>

            <p className="text-sm leading-relaxed text-white/65 md:col-span-4">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-1.5 md:col-span-3 md:justify-end">
              {service.deliverables.map((item) => (
                <span
                  key={item}
                  className="border border-white/10 px-2.5 py-1 font-mono-tech text-[10px] text-white/55"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

