'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/lib/store';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    title: 'Shopify Stack',
    skills: ['Liquid', 'Shopify 2.0', 'Dawn', 'Shopify Plus', 'Checkout Extensions', 'Metafields'],
    highlight: true,
  },
  {
    title: 'Frontend',
    skills: ['JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    highlight: false,
  },
  {
    title: 'AI & Automation',
    skills: ['OpenAI API', 'LangChain', 'Midjourney', 'DALL-E', 'Bulk Processing', 'SEO Tools'],
    highlight: false,
  },
  {
    title: 'Design & CRO',
    skills: ['Figma', 'UI/UX', 'A/B Testing', 'Analytics', 'PageSpeed', 'Conversion'],
    highlight: false,
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useScrollStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('skills');
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

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.skill-card');
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
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="tag tag-lime mb-4 inline-block">Skills</span>
          <h2 className="heading-lg text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto">
            Tools and technologies I use to build high-performance e-commerce.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className={`skill-card glass-card p-6 ${category.highlight ? 'border-lime-neon' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                {category.highlight && (
                  <span className="tag tag-lime text-[10px]">Primary</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`tag text-[10px] ${category.highlight ? 'tag-lime' : ''}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
