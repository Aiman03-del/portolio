import { createClient } from '@/lib/supabase/server';

export interface Skill {
  id: string; // category identifier
  category: string;
  skills: string[]; // list of skill names
  proficiency_level?: string | null;
  order_index?: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export async function getSkills() {
  // Use service-role key on the server to bypass RLS for public reads
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data, error } = await supabase
    .from('skills')
    .select('id,name,category,percentage,order_index')
    .order('order_index', { ascending: true });
  if (error) throw error;

  // group by category
  const groups: Record<string, any> = {};
  (data ?? []).forEach((row: any) => {
    const cat = row.category ?? 'General';
    if (!groups[cat]) groups[cat] = { id: cat, category: cat, skills: [], order_index: row.order_index };
    groups[cat].skills.push(row.name);
    // keep smallest order_index
    if (typeof row.order_index === 'number' && (groups[cat].order_index == null || row.order_index < groups[cat].order_index)) {
      groups[cat].order_index = row.order_index;
    }
  });

  return Object.values(groups) as Skill[];
}

export async function createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('skills').insert([skill]).select().single();
  if (error) throw error;
  return data as Skill;
}

export async function updateSkill(id: string, skill: Partial<Skill>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('skills').update(skill).eq('id', id).select().single();
  if (error) throw error;
  return data as Skill;
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw error;
}