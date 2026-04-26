'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function SignatureCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [target, setTarget] = useState(100_000);

  useEffect(() => {
    const base =
      (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SIGN_ENDPOINT) || '';
    const url = base ? `${base}/count` : '/api/count';
    const fetchCount = () =>
      fetch(url)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => {
          setCount(d.count ?? 0);
          if (d.target) setTarget(d.target);
        })
        .catch(() => {});
    fetchCount();
    // Re-fetch when user returns to the tab (e.g. after signing on /sign).
    const onVisible = () => {
      if (document.visibilityState === 'visible') fetchCount();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  const pct = count != null ? Math.min(100, (count / target) * 100) : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <Link
          href="/voices"
          aria-label="See all signatures"
          className="font-serif text-3xl underline-offset-4 hover:underline"
        >
          {count != null ? count.toLocaleString('en-IN') : '—'}
        </Link>
        <div className="text-xs text-muted">of {target.toLocaleString('en-IN')}</div>
      </div>
      <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
        <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <Link href="/voices" className="text-[11px] text-muted underline self-end">
        Read what people are saying →
      </Link>
    </div>
  );
}
