import helplines from '../data/helplines.json';

export function HelplineStrip() {
  const childline = helplines.lines[0];
  return (
    <footer className="px-5 py-3 border-t border-black/10 bg-paper">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] text-muted leading-tight">
          If anything here is hard to read,
          <br />
          help is one tap away.
        </div>
        <a
          href={childline.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium bg-ink text-paper rounded-full px-3 py-1.5"
        >
          {childline.name} · {childline.number}
        </a>
      </div>
    </footer>
  );
}
