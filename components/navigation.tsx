'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-light tracking-widest text-accent">
            AS.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#projects" className="text-sm font-light text-foreground hover:text-accent transition-colors">
              Projects
            </Link>
            <Link href="/#expertise" className="text-sm font-light text-foreground hover:text-accent transition-colors">
              Expertise
            </Link>
            <Link href="/blog" className="text-sm font-light text-foreground hover:text-accent transition-colors">
              Blog
            </Link>
            <Link href="/#contact" className="text-sm font-light text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
            <Link href="/auth/login" className="text-sm font-light px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border/50">
            <Link href="/#projects" className="block px-4 py-2 text-sm font-light text-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
            <Link href="/#expertise" className="block px-4 py-2 text-sm font-light text-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
              Expertise
            </Link>
            <Link href="/blog" className="block px-4 py-2 text-sm font-light text-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/#contact" className="block px-4 py-2 text-sm font-light text-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link href="/auth/login" className="block px-4 py-2 text-sm font-light text-accent border-t border-border/50" onClick={() => setIsOpen(false)}>
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
