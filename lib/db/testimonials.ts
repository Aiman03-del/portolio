import { createClient } from '@/lib/supabase/server';

export interface Testimonial {
  id: string;
  author_name: string;
  author_role?: string;
  author_company?: string;
  author_image_url?: string;
  content: string;
  rating: number;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export function normalizeTestimonial(row: any): Testimonial {
  return {
    id: row.id,
    author_name: row.author_name ?? row.name ?? row.author ?? '',
    author_role: row.author_role ?? row.role ?? undefined,
    author_company: row.author_company ?? row.company ?? undefined,
    author_image_url: row.author_image_url ?? row.image_url ?? row.avatar_url ?? undefined,
    content: row.content ?? row.quote ?? row.message ?? '',
    rating: row.rating ?? 5,
    featured: Boolean(row.featured),
    order_index: row.order_index ?? 0,
    created_at: row.created_at ?? new Date().toISOString(),
    updated_at: row.updated_at ?? new Date().toISOString(),
  };
}

export async function getTestimonials(featured?: boolean) {
  const supabase = await createClient();
  let query = supabase.from('testimonials').select('*').order('order_index', { ascending: true });
  
  if (featured) {
    query = query.eq('featured', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(normalizeTestimonial);
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('testimonials').insert([testimonial]).select().single();
  if (error) throw error;
  return normalizeTestimonial(data);
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('testimonials').update(testimonial).eq('id', id).select().single();
  if (error) throw error;
  return normalizeTestimonial(data);
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}
