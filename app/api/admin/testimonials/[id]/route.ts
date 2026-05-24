import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { normalizeTestimonial } from '@/lib/db/testimonials';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

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
    const row = {
      name: body.name ?? body.author ?? null,
      company: body.company ?? null,
      quote: body.quote ?? body.message ?? null,
      image_url: body.image_url ?? body.avatar_url ?? null,
      order_index: body.order_index ?? null,
    };

    const { data, error } = await adminSupabase
      .from('testimonials')
      .update(row)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(normalizeTestimonial(data));
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Failed to update testimonial' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

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

    const { error } = await adminSupabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Failed to delete testimonial' },
      { status: 500 },
    );
  }
}
