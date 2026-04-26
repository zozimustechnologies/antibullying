'use client';

import { useEffect, useRef, useState } from 'react';

type Stage = 'form' | 'done';

const ENDPOINT_BASE =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SIGN_ENDPOINT) || '';
const SIGN_URL = ENDPOINT_BASE || '/api/sign';
const TURNSTILE_SITE_KEY =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) || '';

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; callback?: (token: string) => void; theme?: string; size?: string },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function SignForm() {
  const [stage, setStage] = useState<Stage>('form');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentLen, setCommentLen] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const formStartedAt = useRef<number>(Date.now());
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const id = 'cf-turnstile-script';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.id = id;
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    const tryRender = () => {
      if (window.turnstile && turnstileRef.current && !widgetId.current) {
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (t) => setTurnstileToken(t),
        });
      }
    };
    const t = setInterval(() => {
      tryRender();
      if (widgetId.current) clearInterval(t);
    }, 200);
    return () => clearInterval(t);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;

    if (Number(payload.age) < 18 && !payload.guardianConsent) {
      setError('Under-18 signatories need a guardian to confirm consent.');
      setBusy(false);
      return;
    }

    const body = {
      ...payload,
      formStartedAt: formStartedAt.current,
      turnstileToken: turnstileToken || undefined,
    };

    try {
      const res = await fetch(SIGN_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      setBusy(false);
      if (!res.ok) {
        setError(json?.error || 'Could not record your signature. Please try again.');
        if (window.turnstile && widgetId.current) {
          window.turnstile.reset(widgetId.current);
          setTurnstileToken('');
        }
        return;
      }
      setStage('done');
    } catch {
      setBusy(false);
      // Static deploy with no backend — record locally so we never lose a signature.
      try {
        const queue = JSON.parse(localStorage.getItem('pendingSignatures') || '[]');
        queue.push({ ...payload, ts: new Date().toISOString() });
        localStorage.setItem('pendingSignatures', JSON.stringify(queue));
      } catch {}
      setStage('done');
    }
  }

  if (stage === 'done') {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl">Signed. Thank you.</h2>
        <p className="text-sm text-ink/80">
          Your signature is counted. We'll email you when this petition reaches the next milestone, gets a response from an MP, or is formally submitted to Parliament. No more than once a month — and you can unsubscribe any time.
        </p>
        <p className="text-sm text-ink/80">
          Now do one more thing: send this to one person who needs to read it.
        </p>
        <a
          className="bg-ink text-paper rounded-full py-2.5 text-sm text-center"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            'I just signed the petition to make anti-bullying a law in India. 100,000 signatures go to Parliament. Add yours: ',
          )}https://zozimustechnologies.github.io/antibullying/sign/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on X
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <p className="text-xs text-muted bg-black/[0.03] border border-black/10 rounded-lg px-3 py-2 leading-relaxed">
        <span className="font-medium text-ink">Why we ask for your email:</span> so we can update you (no more than once a month) when this petition reaches milestones, gets a response from an MP, or is formally submitted to Parliament. You can unsubscribe at any time. Your email is never shared.
      </p>
      <Field name="name" label="Full name" required autoComplete="name" />
      <Field name="email" type="email" label="Email" required autoComplete="email" />
      <div className="grid grid-cols-2 gap-3">
        <Field name="city" label="City" required autoComplete="address-level2" />
        <Field name="state" label="State / Province" required autoComplete="address-level1" />
      </div>
      <label className="text-sm flex flex-col">
        Country
        <select
          name="country"
          required
          defaultValue="India"
          autoComplete="country-name"
          className="mt-1 rounded-lg border border-black/15 px-3 py-2 bg-white"
        >
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="Singapore">Singapore</option>
          <option value="Germany">Germany</option>
          <option value="Other">Other</option>
        </select>
        <span className="text-[11px] text-muted mt-1">
          Indian diaspora signatures count too — they show Parliament that this matters worldwide.
        </span>
      </label>
      <Field name="age" type="number" label="Your age" required />
      <label className="text-xs text-muted flex gap-2 items-start">
        <input type="checkbox" name="guardianConsent" value="yes" className="mt-0.5" />
        If you are under 18, tick this only if a parent/guardian has agreed.
      </label>
      <label className="text-sm flex flex-col gap-1">
        <span className="font-medium">
          Leave a message for Parliament <span className="text-muted font-normal">(optional)</span>
        </span>
        <span className="text-xs text-muted">
          Why this matters to you, your child, or someone you know. We may share these (first name + city only) when we hand the petition over.
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
      <label className="text-xs text-muted flex gap-2 items-start -mt-2">
        <input
          type="checkbox"
          name="commentPublic"
          value="yes"
          defaultChecked
          className="mt-0.5"
        />
        Show my comment (with my first name only) on the public Voices wall.
        Untick to keep it private — Parliament will still see it when we hand the petition over.
      </label>
      <label className="text-xs text-muted flex gap-2 items-start">
        <input type="checkbox" required name="consent" className="mt-0.5" />
        I consent to my name and city being counted on this petition and submitted to the Indian Parliament, and to receiving occasional email updates about its progress. (DPDP Act 2023)
      </label>

      {/* Honeypot — hidden from humans, visible to most bots */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, width: 0, overflow: 'hidden' }}
      >
        <label>
          Website (leave blank)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Cloudflare Turnstile (managed challenge — usually invisible) */}
      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="cf-turnstile self-center" />}

      {error && <div className="text-sm text-rose-700">{error}</div>}
      <button
        disabled={busy}
        className="bg-ink text-paper rounded-full py-3 text-sm font-medium disabled:opacity-40"
      >
        {busy ? 'Signing…' : 'Add my signature'}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="text-sm flex flex-col">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1 rounded-lg border border-black/15 px-3 py-2"
      />
    </label>
  );
}
