import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 4000;

const TOPIC_LABELS: Record<string, string> = {
  general: "General Inquiry",
  vendor: "Vendor Inquiry",
  media: "Media or Press Inquiry",
  quote: "Project Scope and Quoting",
};

interface ContactPayload {
  name: string;
  email: string;
  role: string;
  topic: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function sanitize(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const body = payload as Partial<ContactPayload> & { website?: unknown };

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(body.name);
  const email = sanitize(body.email, 254);
  const role = sanitize(body.role, 120);
  const topic = sanitize(body.topic, 60);
  const message = sanitize(body.message, MAX_MESSAGE_LENGTH);

  if (!name || !email || !topic || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL;
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "TSA Inc. <onboarding@resend.dev>";

  if (!apiKey || !toAddress) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const topicLabel = TOPIC_LABELS[topic] ?? topic;

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `New inquiry (${topicLabel}) — ${name}`,
      html: renderEmail({ name, email, role, topic: topicLabel, message }),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json({ error: "Unable to send message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Send failed", err);
    return NextResponse.json({ error: "Unable to send message" }, { status: 502 });
  }
}

function renderEmail(data: ContactPayload): string {
  const { name, email, role, topic, message } = data;
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; color: #141413; max-width: 560px;">
      <h2 style="font-family: Georgia, serif; color: #141413; margin: 0 0 16px;">New website inquiry</h2>
      <p style="color: #6b7585; margin: 0 0 24px; font-size: 14px;">
        Submitted via the tsa-inc.ca contact form.
      </p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #6b7585; width: 120px;">Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b7585;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #6b7585;">Topic</td><td style="padding: 8px 0;">${escapeHtml(topic)}</td></tr>
        ${role ? `<tr><td style="padding: 8px 0; color: #6b7585;">Role</td><td style="padding: 8px 0;">${escapeHtml(role)}</td></tr>` : ""}
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #f3f4f5; border-radius: 8px;">
        <p style="margin: 0 0 8px; color: #6b7585; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em;">Message</p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
}
