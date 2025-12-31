'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const problems = [
  {
    icon: '01',
    title: 'Your Store is Slow. Like, Really Slow.',
    description: "3 seconds. That's how long visitors wait before they bail. Your products never even get a chance. Every extra second costs you 7% in sales - do the math.",
  },
  {
    icon: '02',
    title: "Google Doesn't Know You Exist",
    description: "Page 5? More like page 50. Meanwhile, your competitors are soaking up all that sweet organic traffic you should be getting. It's not personal - it's just bad SEO.",
  },
  {
    icon: '03',
    title: "You're Doing SEO by Hand (Oof)",
    description: "Manually updating 500 product descriptions? 1,000? That's not a strategy - that's a prison sentence. There's gotta be a smarter way. (Spoiler: there is.)",
  },
  {
    icon: '04',
    title: "Traffic's Fine. Sales? Not So Much.",
    description: "You're getting visitors. They're just... leaving. Something's off - confusing checkout, slow pages, bad mobile UX. Whatever it is, it's costing you real money.",
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.problem-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="tag tag-lime mb-4 inline-block">Look Familiar?</span>
          <h2 className="heading-lg text-white mb-4">
            Is This Your Store Right Now?
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto">
            These problems cost Shopify stores thousands every month. And yeah, they're more common than you'd think.
          </p>
        </div>

        {/* Problem Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="problem-card glass-card p-6 hover:border-lime-neon transition-all"
            >
              <span className="text-2xl font-mono font-bold text-lime-neon mb-4 block">{problem.icon}</span>
              <h3 className="text-lg font-semibold text-white mb-2">
                {problem.title}
              </h3>
              <p className="text-silver-400 text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transition to Solution */}
        <div className="text-center glass-card p-6">
          <p className="text-silver-300 mb-4">
            Here's the good news: <span className="text-lime-neon font-semibold">every single one of these is fixable.</span>
          </p>
          <button onClick={scrollToServices} className="btn-primary">
            Show Me How to Fix This
          </button>
        </div>
      </div>
    </section>
  );
}
