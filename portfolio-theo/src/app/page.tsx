'use client';

import { Suspense, lazy } from 'react';
import { useQualityStore } from '@/lib/store';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';

const Scene3D = lazy(() => import('@/components/canvas/Scene3D'));

export default function Home() {
  const { qualityTier, isLoading } = useQualityStore();
  const show3D = qualityTier !== 'fallback';

  return (
    <>
      {isLoading && <LoadingScreen />}

      {show3D && (
        <div className="canvas-container">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>
      )}

      <div className="content-layer">
        <Navigation />

        <main>
          {/* Conversion Funnel Flow */}
          <HeroSection />
          <ProblemSection />
          <ServicesSection />
          <SocialProofSection />
          <HowItWorksSection />
          <ProjectsSection />
          <BlogSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
