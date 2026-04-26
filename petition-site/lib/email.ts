// Tiny email sender via Resend. Returns ok:true even if RESEND_API_KEY is not
// set in dev — logs the OTP to the server console so you can complete the flow
// without setting up email.

export async function sendOtpEmail(opts: {
  to: string;
  name: string;
  code: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'StandUp <noreply@example.com>';

  if (!apiKey) {
    // Dev fallback — never do this in production.
    console.warn(`[dev] OTP for ${opts.to}: ${opts.code}`);
    return { ok: true };
  }

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;color:#0E0E12">
      <h1 style="font-family:Georgia,serif;font-size:22px;margin:24px 0 8px">Confirm your signature</h1>
      <p style="line-height:1.6;color:#0E0E12cc">
        Hi ${escapeHtml(opts.name)}, thanks for signing the petition to make
        anti-bullying a law in India. Use this code to confirm:
      </p>
      <div style="font-size:34px;letter-spacing:8px;font-weight:600;margin:18px 0;text-align:center">
        ${opts.code}
      </div>
      <p style="font-size:12px;color:#6B6B72;line-height:1.6">
        The code expires in 15 minutes. If you didn't sign, you can ignore this email.
      </p>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: opts.to,
      subject: 'Confirm your petition signature',
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
  }
  return { ok: true };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
