import { getProjects } from '@/lib/db/projects';
import { ProjectCard } from '@/components/project-card';
import { CursorGlow } from '@/components/cursor-glow';
import { GrainOverlay } from '@/components/grain-overlay';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <CursorGlow />
      <GrainOverlay />
      <Navigation />

      <main className="relative bg-background text-foreground min-h-screen py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Projects</h1>
            <p className="text-sm text-muted-foreground mt-2">All projects and case studies.</p>
          </div>

          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  title={p.title}
                  description={p.description}
                  tags={p.technologies}
                  image={p.image_url}
                  link={`/projects/${p.id}`}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-neutral-500">No projects found.</div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
