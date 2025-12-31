'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const metrics = [
  { before: '45', after: '92', label: 'PageSpeed Score', suffix: '' },
  { before: '2.1%', after: '3.8%', label: 'Conversion Rate', suffix: '' },
  { before: '6.2s', after: '1.8s', label: 'Load Time', suffix: '' },
];

const testimonials = [
  {
    quote: "Our store went from 3-second load time to under 1.5. Sales jumped 28% that first month. Not gonna lie, I was skeptical - but the numbers don't lie.",
    author: "Sarah M.",
    role: "Luxury Fashion Brand",
  },
  {
    quote: "The AI SEO system saves us 40+ hours a month on product descriptions. Best investment we've made this year. By far.",
    author: "Marcus T.",
    role: "Auto Parts (4,500+ SKUs)",
  },
  {
    quote: "Finally - a dev who tells you what's realistic instead of overpromising and underdelivering. Refreshing, honestly.",
    author: "Leila K.",
    role: "Skincare DTC",
  },
];

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (metricsRef.current) {
        const cards = metricsRef.current.querySelectorAll('.metric-card');
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (testimonialsRef.current) {
        const cards = testimonialsRef.current.querySelectorAll('.testimonial-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsRef.current,
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
      id="proof"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="tag tag-lime mb-4 inline-block">The Receipts</span>
          <h2 className="heading-lg text-white mb-4">
            Real Stores. Real Numbers. No Fluff.
          </h2>
        </div>

        {/* Before/After Metrics */}
        <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-card glass-card p-6 text-center">
              <div className="flex justify-center items-center gap-4 mb-3">
                <div className="text-center">
                  <p className="text-silver-500 text-xs uppercase mb-1">Before</p>
                  <p className="text-2xl font-mono text-silver-400 line-through">{metric.before}</p>
                </div>
                <svg className="w-6 h-6 text-lime-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="text-center">
                  <p className="text-lime-neon text-xs uppercase mb-1">After</p>
                  <p className="text-2xl font-mono font-bold text-lime-neon">{metric.after}</p>
                </div>
              </div>
              <p className="text-silver-400 text-sm">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="testimonial-card glass-card p-6">
              <svg className="w-8 h-8 text-lime-neon/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-silver-400 text-sm mb-4 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-silver-800 pt-4">
                <p className="text-white font-medium text-sm">{testimonial.author}</p>
                <p className="text-silver-500 text-xs">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
