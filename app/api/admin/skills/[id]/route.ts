import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: any }) {
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

    // Replace all rows in the category (params.id) with new skill rows
    const skillsArr: string[] = Array.isArray(body.skills) ? body.skills : [];
    const proficiencyMap: Record<string, number> = {
      Beginner: 30,
      Intermediate: 60,
      Advanced: 85,
    };

    // delete existing rows for the category
    const resolvedParams = await params;
    const categoryKey = decodeURIComponent(resolvedParams.id);
    const del = await adminSupabase.from('skills').delete().eq('category', categoryKey);
    if (del.error) throw del.error;

    const { data: latest } = await adminSupabase
      .from('skills')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)
      .maybeSingle();

    const startIndex = (latest?.order_index ?? -1) + 1;

    const rows = skillsArr.map((s, i) => ({
      name: s,
      category: body.category ?? resolvedParams.id,
      percentage: proficiencyMap[body.proficiency_level] ?? null,
      order_index: startIndex + i,
    }));

    const ins = await adminSupabase.from('skills').insert(rows).select();
    if (ins.error) throw ins.error;
    // return grouped object for updated category
    return NextResponse.json({ id: body.category ?? categoryKey, category: body.category ?? categoryKey, skills: skillsArr });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: any }) {
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

    const resolvedParams = await params;
    const categoryKey = decodeURIComponent(resolvedParams.id);
    const { error } = await adminSupabase.from('skills').delete().eq('category', categoryKey);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
