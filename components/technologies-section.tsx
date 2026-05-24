'use client';

import { Skill } from '@/lib/db/skills';

interface TechnologiesSectionProps {
  embedded?: boolean;
  skills?: Skill[];
}

function getTechnologyIcon(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes('html')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="rgba(214,158,46,0.15)" stroke="#d69e2e" strokeWidth="1.2" />
        <path d="M8 8h8l-.5 5-3.5 1-3.5-1-.2-2.5H10l.1 1.2 1.9.5 1.9-.5.2-2.2H8z" fill="#d69e2e" opacity="0.8" />
      </svg>
    );
  }

  if (lower.includes('css')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="rgba(214,158,46,0.15)" stroke="#d69e2e" strokeWidth="1.2" />
        <path d="M8 8h8l-1 7-3 1-3-1-.2-2H10l.1 1 1.9.5 1.9-.5.3-3H8.5L8 8z" fill="#d69e2e" opacity="0.8" />
      </svg>
    );
  }

  if (lower.includes('javascript') || lower === 'js') {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(214,158,46,0.15)" stroke="#d69e2e" strokeWidth="1.2" />
        <text x="6" y="17" fontSize="9" fontWeight="bold" fill="#d69e2e" fontFamily="monospace">JS</text>
      </svg>
    );
  }

  if (lower.includes('typescript') || lower === 'ts') {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(214,158,46,0.15)" stroke="#d69e2e" strokeWidth="1.2" />
        <text x="5.5" y="17" fontSize="9" fontWeight="bold" fill="#d69e2e" fontFamily="monospace">TS</text>
      </svg>
    );
  }

  if (lower.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#d69e2e" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" stroke="#d69e2e" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" stroke="#d69e2e" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="2" fill="#d69e2e" />
      </svg>
    );
  }

  if (lower.includes('next')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#d69e2e" strokeWidth="1.2" fill="rgba(214,158,46,0.08)" />
        <text x="6" y="16" fontSize="7" fontWeight="bold" fill="#d69e2e" fontFamily="monospace">N›</text>
      </svg>
    );
  }

  if (lower.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M12 3L21 8v8l-9 5-9-5V8l9-5z" fill="rgba(214,158,46,0.10)" stroke="#d69e2e" strokeWidth="1.2" />
        <text x="8.5" y="15" fontSize="6" fontWeight="bold" fill="#d69e2e" fontFamily="monospace">JS</text>
      </svg>
    );
  }

  if (lower.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M6 10c1-4 3.5-5 6-4s3 3 2 5c1-2 3-3 5-2" stroke="#d69e2e" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 16c1-4 3.5-5 6-4s3 3 2 5c1-2 3-3 5-2" stroke="#d69e2e" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    );
  }

  if (lower.includes('postgres')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <ellipse cx="12" cy="7" rx="7" ry="3" stroke="#d69e2e" strokeWidth="1.2" fill="rgba(214,158,46,0.10)" />
        <path d="M5 7v10c0 1.66 3.13 3 7 3s7-1.34 7-3V7" stroke="#d69e2e" strokeWidth="1.2" />
        <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" stroke="#d69e2e" strokeWidth="1.2" />
      </svg>
    );
  }

  if (lower.includes('supabase')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M13 3L4 14h9l-2 7 9-11h-9l2-7z" fill="rgba(214,158,46,0.15)" stroke="#d69e2e" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (lower.includes('gsap')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="rgba(214,158,46,0.10)" stroke="#d69e2e" strokeWidth="1.2" />
        <path d="M8 12h4v4h-2a2 2 0 01-2-2v-2z" stroke="#d69e2e" strokeWidth="1.2" />
        <path d="M12 8h2a2 2 0 012 2v2h-4V8z" stroke="#d69e2e" strokeWidth="1.2" />
      </svg>
    );
  }

  if (lower.includes('git')) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <circle cx="6" cy="6" r="2" stroke="#d69e2e" strokeWidth="1.2" />
        <circle cx="18" cy="6" r="2" stroke="#d69e2e" strokeWidth="1.2" />
        <circle cx="6" cy="18" r="2" stroke="#d69e2e" strokeWidth="1.2" />
        <path d="M8 6h6M6 8v8M8 6l4 6" stroke="#d69e2e" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <div className="w-7 h-7 rounded-md border border-[#d69e2e]/30 flex items-center justify-center text-[10px] text-[#d69e2e] font-semibold">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function flattenSkills(skills: Skill[]) {
  return skills.flatMap((group) =>
    group.skills.map((skill) => ({
      name: skill,
      category: group.category,
    }))
  );
}

export function TechnologiesSection({ embedded = false, skills = [] }: TechnologiesSectionProps) {
  const visibleSkills = flattenSkills(skills);
  const displaySkills = embedded ? visibleSkills.slice(0, 12) : visibleSkills;
  return (
    <section className={`relative overflow-hidden ${embedded ? 'py-0' : 'py-16'}`} style={{ background: '#0c0b09' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(214,158,46,0.12), transparent)' }} />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 h-100 w-100 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(214,158,46,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className={`mx-auto max-w-7xl px-0 ${embedded ? '' : 'sm:px-8 lg:px-12'}`}>
        {/* Header */}
        <div className="mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: '#d69e2e' }}>
              TECH STACK
            </p>
            <h2 className={`${embedded ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'} font-bold text-white`}>Technologies</h2>
          </div>
        </div>

        {/* Tech grid */}
        <div className={`grid ${embedded ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6'} gap-4`}>
          {displaySkills.map((tech, index) => (
            <div
              key={`${tech.category}-${tech.name}-${index}`}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(214,158,46,0.07)',
                animation: `slide-in-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
                animationDelay: `${index * 0.05}s`,
                opacity: 0,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(214,158,46,0.08)';
                el.style.borderColor = 'rgba(214,158,46,0.25)';
                el.style.transform = 'translateY(-5px)';
                el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(214,158,46,0.1)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(255,255,255,0.025)';
                el.style.borderColor = 'rgba(214,158,46,0.07)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                {getTechnologyIcon(tech.name)}
              </div>
              <span className="text-[11px] font-medium text-neutral-400 group-hover:text-white transition-colors duration-200 text-center leading-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}