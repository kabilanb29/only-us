import { PROJECTS, type ProjectItem } from '../../lib/constants';
import { BrowserWindow } from './BrowserWindow';

interface ProjectScreenProps {
  project?: ProjectItem;
  screenPower?: number;
  compact?: boolean;
}

export function ProjectScreen({
  project = PROJECTS[0],
  screenPower = 1,
  compact = false,
}: ProjectScreenProps) {
  return (
    <div
      className="h-full w-full transition-opacity duration-500"
      style={{ opacity: Math.max(0.08, Math.min(1, screenPower)) }}
    >
      <BrowserWindow
        url={project.url.replace('https://', '')}
        title={`CASE // ${project.number}`}
        accentColor={project.accentColor}
        compact={compact}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 75% 25%, ${project.accentColor}26 0%, transparent 55%)`,
          }}
        />

        <div className={`relative z-10 flex h-full flex-col justify-between ${compact ? 'p-4' : 'p-6'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono-tech text-[10px] tracking-[0.25em]">
                <span style={{ color: project.accentColor }}>PROJECT {project.number}</span>
                <span className="text-white/30">|</span>
                <span className="text-white/60">{project.category}</span>
              </div>
              <h3
                className={`font-display mt-1 font-bold tracking-tight text-white ${
                  compact ? 'text-lg' : 'text-2xl'
                }`}
              >
                {project.title}
              </h3>
              <p className="font-mono-tech text-[10px] text-white/50">{project.subtitle}</p>
            </div>

            <div className="border border-white/10 bg-black/50 px-2.5 py-1 text-right font-mono-tech text-[9px] text-white/60">
              <div>{project.client}</div>
              <div className="text-white/35">{project.year}</div>
            </div>
          </div>

          {/* Interactive-style visual center module per project type */}
          <div className="my-3 grid grid-cols-12 gap-3 border border-white/10 bg-black/55 p-3.5">
            <div className="col-span-5 flex flex-col justify-between">
              <p className="text-[11px] leading-relaxed text-white/70">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.technologies.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono-tech text-[8px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-7 flex flex-col justify-center border-l border-white/10 pl-3">
              {/* Custom SVG preview per previewType */}
              <div className="relative flex h-28 items-center justify-center overflow-hidden bg-[#050508] border border-white/5">
                {project.previewType === 'neural' && (
                  <svg viewBox="0 0 220 90" className="h-full w-full p-2">
                    <g stroke={project.accentColor} strokeOpacity="0.45" strokeWidth="1">
                      <line x1="30" y1="22" x2="105" y2="45" />
                      <line x1="30" y1="68" x2="105" y2="45" />
                      <line x1="105" y1="45" x2="185" y2="20" />
                      <line x1="105" y1="45" x2="185" y2="45" />
                      <line x1="105" y1="45" x2="185" y2="70" />
                    </g>
                    {[
                      [30, 22],
                      [30, 68],
                      [105, 45],
                      [185, 20],
                      [185, 45],
                      [185, 70],
                    ].map(([cx, cy], idx) => (
                      <circle
                        key={idx}
                        cx={cx}
                        cy={cy}
                        r={idx === 2 ? 7 : 4}
                        fill={idx === 2 ? project.accentColor : '#ffffff'}
                      />
                    ))}
                  </svg>
                )}

                {project.previewType === 'webgl' && (
                  <div className="flex w-full items-center justify-around px-4">
                    <div
                      className="h-16 w-16 rotate-12 border-2"
                      style={{
                        borderColor: project.accentColor,
                        boxShadow: `0 0 20px ${project.accentColor}55`,
                      }}
                    />
                    <div className="space-y-1.5 font-mono-tech text-[9px] text-white/70">
                      <div>VERTEX: 48.2K</div>
                      <div>DRAW CALLS: 14</div>
                      <div style={{ color: project.accentColor }}>SHADER: GLSL 3.0</div>
                    </div>
                  </div>
                )}

                {project.previewType === 'telemetry' && (
                  <svg viewBox="0 0 240 80" className="h-full w-full">
                    <polyline
                      fill="none"
                      stroke={project.accentColor}
                      strokeWidth="2"
                      points="0,45 35,45 48,18 60,64 72,36 90,45 130,45 144,12 158,68 172,38 190,45 240,45"
                    />
                  </svg>
                )}

                {project.previewType === 'shader' && (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <div
                      className="h-16 w-16 rounded-full border"
                      style={{ borderColor: project.accentColor }}
                    />
                    <div className="absolute h-10 w-10 rounded-full border border-white/40" />
                    <div
                      className="absolute h-3 w-3 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                  </div>
                )}

                {project.previewType === 'audio' && (
                  <div className="flex h-16 w-full items-center justify-center gap-1.5 px-6">
                    {[30, 55, 80, 45, 95, 70, 88, 40, 76, 62, 90, 50, 35].map((val, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 rounded-full"
                        style={{
                          height: `${val}%`,
                          backgroundColor: idx % 2 === 0 ? project.accentColor : '#ffffff66',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Metrics footer */}
          <div className="grid grid-cols-3 gap-2">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border border-white/10 bg-white/[0.02] px-3 py-2"
              >
                <div className="font-mono-tech text-[8px] tracking-widest text-white/40">
                  {metric.label}
                </div>
                <div className="font-display mt-0.5 text-sm font-semibold text-white">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BrowserWindow>
    </div>
  );
}

