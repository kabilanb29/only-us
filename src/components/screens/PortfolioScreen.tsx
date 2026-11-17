import { PROJECTS, type ProjectItem } from '../../lib/constants';
import { BrowserWindow } from './BrowserWindow';

interface PortfolioScreenProps {
  activeProject?: ProjectItem;
  screenPower?: number;
  compact?: boolean;
}

export function PortfolioScreen({
  activeProject = PROJECTS[0],
  screenPower = 1,
  compact = false,
}: PortfolioScreenProps) {
  return (
    <div
      className="h-full w-full transition-opacity duration-500"
      style={{ opacity: Math.max(0.08, Math.min(1, screenPower)) }}
    >
      <BrowserWindow
        url="kabilan-praga.studio/work"
        title="KABILAN B &amp; PRAGADEESHWARAN S S"
        accentColor={activeProject.accentColor}
        compact={compact}
      >
        {/* Subtle studio grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Warm ambient radial glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: activeProject.accentColor }}
        />

        <div className={`relative z-10 flex h-full flex-col justify-between ${compact ? 'p-4' : 'p-7'}`}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono-tech text-[10px] tracking-[0.28em] text-[#ff5a1f]">
                KABILAN × PRAGADEESH // PORTFOLIO
              </p>
              <h2
                className={`font-display mt-1 font-semibold tracking-tight text-white ${
                  compact ? 'text-lg leading-tight' : 'text-3xl leading-[1.05]'
                }`}
              >
                AI, COMPUTER VISION &amp;
                <br />
                APPLIED BIOTECHNOLOGY
              </h2>
            </div>

            {!compact && (
              <div className="text-right font-mono-tech text-[10px] text-white/50">
                <div className="text-[#ff5a1f]">BRICS 1ST PRIZE &bull; SIH FINALIST</div>
                <div>PUBLISHED: J. MED IMAGING</div>
                <div className="text-emerald-400">STATUS: LIVE ACTIVE</div>
              </div>
            )}
          </div>

          {/* Center spotlight */}
          <div className="my-auto grid grid-cols-12 gap-4 py-3">
            <div className="col-span-7 flex flex-col justify-center border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 font-mono-tech text-[10px] tracking-[0.22em] text-white/50">
                <span style={{ color: activeProject.accentColor }}>
                  PROJECT {activeProject.number}
                </span>
                <span>//</span>
                <span>{activeProject.category}</span>
              </div>
              <div className="font-display mt-1.5 text-xl font-semibold tracking-tight text-white">
                {activeProject.title}
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/60">
                {activeProject.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeProject.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 bg-black/50 px-2 py-0.5 font-mono-tech text-[9px] text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Generative visual waveform box */}
            <div className="col-span-5 flex flex-col justify-between border border-white/10 bg-black/60 p-3">
              <div className="flex items-center justify-between font-mono-tech text-[9px] text-white/40">
                <span>RENDER PASS</span>
                <span>0{PROJECTS.indexOf(activeProject) + 1}/05</span>
              </div>
              <div className="my-2 flex h-16 items-end justify-between gap-1">
                {[38, 65, 44, 88, 72, 95, 58, 82, 49, 91, 64, 77].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all duration-500"
                    style={{
                      height: `${((h + PROJECTS.indexOf(activeProject) * 13) % 85) + 15}%`,
                      background:
                        i % 3 === 0
                          ? activeProject.accentColor
                          : 'rgba(255,255,255,0.22)',
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between font-mono-tech text-[9px] text-white/50">
                <span>{activeProject.metrics[0]?.label}</span>
                <span className="text-white">{activeProject.metrics[0]?.value}</span>
              </div>
            </div>
          </div>

          {/* Bottom project index strip */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex gap-3">
              {PROJECTS.map((proj) => {
                const isActive = proj.id === activeProject.id;
                return (
                  <div
                    key={proj.id}
                    className="font-mono-tech text-[10px] tracking-wider transition-colors"
                    style={{
                      color: isActive ? activeProject.accentColor : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {proj.number} {proj.category}
                  </div>
                );
              })}
            </div>
            <span className="font-mono-tech text-[9px] text-white/40">
              REALTIME SCENE ACTIVE
            </span>
          </div>
        </div>
      </BrowserWindow>
    </div>
  );
}

