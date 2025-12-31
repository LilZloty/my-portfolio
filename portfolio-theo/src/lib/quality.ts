import { getGPUTier } from 'detect-gpu';
import { QualityTier, useQualityStore } from './store';

/**
 * Check if we're on the client side
 */
const isClient = typeof window !== 'undefined';

/**
 * Get pixel ratio safely (works on both server and client)
 */
function getPixelRatio(max: number): number {
  if (!isClient) return 1;
  return Math.min(window.devicePixelRatio || 1, max);
}

/**
 * Quality settings for each tier - computed lazily to avoid SSR issues
 */
export function getQualitySettings(tier: QualityTier) {
  const settings = {
    high: {
      pixelRatio: getPixelRatio(2),
      shadows: true,
      postProcessing: true,
      particleCount: 1000,
      modelDetail: 'high' as const,
      textureSize: 2048,
    },
    medium: {
      pixelRatio: getPixelRatio(1.5),
      shadows: false,
      postProcessing: true,
      particleCount: 500,
      modelDetail: 'medium' as const,
      textureSize: 1024,
    },
    low: {
      pixelRatio: 1,
      shadows: false,
      postProcessing: false,
      particleCount: 200,
      modelDetail: 'low' as const,
      textureSize: 512,
    },
    fallback: {
      pixelRatio: 1,
      shadows: false,
      postProcessing: false,
      particleCount: 0,
      modelDetail: 'none' as const,
      textureSize: 256,
    },
  };
  
  return settings[tier];
}

// Legacy export for backward compatibility
export const qualitySettings = {
  high: {
    pixelRatio: 2,
    shadows: true,
    postProcessing: true,
    particleCount: 1000,
    modelDetail: 'high',
    textureSize: 2048,
  },
  medium: {
    pixelRatio: 1.5,
    shadows: false,
    postProcessing: true,
    particleCount: 500,
    modelDetail: 'medium',
    textureSize: 1024,
  },
  low: {
    pixelRatio: 1,
    shadows: false,
    postProcessing: false,
    particleCount: 200,
    modelDetail: 'low',
    textureSize: 512,
  },
  fallback: {
    pixelRatio: 1,
    shadows: false,
    postProcessing: false,
    particleCount: 0,
    modelDetail: 'none',
    textureSize: 256,
  },
} as const;

/**
 * Detect GPU capabilities and set appropriate quality tier
 */
export async function detectAndSetQuality(): Promise<QualityTier> {
  // Only run on client
  if (!isClient) {
    return 'high';
  }

  const { setQualityTier, setLoading } = useQualityStore.getState();

  try {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      console.log('WebGL not supported, using fallback');
      setQualityTier('fallback');
      setLoading(false);
      return 'fallback';
    }

    // Get GPU tier using detect-gpu
    const gpuTier = await getGPUTier();
    
    let tier: QualityTier;
    
    // Map GPU tier to quality tier
    // Tier 0: Fallback (no GPU or very old)
    // Tier 1: Low (>=15 fps in benchmarks)
    // Tier 2: Medium (>=30 fps)
    // Tier 3: High (>=60 fps)
    switch (gpuTier.tier) {
      case 3:
        tier = 'high';
        break;
      case 2:
        tier = 'medium';
        break;
      case 1:
        tier = 'low';
        break;
      default:
        tier = 'fallback';
    }

    // Check if it's mobile - be more conservative
    if (gpuTier.isMobile && tier === 'high') {
      tier = 'medium';
    }

    console.log(`GPU Detection: ${gpuTier.gpu}, Tier: ${gpuTier.tier}, Setting quality: ${tier}`);
    
    setQualityTier(tier);
    setLoading(false);
    
    return tier;
  } catch (error) {
    console.error('Error detecting GPU:', error);
    setQualityTier('medium'); // Default to medium on error
    setLoading(false);
    return 'medium';
  }
}

/**
 * Monitor FPS and auto-adjust quality if needed
 */
export class FPSMonitor {
  private frames: number[] = [];
  private lastTime = 0;
  private isRunning = false;

  start() {
    if (!isClient) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stop() {
    this.isRunning = false;
  }

  private tick = () => {
    if (!this.isRunning || !isClient) return;

    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    const fps = 1000 / delta;
    this.frames.push(fps);

    // Keep last 60 frames
    if (this.frames.length > 60) {
      this.frames.shift();
    }

    // Check FPS every second
    if (this.frames.length === 60) {
      const avgFps = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
      this.checkPerformance(avgFps);
    }

    requestAnimationFrame(this.tick);
  };

  private checkPerformance(avgFps: number) {
    const { qualityTier, setQualityTier } = useQualityStore.getState();

    // Auto-downgrade if FPS is too low
    if (avgFps < 25 && qualityTier !== 'fallback') {
      const downgrade: Record<QualityTier, QualityTier> = {
        high: 'medium',
        medium: 'low',
        low: 'fallback',
        fallback: 'fallback',
      };
      
      console.log(`Low FPS detected (${avgFps.toFixed(1)}), downgrading to ${downgrade[qualityTier]}`);
      setQualityTier(downgrade[qualityTier]);
    }
  }

  getAverageFPS(): number {
    if (this.frames.length === 0) return 60;
    return this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
  }
}

