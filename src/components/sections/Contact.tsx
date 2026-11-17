import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Mail, Phone, MapPin, X } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

export function Contact() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState('AI & Machine Learning Systems');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer
      id="contact"
      aria-label="Contact Kabilan B and Pragadeeshwaran S S"
      className="relative z-10 flex min-h-[90vh] flex-col justify-between px-6 pb-12 pt-32 md:px-12"
    >
      <div className="mx-auto my-auto w-full max-w-7xl">
        <p className="font-mono-tech text-[11px] tracking-[0.28em] text-[#ff5a1f]">
          04 // INITIATE TRANSMISSION
        </p>

        <h2 className="font-display mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-8xl">
          LET&apos;S BUILD
          <br />
          SOMETHING DIFFERENT.
        </h2>

        {/* Contact info grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-y border-white/10 py-8 md:grid-cols-3">
          {/* Kabilan Card */}
          <div className="border border-white/10 bg-white/[0.02] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] tracking-widest text-[#ff5a1f]">
                AI &amp; SYSTEMS ENGINEER
              </span>
              <span className="font-mono-tech text-[9px] text-white/40">KABILAN B</span>
            </div>
            <div>
              <a
                href="mailto:kabilanbalaraman7@gmail.com"
                className="font-mono-tech flex items-center gap-2 text-sm text-white hover:text-[#ff5a1f]"
              >
                <Mail className="h-4 w-4 text-[#ff5a1f]" />
                <span>kabilanbalaraman7@gmail.com</span>
              </a>
              <a
                href="tel:+919789344764"
                className="font-mono-tech mt-2 flex items-center gap-2 text-sm text-white hover:text-[#ff5a1f]"
              >
                <Phone className="h-4 w-4 text-[#ff5a1f]" />
                <span>+91 9789344764</span>
              </a>
            </div>
            <p className="font-mono-tech text-[10px] text-white/40">
              Vedaranyam, Tamil Nadu &bull; WhatsApp &amp; Calls Available
            </p>
          </div>

          {/* Pragadeeshwaran Card */}
          <div className="border border-white/10 bg-white/[0.02] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] tracking-widest text-[#ff7847]">
                PRODUCT &amp; GROWTH STRATEGIST
              </span>
              <span className="font-mono-tech text-[9px] text-white/40">PRAGADEESHWARAN S S</span>
            </div>
            <div>
              <a
                href="mailto:mskgaap@gmail.com"
                className="font-mono-tech flex items-center gap-2 text-sm text-white hover:text-[#ff7847]"
              >
                <Mail className="h-4 w-4 text-[#ff7847]" />
                <span>mskgaap@gmail.com</span>
              </a>
              <a
                href="tel:+918760724777"
                className="font-mono-tech mt-2 flex items-center gap-2 text-sm text-white hover:text-[#ff7847]"
              >
                <Phone className="h-4 w-4 text-[#ff7847]" />
                <span>+91 8760724777</span>
              </a>
            </div>
            <p className="font-mono-tech text-[10px] text-white/40">
              Tamil Nadu, India &bull; Direct Mobile &amp; WhatsApp
            </p>
          </div>

          {/* Studio & Deployment Base */}
          <div className="border border-white/10 bg-white/[0.02] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] tracking-widest text-emerald-400">
                COLLABORATION DESK
              </span>
              <span className="font-mono-tech text-[9px] text-emerald-400">AVAILABLE</span>
            </div>
            <div className="space-y-1">
              <div className="font-mono-tech text-sm text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>Tamil Nadu, India</span>
              </div>
              <p className="text-xs text-white/60">
                Ready for high-impact AI research contracts, full-stack product builds, and enterprise consulting.
              </p>
            </div>
            <p className="font-mono-tech text-[10px] text-white/40">
              Guaranteed Response Within 24 Hours
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setDrawerOpen(true);
            }}
            className="group inline-flex items-center gap-3 bg-[#ff5a1f] px-7 py-4 font-mono-tech text-xs font-medium tracking-[0.2em] text-black transition-all duration-300 hover:bg-white"
          >
            <span>SEND PROJECT BRIEF</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>

          <a
            href="mailto:kabilanbalaraman7@gmail.com"
            className="border border-white/15 bg-black/40 px-5 py-4 font-mono-tech text-xs tracking-wider text-white hover:border-[#ff5a1f]"
          >
            EMAIL KABILAN (kabilanbalaraman7@gmail.com)
          </a>

          <a
            href="mailto:mskgaap@gmail.com"
            className="border border-white/15 bg-black/40 px-5 py-4 font-mono-tech text-xs tracking-wider text-white hover:border-[#ff7847]"
          >
            EMAIL PRAGADEESH (mskgaap@gmail.com)
          </a>
        </div>
      </div>

      {/* Minimal footer bar with real links */}
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
        <div className="font-mono-tech text-[10px] tracking-[0.22em] text-white/50">
          &copy; 2026 KABILAN B &bull; PRAGADEESHWARAN S S. ALL RIGHTS RESERVED.
        </div>

        <ul className="flex flex-wrap items-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="font-mono-tech text-[10px] tracking-[0.22em] text-white/60 transition-colors hover:text-[#ff5a1f]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Project Inquiry Modal */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-heading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="relative w-full max-w-lg border border-white/15 bg-[#09090e] p-7 sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close inquiry dialog"
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-[#ff5a1f] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-mono-tech text-[10px] tracking-[0.25em] text-[#ff5a1f]">
              COLLABORATION BRIEF
            </p>
            <h3
              id="inquiry-heading"
              className="font-display mt-2 text-2xl font-semibold text-white"
            >
              REACH KABILAN &amp; PRAGADEESH
            </h3>

            {submitted ? (
              <div className="mt-8 border border-emerald-500/30 bg-emerald-500/10 p-6">
                <div className="flex items-center gap-2 font-mono-tech text-xs text-emerald-400">
                  <Check className="h-4 w-4" />
                  <span>TRANSMISSION RECORDED</span>
                </div>
                <p className="mt-2 text-sm text-white/75">
                  Thank you, {name}. We will review your project brief and reply directly to{' '}
                  <strong className="text-white">{email}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block font-mono-tech text-[10px] tracking-[0.2em] text-white/50"
                  >
                    YOUR NAME
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer / Founder"
                    className="mt-1.5 w-full border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block font-mono-tech text-[10px] tracking-[0.2em] text-white/50"
                  >
                    WORK / CONTACT EMAIL
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="mt-1.5 w-full border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-scope"
                    className="block font-mono-tech text-[10px] tracking-[0.2em] text-white/50"
                  >
                    FOCUS AREA
                  </label>
                  <select
                    id="inquiry-scope"
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="mt-1.5 w-full border border-white/15 bg-[#09090e] px-3.5 py-2.5 text-sm text-white focus:border-[#ff5a1f] focus:outline-none"
                  >
                    <option>AI / LLM / RAG / BioBERT Systems</option>
                    <option>Computer Vision &amp; 128D Facial Biometrics</option>
                    <option>Sports Analytics &amp; IPL Predictive Modeling</option>
                    <option>Full-Stack Web &amp; Real-Time 3D Interfaces</option>
                    <option>Biotechnology &amp; Environmental ML</option>
                    <option>Digital Growth, Meta Ads (3X ROI) &amp; Creative Agency</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-msg"
                    className="block font-mono-tech text-[10px] tracking-[0.2em] text-white/50"
                  >
                    PROJECT OUTLINE / OBJECTIVE
                  </label>
                  <textarea
                    id="inquiry-msg"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the problem you want to solve..."
                    className="mt-1.5 w-full border border-white/15 bg-black/50 px-3.5 py-2 text-sm text-white placeholder:text-white/25 focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-[#ff5a1f] py-3 font-mono-tech text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-white"
                >
                  TRANSMIT BRIEF TO KABILAN &amp; PRAGADEESH
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
