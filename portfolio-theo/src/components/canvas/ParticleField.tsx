/// <reference types="@react-three/fiber" />
'use client';

import { useRef, useMemo } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/lib/store';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 500 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollProgress } = useScrollStore();

  // Generate random particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const limeColor = new THREE.Color('#A1FB09');
    const whiteColor = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions in a sphere
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Mix lime and white colors
      const mixFactor = Math.random();
      const color = mixFactor > 0.7 ? limeColor : whiteColor;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Random sizes
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, colors, sizes };
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const points = pointsRef.current;

    // Rotate based on time and scroll
    points.rotation.y = time * 0.05 + scrollProgress * Math.PI;
    points.rotation.x = Math.sin(time * 0.03) * 0.1;

    // Subtle breathing effect
    const scale = 1 + Math.sin(time * 0.5) * 0.02;
    points.scale.set(scale, scale, scale);
  });

  return (
    // @ts-ignore
    <points ref={pointsRef}>
      {/* @ts-ignore */}
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute
          // @ts-ignore
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        {/* @ts-ignore */}
        <bufferAttribute
          // @ts-ignore
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
        {/* @ts-ignore */}
        <bufferAttribute
          // @ts-ignore
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      {/* @ts-ignore */}
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
