import story from '../../content/founders-story.json';

export default function FounderPage() {
  if (!story.published) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-4">
        <a href="/" className="text-xs text-muted underline">← Back</a>
        <p className="text-xs uppercase tracking-widest text-muted">A note from the team</p>
        <h1 className="font-serif text-3xl">{story.placeholderHeading}</h1>
        <p className="text-ink/80 leading-relaxed">{story.placeholderBody}</p>
        <div className="text-xs text-muted border-t border-black/10 pt-4 mt-4 leading-relaxed">
          The founder is 13 years old. We follow a strict safeguarding protocol — guardian
          consent, child-psychologist review, no naming of bullies or the school, and a
          one-tap takedown route.
        </div>
      </main>
    );
  }
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-4">
      <a href="/" className="text-xs text-muted underline">← Back</a>
      <p className="text-xs uppercase tracking-widest text-muted">A first-person account</p>
      <h1 className="font-serif text-3xl">{story.story.title}</h1>
      {story.story.byline && <div className="text-xs text-muted">— {story.story.byline}</div>}
      <div className="text-xs text-muted leading-relaxed border-l-2 border-accent pl-3">
        Content note: a real account written by a 13-year-old. CHILDLINE 1098 is free, 24/7.
      </div>
      <article className="font-serif text-lg leading-relaxed whitespace-pre-line">
        {story.story.body}
      </article>
    </main>
  );
}
