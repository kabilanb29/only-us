import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '../../store/sceneStore';
import { MODEL_PATHS, PROJECTS } from '../../lib/constants';
import { GltfModel } from './GltfModel';

interface DeskProps {
  isMobile?: boolean;
}

function DeskProceduralGeometry() {
  return (
    <group>
      <mesh position={[0, -0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 2.05]} />
        <meshStandardMaterial color="#101116" roughness={0.42} metalness={0.35} />
      </mesh>
      <mesh position={[0, -0.085, 0]} receiveShadow>
        <boxGeometry args={[4.44, 0.015, 2.09]} />
        <meshStandardMaterial color="#1d1f28" roughness={0.28} metalness={0.8} />
      </mesh>
      <mesh position={[0.1, 0.004, 0.22]} receiveShadow>
        <boxGeometry args={[2.75, 0.008, 1.05]} />
        <meshStandardMaterial color="#09090d" roughness={0.9} metalness={0.05} />
      </mesh>
      <group position={[-0.22, 0.02, 0.34]} rotation={[0.04, 0.02, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.76, 0.022, 0.26]} />
          <meshStandardMaterial color="#16171d" roughness={0.38} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.014, 0]} castShadow>
          <boxGeometry args={[0.72, 0.01, 0.22]} />
          <meshStandardMaterial color="#0b0c10" roughness={0.7} metalness={0.2} />
        </mesh>
      </group>
      <mesh position={[0.32, 0.022, 0.36]} castShadow receiveShadow>
        <boxGeometry args={[0.11, 0.028, 0.19]} />
        <meshStandardMaterial color="#14151b" roughness={0.35} metalness={0.55} />
      </mesh>
      {[-1.95, 1.95].map((x) => (
        <group key={x} position={[x, -0.82, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.07, 1.48, 1.55]} />
            <meshStandardMaterial color="#0b0c10" roughness={0.45} metalness={0.75} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Architectural dark obsidian workstation desk & studio floor.
 * Loads desk assembly from public/models/desk.glb with procedural fallback.
 */
export function Desk({ isMobile = false }: DeskProps) {
  const ledRef = useRef<THREE.MeshStandardMaterial>(null);
  const backStripRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const { screenPower, sceneOpacity, activeProjectIndex } = useSceneStore.getState();
    const project = PROJECTS[activeProjectIndex] ?? PROJECTS[0];
    const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 2.2) * 0.2;

    if (ledRef.current) {
      ledRef.current.emissive.lerp(new THREE.Color(project.accentColor), 0.1);
      ledRef.current.emissiveIntensity = THREE.MathUtils.damp(
        ledRef.current.emissiveIntensity,
        2.2 * screenPower * sceneOpacity * pulse,
        5,
        delta
      );
    }

    if (backStripRef.current) {
      backStripRef.current.emissiveIntensity = THREE.MathUtils.damp(
        backStripRef.current.emissiveIntensity,
        1.8 * screenPower * sceneOpacity,
        5,
        delta
      );
    }
  });

  return (
    <group name="desk-assembly">
      <GltfModel path={MODEL_PATHS.desk} fallback={<DeskProceduralGeometry />} />

      {/* Rear bias LED edge strip along back of desk */}
      <mesh position={[0, -0.025, -1.048]}>
        <boxGeometry args={[3.9, 0.012, 0.012]} />
        <meshStandardMaterial
          ref={backStripRef}
          color="#ff5a1f"
          emissive="#ff4d1a"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>

      {/* Audio DAC / Neural puck with accent status ring */}
      {!isMobile && (
        <group position={[-1.35, 0.025, 0.25]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.11, 0.12, 0.045, 32]} />
            <meshStandardMaterial color="#171820" roughness={0.25} metalness={0.85} />
          </mesh>
          <mesh position={[0, 0.024, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.075, 0.004, 12, 32]} />
            <meshStandardMaterial
              ref={ledRef}
              color="#ff5a1f"
              emissive="#ff5a1f"
              emissiveIntensity={2.0}
              toneMapped={false}
            />
          </mesh>
        </group>
      )}

      {/* Infinite dark studio floor plane */}
      <mesh position={[0, -1.56, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#040406" roughness={0.85} metalness={0.15} />
      </mesh>
    </group>
  );
}
