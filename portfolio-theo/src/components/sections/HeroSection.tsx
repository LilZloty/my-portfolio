'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollStore } from '@/lib/store';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useScrollStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('hero');
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          elements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProblem = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-8"
    >
      <div ref={contentRef} className="max-w-5xl mx-auto w-full text-center">
        {/* Profile Photo */}
        <div className="animate-in mb-6">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-silver-700 hover:border-lime-neon transition-colors">
            <img 
              src="/images/newpfp.jpg" 
              alt="Theo Daudebourg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Trust Line */}
        <div className="animate-in mb-10">
          <p className="text-silver-500 text-sm font-mono">
            7 years · 70+ stores · Honest about what works
          </p>
        </div>

        {/* Headline - Single Impactful Statement */}
        <h1 className="animate-in heading-xl text-white mb-3">
          YOUR SHOPIFY STORE IS
        </h1>
        <h2 className="animate-in heading-xl text-lime-neon mb-12">
          BLEEDING MONEY
        </h2>

        {/* Single Value Prop */}
        <p className="animate-in text-silver-300 text-lg max-w-xl mx-auto mb-10">
          I fix slow pages, broken conversions, and invisible SEO - with AI-powered systems that actually work.
        </p>

        {/* CTAs */}
        <div className="animate-in flex flex-wrap justify-center gap-4 mb-16">
          <button onClick={scrollToContact} className="btn-primary">
            Get My Free Store Audit
          </button>
          <button onClick={scrollToProblem} className="btn-secondary">
            See Common Problems
          </button>
        </div>

        {/* Stats - Cleaner */}
        <div className="animate-in flex justify-center items-center gap-12 text-center">
          <div>
            <p className="text-2xl font-mono font-bold text-lime-neon">90+</p>
            <p className="text-xs text-silver-500 uppercase tracking-wider">PageSpeed</p>
          </div>
          <div className="w-px h-8 bg-silver-800" />
          <div>
            <p className="text-2xl font-mono font-bold text-white">+30%</p>
            <p className="text-xs text-silver-500 uppercase tracking-wider">Conversions</p>
          </div>
          <div className="w-px h-8 bg-silver-800" />
          <div>
            <p className="text-2xl font-mono font-bold text-white">AI</p>
            <p className="text-xs text-silver-500 uppercase tracking-wider">Powered</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button onClick={scrollToProblem} className="text-silver-600 hover:text-lime-neon transition-colors">
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
