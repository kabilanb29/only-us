import type { ReactNode } from 'react';

interface BrowserWindowProps {
  url?: string;
  title?: string;
  accentColor?: string;
  children: ReactNode;
  compact?: boolean;
}

export function BrowserWindow({
  url = 'https://aether.studio',
  title = 'AETHER // STUDIO',
  accentColor = '#ff5a1f',
  children,
  compact = false,
}: BrowserWindowProps) {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#07070a] text-[#f4f4f6] select-none"
      style={{
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: `inset 0 0 40px rgba(0,0,0,0.9), 0 0 24px ${accentColor}22`,
      }}
    >
      {/* Top chrome bar */}
      <div
        className={`flex items-center justify-between border-b border-white/10 bg-[#0c0c12] ${
          compact ? 'px-2.5 py-1.5' : 'px-4 py-2.5'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
          />
        </div>

        <div className="flex items-center gap-2 rounded border border-white/10 bg-black/50 px-3 py-0.5">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span className="font-mono-tech text-[10px] tracking-wider text-white/60">
            {url}
          </span>
        </div>

        <span className="font-mono-tech text-[9px] tracking-[0.2em] text-white/40 uppercase">
          {title}
        </span>
      </div>

      {/* Screen viewport */}
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

