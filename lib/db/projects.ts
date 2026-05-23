import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  category?: string;
  technologies: string[];
  image_url?: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export async function getProjects(featured?: boolean) {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  let query = supabase.from('projects').select('*').order('order_index', { ascending: true });
  
  if (featured) {
    query = query.eq('featured', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;

    return (data ?? []).map((project) => ({
      ...project,
      technologies: project.technologies ?? project.tags ?? [],
      category: project.category ?? undefined,
      image_url: project.image_url ?? undefined,
    })) as Project[];
}

export async function getProjectById(id: string) {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) throw error;
    return {
      ...data,
      technologies: data.technologies ?? data.tags ?? [],
      category: data.category ?? undefined,
      image_url: data.image_url ?? undefined,
    } as Project;
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  const { data, error } = await supabase.from('projects').insert([project]).select().single();
  if (error) throw error;
  return data as Project;
}

export async function updateProject(id: string, project: Partial<Project>) {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function deleteProject(id: string) {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}
