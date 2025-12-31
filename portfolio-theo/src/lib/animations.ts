'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Only register on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Custom hook for GSAP animations with proper cleanup
 */
export function useGSAP(
  callback: (gsap: typeof import('gsap').default) => void,
  deps: React.DependencyList = []
) {
  const ctx = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      callback(gsap);
    });

    return () => {
      ctx.current?.revert();
    };
  }, deps);

  return ctx;
}

/**
 * Fade in from bottom animation
 */
export function fadeInUp(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    y?: number;
    scrollTrigger?: ScrollTrigger.Vars | string;
  } = {}
) {
  const { duration = 0.8, delay = 0, y = 50, scrollTrigger } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: scrollTrigger
        ? {
            trigger: element as gsap.DOMTarget,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...(typeof scrollTrigger === 'object' ? scrollTrigger : {}),
          }
        : undefined,
    }
  );
}

/**
 * Fade in from left animation
 */
export function fadeInLeft(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    x?: number;
    scrollTrigger?: boolean;
  } = {}
) {
  const { duration = 0.8, delay = 0, x = -50, scrollTrigger = true } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: scrollTrigger
        ? {
            trigger: element as gsap.DOMTarget,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        : undefined,
    }
  );
}

/**
 * Fade in from right animation
 */
export function fadeInRight(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    x?: number;
    scrollTrigger?: boolean;
  } = {}
) {
  const { duration = 0.8, delay = 0, x = 50, scrollTrigger = true } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: scrollTrigger
        ? {
            trigger: element as gsap.DOMTarget,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        : undefined,
    }
  );
}

/**
 * Scale in animation
 */
export function scaleIn(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    scale?: number;
    scrollTrigger?: boolean;
  } = {}
) {
  const { duration = 0.6, delay = 0, scale = 0.8, scrollTrigger = true } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'back.out(1.7)',
      scrollTrigger: scrollTrigger
        ? {
            trigger: element as gsap.DOMTarget,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        : undefined,
    }
  );
}

/**
 * Stagger animation for multiple elements
 */
export function staggerFadeInUp(
  elements: gsap.TweenTarget,
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    scrollTrigger?: gsap.DOMTarget;
  } = {}
) {
  const { duration = 0.6, stagger = 0.1, y = 30, scrollTrigger } = options;

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: scrollTrigger
        ? {
            trigger: scrollTrigger,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        : undefined,
    }
  );
}

/**
 * Text reveal animation (character by character)
 */
export function textReveal(
  element: HTMLElement,
  options: {
    duration?: number;
    stagger?: number;
    scrollTrigger?: boolean;
  } = {}
) {
  const { duration = 0.05, stagger = 0.03, scrollTrigger = true } = options;

  // Split text into spans
  const text = element.textContent || '';
  element.innerHTML = text
    .split('')
    .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  const chars = element.querySelectorAll('.char');

  return gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: scrollTrigger
        ? {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        : undefined,
    }
  );
}

/**
 * Counter animation for statistics
 */
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  options: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    scrollTrigger?: boolean;
  } = {}
) {
  const { duration = 2, prefix = '', suffix = '', scrollTrigger = true } = options;

  const counter = { value: 0 };

  return gsap.to(counter, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
    },
    scrollTrigger: scrollTrigger
      ? {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      : undefined,
  });
}

/**
 * Parallax scroll effect
 */
export function parallax(
  element: gsap.TweenTarget,
  options: {
    speed?: number;
    direction?: 'up' | 'down';
  } = {}
) {
  const { speed = 0.5, direction = 'up' } = options;
  const yPercent = direction === 'up' ? -100 * speed : 100 * speed;

  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Magnetic hover effect for buttons
 */
export function magneticHover(element: HTMLElement, strength: number = 0.3) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}
