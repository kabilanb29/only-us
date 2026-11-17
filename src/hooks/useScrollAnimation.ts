import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useSceneStore } from '../store/sceneStore';
import { sampleCameraTimeline } from '../lib/animations';

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

export function scrollToTarget(target: string | number) {
  if (activeLenis) {
    activeLenis.scrollTo(target, {
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    return;
  }

  if (typeof target === 'string') {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
}

export function useScrollAnimation(containerSelector = '#scroll-experience') {
  const reducedMotion = useSceneStore((s) => s.reducedMotion);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let lenis: Lenis | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    if (!reducedMotion) {
      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      activeLenis = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      rafCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
    }

    const masterTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: reducedMotion ? false : 0.85,
      onUpdate: (self) => {
        const progress = self.progress;
        const store = useSceneStore.getState();
        store.setScrollProgress(progress);

        const sampled = sampleCameraTimeline(progress);

        if (!reducedMotion) {
          store.updateCameraState({
            position: sampled.position,
            lookAt: sampled.lookAt,
            fov: sampled.fov,
          });
          store.updateWorkstationTransform(
            sampled.workstationPos,
            sampled.workstationRot
          );
        }

        store.setAccentIntensity(sampled.accentIntensity);
        store.setSceneOpacity(sampled.sceneOpacity);
        store.setScreenMode(sampled.screenMode);
        store.setActiveProjectIndex(sampled.projectIndex);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      masterTrigger.kill();
      if (rafCallback) {
        gsap.ticker.remove(rafCallback);
      }
      if (lenis) {
        lenis.destroy();
        if (activeLenis === lenis) {
          activeLenis = null;
        }
      }
    };
  }, [containerSelector, reducedMotion]);
}

