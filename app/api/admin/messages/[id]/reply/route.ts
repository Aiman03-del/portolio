import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const adminSupabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: message, error: messageError } = await adminSupabase
      .from('contact_messages')
      .select('id, name, email, subject, message')
      .eq('id', id)
      .single();

    if (messageError || !message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    const body = await request.json();
    const reply = body?.reply?.trim();

    if (!reply) {
      return NextResponse.json({ error: 'Reply message is required' }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM;

    if (!fromEmail) {
      return NextResponse.json({ error: 'RESEND_FROM_EMAIL is not configured' }, { status: 500 });
    }

    const safeName = escapeHtml(message.name || 'there');
    const safeReply = escapeHtml(reply).replace(/\n/g, '<br/>');
    const safeOriginal = escapeHtml(message.message || '').replace(/\n/g, '<br/>');

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <p>Hi ${safeName},</p>
        <p>${safeReply}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="font-size: 14px; color: #6b7280; margin: 0;">Original message:</p>
        <p style="font-size: 14px; color: #374151;">${safeOriginal}</p>
      </div>
    `;

    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: 'ausiaam83@gmail.com', // Always send replies to owner email.
      replyTo: fromEmail,
      subject: `Re: ${message.subject || 'Your message'}`,
      html,
      text: `Hi ${message.name || 'there'},\n\n${reply}\n\n---\nOriginal message:\n${message.message || ''}`,
    });

    if (sendResult.error) {
      return NextResponse.json({ error: sendResult.error.message }, { status: 500 });
    }

    // Best effort: mark message as read after successful reply.
    await adminSupabase.from('contact_messages').update({ read: true }).eq('id', id);

    return NextResponse.json({ success: true, id: sendResult.data?.id ?? null });
  } catch (error: any) {
    console.error('admin/messages reply error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to send reply' },
      { status: 500 },
    );
  }
}
