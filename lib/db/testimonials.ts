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

export async function getTestimonials(featured?: boolean) {
  const supabase = await createClient();
  let query = supabase.from('testimonials').select('*').order('order_index', { ascending: true });
  
  if (featured) {
    query = query.eq('featured', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as Testimonial[];
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('testimonials').insert([testimonial]).select().single();
  if (error) throw error;
  return data as Testimonial;
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('testimonials').update(testimonial).eq('id', id).select().single();
  if (error) throw error;
  return data as Testimonial;
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}
