import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Award, BookOpen, GraduationCap, MapPin, CheckCircle2, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { CREATORS, PUBLICATION } from '../../lib/constants';
import { useSceneStore } from '../../store/sceneStore';

gsap.registerPlugin(ScrollTrigger);

const STAT_PILLARS = [
  { label: 'BRICS-FS-26', value: '1ST PRIZE' },
  { label: 'SMART INDIA HACKATHON', value: 'FINALIST' },
  { label: 'RESEARCH PUBLICATION', value: 'J. MED IMAGING' },
  { label: 'BIT SATHYAMANGALAM', value: '8.32 CGPA' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useSceneStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from('.about-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
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
      id="about"
      ref={sectionRef}
      aria-label="About Kabilan B and Pragadeeshwaran S S"
      className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-12"
    >
      {/* Top Manifesto Banner */}
      <div className="grid w-full grid-cols-1 gap-12 border-y border-white/10 bg-[#050507]/65 py-14 backdrop-blur-sm lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <p className="about-reveal font-mono-tech text-[11px] tracking-[0.28em] text-[#ff5a1f]">
            02 // THE MINDS BEHIND THE EXPERIENCES
          </p>
          <h2 className="about-reveal font-display mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-6xl">
            WE TURN IDEAS
            <br />
            INTO EXPERIENCES.
          </h2>
        </div>

        <div className="flex flex-col justify-between lg:col-span-5">
          <p className="about-reveal text-sm leading-relaxed text-white/70 sm:text-base">
            We are <strong className="text-white">Kabilan B</strong> and{' '}
            <strong className="text-white">Pragadeeshwaran S S</strong> — engineers and
            technologists building at the bleeding-edge of Deep Learning, Computer Vision,
            applied Biotechnology, and high-performance WebGL architectures. From international
            prize-winning AI vision algorithms to sustainable biogas predictive modeling, we turn
            rigorous research into production software.
          </p>

          <div className="about-reveal mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
            {STAT_PILLARS.map((item) => (
              <div key={item.label}>
                <div className="font-mono-tech text-[8px] tracking-[0.2em] text-white/40">
                  {item.label}
                </div>
                <div className="font-display mt-1 text-sm font-semibold text-white sm:text-base">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Published Research Feature */}
      <div className="about-reveal my-12 border border-white/15 bg-[#08080d]/85 p-6 backdrop-blur-md sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5 font-mono-tech text-xs tracking-[0.22em] text-[#ff5a1f]">
            <BookOpen className="h-4 w-4" />
            <span>PEER-REVIEWED RESEARCH PUBLICATION</span>
          </div>
          <span className="font-mono-tech text-[11px] text-white/50">
            {PUBLICATION.journal} &bull; {PUBLICATION.date}
          </span>
        </div>

        <div className="mt-4">
          <h3 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
            {PUBLICATION.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-white/65 sm:text-sm">
            {PUBLICATION.summary}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-mono-tech text-[11px] text-white/50">
            <span className="text-white">Lead Author: {PUBLICATION.leadAuthor}</span>
            <span>&bull;</span>
            <span className="text-emerald-400">Status: Published</span>
            <span>&bull;</span>
            <span>Domain: Medical Image Classification &amp; Confidence Calibration</span>
          </div>
        </div>
      </div>

      {/* Two Profiles Side-by-Side */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Kabilan B Profile Card */}
        <div className="about-reveal flex flex-col justify-between border border-white/10 bg-[#07070b]/80 p-7 backdrop-blur-sm sm:p-9">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono-tech text-[10px] tracking-[0.25em] text-[#ff5a1f]">
                  LEAD AI &amp; SYSTEMS ENGINEER
                </span>
                <h3 className="font-display mt-1 text-3xl font-semibold text-white">
                  {CREATORS.kabilan.name}
                </h3>
              </div>
              <span className="border border-white/15 bg-white/5 px-2.5 py-1 font-mono-tech text-[10px] text-white/70">
                AI &amp; DS
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#ff5a1f]" />
                <span>{CREATORS.kabilan.education}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white/40" />
                <span>{CREATORS.kabilan.location}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1 font-mono-tech text-[11px] text-white/75">
                <a
                  href={`mailto:${CREATORS.kabilan.email}`}
                  className="flex items-center gap-1.5 text-white hover:text-[#ff5a1f]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#ff5a1f]" />
                  <span>{CREATORS.kabilan.email}</span>
                </a>
                <span className="text-white/20">&bull;</span>
                <a
                  href={`tel:${CREATORS.kabilan.phone}`}
                  className="flex items-center gap-1.5 text-white hover:text-[#ff5a1f]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#ff5a1f]" />
                  <span>{CREATORS.kabilan.phone}</span>
                </a>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-white/75">
              {CREATORS.kabilan.bio}
            </p>

            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="font-mono-tech text-[10px] tracking-[0.2em] text-white/40">
                KEY HONORS &amp; ACHIEVEMENTS
              </div>
              <ul className="mt-3 space-y-2 text-xs text-white/70">
                {CREATORS.kabilan.achievements.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff5a1f]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="font-mono-tech text-[10px] tracking-[0.2em] text-white/40">
              CORE TOOLKIT
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {CREATORS.kabilan.skills.map((s) => (
                <span
                  key={s}
                  className="border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono-tech text-[9px] text-white/70"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pragadeeshwaran S S Profile Card */}
        <div className="about-reveal flex flex-col justify-between border border-white/10 bg-[#07070b]/80 p-7 backdrop-blur-sm sm:p-9">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono-tech text-[10px] tracking-[0.25em] text-[#ff7847]">
                  PRODUCT ARCHITECT &amp; STRATEGIST
                </span>
                <h3 className="font-display mt-1 text-3xl font-semibold text-white">
                  {CREATORS.praga.name}
                </h3>
              </div>
              <span className="border border-white/15 bg-white/5 px-2.5 py-1 font-mono-tech text-[10px] text-white/70">
                BIOTECH &amp; PRODUCT
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#ff7847]" />
                <span>{CREATORS.praga.education}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white/40" />
                <span>{CREATORS.praga.location}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1 font-mono-tech text-[11px] text-white/75">
                <a
                  href={`mailto:${CREATORS.praga.email}`}
                  className="flex items-center gap-1.5 text-white hover:text-[#ff7847]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#ff7847]" />
                  <span>{CREATORS.praga.email}</span>
                </a>
                <span className="text-white/20">&bull;</span>
                <a
                  href={`tel:${CREATORS.praga.phone}`}
                  className="flex items-center gap-1.5 text-white hover:text-[#ff7847]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#ff7847]" />
                  <span>{CREATORS.praga.phone}</span>
                </a>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-white/75">
              {CREATORS.praga.bio}
            </p>

            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="font-mono-tech text-[10px] tracking-[0.2em] text-white/40">
                VENTURES &amp; TRACK RECORD
              </div>
              <ul className="mt-3 space-y-2 text-xs text-white/70">
                {CREATORS.praga.achievements.map((item) => {
                  let href = '';
                  if (item.includes('etaldigitals.com')) href = 'https://etaldigitals.com/';
                  else if (item.includes('arusuvaitech.in')) href = 'https://arusuvaitech.in/';
                  else if (item.includes('superr-cricket-insight')) href = 'https://superr-cricket-insight-epjs.vercel.app/';
                  else if (item.includes('PS AI Studios') || item.includes('ps_ai.studios'))
                    href = 'https://www.instagram.com/ps_ai.studios?mdxt=bHB0a3M0MGd1Mjg5';

                  return (
                    <li key={item} className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff7847]" />
                        <span>{item}</span>
                      </div>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-[#ff7847] hover:underline inline-flex items-center gap-0.5 font-mono-tech text-[10px]"
                        >
                          <span>visit</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="font-mono-tech text-[10px] tracking-[0.2em] text-white/40">
              CORE TOOLKIT
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {CREATORS.praga.skills.map((s) => (
                <span
                  key={s}
                  className="border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono-tech text-[9px] text-white/70"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
