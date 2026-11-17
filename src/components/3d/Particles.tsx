import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '../../store/sceneStore';

interface ParticlesProps {
  count: number;
  reducedMotion: boolean;
}

function createSoftParticleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.28, 'rgba(255, 210, 185, 0.7)');
    gradient.addColorStop(0.65, 'rgba(255, 90, 31, 0.18)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function Particles({ count, reducedMotion }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, basePositions, speeds } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const vel = new Float32Array(count);

    const warmOrange = new THREE.Color('#ff6b35');
    const softCrimson = new THREE.Color('#fb7185');
    const coolWhite = new THREE.Color('#d8dce6');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 11;
      const y = Math.random() * 4.5 - 0.3;
      const z = (Math.random() - 0.5) * 9 - 0.5;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;

      vel[i] = 0.25 + Math.random() * 0.65;

      const pick = Math.random();
      const c = pick < 0.35 ? warmOrange : pick < 0.52 ? softCrimson : coolWhite;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { geometry: geo, basePositions: base, speeds: vel };
  }, [count]);

  const spriteTexture = useMemo(() => createSoftParticleTexture(), []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.065,
        map: spriteTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    [spriteTexture]
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
    };
  }, [geometry, material, spriteTexture]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const { pointer, sceneOpacity, scrollProgress } = useSceneStore.getState();
    material.opacity = THREE.MathUtils.damp(
      material.opacity,
      0.62 * Math.max(0.15, sceneOpacity),
      4,
      delta
    );

    if (reducedMotion) return;

    const t = state.clock.elapsedTime;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const s = speeds[i];
      arr[i3] = basePositions[i3] + Math.sin(t * 0.18 * s + i) * 0.14;
      arr[i3 + 1] = basePositions[i3 + 1] + Math.cos(t * 0.22 * s + i * 0.7) * 0.18;
      arr[i3 + 2] = basePositions[i3 + 2] + Math.sin(t * 0.14 * s + i * 0.3) * 0.12;
    }
    posAttr.needsUpdate = true;

    // Subtle parallax + scroll depth drift
    points.position.x = THREE.MathUtils.damp(points.position.x, -pointer.x * 0.18, 3, delta);
    points.position.y = THREE.MathUtils.damp(points.position.y, -pointer.y * 0.12, 3, delta);
    points.rotation.y = THREE.MathUtils.damp(
      points.rotation.y,
      scrollProgress * 0.22 + t * 0.012,
      2,
      delta
    );
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

