import { CursorGlow } from '@/components/cursor-glow';
import { GrainOverlay } from '@/components/grain-overlay';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { AboutSection } from '@/components/about-section';
import ContactSections from '@/components/ui/contact-sections';
import { TestimonialsTechnologiesSection } from '@/components/testimonials-technologies-section';
import { getProjects } from '@/lib/db/projects';
import { getSkills } from '@/lib/db/skills';
import { getTestimonials } from '@/lib/db/testimonials';

function getExperienceYears(startYear = 2023) {
  const now = new Date();
  return Math.max(1, now.getFullYear() - startYear);
}

export default async function Page() {
  const [projects, skills, testimonials] = await Promise.all([
    getProjects(),
    getSkills(),
    getTestimonials(),
  ]);

  const stats = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      label: 'Projects Completed',
      value: `${projects.length}+`,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: 'Happy Clients',
      value: `${testimonials.length}+`,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      ),
      label: 'Years Experience',
      value: `${getExperienceYears(2023)}+`,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
      label: 'Technologies',
      value: `${skills.reduce((total, group) => total + group.skills.length, 0)}+`,
    },
  ];

  return (
    <>
      <CursorGlow />
      <GrainOverlay />
      <Navigation />
      <main className="relative bg-[#0c0b09] text-foreground">
        <HeroSection stats={stats} />
        {projects && projects.length > 0 && <ProjectsSection projects={projects} />}
        {skills && skills.length > 0 && <AboutSection skills={skills} />}
        <TestimonialsTechnologiesSection testimonials={testimonials ?? []} skills={skills ?? []} />
        <ContactSections />
      </main>
      <Footer />
    </>
  );
}
