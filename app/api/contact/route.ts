import { createContactMessage } from '@/lib/db/contact';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const contactMessage = await createContactMessage({
      name,
      email,
      subject,
      message,
    });

    // Send email notification
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0b09; color: #e5e5e5; padding: 32px; border-radius: 12px;">
          <h2 style="color: #d69e2e; margin-bottom: 24px;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #fff; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #d69e2e;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af;">Subject</td>
              <td style="padding: 8px 0; color: #fff;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #d69e2e;">
            <p style="color: #9ca3af; margin: 0 0 8px 0; font-size: 12px;">MESSAGE</p>
            <p style="color: #e5e5e5; margin: 0; line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">Reply directly to this email to respond to ${name}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: contactMessage });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
