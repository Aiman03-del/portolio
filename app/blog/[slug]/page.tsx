import { getBlogPostBySlug } from '@/lib/db/blog';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CursorGlow } from '@/components/cursor-glow';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getBlogPostBySlug(params.slug);
    return {
      title: `${post.title} | Blog`,
      description: post.excerpt || post.content.substring(0, 160),
    };
  } catch {
    return { title: 'Post not found' };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <>
      <CursorGlow />
      <Navigation />
      <main className="bg-background text-foreground min-h-screen">
        <article className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <Link
            href="/blog"
            className="text-accent hover:text-accent/80 text-sm font-light mb-8 inline-block"
          >
            ← Back to blog
          </Link>

          <header className="mb-16">
            {post.category && (
              <p className="text-xs font-light tracking-widest text-accent uppercase mb-4">
                {post.category}
              </p>
            )}
            <h1 className="text-4xl lg:text-5xl font-light text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            {post.published_at && (
              <p className="text-sm text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </header>

          {post.image_url && (
            <div className="mb-12 h-96 rounded-lg overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-base lg:text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
