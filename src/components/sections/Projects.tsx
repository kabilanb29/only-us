import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../../lib/constants';
import { useSceneStore } from '../../store/sceneStore';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeProjectIndex = useSceneStore((s) => s.activeProjectIndex);
  const inspectedProjectId = useSceneStore((s) => s.inspectedProjectId);
  const setInspectedProjectId = useSceneStore((s) => s.setInspectedProjectId);
  const setActiveProjectIndex = useSceneStore((s) => s.setActiveProjectIndex);
  const setScreenMode = useSceneStore((s) => s.setScreenMode);
  const reducedMotion = useSceneStore((s) => s.reducedMotion);

  const inspectedProject =
    PROJECTS.find((p) => p.id === inspectedProjectId) ?? null;

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const triggers: ScrollTrigger[] = [];
    const items = sectionRef.current.querySelectorAll<HTMLElement>('.project-beat');

    items.forEach((el, index) => {
      const trig = ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => {
          setActiveProjectIndex(index);
          setScreenMode(index === 2 || index === 4 ? 'dashboard' : 'project');
        },
        onEnterBack: () => {
          setActiveProjectIndex(index);
          setScreenMode(index === 2 || index === 4 ? 'dashboard' : 'project');
        },
      });
      triggers.push(trig);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [reducedMotion, setActiveProjectIndex, setScreenMode]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectedProjectId(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setInspectedProjectId]);

  const handleSelectProject = (index: number, project: ProjectItem) => {
    setActiveProjectIndex(index);
    setScreenMode('project');
    setInspectedProjectId(project.id);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Selected projects"
      className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12"
    >
      {/* Section Header */}
      <div className="mb-16 flex flex-col justify-between gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono-tech text-[11px] tracking-[0.28em] text-[#ff5a1f]">
            SELECTED ARCHIVE // 01 — 05
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            ENGINEERED FOR DEPTH
          </h2>
        </div>

        {/* Interactive index pills */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project index">
          {PROJECTS.map((proj, idx) => {
            const isActive = idx === activeProjectIndex;
            return (
              <button
                key={proj.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveProjectIndex(idx);
                  setScreenMode('project');
                  const target = document.getElementById(`project-${proj.id}`);
                  target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`border px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.2em] transition-colors ${
                  isActive
                    ? 'border-[#ff5a1f] bg-[#ff5a1f]/15 text-white'
                    : 'border-white/10 bg-black/40 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {proj.number} {proj.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll-driven project beats integrated over the 3D scene */}
      <div className="space-y-24 md:space-y-36">
        {PROJECTS.map((project, index) => {
          const isCurrent = index === activeProjectIndex;
          const alignRight = index % 2 === 1;

          return (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className={`project-beat flex min-h-[65vh] items-center ${
                alignRight ? 'md:justify-end' : 'md:justify-start'
              }`}
            >
              <div
                onMouseEnter={() => {
                  setActiveProjectIndex(index);
                  setScreenMode('project');
                }}
                className={`w-full max-w-lg border p-7 backdrop-blur-md transition-all duration-500 sm:p-9 ${
                  isCurrent
                    ? 'border-white/25 bg-[#07070c]/80 shadow-[0_0_50px_rgba(255,90,31,0.08)]'
                    : 'border-white/10 bg-[#07070c]/60 opacity-85 hover:border-white/20 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between font-mono-tech text-[11px] tracking-[0.25em]">
                  <span style={{ color: project.accentColor }}>
                    PROJECT {project.number} // {project.category}
                  </span>
                  <span className="text-white/40">{project.year}</span>
                </div>

                <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {project.title}
                </h3>
                <p className="font-mono-tech mt-1 text-xs text-white/50">
                  {project.subtitle}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  {project.description}
                </p>

                {/* Metrics row */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="font-mono-tech text-[9px] tracking-[0.2em] text-white/40">
                        {metric.label}
                      </div>
                      <div className="font-display mt-1 text-base font-semibold text-white">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono-tech text-[10px] text-white/65"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelectProject(index, project)}
                      className="group inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.2em] text-white transition-colors hover:text-[#ff5a1f]"
                    >
                      <span>INSPECT CASE STUDY</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 border border-white/15 bg-white/5 px-2.5 py-1 font-mono-tech text-[10px] tracking-wider text-white/80 transition-colors hover:border-[#ff5a1f] hover:text-white"
                      >
                        <span>VISIT LIVE</span>
                        <ArrowUpRight className="h-3 w-3 text-[#ff5a1f]" />
                      </a>
                    )}

                    {project.id === 'ps-ai-studios' && (
                      <a
                        href="https://www.instagram.com/ps_ai.studios?mdxt=bHB0a3M0MGd1Mjg5"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 border border-[#e11d48]/40 bg-[#e11d48]/10 px-2.5 py-1 font-mono-tech text-[10px] tracking-wider text-rose-300 transition-colors hover:border-[#e11d48] hover:text-white"
                      >
                        <span>INSTAGRAM</span>
                        <ArrowUpRight className="h-3 w-3 text-[#e11d48]" />
                      </a>
                    )}
                  </div>

                  <span className="font-mono-tech text-[10px] text-white/35">
                    SYNCED TO MONITOR
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Case Study Modal Overlay */}
      {inspectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setInspectedProjectId(null)}
        >
          <div
            className="relative w-full max-w-2xl border border-white/15 bg-[#09090e] p-7 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setInspectedProjectId(null)}
              aria-label="Close case study"
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-[#ff5a1f] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="font-mono-tech text-[11px] tracking-[0.26em] text-[#ff5a1f]">
              PROJECT {inspectedProject.number} // {inspectedProject.category}
            </div>
            <h3
              id="case-study-title"
              className="font-display mt-2 text-3xl font-semibold text-white"
            >
              {inspectedProject.title}
            </h3>
            <p className="mt-1 font-mono-tech text-xs text-white/50">
              CLIENT: {inspectedProject.client} ({inspectedProject.year})
            </p>

            <p className="mt-5 text-sm leading-relaxed text-white/75">
              {inspectedProject.description}
            </p>

            {inspectedProject.details && (
              <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                <div className="font-mono-tech text-[10px] tracking-widest text-[#ff5a1f]">
                  KEY ENGINEERING &amp; ARCHITECTURE HIGHLIGHTS
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  {inspectedProject.details.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="text-[#ff5a1f]">&bull;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid grid-cols-3 gap-4 border-y border-white/10 py-4">
              {inspectedProject.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-mono-tech text-[10px] tracking-widest text-white/40">
                    {m.label}
                  </div>
                  <div className="font-display mt-1 text-lg font-semibold text-white">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {inspectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono-tech text-[10px] text-white/75"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {inspectedProject.id === 'ps-ai-studios' && (
                  <a
                    href="https://www.instagram.com/ps_ai.studios?mdxt=bHB0a3M0MGd1Mjg5"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-[#e11d48] bg-[#e11d48]/15 px-3.5 py-2 font-mono-tech text-[11px] font-medium tracking-wider text-white transition-colors hover:bg-[#e11d48]"
                  >
                    <span>INSTAGRAM (@ps_ai.studios)</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}

                {inspectedProject.url && (
                  <a
                    href={inspectedProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#ff5a1f] px-4 py-2 font-mono-tech text-[11px] font-medium tracking-wider text-black transition-colors hover:bg-white"
                  >
                    <span>LAUNCH URL</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

