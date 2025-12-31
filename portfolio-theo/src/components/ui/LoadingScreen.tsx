'use client';

import { useEffect, useState } from 'react';
import { useQualityStore } from '@/lib/store';
import { detectAndSetQuality } from '@/lib/quality';

export default function LoadingScreen() {
  const { isLoading, loadingProgress, setLoading, setLoadingProgress } = useQualityStore();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Detect GPU and set quality tier
    detectAndSetQuality();

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Fade out after loading complete
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => setShowLoader(false), 500);
        }, 300);
      }
      setLoadingProgress(progress);
    }, 100);

    return () => clearInterval(interval);
  }, [setLoading, setLoadingProgress]);

  if (!showLoader) return null;

  return (
    <div
      className={`loading-screen transition-opacity duration-500 ${
        !isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo / Name */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-white">THEO</span>
          <span className="text-lime-neon">.</span>
        </h1>
      </div>

      {/* Loading Bar */}
      <div className="loading-bar">
        <div
          className="loading-bar-fill transition-all duration-100"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-gray-brand text-sm">
        {loadingProgress < 30 && 'Initializing...'}
        {loadingProgress >= 30 && loadingProgress < 60 && 'Loading assets...'}
        {loadingProgress >= 60 && loadingProgress < 90 && 'Preparing experience...'}
        {loadingProgress >= 90 && 'Almost ready...'}
      </p>

      {/* Quality Indicator */}
      <p className="mt-2 text-xs text-gray-brand/50">
        Detecting optimal quality...
      </p>
    </div>
  );
}
