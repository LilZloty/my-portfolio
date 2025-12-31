'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useScrollStore } from '@/lib/store';

type SectionId = 'hero' | 'services' | 'about' | 'skills' | 'projects' | 'contact';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Custom hook for observing section visibility and updating active section state.
 * Follows React patterns best practice for extracting repeated logic.
 * 
 * @param sectionId - The ID of the section to track
 * @param options - IntersectionObserver options
 * @returns ref to attach to the section element
 */
export function useSectionObserver<T extends HTMLElement = HTMLElement>(
  sectionId: SectionId,
  options: UseIntersectionObserverOptions = {}
): RefObject<T> {
  const { threshold = 0.3, rootMargin = '0px' } = options;
  const sectionRef = useRef<T>(null);
  const { setActiveSection } = useScrollStore();

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [sectionId, threshold, rootMargin, setActiveSection]);

  return sectionRef as RefObject<T>;
}

export default useSectionObserver;
