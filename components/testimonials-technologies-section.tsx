import { SlidingTestimonial } from '@/components/ui/sliding-testimonial';
import { TechnologiesSection } from '@/components/technologies-section';
import { Skill } from '@/lib/db/skills';
import { Testimonial } from '@/lib/db/testimonials';

interface TestimonialsTechnologiesSectionProps {
  testimonials?: Testimonial[];
  skills?: Skill[];
}

export function TestimonialsTechnologiesSection({ testimonials, skills }: TestimonialsTechnologiesSectionProps) {
  const visibleTestimonials = testimonials ?? [];
  const visibleSkills = skills ?? [];

  const hasTestimonials = visibleTestimonials.length > 0;
  const hasSkills = visibleSkills.length > 0;

  if (!hasTestimonials && !hasSkills) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16">
      <div className={`grid grid-cols-1 ${hasTestimonials && hasSkills ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-10 items-start`}>
        {hasTestimonials && <SlidingTestimonial testimonials={visibleTestimonials} />}
        {hasSkills && <TechnologiesSection embedded skills={visibleSkills} />}
      </div>
    </div>
  );
}
