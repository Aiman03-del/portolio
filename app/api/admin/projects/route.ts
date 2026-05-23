import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const adminSupabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await adminSupabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    if (error) throw error;

    const projects = (data ?? []).map((project) => ({
      ...project,
      thumbnail_url: project.image_url ?? null,
    }));

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminSupabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: latestProject } = await adminSupabase
      .from('projects')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)
      .maybeSingle();

    const body = await request.json();

    const projectData = {
      title: body.title,
      description: body.description,
      live_url: body.live_url || null,
      github_url: body.github_url || null,
      featured: body.featured || false,
      image_url: body.thumbnail_url || null,
      order_index: (latestProject?.order_index ?? -1) + 1,
    };

    const { data, error } = await adminSupabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }

    return NextResponse.json({
      ...data,
      thumbnail_url: data.image_url ?? null,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}