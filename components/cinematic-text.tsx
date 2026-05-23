'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CinematicTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function CinematicText({ text, className = '', delay = 0 }: CinematicTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const splitText = text.split('');
    ref.current.innerHTML = '';

    splitText.forEach((char) => {
      const span = document.createElement('span');
      // ensure spaces render with visible gap
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      ref.current?.appendChild(span);
    });

    gsap.fromTo(
      ref.current.querySelectorAll('span'),
      {
        opacity: 0,
        x: -10,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.08,
        stagger: 0.02,
        delay: delay,
        ease: 'back.out(1.7)',
      }
    );
  }, [text, delay]);

  return <div ref={ref} className={className} />;
}
