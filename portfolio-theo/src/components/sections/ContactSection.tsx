'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/lib/store';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useScrollStore();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('contact');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
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

      // Form card animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Form fields stagger
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          fields,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Info cards animation
      if (infoRef.current) {
        const cards = infoRef.current.children;
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Animate button
    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      gsap.to(button, { scale: 0.95, duration: 0.1 });
    }
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (button) {
      gsap.to(button, { scale: 1, duration: 0.2, ease: 'back.out(1.7)' });
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', project: '', message: '' });

    // Success animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { scale: 1 },
        { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-container relative py-32"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-lime-neon/5 via-transparent to-transparent opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="text-lime-neon text-sm font-semibold tracking-wider uppercase mb-4 block opacity-0">
            Get In Touch
          </span>
          <h2 className="heading-lg mb-6 opacity-0">
            Ready to Stop{' '}
            <span className="gradient-text">Leaving Money on the Table?</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto opacity-0">
            Tell me about your store and what's not working. I'll get back to you within 24 hours with an honest take on whether I can help.
          </p>
        </div>

        {/* Contact Card */}
        <div ref={formRef} className="glass-card p-8 md:p-12 opacity-0">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-6 text-lime-neon font-bold font-mono">SENT</div>
              <h3 className="heading-md text-lime-neon mb-4">Got It!</h3>
              <p className="text-gray-brand mb-8">
                Thanks for reaching out. I'll get back to you within 24 hours - pinky promise.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-field opacity-0">
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-dark border border-gray-brand/20 rounded-lg
                             text-white placeholder-gray-brand focus:outline-none focus:border-lime-neon
                             focus:shadow-lime-glow transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-field opacity-0">
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-dark border border-gray-brand/20 rounded-lg
                             text-white placeholder-gray-brand focus:outline-none focus:border-lime-neon
                             focus:shadow-lime-glow transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-field opacity-0">
                <label htmlFor="project" className="block text-sm font-medium text-white mb-2">
                  Project Type
                </label>
                <select
                  id="project"
                  name="project"
                  value={formState.project}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-dark border border-gray-brand/20 rounded-lg
                           text-white focus:outline-none focus:border-lime-neon
                           focus:shadow-lime-glow transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a project type</option>
                  <option value="new-store">New Shopify Store</option>
                  <option value="redesign">Store Redesign</option>
                  <option value="custom-theme">Custom Theme Development</option>
                  <option value="optimization">Speed/CRO Optimization</option>
                  <option value="ai-integration">AI Integration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-field opacity-0">
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Tell Me About Your Project
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-dark border border-gray-brand/20 rounded-lg
                           text-white placeholder-gray-brand focus:outline-none focus:border-lime-neon
                           focus:shadow-lime-glow transition-all resize-none"
                  placeholder="Describe your project, goals, and timeline..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-base disabled:opacity-50 disabled:cursor-not-allowed
                         hover:shadow-lime-glow-lg active:scale-95 transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Quick Contact Info */}
        <div ref={infoRef} className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="glass-card p-6 hover:shadow-lime-glow transition-shadow opacity-0">
            <div className="text-2xl mb-2 text-lime-neon font-mono">@</div>
            <p className="text-sm text-gray-brand">Email</p>
            <a href="mailto:theo@example.com" className="text-lime-neon hover:underline">
              theo@example.com
            </a>
          </div>
          <div className="glass-card p-6 hover:shadow-lime-glow transition-shadow opacity-0">
            <div className="text-2xl mb-2 text-lime-neon font-mono">24h</div>
            <p className="text-sm text-gray-brand">Response Time</p>
            <p className="text-white font-medium">Within 24 hours</p>
          </div>
          <div className="glass-card p-6 hover:shadow-lime-glow transition-shadow opacity-0">
            <div className="text-2xl mb-2 text-lime-neon font-mono">GMT</div>
            <p className="text-sm text-gray-brand">Availability</p>
            <p className="text-white font-medium">Worldwide Remote</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://github.com/LilZloty"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-3 text-silver-400 hover:text-lime-neon hover:border-lime-neon transition-all"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/theodaudebourg"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-3 text-silver-400 hover:text-lime-neon hover:border-lime-neon transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/theodaudebourg"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-3 text-silver-400 hover:text-lime-neon hover:border-lime-neon transition-all"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
