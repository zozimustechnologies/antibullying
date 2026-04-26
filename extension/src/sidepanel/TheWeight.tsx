import { useState } from 'react';
import data from '../data/the-weight.json';
import { PETITION_URL, SHARE_TEXT, SITE_URL } from '../config';

type Screen = (typeof data.screens)[number];

export function TheWeight({ onGoFounder }: { onGoFounder: () => void }) {
  const [i, setI] = useState(0);
  const [hardNumbers, setHardNumbers] = useState(false);
  const screen = data.screens[i] as Screen;
  const isLast = i === data.screens.length - 1;

  function handleCta(to?: string) {
    if (to === 'founder') return onGoFounder();
    if (to === 'petition') return window.open(PETITION_URL, '_blank');
    if (to === 'share') {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        SHARE_TEXT + ' ' + SITE_URL
      )}`;
      return window.open(url, '_blank');
    }
  }

  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <div className="text-[10px] uppercase tracking-widest text-muted">
        {i + 1} / {data.screens.length}
      </div>

      <div key={screen.id} className="fade-in font-serif text-lg leading-relaxed max-w-md whitespace-pre-line">
        {screen.lines.join('\n')}
      </div>

      {(screen as any).source && (
        <div className="text-[11px] text-muted">— {(screen as any).source}</div>
      )}

      {(screen as any).hasHardNumbersToggle && !hardNumbers && (
        <button
          onClick={() => setHardNumbers(true)}
          className="text-xs underline underline-offset-2 text-muted"
        >
          Show me the hard numbers
        </button>
      )}
      {(screen as any).hasHardNumbersToggle && hardNumbers && (
        <div className="text-xs text-muted max-w-md leading-relaxed fade-in">
          Children bullied for prolonged periods can have a multi-fold higher risk of suicidal ideation
          compared to peers, and elevated rates of clinical depression and anxiety into adulthood
          (Yale meta-analyses; multiple longitudinal cohorts).
        </div>
      )}

      <div className="flex flex-col gap-2 w-full max-w-xs pt-2">
        {(screen as any).ctaPrimary && (
          <button
            onClick={() => handleCta((screen as any).ctaPrimary.to)}
            className="bg-ink text-paper rounded-full py-2.5 text-sm font-medium"
          >
            {(screen as any).ctaPrimary.label}
          </button>
        )}
        {(screen as any).ctaSecondary && (
          <button
            onClick={() => handleCta((screen as any).ctaSecondary.to)}
            className="text-sm text-ink underline underline-offset-2"
          >
            {(screen as any).ctaSecondary.label}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between w-full pt-6">
        <button
          onClick={() => setI((n) => Math.max(0, n - 1))}
          disabled={i === 0}
          className="text-xs text-muted disabled:opacity-30"
        >
          ← Back
        </button>
        {!isLast && (
          <button
            onClick={() => setI((n) => Math.min(data.screens.length - 1, n + 1))}
            className="text-xs text-ink underline underline-offset-2"
          >
            Continue →
          </button>
        )}
      </div>
    </div>
  );
}
