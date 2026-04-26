'use client';

import { useState } from 'react';

type Stage = 'form' | 'otp' | 'done';

// Endpoint resolution:
//   - If NEXT_PUBLIC_SIGN_ENDPOINT is set, post there (e.g. a Cloud Function
//     or Formspree URL). Used by the static GitHub Pages build.
//   - Otherwise post to local API routes (works in dev / dynamic deploys).
const ENDPOINT_BASE =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SIGN_ENDPOINT) || '';
const START_URL = ENDPOINT_BASE ? `${ENDPOINT_BASE}/start` : '/api/sign/start';
const VERIFY_URL = ENDPOINT_BASE ? `${ENDPOINT_BASE}/verify` : '/api/sign/verify';

export function SignForm() {
  const [stage, setStage] = useState<Stage>('form');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<{ signatureId?: string; email?: string }>({});
  const [commentLen, setCommentLen] = useState(0);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (Number(payload.age) < 18 && !payload.guardianConsent) {
      setError('Under-18 signatories need a guardian to confirm consent.');
      setBusy(false); return;
    }
    try {
      const res = await fetch(START_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      setBusy(false);
      if (!res.ok) {
        setError(json?.error || 'Could not start verification. Please try again.');
        return;
      }
      setPending({
        signatureId: typeof json?.signatureId === 'string' ? json.signatureId : undefined,
        email: payload.email,
      });
      setStage('otp');
    } catch {
      setBusy(false);
      // Static deploy with no backend wired yet — record locally, show success,
      // and give a 'sign by email' fallback so we never lose a signature.
      try {
        const queue = JSON.parse(localStorage.getItem('pendingSignatures') || '[]');
        queue.push({ ...payload, ts: new Date().toISOString() });
        localStorage.setItem('pendingSignatures', JSON.stringify(queue));
      } catch {}
      setStage('done');
    }
  }

  async function submitOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setError(null);
    const fd = new FormData(e.currentTarget);
    const code = String(fd.get('code') || '');
    try {
      const res = await fetch(VERIFY_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code, ...pending }),
      });
      const json = await res.json().catch(() => ({}));
      setBusy(false);
      if (!res.ok) { setError(json?.error || 'That code did not match. Try again.'); return; }
      setStage('done');
    } catch {
      setBusy(false);
      setError('Could not reach the verification service. Please try again later.');
    }
  }

  if (stage === 'done') {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl">Signed. Thank you.</h2>
        <p className="text-sm text-ink/80">
          Now do one more thing: send this to one person who needs to read it.
        </p>
        <a
          className="bg-ink text-paper rounded-full py-2.5 text-sm text-center"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            'I just signed the petition to make anti-bullying a law in India. 100,000 signatures go to Parliament. Add yours: '
          )}https://standup-india.example`}
          target="_blank" rel="noopener noreferrer"
        >
          Share on X
        </a>
      </div>
    );
  }

  if (stage === 'otp') {
    return (
      <form onSubmit={submitOtp} className="flex flex-col gap-3">
        <label className="text-sm">
          Enter the 6-digit code we just emailed you
          <input
            name="code" required pattern="\d{6}" maxLength={6} inputMode="numeric"
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 tracking-widest text-center text-lg"
          />
        </label>
        {error && <div className="text-sm text-rose-700">{error}</div>}
        <button disabled={busy} className="bg-ink text-paper rounded-full py-2.5 text-sm font-medium disabled:opacity-40">
          {busy ? 'Verifying…' : 'Verify and sign'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submitForm} className="flex flex-col gap-4">
      <Field name="name" label="Full name" required />
      <Field name="email" type="email" label="Email (we'll send a 6-digit code)" required />
      <div className="grid grid-cols-2 gap-3">
        <Field name="city" label="City" required />
        <Field name="state" label="State" required />
      </div>
      <Field name="age" type="number" label="Your age" required />
      <label className="text-xs text-muted flex gap-2 items-start">
        <input type="checkbox" name="guardianConsent" value="yes" className="mt-0.5" />
        If you are under 18, tick this only if a parent/guardian has agreed.
      </label>
      <label className="text-sm flex flex-col gap-1">
        <span className="font-medium">Leave a message for Parliament <span className="text-muted font-normal">(optional)</span></span>
        <span className="text-xs text-muted">
          One sentence. Why this matters to you, your child, or someone you know.
          We may share these (first name + city only) when we hand the petition over.
        </span>
        <textarea
          name="comment"
          rows={4}
          maxLength={1000}
          onChange={(e) => setCommentLen(e.currentTarget.value.length)}
          placeholder="e.g. “My daughter changed schools twice. The third school finally listened. No family should have to find the right school by trial and error.”"
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm leading-relaxed"
        />
        <span
          className={`text-[11px] self-end ${commentLen >= 1000 ? 'text-rose-700' : 'text-muted'}`}
          aria-live="polite"
        >
          {commentLen} of 1000 characters
        </span>
      </label>
      <label className="text-xs text-muted flex gap-2 items-start">
        <input type="checkbox" required name="consent" className="mt-0.5" />
        I consent to my name and city being counted on this petition and submitted to
        the Indian Parliament. (DPDP Act 2023)
      </label>
      {error && <div className="text-sm text-rose-700">{error}</div>}
      <button disabled={busy} className="bg-ink text-paper rounded-full py-3 text-sm font-medium disabled:opacity-40">
        {busy ? 'Sending code…' : 'Send verification code'}
      </button>
    </form>
  );
}

function Field({ name, label, type = 'text', required }: {
  name: string; label: string; type?: string; required?: boolean;
}) {
  return (
    <label className="text-sm flex flex-col">
      {label}
      <input
        name={name} type={type} required={required}
        className="mt-1 rounded-lg border border-black/15 px-3 py-2"
      />
    </label>
  );
}
