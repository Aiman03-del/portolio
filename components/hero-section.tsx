'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

type HeroStat = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const PROJECTS_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const CLIENTS_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const EXPERIENCE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const TECHNOLOGIES_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

type HeroSectionProps = {
  stats: HeroStat[];
};

const SERVICES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Web Development',
    desc: 'Building responsive and high-performance websites.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'Mobile Development',
    desc: 'Creating cross-platform mobile applications.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'Designing intuitive and engaging user experiences.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    title: 'Cloud Solutions',
    desc: 'Deploying scalable and reliable cloud solutions.',
  },
];

export function HeroSection({ stats }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const handleViewWork = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.href = '/#projects';
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.querySelectorAll('.anim-item'),
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.13, delay: 0.3 }
        );
      }
      gsap.fromTo(statsRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.8 }
      );
      if (servicesRef.current) {
        gsap.fromTo(
          servicesRef.current.querySelectorAll('.service-card'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 1.1 }
        );
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#0c0b09] mt-16 lg:mt-20">

      {/* ── FULL-SCREEN BACKGROUND IMAGE ── */}
      <div className="absolute inset-0 z-0">
        {!imgError ? (
          <>
            <Image
              src="/aiman.png"
              alt="Aiman Uddin"
              fill
              onError={() => setImgError(true)}
              className="object-contain object-center md:hidden"
              style={{
                transform: 'none',
                objectPosition: 'center top',
              }}
              priority
              sizes="100vw"
            />
            <Image
              src="/profile.png"
              alt="Aiman Uddin"
              fill
              onError={() => setImgError(true)}
              className="hidden object-cover object-center md:block"
              style={{
                transform: 'none',
                objectPosition: '85% 10%',
              }}
              priority
              sizes="100vw"
            />
          </>
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}

        {/* Dark overlay — left heavy so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,8,5,0.92) 0%, rgba(10,8,5,0.75) 45%, rgba(10,8,5,0.30) 75%, rgba(10,8,5,0.15) 100%)',
          }}
        />
        {/* Bottom fade to merge with services section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-56"
          style={{ background: 'linear-gradient(to top, #0c0b09 0%, transparent 100%)' }}
        />
        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, rgba(10,8,5,0.6) 0%, transparent 100%)' }}
        />
        {/* Ambient golden glow on the left */}
        <div
          className="absolute bottom-[20%] left-0 w-[40%] h-[60%] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at left, rgba(214,158,46,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── HERO CONTENT OVERLAY ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-12 md:pt-20 lg:pt-24 pb-8 md:pb-10 lg:pb-12 flex items-start md:items-center">
        <div className="w-full flex items-start md:items-center justify-between gap-8">

          {/* LEFT: Text */}
          <div ref={textRef} className="flex flex-col space-y-4 lg:space-y-5 max-w-xl">
            <div className="space-y-1">
              <p className="anim-item text-lg lg:text-xl font-medium" style={{ color: '#d69e2e' }}>
                Hi, I&apos;m
              </p>
              <h1 className="anim-item text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.92] tracking-tight text-white drop-shadow-2xl">
                Aiman Uddin
              </h1>
              <p className="anim-item text-sm sm:text-base lg:text-lg font-medium pt-1" style={{ color: '#d69e2e' }}>
                Full-Stack Developer crafting digital
                <br />
                experiences that make an impact.
              </p>
            </div>

            <div className="anim-item flex flex-wrap gap-3 pt-1 lg:pt-2">
              <button
                onClick={handleViewWork}
                className="group inline-flex items-center gap-2 px-6 py-2.5 font-semibold text-sm tracking-wide rounded-md transition-all duration-300 shadow-xl"
                style={{ background: 'linear-gradient(135deg, #92590a, #d69e2e)', color: '#0c0b09' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #d69e2e, #f6d860)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #92590a, #d69e2e)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                View My Work
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 border text-sm font-medium tracking-wide rounded-md transition-all duration-300 text-white"
                style={{
                  borderColor: 'rgba(214,158,46,0.4)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(214,158,46,0.8)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(214,158,46,0.10)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(214,158,46,0.4)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                Download CV
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT: Floating Stats Card */}
          <div
            ref={statsRef}
            className="hidden lg:block shrink-0 w-52 rounded-2xl p-4 shadow-2xl"
            style={{
              background: 'rgba(14,10,5,0.55)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(214,158,46,0.15)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(214,158,46,0.08)',
            }}
          >
            <ul className="space-y-4">
              {stats.map((s) => (
                <li key={s.label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, #7a3f08, #b7791f)',
                      color: '#f6d860',
                      boxShadow: '0 2px 12px rgba(180,120,20,0.3)',
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-none mb-1" style={{ color: '#d69e2e' }}>
                      {s.value}
                    </div>
                    <div className="text-[10px] text-neutral-400 leading-tight">{s.label}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── SERVICES CARDS ── */}
      <div ref={servicesRef} className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pb-10 lg:pb-14 mt-6 lg:mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="service-card group relative p-5 rounded-xl cursor-default overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(214,158,46,0.08)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(255,255,255,0.06)';
                el.style.borderColor = 'rgba(214,158,46,0.28)';
                el.style.transform = 'translateY(-5px)';
                el.style.boxShadow = '0 16px 48px rgba(180,120,20,0.14)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(255,255,255,0.03)';
                el.style.borderColor = 'rgba(214,158,46,0.08)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 20% 20%, rgba(214,158,46,0.07) 0%, transparent 65%)' }}
              />
              <div className="relative z-10">
                <div
                  className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(214,158,46,0.10)', color: '#d69e2e' }}
                >
                  {svc.icon}
                </div>
                <div className="font-semibold text-white mb-2 text-sm lg:text-[15px]">{svc.title}</div>
                <p className="text-[11px] lg:text-xs leading-relaxed" style={{ color: '#6b7280' }}>{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}