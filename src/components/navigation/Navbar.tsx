import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';
import { scrollToTarget } from '../../hooks/useScrollAnimation';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#050507]/75 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12"
      >
        {/* Left brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('#hero');
          }}
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-[0.2em] text-white"
        >
          <span
            className="h-2 w-2 rounded-full bg-[#ff5a1f] transition-transform duration-300 group-hover:scale-125"
            style={{ boxShadow: '0 0 10px #ff5a1f' }}
          />
          <span className="font-display tracking-tight">KABILAN × PRAGADEESH</span>
          <span className="hidden font-mono-tech text-[10px] text-white/40 lg:inline">
            // AI × BIOTECH × WEB
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.href);
                }}
                className="font-mono-tech relative py-1 text-[11px] tracking-[0.22em] text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-black/50 text-white transition-colors hover:border-[#ff5a1f] md:hidden"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 top-20 z-30 flex flex-col justify-between bg-[#050507]/95 px-8 py-12 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 -translate-y-4'
        }`}
      >
        <ul className="space-y-7">
          {NAV_LINKS.map((item, idx) => (
            <li
              key={item.label}
              style={{
                transitionDelay: menuOpen ? `${idx * 55}ms` : '0ms',
              }}
              className={`transition-all duration-300 ${
                menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.href);
                }}
                className="font-display flex items-baseline gap-4 text-3xl font-semibold tracking-tight text-white hover:text-[#ff5a1f]"
              >
                <span className="font-mono-tech text-xs text-[#ff5a1f]">0{idx + 1}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 pt-6 space-y-1.5">
          <div className="font-mono-tech text-[10px] tracking-widest text-[#ff5a1f]">
            KABILAN B &amp; PRAGADEESHWARAN S S
          </div>
          <div className="font-mono-tech text-[11px] text-white/70">
            Kabilan: <a href="mailto:kabilanbalaraman7@gmail.com" className="text-white hover:underline">kabilanbalaraman7@gmail.com</a> &bull; <a href="tel:+919789344764" className="text-white hover:underline">+91 9789344764</a>
          </div>
          <div className="font-mono-tech text-[11px] text-white/70">
            Pragadeesh: <a href="mailto:mskgaap@gmail.com" className="text-white hover:underline">mskgaap@gmail.com</a> &bull; <a href="tel:+918760724777" className="text-white hover:underline">+91 8760724777</a>
          </div>
        </div>
      </div>
    </header>
  );
}

