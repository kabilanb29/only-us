import { PROJECTS, type ProjectItem } from '../../lib/constants';
import { BrowserWindow } from './BrowserWindow';

interface DashboardScreenProps {
  project?: ProjectItem;
  screenPower?: number;
  compact?: boolean;
}

export function DashboardScreen({
  project = PROJECTS[0],
  screenPower = 1,
  compact = false,
}: DashboardScreenProps) {
  return (
    <div
      className="h-full w-full transition-opacity duration-500"
      style={{ opacity: Math.max(0.08, Math.min(1, screenPower)) }}
    >
      <BrowserWindow
        url="kabilan-praga.studio/telemetry"
        title="AI &amp; BIOTECH TELEMETRY"
        accentColor={project.accentColor}
        compact={compact}
      >
        <div className={`flex h-full flex-col justify-between ${compact ? 'p-3' : 'p-5'}`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div>
              <div className="font-mono-tech text-[9px] tracking-[0.25em] text-white/45">
                ACTIVE AI / ML PIPELINE
              </div>
              <div className="font-display text-sm font-semibold text-white">
                {project.title} // PRODUCTION
              </div>
            </div>
            <span
              className="border px-2 py-0.5 font-mono-tech text-[9px]"
              style={{
                borderColor: `${project.accentColor}66`,
                color: project.accentColor,
              }}
            >
              ONLINE
            </span>
          </div>

          <div className="my-2 grid grid-cols-2 gap-2.5">
            <div className="border border-white/10 bg-white/[0.02] p-2.5">
              <div className="font-mono-tech text-[8px] text-white/40">INFERENCE LATENCY</div>
              <div className="font-display mt-0.5 text-base font-semibold text-white">
                {project.metrics[1]?.value || '18 ms'}
              </div>
              <div className="mt-1.5 h-1 w-full bg-white/10">
                <div
                  className="h-full w-3/4"
                  style={{ backgroundColor: project.accentColor }}
                />
              </div>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-2.5">
              <div className="font-mono-tech text-[8px] text-white/40">MODEL FIDELITY</div>
              <div className="font-display mt-0.5 text-base font-semibold text-white">
                {project.metrics[0]?.value || '99.2%'}
              </div>
              <div className="mt-1.5 h-1 w-full bg-white/10">
                <div className="h-full w-4/5 bg-emerald-400" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 border border-white/10 bg-black/60 p-2.5 font-mono-tech text-[9px]">
            <div className="flex justify-between text-white/60">
              <span>[01] BIOBERT_NLP_REPORT_PIPELINE</span>
              <span className="text-emerald-400">READY</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>[02] TENSORFLOW_128D_EMBEDDINGS</span>
              <span style={{ color: project.accentColor }}>INFERENCE</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>[03] VERIFIED_PREDICTIVE_MODELS</span>
              <span className="text-white">ACTIVE</span>
            </div>
          </div>
        </div>
      </BrowserWindow>
    </div>
  );
}

