'use client';

import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  threshold?: number;
  markers?: boolean;
}

export function useScrollAnimation(options?: UseScrollAnimationOptions): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          markers: options?.markers || false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options?.markers]);

  return ref;
}
