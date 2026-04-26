import asks from '../content/seven-asks.json';

export function SevenAsks() {
  return (
    <section className="flex flex-col gap-6 border-t border-black/10 pt-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-muted">Our seven asks of Parliament</p>
        <h2 className="font-serif text-3xl md:text-4xl leading-tight">{asks.title}</h2>
        <p className="text-ink/80 leading-relaxed">{asks.intro}</p>
      </div>

      <ol className="flex flex-col gap-4">
        {asks.asks.map((a) => (
          <li
            key={a.n}
            className="rounded-2xl border border-black/10 bg-white/60 p-5 flex flex-col gap-3"
          >
            <div className="flex items-start gap-4">
              <div className="font-serif text-3xl text-accent leading-none w-8 shrink-0">
                {a.n}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-lg leading-snug">{a.title}</h3>
                <p className="text-sm text-ink/85 leading-relaxed">{a.ask}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 pl-12">
              <div className="rounded-xl bg-emerald-50 p-3 text-xs leading-relaxed">
                <div className="font-medium text-emerald-900 mb-1">🌍 Around the world</div>
                <div className="text-emerald-950/80">{a.abroad}</div>
              </div>
              <div className="rounded-xl bg-rose-50 p-3 text-xs leading-relaxed">
                <div className="font-medium text-rose-900 mb-1">🇮🇳 In India today</div>
                <div className="text-rose-950/80">{a.indiaToday}</div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="font-serif text-lg leading-relaxed text-ink/80 italic">
        “{asks.closing}”
      </p>
    </section>
  );
}
