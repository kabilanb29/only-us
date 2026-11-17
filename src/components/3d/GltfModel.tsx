import { Component, Suspense, useEffect, useMemo, type ReactNode } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface LoadedGltfProps {
  path: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function LoadedGltf({
  path,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: LoadedGltfProps) {
  const gltf = useGLTF(path);

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [gltf.scene]);

  useEffect(() => {
    return () => {
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    };
  }, [clonedScene]);

  return (
    <primitive
      object={clonedScene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

interface GltfModelProps {
  path: string;
  enabled?: boolean;
  fallback: ReactNode;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Drop-in GLB/GLTF model wrapper with Draco support and automatic fallback
 * to procedural Three.js geometry if the GLB asset is absent or fails to load.
 */
export function GltfModel({
  path,
  enabled = true,
  fallback,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: GltfModelProps) {
  if (!enabled) {
    return <>{fallback}</>;
  }

  return (
    <ModelErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <LoadedGltf
          path={path}
          scale={scale}
          position={position}
          rotation={rotation}
        />
      </Suspense>
    </ModelErrorBoundary>
  );
}
