import { useState } from 'react';
import quiz from '../data/quiz.json';
import { Quiz } from '../components/Quiz';
import { HelplineStrip } from '../components/HelplineStrip';
import { openSidePanel } from '../lib/sidepanel';
import { PETITION_URL } from '../config';

type View = 'home' | 'quiz' | 'done';

export function Popup() {
  const [view, setView] = useState<View>('home');
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);

  return (
    <div className="flex flex-col min-h-[520px] bg-paper text-ink">
      <header className="px-5 pt-5 pb-2 flex items-center justify-between">
        <div className="font-serif text-xl tracking-tight">StandUp</div>
        <button
          className="text-xs text-muted underline underline-offset-2"
          onClick={() => openSidePanel()}
        >
          Learn &amp; Stories →
        </button>
      </header>

      <main className="flex-1 px-5 py-4">
        {view === 'home' && (
          <Home onStart={() => setView('quiz')} />
        )}
        {view === 'quiz' && (
          <Quiz
            data={quiz as any}
            onDone={(s) => {
              setScore(s);
              setView('done');
            }}
          />
        )}
        {view === 'done' && (
          <Done
            score={score!}
            onSign={() => {
              window.open(PETITION_URL, '_blank');
            }}
            onLearnMore={() => {
              openSidePanel('weight');
              window.close();
            }}
          />
        )}
      </main>

      <HelplineStrip />
    </div>
  );
}

function Home({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-serif text-2xl leading-snug">
        Do you know bullying<br />when you see it?
      </h1>
      <p className="text-sm text-muted">
        7 short questions. Most people get at least 3 wrong — including the ones that matter most.
      </p>
      <button
        onClick={onStart}
        className="mt-2 bg-ink text-paper rounded-full py-3 text-sm font-medium hover:opacity-90"
      >
        Start the quiz
      </button>
      <div className="text-[11px] text-muted leading-relaxed pt-2 border-t border-black/10">
        India has no national anti-bullying law — only a guideline.
        This extension exists to change that.
      </div>
    </div>
  );
}

function Done({
  score,
  onSign,
  onLearnMore,
}: {
  score: { correct: number; total: number };
  onSign: () => void;
  onLearnMore: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs uppercase tracking-widest text-muted">You're done</p>
      <h2 className="font-serif text-2xl leading-snug">
        {score.correct} of {score.total} right.<br />
        That's not the point.
      </h2>

      <div className="rounded-2xl bg-ink text-paper p-4 flex flex-col gap-2 fade-in">
        <p className="text-[11px] uppercase tracking-widest text-paper/60">
          Here's the good news
        </p>
        <p className="font-serif text-base leading-snug">
          Every country with a law today started without one.
        </p>
        <p className="text-xs text-paper/80 leading-relaxed">
          Norway passed §9A after parents, teachers, and students refused to stay quiet.
          Japan legislated in 2013 after a single community said <em>enough</em>.
          South Korea strengthened its law after children, not politicians, led the call.
          <br /><br />
          Laws don't change because Parliament wakes up one morning.
          They change because <strong>100,000 ordinary people</strong> made one MP's inbox impossible to ignore.
          <br /><br />
          That's all this is. One signature. One share. One conversation tonight at dinner.
          A 13-year-old started this campaign while still being bullied.
          You finishing this quiz means he is no longer doing it alone.
        </p>
      </div>

      <p className="text-sm text-ink/80 leading-relaxed">
        India has no national anti-bullying law — only a guideline.
        We need <strong>100,000 signatures</strong> to take this to Parliament.
      </p>

      <button
        onClick={onSign}
        className="mt-1 bg-accent text-paper rounded-full py-3 text-sm font-medium hover:opacity-90"
      >
        Sign the petition →
      </button>
      <button
        onClick={onLearnMore}
        className="text-xs text-muted underline underline-offset-2"
      >
        Read more first
      </button>
    </div>
  );
}
