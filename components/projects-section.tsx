'use client';

import { ProjectCard } from './project-card';
import { CinematicText } from './cinematic-text';
import { Project } from '@/lib/db/projects';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative bg-background py-24 lg:py-32 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full blur-3xl opacity-5" 
          style={{ background: 'radial-gradient(circle, rgba(214, 158, 67, 0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <div className="h-16 lg:h-20 mb-6">
            <CinematicText
              text="FEATURED PROJECTS"
              className="text-4xl lg:text-5xl font-light tracking-wider text-foreground"
              delay={0}
            />
          </div>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A curated selection of recent projects showcasing full-stack expertise, meticulous design, and innovative solutions for premium clients.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.technologies}
              image={project.image_url}
              link={`/projects/${project.id}`}
              index={index}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
