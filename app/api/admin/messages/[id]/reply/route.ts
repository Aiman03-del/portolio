import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD,
	},
});

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

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

		const safeName = escapeHtml(message.name || 'there');
		const safeReply = escapeHtml(reply).replace(/\n/g, '<br/>');
		const safeOriginal = escapeHtml(message.message || '').replace(/\n/g, '<br/>');
		const safeSubject = escapeHtml(message.subject || 'your message');

		const html = `
			<div style="font-family: Inter, Arial, sans-serif; line-height: 1.7; color: #111827; background: #f8fafc; padding: 24px;">
				<div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 40px rgba(15,23,42,0.08);">
					<div style="padding: 24px 28px; background: linear-gradient(135deg, #0c0b09 0%, #1a1208 100%); color: #f9fafb;">
						<p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #d69e2e;">Reply from Portfolio</p>
						<h2 style="margin: 0; font-size: 20px; font-weight: 700;">Re: ${safeSubject}</h2>
					</div>

					<div style="padding: 28px;">
						<p style="margin: 0 0 16px; font-size: 16px;">Hi ${safeName},</p>

						<div style="font-size: 15px; color: #111827; background: #fffbf0; border-left: 4px solid #d69e2e; padding: 16px 18px; border-radius: 8px; margin-bottom: 24px;">
							${safeReply}
						</div>

						<div style="padding-top: 20px; border-top: 1px solid #e5e7eb;">
							<p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em;">
								Your original message
							</p>
							<div style="font-size: 14px; color: #6b7280; background: #f9fafb; border: 1px solid #eef2f7; padding: 14px 16px; border-radius: 8px;">
								${safeOriginal}
							</div>
						</div>

						<p style="margin: 24px 0 0; font-size: 12px; color: #9ca3af;">
							This reply was sent from the portfolio of Aiman Uddin Siam.
						</p>
					</div>
				</div>
			</div>
		`;

		await transporter.sendMail({
			from: `"Aiman Uddin" <${process.env.GMAIL_USER}>`,
			to: message.email,
			subject: `Re: ${message.subject || 'Your message'}`,
			html,
			text: `Hi ${message.name || 'there'},\n\n${reply}\n\n---\nOriginal message:\n${message.message || ''}`,
		});

		await adminSupabase
			.from('contact_messages')
			.update({ read: true })
			.eq('id', id);

		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error('Reply error:', error);
		return NextResponse.json(
			{ error: error?.message ?? 'Failed to send reply' },
			{ status: 500 }
		);
	}
}
