import Link from 'next/link';

import type { BlogPost } from '@/lib/db/blog';

type BlogSectionProps = {
  posts: BlogPost[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  const featuredPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#0f0e0c_0%,#0c0b09_100%)] py-20 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, rgba(214,158,46,0.22) 0%, transparent 70%)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d69e2e]">Blog</p>
            <h2 className="text-3xl font-light tracking-wider text-foreground sm:text-4xl lg:text-5xl">
              Latest thoughts and writing
            </h2>
            <p className="text-sm leading-7 text-neutral-400 sm:text-base">
              Notes on full-stack development, design decisions, and building products that feel polished and purposeful.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-[#d69e2e]/40 hover:bg-[#d69e2e]/10 hover:text-[#f7d87b]"
          >
            View all posts
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {featuredPosts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-neutral-400">
            No published posts yet. Check back soon for new articles.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-300 hover:-translate-y-1 hover:border-[#d69e2e]/30 hover:bg-white/6"
              >
                {post.image_url ? (
                  <div className="aspect-16/10 overflow-hidden bg-black/20">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-16/10 items-center justify-center bg-[linear-gradient(135deg,rgba(146,89,10,0.18),rgba(12,11,9,0.9))]">
                    <div className="h-14 w-14 rounded-full border border-[#d69e2e]/30 bg-[#d69e2e]/10" />
                  </div>
                )}

                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-neutral-500">
                    <span>{post.category ?? 'Article'}</span>
                    <span>{post.published ? (post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Published') : 'Draft'}</span>
                  </div>

                  <h3 className="text-xl font-medium text-foreground transition-colors group-hover:text-[#f7d87b]">
                    {post.title}
                  </h3>

                  <p className="line-clamp-3 text-sm leading-6 text-neutral-400">
                    {post.excerpt || 'Read the full article to explore the details, process, and takeaways.'}
                  </p>

                  {!post.published && (
                    <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-200">
                      Draft
                    </span>
                  )}

                  <div className="flex items-center gap-2 pt-2 text-sm font-medium text-[#d69e2e]">
                    Read more
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}