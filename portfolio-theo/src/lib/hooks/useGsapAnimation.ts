'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once at module level (more efficient than per-component)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  scrollTrigger?: {
    start?: string;
    end?: string;
    toggleActions?: string;
  };
}

interface UseGsapAnimationOptions {
  /** Selector for child elements to animate (optional) */
  childSelector?: string;
  /** Animation configuration */
  animation: AnimationConfig;
  /** Dependencies that should trigger re-animation */
  deps?: unknown[];
}

/**
 * Custom hook for GSAP scroll-triggered animations.
 * Follows frontend best practices for animation encapsulation.
 * 
 * @param ref - React ref to the container element
 * @param options - Animation configuration options
 */
export function useGsapScrollAnimation<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseGsapAnimationOptions
): void {
  const { childSelector, animation, deps = [] } = options;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const target = childSelector
        ? ref.current?.querySelectorAll(childSelector)
        : ref.current;

      if (!target) return;

      gsap.fromTo(target, animation.from, {
        ...animation.to,
        scrollTrigger: {
          trigger: ref.current,
          start: animation.scrollTrigger?.start ?? 'top 80%',
          end: animation.scrollTrigger?.end,
          toggleActions: animation.scrollTrigger?.toggleActions ?? 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, childSelector, ...deps]);
}

/**
 * Predefined animation presets following UI best practices
 */
export const ANIMATION_PRESETS = {
  fadeInUp: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
  },
  fadeInScale: {
    from: { y: 20, opacity: 0, scale: 0.9 },
    to: { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
  },
  slideInLeft: {
    from: { x: -30, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
  },
  cardReveal: {
    from: { y: 80, opacity: 0, rotateX: 15 },
    to: { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
  },
} as const;

export default useGsapScrollAnimation;
