import { Suspense, lazy } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/sections/Hero';
import { ScrollScene } from './components/effects/ScrollScene';
import { Cursor } from './components/effects/Cursor';

const Scene = lazy(() =>
  import('./components/3d/Scene').then((m) => ({ default: m.Scene }))
);
const Projects = lazy(() =>
  import('./components/sections/Projects').then((m) => ({ default: m.Projects }))
);
const About = lazy(() =>
  import('./components/sections/About').then((m) => ({ default: m.About }))
);
const Services = lazy(() =>
  import('./components/sections/Services').then((m) => ({ default: m.Services }))
);
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact }))
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-[#f4f4f6]">
      {/* Real-time 3D WebGL Workstation Canvas */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Atmospheric vignette overlay for readability over 3D geometry */}
      <div
        className="cinematic-vignette pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
      />

      {/* Minimal fixed navigation */}
      <Navbar />

      {/* Scroll & mouse coordinator */}
      <ScrollScene />
      <Cursor />

      {/* Main scroll choreography */}
      <main id="scroll-experience" className="relative z-10">
        <Hero />

        <Suspense fallback={<div className="min-h-screen" />}>
          <Projects />
          <About />
          <Services />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

