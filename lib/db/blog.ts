import { createClient } from '@/lib/supabase/server';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  image_url?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export async function getBlogPosts(published?: boolean) {
  const supabase = await createClient();
  let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
  
  if (published) {
    query = query.eq('published', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
  if (error) throw error;
  return data as BlogPost;
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('blog_posts').insert([post]).select().single();
  if (error) throw error;
  return data as BlogPost;
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('blog_posts').update(post).eq('id', id).select().single();
  if (error) throw error;
  return data as BlogPost;
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}
