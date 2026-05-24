'use client';

import Link from 'next/link';
import { ProjectCard } from './project-card';
import { Project } from '@/lib/db/projects';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0c0b09' }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(214,158,46,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(180,120,20,0.05) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* ── Section Header ── */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#d69e2e' }}>
              MY WORK
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group"
            style={{ color: '#d69e2e' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '10px'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '8px'; }}
          >
            View All Projects
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* ── Projects Grid ── */}
        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* Mobile: View All button */}
            <div className="mt-10 flex justify-center sm:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #92590a, #b7791f)',
                  color: '#fff',
                }}
              >
                View All Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: 'rgba(214,158,46,0.08)', color: '#d69e2e' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <p className="text-neutral-500 text-sm">No projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}