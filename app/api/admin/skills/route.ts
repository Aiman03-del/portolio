import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
    const adminSupabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await adminSupabase
      .from('skills')
      .select('id,name,category,percentage,order_index')
      .order('order_index', { ascending: true });
    if (error) throw error;

    // Group rows by category for admin UI
    const groups: Record<string, any> = {};
    (data ?? []).forEach((row: any) => {
      // skip rows without a category (anonymous/default rows)
      if (row.category == null || String(row.category).trim() === '') return;
      const cat = row.category;
      if (!groups[cat]) groups[cat] = { id: cat, category: cat, skills: [], order_index: row.order_index };
      groups[cat].skills.push(row.name);
      if (typeof row.order_index === 'number' && (groups[cat].order_index == null || row.order_index < groups[cat].order_index)) {
        groups[cat].order_index = row.order_index;
      }
    });

    return NextResponse.json(Object.values(groups));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
    const adminSupabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const body = await request.json();
    // UI sends { category, skills: string[], proficiency_level }
    // DB schema stores one row per skill with columns: name, category, percentage, order_index
    const skillsArr: string[] = Array.isArray(body.skills) ? body.skills : [];

    // map proficiency_level to a rough percentage (optional)
    const proficiencyMap: Record<string, number> = {
      Beginner: 30,
      Intermediate: 60,
      Advanced: 85,
    };

    const { data: latest } = await adminSupabase
      .from('skills')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)
      .maybeSingle();

    const startIndex = (latest?.order_index ?? -1) + 1;

    const rows = skillsArr.map((s, i) => ({
      name: s,
      category: body.category ?? null,
      percentage: proficiencyMap[body.proficiency_level] ?? null,
      order_index: startIndex + i,
    }));

    const { data, error } = await adminSupabase.from('skills').insert(rows).select();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
