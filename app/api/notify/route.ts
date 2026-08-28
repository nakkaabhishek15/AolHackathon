import { NextResponse } from "next/server";

/**
 * Notify-list endpoint.
 *
 * There is no mailing-list provider wired up yet, and a form that silently
 * swallows addresses is worse than no form. So: if NOTIFY_WEBHOOK_URL is set
 * (a Zapier / Make / Google Apps Script / Resend-audience endpoint), the address
 * is forwarded there. If it isn't, we say so plainly and the client falls back
 * to a pre-filled email instead of pretending the signup landed.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const email =
    typeof payload === "object" && payload !== null && "email" in payload
      ? String((payload as { email: unknown }).email)
          .trim()
          .toLowerCase()
      : "";

  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, reason: "invalid-email" }, { status: 422 });
  }

  const webhook = process.env.NOTIFY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 200 });
  }

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, source: "hackathon-landing", at: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);
  } catch {
    return NextResponse.json({ ok: false, reason: "upstream-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
