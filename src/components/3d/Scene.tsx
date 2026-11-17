import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import * as THREE from 'three';
import { useSceneStore } from '../../store/sceneStore';
import { useResponsive3D } from '../../hooks/useResponsive3D';
import { Environment } from './Environment';
import { Desk } from './Desk';
import { Monitor } from './Monitor';
import { Laptop } from './Laptop';
import { FloatingScreen } from './FloatingScreen';
import { Particles } from './Particles';

interface RigProps {
  fovOffset: number;
  isMobile: boolean;
  reducedMotion: boolean;
}

function CameraAndWorkstationRig({ fovOffset, isMobile, reducedMotion }: RigProps) {
  const workstationRef = useRef<THREE.Group>(null);
  const currentLookAt = useRef(new THREE.Vector3(0, 0.92, 0));
  const targetLookAtVec = useRef(new THREE.Vector3(0, 0.92, 0));

  const { camera } = useThree();

  // Intro emergence animation: lights & screen power fade up smoothly
  useEffect(() => {
    const store = useSceneStore.getState();
    if (reducedMotion) {
      store.setScreenPower(1);
      store.setIntroComplete(true);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      useSceneStore.getState().setScreenPower(eased);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        useSceneStore.getState().setIntroComplete(true);
      }
    };

    const delayTimer = window.setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, 320);

    return () => {
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  useFrame((_, delta) => {
    const state = useSceneStore.getState();
    const {
      cameraState,
      workstationPosition,
      workstationRotation,
      pointer,
      screenPower,
    } = state;

    const dampFactor = reducedMotion ? 10 : 4.2;

    // Subtle mouse parallax (kept gentle so scene never shakes)
    const parallaxX = isMobile || reducedMotion ? 0 : pointer.x * 0.24;
    const parallaxY = isMobile || reducedMotion ? 0 : pointer.y * 0.14;

    // Mobile-specific depth offset so desktop workstation stays framed cleanly
    const mobileZOffset = isMobile ? 1.45 : 0;
    const mobileYOffset = isMobile ? 0.25 : 0;

    const targetX = cameraState.position[0] + parallaxX;
    const targetY = cameraState.position[1] + parallaxY + mobileYOffset;
    const targetZ = cameraState.position[2] + mobileZOffset;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, dampFactor, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, dampFactor, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, dampFactor, delta);

    targetLookAtVec.current.set(
      cameraState.lookAt[0] + parallaxX * 0.25,
      cameraState.lookAt[1] + parallaxY * 0.2,
      cameraState.lookAt[2]
    );
    currentLookAt.current.lerp(
      targetLookAtVec.current,
      1 - Math.exp(-dampFactor * delta)
    );
    camera.lookAt(currentLookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = cameraState.fov + fovOffset;
      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, dampFactor, delta);
        camera.updateProjectionMatrix();
      }
    }

    if (workstationRef.current) {
      const introLift = (1 - screenPower) * -0.18;
      workstationRef.current.position.x = THREE.MathUtils.damp(
        workstationRef.current.position.x,
        workstationPosition[0],
        dampFactor,
        delta
      );
      workstationRef.current.position.y = THREE.MathUtils.damp(
        workstationRef.current.position.y,
        workstationPosition[1] + introLift,
        dampFactor,
        delta
      );
      workstationRef.current.position.z = THREE.MathUtils.damp(
        workstationRef.current.position.z,
        workstationPosition[2],
        dampFactor,
        delta
      );

      workstationRef.current.rotation.x = THREE.MathUtils.damp(
        workstationRef.current.rotation.x,
        workstationRotation[0] - parallaxY * 0.04,
        dampFactor,
        delta
      );
      workstationRef.current.rotation.y = THREE.MathUtils.damp(
        workstationRef.current.rotation.y,
        workstationRotation[1] + parallaxX * 0.06,
        dampFactor,
        delta
      );
      workstationRef.current.rotation.z = THREE.MathUtils.damp(
        workstationRef.current.rotation.z,
        workstationRotation[2],
        dampFactor,
        delta
      );
    }
  });

  return (
    <group ref={workstationRef} position={[0, -0.35, 0]} rotation={[0, -0.14, 0]}>
      <Desk isMobile={isMobile} />
      <Monitor isMobile={isMobile} />
      <Laptop isMobile={isMobile} />
      <FloatingScreen visible={!isMobile} reducedMotion={reducedMotion} />
    </group>
  );
}

function PostProcessingEffects({ enableDof }: { enableDof: boolean }) {
  if (enableDof) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          luminanceThreshold={0.9}
          luminanceSmoothing={0.25}
          intensity={0.38}
        />
        <DepthOfField
          focusDistance={0.015}
          focalLength={0.045}
          bokehScale={1.3}
          height={480}
        />
        <Vignette eskil={false} offset={0.28} darkness={0.58} />
        <Noise opacity={0.02} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        mipmapBlur
        luminanceThreshold={0.9}
        luminanceSmoothing={0.25}
        intensity={0.38}
      />
      <Vignette eskil={false} offset={0.28} darkness={0.58} />
      <Noise opacity={0.02} />
    </EffectComposer>
  );
}

export function Scene() {
  const responsive = useResponsive3D();

  return (
    <div
      className="fixed inset-0 z-0 h-screen w-screen pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={responsive.dpr}
        shadows={responsive.enableShadows}
        camera={{
          position: [0.35, 1.95, 5.8],
          fov: 38 + responsive.fovOffset,
          near: 0.1,
          far: 60,
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <Suspense fallback={null}>
          <Environment
            shadowMapSize={responsive.shadowMapSize}
            enableShadows={responsive.enableShadows}
          />

          <CameraAndWorkstationRig
            fovOffset={responsive.fovOffset}
            isMobile={responsive.isMobile}
            reducedMotion={responsive.reducedMotion}
          />

          <Particles
            count={responsive.particleCount}
            reducedMotion={responsive.reducedMotion}
          />

          {responsive.enablePostProcessing && (
            <PostProcessingEffects enableDof={responsive.enableDof} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
