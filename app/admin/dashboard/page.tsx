import { getProjects } from '@/lib/db/projects';
import { getSkills } from '@/lib/db/skills';
import { getBlogPosts } from '@/lib/db/blog';
import { getTestimonials } from '@/lib/db/testimonials';
import { getContactMessages } from '@/lib/db/contact';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | Admin',
};

export default async function DashboardPage() {
  const [projects, skills, blogPosts, testimonials, messages] = await Promise.all([
    getProjects(),
    getSkills(),
    getBlogPosts(),
    getTestimonials(),
    getContactMessages(),
  ]);

  const stats = [
    { label: 'Projects', value: projects.length, href: '/admin/projects' },
    { label: 'Skills', value: skills.length, href: '/admin/skills' },
    { label: 'Blog Posts', value: blogPosts.length, href: '/admin/blog' },
    { label: 'Testimonials', value: testimonials.length, href: '/admin/testimonials' },
    { label: 'New Messages', value: messages.filter(m => !m.read).length, href: '/admin/messages' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-light text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card hover:border-accent transition-all"
          >
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-3xl font-light text-accent">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="p-6 rounded-lg border border-border bg-card/50">
          <h2 className="text-lg font-light text-foreground mb-4">Recent Messages</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.slice(0, 5).map((msg) => (
              <div key={msg.id} className="p-4 bg-background/50 rounded border border-border/50 text-sm">
                <p className="font-light text-foreground">{msg.name}</p>
                <p className="text-xs text-muted-foreground">{msg.subject}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground">No messages yet</p>
            )}
          </div>
          <Link href="/admin/messages" className="mt-4 inline-block text-sm text-accent hover:underline">
            View all messages →
          </Link>
        </div>

        {/* Quick Links */}
        <div className="p-6 rounded-lg border border-border bg-card/50">
          <h2 className="text-lg font-light text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/projects" className="block px-4 py-2 rounded bg-background/50 hover:bg-background text-sm font-light text-foreground transition-colors">
              Add Project
            </Link>
            <Link href="/admin/blog" className="block px-4 py-2 rounded bg-background/50 hover:bg-background text-sm font-light text-foreground transition-colors">
              Write Blog Post
            </Link>
            <Link href="/admin/testimonials" className="block px-4 py-2 rounded bg-background/50 hover:bg-background text-sm font-light text-foreground transition-colors">
              Add Testimonial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
