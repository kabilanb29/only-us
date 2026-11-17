import { create } from 'zustand';

export type ScreenMode = 'portfolio' | 'project' | 'dashboard';

export interface CameraTargetState {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export interface SceneState {
  // Normalized global scroll progress 0 -> 1
  scrollProgress: number;
  // Current active project index (0..4)
  activeProjectIndex: number;
  // Screen display mode on the 3D devices
  screenMode: ScreenMode;
  // Lighting intensity driven by intro & scroll timeline (0 -> 1+)
  screenPower: number;
  accentIntensity: number;
  sceneOpacity: number;
  // Intro readiness
  introComplete: boolean;
  // Device / accessibility flags
  reducedMotion: boolean;
  isMobile: boolean;
  isTablet: boolean;
  // Selected project modal/detail inspect
  inspectedProjectId: string | null;
  // Interactive camera target (mutated smoothly by ScrollTrigger/GSAP)
  cameraState: CameraTargetState;
  // Subtle workstation group rotation/position offsets from scroll timeline
  workstationRotation: [number, number, number];
  workstationPosition: [number, number, number];
  // Normalized pointer [-1..1]
  pointer: { x: number; y: number };
  // Actions
  setScrollProgress: (progress: number) => void;
  setActiveProjectIndex: (index: number) => void;
  setScreenMode: (mode: ScreenMode) => void;
  setScreenPower: (power: number) => void;
  setAccentIntensity: (intensity: number) => void;
  setSceneOpacity: (opacity: number) => void;
  setIntroComplete: (done: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setViewportTier: (isMobile: boolean, isTablet: boolean) => void;
  setInspectedProjectId: (id: string | null) => void;
  setPointer: (x: number, y: number) => void;
  updateCameraState: (partial: Partial<CameraTargetState>) => void;
  updateWorkstationTransform: (
    position: [number, number, number],
    rotation: [number, number, number]
  ) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scrollProgress: 0,
  activeProjectIndex: 0,
  screenMode: 'portfolio',
  screenPower: 0,
  accentIntensity: 1.0,
  sceneOpacity: 1,
  introComplete: false,
  reducedMotion: false,
  isMobile: false,
  isTablet: false,
  inspectedProjectId: null,
  cameraState: {
    position: [0.35, 2.05, 6.2],
    lookAt: [0, 0.95, 0],
    fov: 38,
  },
  workstationRotation: [0, -0.12, 0],
  workstationPosition: [0, -0.35, 0],
  pointer: { x: 0, y: 0 },

  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveProjectIndex: (activeProjectIndex) => set({ activeProjectIndex }),
  setScreenMode: (screenMode) => set({ screenMode }),
  setScreenPower: (screenPower) => set({ screenPower }),
  setAccentIntensity: (accentIntensity) => set({ accentIntensity }),
  setSceneOpacity: (sceneOpacity) => set({ sceneOpacity }),
  setIntroComplete: (introComplete) => set({ introComplete }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setViewportTier: (isMobile, isTablet) => set({ isMobile, isTablet }),
  setInspectedProjectId: (inspectedProjectId) => set({ inspectedProjectId }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
  updateCameraState: (partial) =>
    set((state) => ({
      cameraState: { ...state.cameraState, ...partial },
    })),
  updateWorkstationTransform: (workstationPosition, workstationRotation) =>
    set({ workstationPosition, workstationRotation }),
}));

