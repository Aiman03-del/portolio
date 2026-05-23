'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { CinematicText } from './cinematic-text';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const handleViewWork = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // fallback navigate to projects page
      window.location.href = '/#projects';
    }
  };

  const handleGetInTouch = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/#contact';
    }
  };

  useEffect(() => {
    if (!imageRef.current) return;

    // Image fade-in with subtle zoom
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-32 pb-16">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-10" 
          style={{ background: 'radial-gradient(circle, rgba(214, 158, 67, 0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/2 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-10" 
          style={{ background: 'radial-gradient(circle, rgba(214, 158, 67, 0.2) 0%, transparent 70%)' }} />
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="h-20 lg:h-24">
                <CinematicText
                  text="AIMAN UDDIN SIAM"
                  className="text-5xl lg:text-6xl font-light tracking-wider text-foreground"
                  delay={0.1}
                />
              </div>
              
              {/* Subtitle */}
              <div className="h-12">
                <CinematicText
                  text="Full Stack Developer"
                  className="text-lg lg:text-xl font-light tracking-wide text-accent"
                  delay={0.5}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg animate-slide-in-up" 
              style={{ animationDelay: '0.8s' }}>
              Crafting premium digital experiences with meticulous attention to detail. Specializing in full-stack development, modern architecture, and cinematic web design.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleViewWork}
                className="px-8 py-3 bg-accent text-background font-medium tracking-wide hover:bg-accent/90 transition-colors duration-300 rounded-sm"
                style={{ animation: 'slide-in-up 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards', animationDelay: '1.0s', opacity: 0 }}
              >
                View Work
              </button>
              <button
                onClick={handleGetInTouch}
                className="px-8 py-3 border border-muted text-foreground font-medium tracking-wide hover:bg-muted/5 transition-colors duration-300 rounded-sm"
                style={{ animation: 'slide-in-up 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards', animationDelay: '1.1s', opacity: 0 }}
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="relative h-full min-h-96 lg:min-h-full flex items-center justify-center"
          >
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-transparent rounded-lg blur-3xl -z-10" />
            
            <div className="relative w-full h-96 lg:h-full">
              {!imgError ? (
                <Image
                  src="/profile.png"
                  alt="Aiman Uddin Siam"
                  fill
                  onError={() => setImgError(true)}
                  className="object-cover object-center rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <img
                  src="/profile.png"
                  alt="Aiman Uddin Siam"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
