import countries from '../../data/countries.json';

export default function WorldPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-6">
      <a href="/" className="text-xs text-muted underline">← Back</a>
      <h1 className="font-serif text-3xl">Around the world</h1>
      <p className="text-ink/80 leading-relaxed">
        Eight countries below have anti-bullying frameworks in law. India has guidelines.
      </p>
      <ul className="flex flex-col gap-3">
        {countries.countries.map((c) => (
          <li key={c.code} className={`rounded-2xl border p-4 flex flex-col gap-1.5 ${(c as any).isHome ? 'border-accent/40 bg-accent/[0.06]' : 'border-black/10 bg-white/60'}`}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium"><span className="text-xl mr-2">{c.flag}</span>{c.name}</div>
              <div className="text-xs text-muted">{c.since}</div>
            </div>
            <div className="text-sm">{c.law}</div>
            <div className="text-xs text-muted">{c.mechanism}</div>
            <div className="text-sm font-serif italic pt-1">“{c.punchline}”</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
