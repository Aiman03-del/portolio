import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
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
    // normalize payload to expected columns
    const row = {
      title: body.title ?? null,
      slug: body.slug ?? (body.title ? String(body.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : null),
      content: body.content ?? body.body ?? null,
      excerpt: body.excerpt ?? null,
      published_at: body.published ? new Date().toISOString() : body.published_at ?? null,
      image_url: body.image_url ?? body.thumbnail_url ?? body.featured_image ?? null,
    };

    const { data, error } = await adminSupabase.from('blog_posts').insert([row]).select().single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('admin/blog POST error:', error);
    const errorBody: any = {
      message: error?.message ?? null,
      details: error?.details ?? null,
      hint: error?.hint ?? null,
      code: error?.code ?? null,
      text: String(error) ?? null,
    };
    return NextResponse.json(errorBody, { status: 500 });
  }
}
