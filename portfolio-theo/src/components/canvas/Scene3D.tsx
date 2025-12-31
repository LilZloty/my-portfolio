'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useQualityStore, useScrollStore } from '@/lib/store';
import { qualitySettings } from '@/lib/quality';
import ParticleField from './ParticleField';

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { qualityTier } = useQualityStore();
  const { setScrollY, setScrollProgress } = useScrollStore();
  const settings = qualitySettings[qualityTier];

  // Track scroll position for scroll-driven animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      setScrollY(scrollY);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollY, setScrollProgress]);

  // Don't render 3D for fallback tier
  if (qualityTier === 'fallback') {
    return null;
  }

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={settings.pixelRatio}
      gl={{
        antialias: qualityTier === 'high',
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#A1FB09" />

      {/* Particle field background */}
      <ParticleField count={settings.particleCount} />

      {/* Preload assets */}
      <Preload all />
    </Canvas>
  );
}
