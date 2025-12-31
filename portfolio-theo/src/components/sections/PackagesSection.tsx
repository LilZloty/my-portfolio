'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const packages = [
  {
    name: 'Starter',
    price: '$1,500',
    description: 'Perfect for optimizing your existing store',
    features: [
      'Speed & Performance Audit',
      'UX/Conversion Review',
      'SEO Health Check',
      'Action Plan Report',
      '1 Week Turnaround',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$3,500',
    description: 'Complete custom Shopify store',
    features: [
      'Custom Shopify 2.0 Theme',
      'Mobile-First Design',
      'PageSpeed 90+',
      'SEO Optimized',
      'Conversion Focused',
      '2-3 Weeks Delivery',
    ],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$6,000+',
    description: 'Full-service store + AI automation',
    features: [
      'Everything in Professional',
      'AI SEO System Setup',
      'Bulk Product Optimization',
      'Content Generation Tools',
      'Custom Integrations',
      'Ongoing Support',
    ],
    cta: 'Contact Me',
    highlight: false,
  },
];

export default function PackagesSection() {
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
        const cards = cardsRef.current.querySelectorAll('.package-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
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

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="tag tag-lime mb-4 inline-block">Packages</span>
          <h2 className="heading-lg text-white mb-4">
            Choose Your Package
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto">
            Transparent pricing. No hidden fees. Pick what fits your needs.
          </p>
        </div>

        {/* Package Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`package-card glass-card p-6 flex flex-col ${
                pkg.highlight ? 'border-lime-neon ring-1 ring-lime-neon/20' : ''
              }`}
            >
              {pkg.highlight && (
                <span className="tag tag-lime text-[10px] mb-4 self-start">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-white mb-1">
                {pkg.name}
              </h3>
              <p className="text-3xl font-mono font-bold text-lime-neon mb-2">
                {pkg.price}
              </p>
              <p className="text-silver-500 text-sm mb-6">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-silver-300">
                    <svg className="w-4 h-4 text-lime-neon mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={pkg.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Custom Quote */}
        <div className="mt-10 text-center">
          <p className="text-silver-500 text-sm">
            Need something custom?{' '}
            <button
              onClick={scrollToContact}
              className="text-lime-neon hover:underline"
            >
              Let's talk
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
