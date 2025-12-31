'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/lib/store';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: 'Shopify Theme Development',
    description: 'Custom Shopify 2.0 themes built from scratch. Clean code, blazing fast, conversion-optimized.',
    tags: ['Custom Themes', 'Shopify 2.0', 'Liquid', 'Speed Optimized'],
  },
  {
    title: 'AI Systems & Automation',
    description: 'Building intelligent tools that automate e-commerce operations. SEO at scale, content generation.',
    tags: ['AI-Powered SEO', 'Content Generation', 'Bulk Operations', 'LLM Integration'],
  },
  {
    title: 'CRO & Optimization',
    description: 'Data-driven conversion rate optimization. A/B testing, speed audits, UX improvements.',
    tags: ['+40% Avg Conversion', 'A/B Testing', 'Speed Audits', 'UX Analysis'],
  },
  {
    title: 'Brand Design & Visuals',
    description: 'AI-powered design for your online presence. Social media content, marketing visuals.',
    tags: ['AI Image Generation', 'Social Content', 'Brand Identity', 'Marketing'],
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useScrollStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('about');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll('.service-item');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container relative py-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="tag tag-lime mb-4 inline-block">About</span>
          <h2 className="heading-lg text-white mb-4">
            What I Do Every Day
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto">
            From custom Shopify stores to AI automation. 
            I help brands build, optimize, and scale online.
          </p>
        </div>

        {/* Services - 2x2 */}
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-item glass-card p-6 hover:border-lime-neon transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-silver-500 text-sm mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="tag text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current Project */}
        <div className="glass-card p-6 border-lime-neon mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-lime-neon"></span>
            <span className="text-lime-neon text-xs font-mono uppercase">Currently Building</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Transmisiones Veinte07</h4>
              <p className="text-silver-500 text-sm">
                AI-powered SEO management system for 4,500+ automotive transmission products.
              </p>
            </div>
            <div className="flex justify-start md:justify-end gap-8">
              <div>
                <p className="text-xl font-mono font-bold text-lime-neon">4,500+</p>
                <p className="text-[10px] text-silver-500 uppercase">Products</p>
              </div>
              <div>
                <p className="text-xl font-mono font-bold text-white">AI</p>
                <p className="text-[10px] text-silver-500 uppercase">SEO System</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="glass-card p-5 text-center">
            <span className="text-2xl font-mono font-bold text-lime-neon block">70+</span>
            <span className="text-silver-500 text-xs uppercase">Stores Built</span>
          </div>
          <div className="glass-card p-5 text-center">
            <span className="text-2xl font-mono font-bold text-white block">7+</span>
            <span className="text-silver-500 text-xs uppercase">Years</span>
          </div>
          <div className="glass-card p-5 text-center">
            <span className="text-2xl font-mono font-bold text-white block">$2M+</span>
            <span className="text-silver-500 text-xs uppercase">Revenue</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={scrollToContact} className="btn-primary">
            Let's Work Together
          </button>
        </div>
      </div>
    </section>
  );
}
