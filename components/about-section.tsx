'use client';

import { CinematicText } from './cinematic-text';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Skill } from '@/lib/db/skills';

interface AboutSectionProps {
  skills: Skill[];
}

export function AboutSection({ skills }: AboutSectionProps) {
  if (skills.length === 0) {
    return null;
  }

  const ref = useScrollAnimation();

  return (
    <section id="expertise" className="relative bg-background py-24 lg:py-32 overflow-hidden border-t border-muted/20">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full blur-3xl opacity-5" 
          style={{ background: 'radial-gradient(circle, rgba(214, 158, 67, 0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <div className="h-16 lg:h-20 mb-6">
            <CinematicText
              text="EXPERTISE"
              className="text-4xl lg:text-5xl font-light tracking-wider text-foreground"
              delay={0}
            />
          </div>
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            With over 5 years of experience in full-stack development, I specialize in creating premium digital experiences that combine technical excellence with cinematic design aesthetics. Every project is approached with meticulous attention to performance, user experience, and visual polish.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {skills.map((skillGroup, index) => (
            <div
              key={skillGroup.id}
              className="space-y-4 p-6 lg:p-8 rounded-lg border border-muted/20 bg-card/30 backdrop-blur-sm hover:border-accent/30 hover:bg-card/50 transition-all duration-300"
              style={{
                animation: 'slide-in-up 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <h3 className="text-lg font-light tracking-wide text-accent">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.skills.map((skill, idx) => (
                  <li key={`${skill}-${idx}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                    • {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
