'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Testimonial } from '@/lib/db/testimonials';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  embedded?: boolean;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#d69e2e' : 'none'}
      stroke="#d69e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function TestimonialsSection({ testimonials, embedded = false }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;
  const visibleTestimonials = testimonials.filter((testimonial) => {
    const hasName = Boolean(testimonial.author_name?.trim());
    const hasContent = Boolean(testimonial.content?.trim());
    return hasName || hasContent;
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!embedded || visibleTestimonials.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleTestimonials.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [embedded, visibleTestimonials.length]);

  useEffect(() => {
    if (activeIndex >= visibleTestimonials.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, visibleTestimonials.length]);

  const activeTestimonials = useMemo(() => {
    if (!embedded) return visibleTestimonials;
    return visibleTestimonials.slice(activeIndex, activeIndex + 1);
  }, [embedded, visibleTestimonials, activeIndex]);

  return (
    <section className={`relative overflow-hidden ${embedded ? 'py-0' : 'py-16'}`} style={{ background: '#0c0b09' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(214,158,46,0.12), transparent)' }} />

      <div className={`mx-auto max-w-7xl px-0 ${embedded ? '' : 'sm:px-8 lg:px-12'}`}>
        <div className={embedded ? 'mb-8' : 'mb-10'}>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#d69e2e' }}>
            TESTIMONIALS
          </p>
          <h2 className={`${embedded ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'} font-bold text-white`}>What Clients Say</h2>
        </div>

        {embedded ? (
          <div className="space-y-4">
            <div className="relative min-h-72.5 sm:min-h-67.5">
              {activeTestimonials.map((t, index) => {
                const authorName = t.author_name?.trim() || 'Anonymous';
                const authorInitial = authorName.trim().charAt(0) || '?';
                const content = t.content?.trim() || 'Testimonial text will appear here once a client review is added.';

                return (
                  <div
                    key={t.id}
                    className="group relative rounded-2xl overflow-hidden p-5 sm:p-6"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(214,158,46,0.08)',
                      animation: 'slide-in-up 0.55s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                      opacity: 0,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500"
                      style={{ background: 'radial-gradient(circle at 20% 20%, rgba(214,158,46,0.06) 0%, transparent 65%)' }}
                    />

                    <div className="relative z-10">
                      <div className="text-5xl font-serif leading-none mb-3 select-none" style={{ color: 'rgba(214,158,46,0.25)' }}>
                        &ldquo;
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} filled={star <= t.rating} />
                        ))}
                      </div>

                      <p className="text-sm leading-relaxed text-neutral-300 mb-6 line-clamp-4">
                        {content}
                      </p>

                      <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {t.author_image_url ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ border: '1px solid rgba(214,158,46,0.2)' }}>
                            <Image src={t.author_image_url} alt={authorName} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #92590a, #d69e2e)', color: '#0c0b09' }}>
                            {authorInitial}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white">{authorName}</p>
                          <p className="text-xs text-neutral-500">
                            {t.author_role}{t.author_role && t.author_company ? ', ' : ''}{t.author_company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {visibleTestimonials.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                {visibleTestimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: activeIndex === index ? '1.75rem' : '0.6rem',
                      background: activeIndex === index ? '#d69e2e' : 'rgba(214,158,46,0.25)',
                    }}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleTestimonials.map((t, index) => {
              const authorName = t.author_name?.trim() || 'Anonymous';
              const authorInitial = authorName.trim().charAt(0) || '?';
              const content = t.content?.trim() || 'Testimonial text will appear here once a client review is added.';

              return (
                <div
                  key={t.id}
                  className="group relative p-6 rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(214,158,46,0.08)',
                    animation: `slide-in-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = 'rgba(255,255,255,0.05)';
                    el.style.borderColor = 'rgba(214,158,46,0.22)';
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = 'rgba(255,255,255,0.025)';
                    el.style.borderColor = 'rgba(214,158,46,0.08)';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 20% 20%, rgba(214,158,46,0.06) 0%, transparent 65%)' }} />

                  <div className="relative z-10">
                    <div className="text-5xl font-serif leading-none mb-3 select-none" style={{ color: 'rgba(214,158,46,0.25)' }}>
                      &ldquo;
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= t.rating} />
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed text-neutral-300 mb-6 line-clamp-4">
                      {content}
                    </p>

                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      {t.author_image_url ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ border: '1px solid rgba(214,158,46,0.2)' }}>
                          <Image src={t.author_image_url} alt={authorName} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #92590a, #d69e2e)', color: '#0c0b09' }}>
                          {authorInitial}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{authorName}</p>
                        <p className="text-xs text-neutral-500">
                          {t.author_role}{t.author_role && t.author_company ? ', ' : ''}{t.author_company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}