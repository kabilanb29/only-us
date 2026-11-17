import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '../../store/sceneStore';
import { MODEL_PATHS, PROJECTS } from '../../lib/constants';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProjectScreen } from '../screens/ProjectScreen';
import { GltfModel } from './GltfModel';

interface LaptopProps {
  isMobile?: boolean;
}

function LaptopProceduralChassis() {
  return (
    <group>
      <mesh position={[0, 0.012, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.88, 0.022, 0.6]} />
        <meshStandardMaterial color="#191b22" roughness={0.28} metalness={0.86} />
      </mesh>
      <mesh position={[0, 0.024, -0.06]}>
        <boxGeometry args={[0.76, 0.004, 0.28]} />
        <meshStandardMaterial color="#090a0e" roughness={0.75} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.024, 0.16]}>
        <boxGeometry args={[0.3, 0.003, 0.17]} />
        <meshStandardMaterial color="#12131a" roughness={0.22} metalness={0.65} />
      </mesh>
      <group position={[0, 0.025, -0.29]} rotation={[-0.32, 0, 0]}>
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.88, 0.56, 0.014]} />
          <meshStandardMaterial color="#181a21" roughness={0.26} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.28, 0.008]}>
          <boxGeometry args={[0.85, 0.53, 0.004]} />
          <meshStandardMaterial color="#050508" roughness={0.45} metalness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Secondary Studio Workstation Laptop.
 * Loads hardware chassis from public/models/laptop.glb (with automatic procedural fallback).
 */
export function Laptop({ isMobile = false }: LaptopProps) {
  const screenGlowRef = useRef<THREE.MeshStandardMaterial>(null);
  const laptopLightRef = useRef<THREE.PointLight>(null);

  const activeProjectIndex = useSceneStore((s) => s.activeProjectIndex);
  const screenMode = useSceneStore((s) => s.screenMode);
  const screenPower = useSceneStore((s) => s.screenPower);

  const activeProject = PROJECTS[activeProjectIndex] ?? PROJECTS[0];

  useFrame((_, delta) => {
    const { screenPower: power, sceneOpacity, activeProjectIndex: idx } =
      useSceneStore.getState();
    const proj = PROJECTS[idx] ?? PROJECTS[0];
    const effective = power * sceneOpacity;

    if (screenGlowRef.current) {
      screenGlowRef.current.emissive.lerp(new THREE.Color(proj.accentColor), 0.08);
      screenGlowRef.current.emissiveIntensity = THREE.MathUtils.damp(
        screenGlowRef.current.emissiveIntensity,
        0.48 * effective,
        5,
        delta
      );
    }

    if (laptopLightRef.current) {
      laptopLightRef.current.color.lerp(new THREE.Color(proj.accentColor), 0.08);
      laptopLightRef.current.intensity = THREE.MathUtils.damp(
        laptopLightRef.current.intensity,
        0.95 * effective,
        5,
        delta
      );
    }
  });

  return (
    <group
      name="studio-laptop"
      position={[1.18, 0.012, 0.34]}
      rotation={[0, -0.44, 0]}
    >
      <GltfModel path={MODEL_PATHS.laptop} fallback={<LaptopProceduralChassis />} />

      {/* Screen surface & live HTML overlay aligned with lid */}
      <group position={[0, 0.025, -0.29]} rotation={[-0.32, 0, 0]}>
        <mesh position={[0, 0.28, 0.011]}>
          <planeGeometry args={[0.82, 0.5]} />
          <meshStandardMaterial
            ref={screenGlowRef}
            color="#07080c"
            emissive="#ff5a1f"
            emissiveIntensity={0.45}
            roughness={0.18}
          />
        </mesh>

        <Html
          transform
          position={[0, 0.28, 0.015]}
          scale={0.0364}
          occlude={false}
          zIndexRange={[8, 0]}
          style={{
            width: '900px',
            height: '550px',
            pointerEvents: 'none',
          }}
        >
          <div className="h-[550px] w-[900px] overflow-hidden bg-[#050507]">
            {screenMode === 'project' ? (
              <DashboardScreen
                project={activeProject}
                screenPower={screenPower}
                compact={isMobile}
              />
            ) : (
              <ProjectScreen
                project={activeProject}
                screenPower={screenPower}
                compact={isMobile}
              />
            )}
          </div>
        </Html>

        <pointLight
          ref={laptopLightRef}
          position={[0, 0.25, 0.35]}
          intensity={0.95}
          distance={1.8}
          decay={2}
          color={activeProject.accentColor}
        />
      </group>
    </group>
  );
}
