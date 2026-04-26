import data from '../data/countries.json';

export function Learn() {
  const india = data.countries.find((c) => (c as any).isHome);
  const others = data.countries.filter((c) => !(c as any).isHome);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif text-2xl leading-snug">How the world handles bullying</h2>
        <p className="text-sm text-muted mt-2">
          Eight countries below have anti-bullying frameworks in law. India has guidelines.
          Spot the difference.
        </p>
      </div>

      {india && (
        <div className="rounded-2xl border border-accent/40 bg-accent/[0.06] p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-xl">{india.flag}</span> {india.name} — today
          </div>
          <div className="text-sm">{india.law}</div>
          <div className="text-xs text-muted">{india.mechanism}</div>
          <div className="text-sm font-serif italic pt-1">“{india.punchline}”</div>
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {others.map((c) => (
          <li
            key={c.code}
            className="rounded-2xl border border-black/10 bg-white/60 p-4 flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-xl">{c.flag}</span> {c.name}
              </div>
              <div className="text-[11px] text-muted">{c.since}</div>
            </div>
            <div className="text-sm">{c.law}</div>
            <div className="text-xs text-muted">{c.mechanism}</div>
            <div className="text-sm font-serif italic pt-1">“{c.punchline}”</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
