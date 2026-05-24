'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  index?: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  link,
  index = 0,
}: ProjectCardProps) {
  const ref = useScrollAnimation();

  const Card = (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-400 cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(214,158,46,0.08)',
        animation: `slide-in-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
        animationDelay: `${index * 0.12}s`,
        opacity: 0,
        transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-6px)';
        el.style.borderColor = 'rgba(214,158,46,0.28)';
        el.style.background = 'rgba(255,255,255,0.045)';
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(214,158,46,0.1)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'rgba(214,158,46,0.08)';
        el.style.background = 'rgba(255,255,255,0.025)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 20% 20%, rgba(214,158,46,0.06) 0%, transparent 65%)' }}
      />

      {/* ── Image / Mockup Preview ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '200px', background: 'rgba(255,255,255,0.03)' }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder mockup when no image */
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            {/* Fake browser bar */}
            <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5"
              style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,80,80,0.5)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,180,0,0.5)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(0,200,80,0.5)' }} />
              <div className="flex-1 mx-3 h-3.5 rounded-sm" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
            {/* Mockup content lines */}
            <div className="mt-4 w-full px-6 space-y-2">
              <div className="h-3 rounded w-3/4" style={{ background: 'rgba(214,158,46,0.15)' }} />
              <div className="h-2 rounded w-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <div className="h-2 rounded w-5/6" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <div className="h-2 rounded w-2/3" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <div className="mt-3 flex gap-2">
                <div className="h-6 w-20 rounded" style={{ background: 'rgba(214,158,46,0.2)' }} />
                <div className="h-6 w-16 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
            </div>
          </div>
        )}

        {/* Bottom image fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(12,11,9,0.9) 0%, transparent 100%)' }}
        />

        {/* Arrow icon top-right on hover */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'rgba(214,158,46,0.2)', backdropFilter: 'blur(8px)', color: '#d69e2e' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="relative z-10 flex flex-col flex-1 p-5">
        {/* Title */}
        <h3
          className="text-base font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-yellow-400"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: '#6b7280' }}>
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors duration-300"
              style={{
                background: 'rgba(214,158,46,0.08)',
                color: '#d69e2e',
                border: '1px solid rgba(214,158,46,0.15)',
              }}
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span
              className="text-[11px] px-2.5 py-1 rounded-full font-medium"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#6b7280',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} aria-label={`View ${title}`} className="block">
        {Card}
      </Link>
    );
  }

  return Card;
}