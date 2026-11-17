import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment as DreiEnvironment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '../../store/sceneStore';
import { PROJECTS } from '../../lib/constants';

interface EnvironmentProps {
  shadowMapSize: number;
  enableShadows: boolean;
}

export function Environment({ shadowMapSize, enableShadows }: EnvironmentProps) {
  const accentBackLightRef = useRef<THREE.PointLight>(null);
  const accentRimLightRef = useRef<THREE.PointLight>(null);
  const screenBounceRef = useRef<THREE.PointLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((_, delta) => {
    const state = useSceneStore.getState();
    const { accentIntensity, screenPower, sceneOpacity, activeProjectIndex } = state;
    const project = PROJECTS[activeProjectIndex] ?? PROJECTS[0];

    const targetPower = screenPower * sceneOpacity;
    const targetAccent = accentIntensity * sceneOpacity;

    if (accentBackLightRef.current) {
      accentBackLightRef.current.intensity = THREE.MathUtils.damp(
        accentBackLightRef.current.intensity,
        7.5 * targetAccent,
        4,
        delta
      );
    }

    if (accentRimLightRef.current) {
      accentRimLightRef.current.intensity = THREE.MathUtils.damp(
        accentRimLightRef.current.intensity,
        4.2 * targetAccent,
        4,
        delta
      );
    }

    if (screenBounceRef.current) {
      screenBounceRef.current.intensity = THREE.MathUtils.damp(
        screenBounceRef.current.intensity,
        2.6 * targetPower,
        5,
        delta
      );
      screenBounceRef.current.color.lerp(new THREE.Color(project.accentColor), 0.08);
    }

    if (keyLightRef.current) {
      keyLightRef.current.intensity = THREE.MathUtils.damp(
        keyLightRef.current.intensity,
        1.15 * Math.max(0.2, sceneOpacity),
        4,
        delta
      );
    }
  });

  return (
    <>
      <color attach="background" args={['#050507']} />
      <fog attach="fog" args={['#050507', 6.5, 16]} />

      {/* Low cool ambient fill to preserve deep cinematic shadows */}
      <ambientLight intensity={0.22} color="#171923" />

      {/* Primary studio overhead-front key light */}
      <directionalLight
        ref={keyLightRef}
        position={[3.5, 5.5, 4.2]}
        intensity={1.15}
        color="#f5ede4"
        castShadow={enableShadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={1}
        shadow-camera-far={16}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={3.5}
        shadow-camera-bottom={-3.5}
        shadow-bias={-0.0004}
      />

      {/* Cool rim fill from left for hardware edge definition */}
      <directionalLight position={[-4.5, 2.8, -2.5]} intensity={0.45} color="#4d648d" />

      {/* Warm cinematic orange/red hero backlight behind devices */}
      <pointLight
        ref={accentBackLightRef}
        position={[-0.3, 1.35, -1.65]}
        intensity={7.5}
        distance={9}
        decay={2}
        color="#ff4d1a"
      />

      {/* Crimson secondary atmospheric rim behind right side */}
      <pointLight
        ref={accentRimLightRef}
        position={[1.8, 0.95, -1.35]}
        intensity={4.2}
        distance={7.5}
        decay={2}
        color="#e11d48"
      />

      {/* Screen emission bounce illuminating desk surface & hardware */}
      <pointLight
        ref={screenBounceRef}
        position={[0.1, 1.15, 0.65]}
        intensity={2.6}
        distance={4.5}
        decay={2}
        color="#ff5a1f"
      />

      {/* Procedural studio HDR reflections via Lightformers (zero external network fetches) */}
      <DreiEnvironment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="rect"
            intensity={1.8}
            position={[0, 5, -2]}
            scale={[8, 2, 1]}
            color="#e2e8f0"
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[-3, 1, -4]}
            scale={[5, 2.5, 1]}
            color="#ff5a1f"
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[4, 0.5, -3]}
            scale={[4, 2, 1]}
            color="#e11d48"
          />
          <Lightformer
            form="ring"
            intensity={0.7}
            position={[0, 3, 4]}
            scale={4}
            color="#64748b"
          />
        </group>
      </DreiEnvironment>
    </>
  );
}

