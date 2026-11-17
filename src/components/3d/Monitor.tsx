import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '../../store/sceneStore';
import { MODEL_PATHS, PROJECTS } from '../../lib/constants';
import { PortfolioScreen } from '../screens/PortfolioScreen';
import { ProjectScreen } from '../screens/ProjectScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { GltfModel } from './GltfModel';

interface MonitorProps {
  isMobile?: boolean;
}

function MonitorProceduralChassis() {
  return (
    <group>
      <mesh position={[0, 0.015, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.56, 0.024, 0.34]} />
        <meshStandardMaterial color="#181920" roughness={0.28} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.42, -0.11]} rotation={[0.08, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.11, 0.84, 0.045]} />
        <meshStandardMaterial color="#1e2029" roughness={0.25} metalness={0.88} />
      </mesh>
      <mesh position={[0, 0.82, -0.07]} castShadow>
        <boxGeometry args={[0.24, 0.18, 0.06]} />
        <meshStandardMaterial color="#15161d" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.02, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[2.06, 1.18, 0.045]} />
        <meshStandardMaterial color="#14151c" roughness={0.3} metalness={0.82} />
      </mesh>
      <mesh position={[0, 1.02, 0.038]}>
        <boxGeometry args={[2.02, 1.14, 0.015]} />
        <meshStandardMaterial color="#07070a" roughness={0.5} metalness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Primary 32" Studio Reference Monitor.
 * Loads chassis from public/models/monitor.glb (with automatic procedural fallback)
 * and overlays live HTML/CSS screen content + dynamic emissive lighting.
 */
export function Monitor({ isMobile = false }: MonitorProps) {
  const screenGlowMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const backBiasMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);

  const activeProjectIndex = useSceneStore((s) => s.activeProjectIndex);
  const screenMode = useSceneStore((s) => s.screenMode);
  const screenPower = useSceneStore((s) => s.screenPower);

  const activeProject = PROJECTS[activeProjectIndex] ?? PROJECTS[0];

  useFrame((_, delta) => {
    const { screenPower: power, sceneOpacity, activeProjectIndex: idx } =
      useSceneStore.getState();
    const proj = PROJECTS[idx] ?? PROJECTS[0];
    const targetAccent = new THREE.Color(proj.accentColor);
    const effectivePower = power * sceneOpacity;

    if (screenGlowMatRef.current) {
      screenGlowMatRef.current.emissive.lerp(targetAccent, 0.08);
      screenGlowMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        screenGlowMatRef.current.emissiveIntensity,
        0.55 * effectivePower,
        5,
        delta
      );
    }

    if (backBiasMatRef.current) {
      backBiasMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        backBiasMatRef.current.emissiveIntensity,
        2.1 * effectivePower,
        4,
        delta
      );
    }

    if (screenLightRef.current) {
      screenLightRef.current.color.lerp(targetAccent, 0.08);
      screenLightRef.current.intensity = THREE.MathUtils.damp(
        screenLightRef.current.intensity,
        1.7 * effectivePower,
        5,
        delta
      );
    }
  });

  return (
    <group name="studio-monitor" position={[-0.28, 0, -0.36]}>
      {/* Hardware chassis from GLB with procedural fallback */}
      <GltfModel path={MODEL_PATHS.monitor} fallback={<MonitorProceduralChassis />} />

      {/* Interactive display surface & lighting rig */}
      <group position={[0, 1.02, 0.02]}>
        {/* Rear warm bias lighting strip */}
        <mesh position={[0, 0, -0.038]}>
          <boxGeometry args={[1.54, 0.78, 0.008]} />
          <meshStandardMaterial
            ref={backBiasMatRef}
            color="#ff5a1f"
            emissive="#ff4d1a"
            emissiveIntensity={2.0}
            toneMapped={false}
          />
        </mesh>

        {/* Emissive display glass backing */}
        <mesh position={[0, 0, 0.027]}>
          <planeGeometry args={[1.95, 1.09]} />
          <meshStandardMaterial
            ref={screenGlowMatRef}
            color="#06070a"
            emissive="#ff5a1f"
            emissiveIntensity={0.45}
            roughness={0.18}
            metalness={0.15}
          />
        </mesh>

        {/* Live HTML/CSS interactive screen mapped onto 3D monitor surface */}
        <Html
          transform
          position={[0, 0, 0.032]}
          scale={0.081}
          occlude={false}
          zIndexRange={[10, 0]}
          style={{
            width: '960px',
            height: '540px',
            pointerEvents: 'none',
          }}
        >
          <div className="h-[540px] w-[960px] overflow-hidden bg-[#050507]">
            {screenMode === 'portfolio' && (
              <PortfolioScreen
                activeProject={activeProject}
                screenPower={screenPower}
                compact={isMobile}
              />
            )}
            {screenMode === 'project' && (
              <ProjectScreen
                project={activeProject}
                screenPower={screenPower}
                compact={isMobile}
              />
            )}
            {screenMode === 'dashboard' && (
              <DashboardScreen
                project={activeProject}
                screenPower={screenPower}
                compact={isMobile}
              />
            )}
          </div>
        </Html>

        {/* Screen emission light illuminating keyboard & desk */}
        <pointLight
          ref={screenLightRef}
          position={[0, -0.1, 0.55]}
          intensity={1.7}
          distance={3.4}
          decay={2}
          color={activeProject.accentColor}
        />
      </group>
    </group>
  );
}
