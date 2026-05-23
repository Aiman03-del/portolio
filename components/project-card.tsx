'use client';

import { useRef } from 'react';
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
  index = 0 
}: ProjectCardProps) {
  const ref = useScrollAnimation();
  const cardRef = useRef<HTMLDivElement>(null);

  const Card = (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-lg border border-muted bg-card/50 backdrop-blur-sm p-6 lg:p-8 transition-all duration-500 hover:border-accent/50 hover:bg-card/80"
      style={{
        animation: `slide-in-up 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards`,
        animationDelay: `${index * 0.15}s`,
        opacity: 0,
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10" />

      {/* Image if provided */}
      {image && (
        <div className="relative h-48 mb-6 overflow-hidden rounded bg-muted/20 -mx-6 -mt-6 -ml-6">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-xl lg:text-2xl font-light tracking-wide text-foreground group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs lg:text-sm px-3 py-1 rounded-full border border-muted text-muted-foreground group-hover:border-accent/30 group-hover:text-accent transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Link indicator */}
      {link && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-accent text-xl">→</div>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link href={link} aria-label={`View ${title}`}>
        {Card}
      </Link>
    );
  }

  return Card;
}
