'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Briefcase, Settings, FileText, Star, MessageSquare } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Projects', href: '/admin/projects', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Skills', href: '/admin/skills', icon: <Settings className="w-5 h-5" /> },
    { label: 'Blog Posts', href: '/admin/blog', icon: <FileText className="w-5 h-5" /> },
    { label: 'Testimonials', href: '/admin/testimonials', icon: <Star className="w-5 h-5" /> },
    { label: 'Messages', href: '/admin/messages', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed md:hidden top-4 left-4 z-50 p-2 bg-card border border-border rounded"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:static left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-border">
          <Link href="/admin/dashboard" className="text-xl font-light tracking-widest text-accent">
            Admin
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded text-sm font-light transition-colors ${
                isActiveRoute(item.href)
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'text-foreground hover:bg-muted/50 hover:text-accent border border-transparent'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm font-light hover:bg-accent/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 md:hidden bg-black/50"
        />
      )}
    </>
  );
}
