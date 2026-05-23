import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('testimonials').select('*').order('order_index', { ascending: true });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
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

    // map UI fields to DB columns
    const name = body.author_name ?? body.name ?? body.author ?? null;
    const role = body.author_role ?? body.role ?? null;
    const company = body.author_company ?? body.company ?? null;
    const quote = body.content ?? body.quote ?? body.message ?? null;
    const image = body.author_image ?? body.image_url ?? body.avatar_url ?? null;

    const { data: latest } = await adminSupabase
      .from('testimonials')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)
      .maybeSingle();

    const startIndex = (latest?.order_index ?? -1) + 1;

    const row = {
      name,
      role,
      company,
      quote,
      image_url: image,
      rating: body.rating ?? null,
      featured: body.featured ?? false,
      order_index: body.order_index ?? startIndex,
    };

    const { data, error } = await adminSupabase.from('testimonials').insert([row]).select().single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('admin/testimonials POST error:', error);
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
