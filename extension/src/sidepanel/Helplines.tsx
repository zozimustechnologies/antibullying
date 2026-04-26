import data from '../data/helplines.json';

export function Helplines() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-serif text-2xl leading-snug">If you need to talk to someone</h2>
        <p className="text-sm text-muted mt-2">{data.intro}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {data.lines.map((l) => (
          <li
            key={l.name}
            className="rounded-2xl border border-black/10 bg-white/60 p-4 flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{l.name}</div>
              <a
                href={`tel:${l.number.replace(/\s/g, '')}`}
                className="text-sm font-medium bg-ink text-paper rounded-full px-3 py-1"
              >
                {l.number}
              </a>
            </div>
            <div className="text-xs text-muted">{l.for}</div>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] underline underline-offset-2 text-muted"
            >
              {l.url}
            </a>
          </li>
        ))}
      </ul>

      <div className="text-xs text-muted border-t border-black/10 pt-3">{data.note}</div>
    </div>
  );
}
