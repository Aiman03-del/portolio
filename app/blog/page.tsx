import { getBlogPosts } from '@/lib/db/blog';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CursorGlow } from '@/components/cursor-glow';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Aiman Uddin Siam',
  description: 'Articles on full-stack development, web design, and digital innovation.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return (
    <>
      <CursorGlow />
      <Navigation />
      <main className="bg-background text-foreground min-h-screen">
        <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <div className="mb-16">
            <h1 className="text-4xl lg:text-5xl font-light tracking-wider text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Insights on full-stack development, design thinking, and building premium digital experiences.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No published posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group p-6 rounded-lg border border-muted/20 bg-card/30 hover:border-accent/30 hover:bg-card/50 transition-all duration-300"
                >
                  {post.image_url && (
                    <div className="mb-4 h-48 bg-muted/20 rounded overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    {post.category && (
                      <p className="text-xs font-light tracking-widest text-accent uppercase">
                        {post.category}
                      </p>
                    )}
                    <h2 className="text-xl font-light text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground pt-2">
                      {post.published_at && new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
