import type { ScreenMode } from '../store/sceneStore';

export interface CameraKeyframe {
  at: number; // Normalized scroll progress 0..1
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  workstationPos: [number, number, number];
  workstationRot: [number, number, number];
  accentIntensity: number;
  sceneOpacity: number;
  screenMode: ScreenMode;
  projectIndex: number;
}

/**
 * 8-scene cinematic scroll choreography:
 * 1. Wide shot of complete workstation (Hero)
 * 2. Slow approach toward desktop monitor (Project 01 - AI)
 * 3. Pan/glide toward laptop (Project 02 - WEB)
 * 4. Orbit around devices (Project 03 - MOBILE)
 * 5. Screen content transition & floating screen focus (Project 04 - 3D)
 * 6. Pull back to architectural wide framing (Project 05 - CREATIVE / About)
 * 7. Elevated service angle (Services)
 * 8. Pull away and fade into darkness (Contact CTA)
 */
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    // Scene 1: Wide hero establishing shot
    at: 0.0,
    position: [0.35, 1.95, 5.8],
    lookAt: [0, 0.92, 0],
    fov: 38,
    workstationPos: [0, -0.35, 0],
    workstationRot: [0, -0.14, 0],
    accentIntensity: 1.0,
    sceneOpacity: 1.0,
    screenMode: 'portfolio',
    projectIndex: 0,
  },
  {
    // Scene 2: Approach main desktop monitor (Project 01 - AI)
    at: 0.16,
    position: [-0.14, 1.32, 2.75],
    lookAt: [-0.08, 1.18, -0.3],
    fov: 35,
    workstationPos: [0, -0.35, 0],
    workstationRot: [0, 0.04, 0],
    accentIntensity: 1.35,
    sceneOpacity: 1.0,
    screenMode: 'project',
    projectIndex: 0,
  },
  {
    // Scene 3: Move toward laptop (Project 02 - WEB)
    at: 0.31,
    position: [1.38, 1.12, 2.45],
    lookAt: [0.95, 0.68, 0.35],
    fov: 34,
    workstationPos: [0, -0.35, 0],
    workstationRot: [0, -0.22, 0],
    accentIntensity: 1.4,
    sceneOpacity: 1.0,
    screenMode: 'project',
    projectIndex: 1,
  },
  {
    // Scene 4: Orbit around devices (Project 03 - MOBILE)
    at: 0.45,
    position: [-1.85, 1.42, 2.95],
    lookAt: [0.1, 0.95, 0],
    fov: 36,
    workstationPos: [0, -0.35, 0],
    workstationRot: [0, 0.28, 0],
    accentIntensity: 1.25,
    sceneOpacity: 1.0,
    screenMode: 'dashboard',
    projectIndex: 2,
  },
  {
    // Scene 5: Screen content transition & floating screen focus (Project 04 - 3D)
    at: 0.58,
    position: [0.52, 1.58, 3.05],
    lookAt: [0.05, 1.18, -0.15],
    fov: 36,
    workstationPos: [0, -0.35, 0],
    workstationRot: [0, -0.05, 0],
    accentIntensity: 1.5,
    sceneOpacity: 1.0,
    screenMode: 'project',
    projectIndex: 3,
  },
  {
    // Scene 6: Pull back to wide perspective (Project 05 - CREATIVE)
    at: 0.72,
    position: [-0.25, 1.78, 4.9],
    lookAt: [0, 0.98, 0],
    fov: 38,
    workstationPos: [0, -0.35, 0],
    workstationRot: [0, 0.12, 0],
    accentIntensity: 1.2,
    sceneOpacity: 1.0,
    screenMode: 'dashboard',
    projectIndex: 4,
  },
  {
    // Scene 7: Elevated editorial angle (About & Services)
    at: 0.85,
    position: [-0.95, 2.45, 4.75],
    lookAt: [0.15, 0.82, 0],
    fov: 40,
    workstationPos: [0, -0.35, 0],
    workstationRot: [0.04, -0.18, 0],
    accentIntensity: 0.95,
    sceneOpacity: 0.88,
    screenMode: 'portfolio',
    projectIndex: 4,
  },
  {
    // Scene 8: Final camera pull away into darkness (Contact CTA)
    at: 1.0,
    position: [0.0, 2.35, 8.6],
    lookAt: [0, 0.85, 0],
    fov: 42,
    workstationPos: [0, -0.45, 0],
    workstationRot: [0, 0.0, 0],
    accentIntensity: 0.22,
    sceneOpacity: 0.15,
    screenMode: 'portfolio',
    projectIndex: 0,
  },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function sampleCameraTimeline(progress: number): CameraKeyframe {
  const clamped = Math.max(0, Math.min(1, progress));

  let prev = CAMERA_KEYFRAMES[0];
  let next = CAMERA_KEYFRAMES[CAMERA_KEYFRAMES.length - 1];

  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    if (clamped >= CAMERA_KEYFRAMES[i].at && clamped <= CAMERA_KEYFRAMES[i + 1].at) {
      prev = CAMERA_KEYFRAMES[i];
      next = CAMERA_KEYFRAMES[i + 1];
      break;
    }
  }

  const span = Math.max(0.0001, next.at - prev.at);
  const localT = smoothstep((clamped - prev.at) / span);

  return {
    at: clamped,
    position: [
      lerp(prev.position[0], next.position[0], localT),
      lerp(prev.position[1], next.position[1], localT),
      lerp(prev.position[2], next.position[2], localT),
    ],
    lookAt: [
      lerp(prev.lookAt[0], next.lookAt[0], localT),
      lerp(prev.lookAt[1], next.lookAt[1], localT),
      lerp(prev.lookAt[2], next.lookAt[2], localT),
    ],
    fov: lerp(prev.fov, next.fov, localT),
    workstationPos: [
      lerp(prev.workstationPos[0], next.workstationPos[0], localT),
      lerp(prev.workstationPos[1], next.workstationPos[1], localT),
      lerp(prev.workstationPos[2], next.workstationPos[2], localT),
    ],
    workstationRot: [
      lerp(prev.workstationRot[0], next.workstationRot[0], localT),
      lerp(prev.workstationRot[1], next.workstationRot[1], localT),
      lerp(prev.workstationRot[2], next.workstationRot[2], localT),
    ],
    accentIntensity: lerp(prev.accentIntensity, next.accentIntensity, localT),
    sceneOpacity: lerp(prev.sceneOpacity, next.sceneOpacity, localT),
    screenMode: localT < 0.5 ? prev.screenMode : next.screenMode,
    projectIndex: localT < 0.5 ? prev.projectIndex : next.projectIndex,
  };
}

