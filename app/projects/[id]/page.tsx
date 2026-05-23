import { getProjectById } from '@/lib/db/projects';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CursorGlow } from '@/components/cursor-glow';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: any }) {
  try {
    const resolved = await params;
    const project = await getProjectById(resolved.id);
    return {
      title: `${project.title} | Project`,
      description: project.long_description || project.description,
    };
  } catch {
    return { title: 'Project not found' };
  }
}

export default async function ProjectPage({ params }: { params: any }) {
  let project;
  try {
    const resolved = await params;
    project = await getProjectById(resolved.id);
  } catch {
    notFound();
  }

  return (
    <>
      <CursorGlow />
      <Navigation />
      <main className="bg-background text-foreground min-h-screen">
        <article className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <Link
            href="/"
            className="text-accent hover:text-accent/80 text-sm font-light mb-8 inline-block"
          >
            ← Back to home
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-light text-foreground mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {project.created_at && new Date(project.created_at).toLocaleDateString()}
            </p>
          </header>

          {project.image_url && (
            <div className="mb-12 h-96 rounded-lg overflow-hidden">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <p className="text-base lg:text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {project.long_description && (
              <div className="pt-6">
                <h2 className="text-2xl font-light mb-4">Details</h2>
                <div className="text-muted-foreground">
                  {project.long_description.split('\n\n').map((para: string, i: number) => (
                    <p key={i} className="mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div className="pt-6">
                <h3 className="text-lg font-medium mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t: string) => (
                    <span key={t} className="px-3 py-1 rounded-full border border-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 flex gap-4">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded bg-accent text-background"
                >
                  View Live
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded border border-muted text-muted-foreground"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
