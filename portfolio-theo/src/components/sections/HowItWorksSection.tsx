'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: '01',
    title: 'Book a Call (15 min)',
    description: "Tell me about your store, your goals, and what's not working. I'll be honest about whether I can actually help - no hard sell, I promise.",
  },
  {
    number: '02',
    title: 'Get a Real Plan',
    description: "I dig into your store and give you an honest assessment. What's fixable. What's realistic. What'll actually move the needle.",
  },
  {
    number: '03',
    title: 'Watch the Numbers Climb',
    description: "I get to work. You see results. PageSpeed goes up, load times go down, rankings improve. Simple as that.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll('.step-card');
        gsap.fromTo(
          steps,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
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
      id="how"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="tag tag-lime mb-4 inline-block">Process</span>
          <h2 className="heading-lg text-white mb-4">
            Here's How We Work Together
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto">
            Simple process. No surprises. You'll know exactly what's happening at every step.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-silver-800 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="step-card text-center h-full">
                <div className="glass-card p-6 h-full flex flex-col">
                  <span className="text-2xl font-mono font-bold text-lime-neon block mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-silver-400 text-sm flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button onClick={scrollToContact} className="btn-primary">
            Let's Start With Step 1
          </button>
        </div>
      </div>
    </section>
  );
}
