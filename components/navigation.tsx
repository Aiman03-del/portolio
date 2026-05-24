'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(12,11,9,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(214,158,46,0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="relative w-11 h-11 overflow-hidden rounded-lg transition-all duration-300"
            >
              <Image src="/logo.png" alt="Aiman Uddin Siam logo" fill className="object-cover" priority />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">Aiman</div>
              <div className="text-xs text-neutral-500 leading-none mt-0.5">Uddin</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 group"
                style={{ color: active === link.label ? '#d69e2e' : '#a3a3a3' }}
                onMouseEnter={e => { if (active !== link.label) (e.currentTarget as HTMLAnchorElement).style.color = '#e5e5e5'; }}
                onMouseLeave={e => { if (active !== link.label) (e.currentTarget as HTMLAnchorElement).style.color = '#a3a3a3'; }}
              >
                {link.label}
                {/* Active underline */}
                {active === link.label && (
                  <span
                    className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #b7791f, #d69e2e)' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA: Let's Talk */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="group inline-flex items-center justify-center w-10 h-10 rounded-md border transition-all duration-300"
              aria-label="Go to admin page"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(214,158,46,0.18)',
                color: '#d69e2e',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(214,158,46,0.10)';
                el.style.borderColor = 'rgba(214,158,46,0.35)';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.03)';
                el.style.borderColor = 'rgba(214,158,46,0.18)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-300 shadow-md"
              style={{
                background: 'linear-gradient(135deg, #92590a, #b7791f)',
                color: '#fff',
                border: '1px solid rgba(214,158,46,0.3)',
                boxShadow: '0 4px 20px rgba(180,120,20,0.25)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'linear-gradient(135deg, #b7791f, #d69e2e)';
                el.style.boxShadow = '0 6px 28px rgba(180,120,20,0.45)';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'linear-gradient(135deg, #92590a, #b7791f)';
                el.style.boxShadow = '0 4px 20px rgba(180,120,20,0.25)';
                el.style.transform = 'translateY(0)';
              }}
            >
              Let&apos;s Talk
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-neutral-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="md:hidden pb-5 pt-2 space-y-1"
            style={{ borderTop: '1px solid rgba(214,158,46,0.10)' }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => { setActive(link.label); setIsOpen(false); }}
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  color: active === link.label ? '#d69e2e' : '#a3a3a3',
                  background: active === link.label ? 'rgba(214,158,46,0.08)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                color: '#d69e2e',
                background: 'rgba(214,158,46,0.08)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Admin
            </Link>
            <div className="pt-3 px-4">
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #92590a, #b7791f)' }}
              >
                Let&apos;s Talk
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}