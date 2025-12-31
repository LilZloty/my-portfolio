'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tiers = [
  { id: 'starter', label: 'Starter', description: 'Getting started' },
  { id: 'growth', label: 'Growth', description: 'Ready to scale' },
  { id: 'scale', label: 'Scale', description: 'Going all in' },
];

const services = {
  starter: [
    {
      icon: '01',
      title: 'Quick Wins Audit',
      tagline: 'Know exactly what to fix first.',
      price: '$197',
      timeline: '2-3 days',
      description: "Full diagnosis of your store's speed, UX, and conversion blockers. You'll know what's holding you back - and how to fix it.",
      features: [
        'Full PageSpeed analysis',
        'Top 5 speed issues (prioritized)',
        'UX friction audit',
        'Mobile experience review',
        '45-min video walkthrough',
        'Action plan with priorities',
      ],
      promise: "This is the first half of my Speed Sprint - just the diagnosis. Fix it yourself or hire me to do it.",
      highlight: false,
    },
    {
      icon: '02',
      title: 'Product SEO Sprint',
      tagline: 'SEO that actually ranks.',
      price: '$297',
      priceNote: 'up to 50 products',
      timeline: '3-4 days',
      description: "I optimize your product pages for the keywords people actually search. Titles, metas, alt text, schema - the works.",
      features: [
        'Title optimization (50 products)',
        'Meta descriptions (click-worthy)',
        'Alt text for all images',
        'Collection page SEO',
        'Schema markup setup',
        'Competitor keyword analysis',
      ],
      promise: "Every product gets reviewed by me. Not batch-processed. Not AI slop.",
      highlight: false,
    },
    {
      icon: '03',
      title: 'Launch Ready Pack',
      tagline: 'Zero to selling in 7 days.',
      price: '$497',
      timeline: '5-7 days',
      description: "Premium theme setup, custom logo, brand identity, and everything you need to start selling. Not a template dump - designed for your business.",
      features: [
        'Premium theme setup (Prestige, Impulse, etc.)',
        'Custom logo (3 concepts, 2 revisions)',
        'Color system + typography',
        'Homepage layout customization',
        '5 essential pages setup',
        'Basic speed optimization',
        '30-min strategy call',
      ],
      promise: "I've done this 50+ times. What takes most people weeks, I do in days.",
      highlight: true,
    },
  ],
  growth: [
    {
      icon: '01',
      title: 'Speed Sprint',
      tagline: 'Hit 90+ PageSpeed. In 7 Days.',
      price: '$1,000 - $2,000',
      timeline: '1-2 weeks',
      description: "I'll dig into your store, find everything that's slowing it down, and actually fix it. No reports that collect dust - real changes, real results.",
      features: [
        'Full speed audit with PDF report',
        'Image optimization & lazy loading',
        'App bloat analysis (and removal)',
        'Theme code cleanup',
        'Before/after PageSpeed proof',
      ],
      promise: "I'll be upfront about what's realistic for your store. No BS guarantees.",
      highlight: false,
    },
    {
      icon: '02',
      title: 'Conversion Accelerator',
      tagline: 'More Visitors. More Sales.',
      price: '$2,500 - $5,000',
      timeline: '3-4 weeks',
      description: "Data-driven CRO. I look at what your users actually do, find where they drop off, and fix it. No guessing - just numbers.",
      features: [
        'Heatmap & user behavior analysis',
        'Speed optimization (if needed)',
        'UX improvements based on data',
        'Checkout friction removal',
        'A/B test setup',
        '30-day results check-in',
      ],
      promise: "Results depend on your traffic and product. I'll tell you upfront if CRO makes sense for you.",
      highlight: true,
    },
  ],
  scale: [
    {
      icon: '01',
      title: 'AI SEO System',
      tagline: 'SEO That Runs Itself.',
      price: '$3,000 - $8,000',
      timeline: '2-6 weeks',
      description: "I build you a custom AI system that handles the boring SEO stuff - bulk meta tags, product descriptions, schema markup. You focus on selling.",
      features: [
        'AI pipeline setup (Claude/GPT)',
        'Bulk product meta optimization',
        'Auto-generated descriptions',
        'Schema markup implementation',
        'Training & full system handoff',
      ],
      promise: "AI saves time on repetitive tasks. I build systems that work, not black boxes you can't understand.",
      highlight: true,
    },
    {
      icon: '02',
      title: 'Custom Development',
      tagline: 'Built exactly how you need it.',
      price: 'From $5,000',
      timeline: 'Varies',
      description: "Custom Shopify development for stores that have outgrown off-the-shelf solutions. Apps, integrations, complex features.",
      features: [
        'Custom theme development',
        'Private Shopify apps',
        'Third-party integrations',
        'Complex Liquid customizations',
        'Ongoing support available',
      ],
      promise: "We'll scope it together. No surprises, no hidden costs.",
      highlight: false,
    },
  ],
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState<'starter' | 'growth' | 'scale'>('starter');

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
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.service-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [activeTier]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentServices = services[activeTier];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <span className="tag tag-lime mb-4 inline-block">Services</span>
          <h2 className="heading-lg text-white mb-4">
            Pick Your Starting Point
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto">
            Fixed pricing. Clear timelines. No surprises. Start where it makes sense.
          </p>
        </div>

        {/* Tier Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id as 'starter' | 'growth' | 'scale')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTier === tier.id
                  ? 'bg-lime-neon text-black'
                  : 'glass-card text-silver-400 hover:text-white hover:border-lime-neon/30'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div 
          ref={cardsRef} 
          className={`grid gap-6 ${
            currentServices.length === 2 
              ? 'grid-cols-1 lg:grid-cols-2 max-w-3xl mx-auto' 
              : 'grid-cols-1 lg:grid-cols-3'
          }`}
        >
          {currentServices.map((service) => (
            <div
              key={service.title}
              className={`service-card glass-card p-6 flex flex-col ${
                service.highlight ? 'border-lime-neon ring-1 ring-lime-neon/20' : ''
              }`}
            >
              {service.highlight && (
                <span className="tag tag-lime text-[10px] mb-4 self-start">
                  Most Popular
                </span>
              )}

              <span className="text-3xl mb-3">{service.icon}</span>
              
              <h3 className="text-xl font-semibold text-white mb-1">
                {service.title}
              </h3>
              <p className="text-lime-neon font-medium text-sm mb-3">
                {service.tagline}
              </p>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-mono font-bold text-white">
                  {service.price}
                </span>
                <span className="text-silver-500 text-xs">
                  · {service.timeline}
                </span>
              </div>
              {'priceNote' in service && (
                <p className="text-silver-500 text-xs -mt-3 mb-3">
                  {service.priceNote}
                </p>
              )}

              <p className="text-silver-400 text-sm mb-4">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6 flex-grow">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-silver-300">
                    <svg className="w-4 h-4 text-lime-neon mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-silver-500 text-xs italic mb-4 border-t border-silver-800 pt-4">
                "{service.promise}"
              </p>

              <button
                onClick={scrollToContact}
                className={service.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Custom Quote */}
        <div className="mt-10 text-center">
          <p className="text-silver-500 text-sm">
            Not sure where to start?{' '}
            <button
              onClick={scrollToContact}
              className="text-lime-neon hover:underline"
            >
              Let's figure it out together
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
