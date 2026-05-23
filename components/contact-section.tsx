'use client';

import { useState } from 'react';
import { CinematicText } from './cinematic-text';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { toast } from 'react-toastify';

export function ContactSection() {
  const ref = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        (async () => {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Failed to send message');
          }
        })(),
        {
          pending: 'Sending your message...',
          success: 'Message sent successfully. I will get back to you soon.',
          error: 'Failed to send message. Please try again.',
        },
      );

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form submit failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-background py-24 lg:py-32 overflow-hidden border-t border-muted/20">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl opacity-10" 
          style={{ background: 'radial-gradient(circle, rgba(214, 158, 67, 0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="h-16 lg:h-20 mb-6 flex justify-center">
            <CinematicText
              text="LET'S CONNECT"
              className="text-4xl lg:text-5xl font-light tracking-wider text-foreground"
              delay={0}
            />
          </div>
          <p className="text-base lg:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Interested in working together? I&apos;m always open to discussing new projects, creative ideas, and opportunities. Reach out and let&apos;s create something extraordinary.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} ref={ref} className="space-y-6 mb-12 p-8 rounded-lg border border-muted/20 bg-card/30 backdrop-blur-sm">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="px-4 py-3 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="px-4 py-3 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />

          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={5}
            className="w-full px-4 py-3 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-accent-foreground font-light tracking-wide hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Quick Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { label: 'Email', value: 'hello@aiman.dev', href: 'mailto:hello@aiman.dev' },
            { label: 'LinkedIn', value: 'linkedin.com/in/aiman', href: '#' },
            { label: 'GitHub', value: 'github.com/aiman', href: '#' },
          ].map((contact, index) => (
            <a
              key={contact.label}
              href={contact.href}
              className="group p-6 lg:p-8 rounded-lg border border-muted/20 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:bg-card/60 transition-all duration-300 text-center"
              style={{
                animation: 'slide-in-up 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <p className="text-sm text-accent font-light tracking-wide mb-2">
                {contact.label}
              </p>
              <p className="text-base lg:text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                {contact.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
