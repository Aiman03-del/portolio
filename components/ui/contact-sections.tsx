'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ContactMethod = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const contactMethods: ContactMethod[] = [
  {
    icon: <Mail className="h-6 w-6" />,
    label: 'Email',
    href: 'mailto:hello@aiman.dev',
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aiman-uddin-721011204',
  },
  {
    icon: <Github className="h-6 w-6" />,
    label: 'GitHub',
    href: 'https://github.com/Aiman03-del',
  },
];

export default function ContactSections() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success('Message sent successfully. I will get back to you soon.');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form submit failed:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-[#0c0b09] py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-0 h-80 w-80 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, rgba(214,158,46,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, rgba(214,158,46,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]   lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d69e2e]">Contact</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Let&apos;s connect</h2>
              <p className="max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
                Whether you want to discuss a new project, need a developer for your team, or just want to say hello, use the form or one of the links below.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  aria-label={method.label}
                  title={method.label}
                  className="group flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.025)] text-[#d69e2e] transition-all duration-300 hover:-translate-y-1 hover:border-[#d69e2e]/30 hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(214,158,46,0.18)]"
                >
                  {method.icon}
                </a>
              ))}
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.025)] p-5 lg:block">
              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin className="h-5 w-5 text-[#d69e2e]" />
                <div>
                  <p className="text-sm font-semibold text-white">Chattogram, Bangladesh</p>
                  <p className="text-xs text-neutral-500">Available for remote and local collaboration.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8">
            <div className="mb-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d69e2e]">Send a message</p>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">Get in touch</h3>
              <p className="text-sm leading-6 text-neutral-400">
                Fill out the form and I&apos;ll reply as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm text-neutral-200">First name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
                    className="h-11 border-white/10 bg-black/20 text-white placeholder:text-neutral-500 focus-visible:border-[#d69e2e]/50 focus-visible:ring-[#d69e2e]/30"
                    placeholder="Aiman"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm text-neutral-200">Last name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
                    className="h-11 border-white/10 bg-black/20 text-white placeholder:text-neutral-500 focus-visible:border-[#d69e2e]/50 focus-visible:ring-[#d69e2e]/30"
                    placeholder="Uddin"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-neutral-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className="h-11 border-white/10 bg-black/20 text-white placeholder:text-neutral-500 focus-visible:border-[#d69e2e]/50 focus-visible:ring-[#d69e2e]/30"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm text-neutral-200">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                  className="h-11 border-white/10 bg-black/20 text-white placeholder:text-neutral-500 focus-visible:border-[#d69e2e]/50 focus-visible:ring-[#d69e2e]/30"
                  placeholder="Project inquiry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-neutral-200">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  className="border-white/10 bg-black/20 text-white placeholder:text-neutral-500 focus-visible:border-[#d69e2e]/50 focus-visible:ring-[#d69e2e]/30"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-md text-sm font-semibold text-black shadow-lg shadow-[#d69e2e]/10 transition hover:from-[#b7791f] hover:to-[#f6d860]"
                style={{ background: 'linear-gradient(135deg, #92590a, #d69e2e)' }}
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
