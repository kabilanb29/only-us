import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '../../store/sceneStore';
import { PROJECTS } from '../../lib/constants';
import { DashboardScreen } from '../screens/DashboardScreen';

interface FloatingScreenProps {
  visible?: boolean;
  reducedMotion?: boolean;
}

/**
 * Optional floating holographic secondary screen hovering near the main monitor.
 * Adds spatial depth and live telemetry readout without cluttering the desk.
 */
export function FloatingScreen({
  visible = true,
  reducedMotion = false,
}: FloatingScreenProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rimMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const activeProjectIndex = useSceneStore((s) => s.activeProjectIndex);
  const screenPower = useSceneStore((s) => s.screenPower);
  const activeProject = PROJECTS[activeProjectIndex] ?? PROJECTS[0];

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const { screenPower: power, sceneOpacity, activeProjectIndex: idx } =
      useSceneStore.getState();
    const proj = PROJECTS[idx] ?? PROJECTS[0];

    if (!reducedMotion) {
      const t = state.clock.elapsedTime;
      group.position.y = 1.48 + Math.sin(t * 1.1) * 0.035;
      group.rotation.z = Math.sin(t * 0.6) * 0.012;
    }

    if (rimMatRef.current) {
      rimMatRef.current.emissive.lerp(new THREE.Color(proj.accentColor), 0.08);
      rimMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        rimMatRef.current.emissiveIntensity,
        1.25 * power * sceneOpacity,
        4,
        delta
      );
    }
  });

  if (!visible) return null;

  return (
    <group
      ref={groupRef}
      name="floating-secondary-screen"
      position={[-1.62, 1.48, 0.05]}
      rotation={[0.04, 0.36, 0]}
    >
      {/* Ultra-slim glass backing */}
      <mesh>
        <boxGeometry args={[0.76, 0.46, 0.012]} />
        <meshStandardMaterial
          color="#0a0b10"
          roughness={0.18}
          metalness={0.7}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Glowing perimeter accent frame */}
      <mesh position={[0, 0.232, 0]}>
        <boxGeometry args={[0.76, 0.005, 0.016]} />
        <meshStandardMaterial
          ref={rimMatRef}
          color="#ff5a1f"
          emissive="#ff5a1f"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Live telemetry screen */}
      <Html
        transform
        position={[0, 0, 0.01]}
        scale={0.0308}
        occlude={false}
        zIndexRange={[6, 0]}
        style={{
          width: '960px',
          height: '580px',
          pointerEvents: 'none',
        }}
      >
        <div className="h-[580px] w-[960px] overflow-hidden bg-[#050507]/95">
          <DashboardScreen project={activeProject} screenPower={screenPower} compact />
        </div>
      </Html>
    </group>
  );
}
