import { CursorGlow } from '@/components/cursor-glow';
import { GrainOverlay } from '@/components/grain-overlay';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { getProjects } from '@/lib/db/projects';
import { getSkills } from '@/lib/db/skills';

export default async function Page() {
  const [projects, skills] = await Promise.all([
    getProjects(),
    getSkills(),
  ]);

  return (
    <>
      <CursorGlow />
      <GrainOverlay />
      <Navigation />
      <main className="relative bg-background text-foreground">
        <HeroSection />
        {projects && projects.length > 0 && <ProjectsSection projects={projects} />}
        {skills && skills.length > 0 && <AboutSection skills={skills} />}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

