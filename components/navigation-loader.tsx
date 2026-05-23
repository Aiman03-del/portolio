"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      // ignore in-page anchors and same-page hash links
      try {
        const url = new URL(href, window.location.href);
        const isInternal = url.origin === window.location.origin;
        if (!isInternal) return;
        if (url.pathname === window.location.pathname && url.hash) return;
        // treat internal links as navigation
        setLoading(true);
      } catch (err) {
        return;
      }
    };

    const onPop = () => setLoading(true);

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  // stop loading when pathname changes (navigation finished)
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 p-6 bg-card/80 border border-border rounded">
        <svg className="w-8 h-8 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <div className="text-sm text-foreground">Loading…</div>
      </div>
    </div>
  );
}
