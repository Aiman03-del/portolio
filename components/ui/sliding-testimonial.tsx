import Image from 'next/image';
import type { Testimonial } from '@/lib/db/testimonials';

type SlidingTestimonialProps = {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
};

const fallbackAvatar = '/placeholder-user.jpg';

export function SlidingTestimonial({
  testimonials,
  title = 'TESTIMONIALS',
  subtitle = 'What Clients Say',
}: SlidingTestimonialProps) {
  const slides = testimonials.filter((item) => Boolean(item.content?.trim() && item.author_name?.trim()));

  if (slides.length === 0) return null;

  const duplicatedSlides = [...slides, ...slides];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.02)]">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(214,158,46,0.25), transparent)' }}
      />

      <div className="relative p-5 sm:p-6 lg:p-7">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#d69e2e' }}>
          {title}
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{subtitle}</h2>

        <p className="mt-3 max-w-xl text-sm sm:text-base text-neutral-400">
          Database testimonials displayed as a smooth horizontal slider.
        </p>
      </div>

      <div
        className="relative overflow-hidden px-5 pb-5 sm:px-6 sm:pb-6"
        style={{
          maskImage: 'linear-gradient(to left, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-x-slider gap-5 pr-5">
          {duplicatedSlides.map((testimonial, index) => {
            const name = testimonial.author_name?.trim() || 'Anonymous';
            const profession = [testimonial.author_role, testimonial.author_company].filter(Boolean).join(', ') || 'Client';
            const avatar = testimonial.author_image_url || fallbackAvatar;
            const description = testimonial.content?.trim();

            return (
              <article
                key={`${testimonial.id}-${index}`}
                className="shrink-0 rounded-xl border border-black/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                style={{ width: 'min(600px, calc(100vw - 2.5rem))' }}
              >
                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  {description && (
                    <p className="text-pretty text-lg sm:text-xl lg:text-2xl font-extralight leading-tight tracking-tight text-white/90">
                      &quot;{description}&quot;
                    </p>
                  )}
                </div>

                <div className="border-t border-white/10 flex gap-1 overflow-hidden">
                  <div className="w-3/4 flex gap-3 items-center px-4 py-3 min-w-0">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black/20">
                      <Image src={avatar} alt={name} fill className="object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <h5 className="truncate text-base font-medium text-white sm:text-lg">{name}</h5>
                      <p className="truncate text-sm text-white/50 sm:text-base">{profession}</p>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
