import data from '../data/founders-story.json';

export function FoundersStory() {
  if (!data.published) {
    return (
      <div className="flex flex-col gap-3 max-w-md">
        <div className="text-xs uppercase tracking-widest text-muted">A note from the team</div>
        <h2 className="font-serif text-2xl leading-snug">{data.placeholderHeading}</h2>
        <p className="text-sm leading-relaxed text-ink/80">{data.placeholderBody}</p>
        <div className="text-[11px] text-muted pt-3 border-t border-black/10 mt-3 leading-relaxed">
          The founder is 13 years old. We follow a strict safeguarding protocol — guardian
          consent, child-psychologist review, no naming of bullies or the school, and a
          one-tap takedown route. You can read the protocol in our public repo.
        </div>
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-3 max-w-md">
      <div className="text-xs uppercase tracking-widest text-muted">A first-person account</div>
      <h2 className="font-serif text-2xl leading-snug">{data.story.title}</h2>
      {data.story.byline && (
        <div className="text-xs text-muted">— {data.story.byline}</div>
      )}
      <div className="text-[11px] text-muted leading-relaxed border-l-2 border-accent pl-3">
        Content note: this is a real account written by a 13-year-old. If you're a young
        person reading this and any of it feels familiar, you are not alone. CHILDLINE 1098
        is free and 24/7.
      </div>
      <div className="text-base leading-relaxed whitespace-pre-line font-serif">
        {data.story.body}
      </div>
    </article>
  );
}
