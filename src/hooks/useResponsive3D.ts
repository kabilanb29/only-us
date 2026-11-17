import { useEffect, useState } from 'react';
import { useSceneStore } from '../store/sceneStore';

export interface Responsive3DConfig {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  reducedMotion: boolean;
  dpr: [number, number];
  particleCount: number;
  shadowMapSize: number;
  enableShadows: boolean;
  enablePostProcessing: boolean;
  enableDof: boolean;
  fovOffset: number;
}

export function useResponsive3D(): Responsive3DConfig {
  const setViewportTier = useSceneStore((s) => s.setViewportTier);
  const setReducedMotion = useSceneStore((s) => s.setReducedMotion);

  const [state, setState] = useState<{
    width: number;
    reducedMotion: boolean;
  }>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    reducedMotion:
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
  }));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1080;
      setViewportTier(isMobile, isTablet);
      setState((prev) => ({ ...prev, width }));
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      setState((prev) => ({ ...prev, reducedMotion: e.matches }));
    };

    handleResize();
    setReducedMotion(mediaQuery.matches);

    window.addEventListener('resize', handleResize, { passive: true });
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [setReducedMotion, setViewportTier]);

  const isMobile = state.width < 768;
  const isTablet = state.width >= 768 && state.width < 1080;
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    reducedMotion: state.reducedMotion,
    dpr: isMobile ? [1, 1.25] : isTablet ? [1, 1.5] : [1, 2],
    particleCount: isMobile ? 48 : isTablet ? 90 : 160,
    shadowMapSize: isMobile ? 512 : isTablet ? 1024 : 2048,
    enableShadows: !isMobile,
    enablePostProcessing: !isMobile,
    enableDof: isDesktop && !state.reducedMotion,
    fovOffset: isMobile ? 11 : isTablet ? 5 : 0,
  };
}

