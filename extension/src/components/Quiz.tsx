import { useMemo, useState } from 'react';

type Option = { id: string; text: string };
type Question = {
  id: string;
  prompt: string;
  options: Option[];
  correct: string | string[];
  multi?: boolean;
  why: string;
  world: string;
  india: string;
  stat: string;
};
type QuizData = {
  intro: { title: string; subtitle: string };
  questions: Question[];
  outro: { fallbackForWrong: string };
};

export function Quiz({
  data,
  onDone,
}: {
  data: QuizData;
  onDone: (score: { correct: number; total: number }) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const q = data.questions[idx];
  const isLast = idx === data.questions.length - 1;

  const isCorrect = useMemo(() => {
    if (!revealed) return false;
    if (q.multi && Array.isArray(q.correct)) {
      const a = [...q.correct].sort().join(',');
      const b = [...picked].sort().join(',');
      return a === b;
    }
    return picked[0] === q.correct;
  }, [revealed, picked, q]);

  function toggle(id: string) {
    if (revealed) return;
    if (q.multi) {
      setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    } else {
      setPicked([id]);
    }
  }

  function reveal() {
    setRevealed(true);
    const correct =
      q.multi && Array.isArray(q.correct)
        ? [...q.correct].sort().join(',') === [...picked].sort().join(',')
        : picked[0] === q.correct;
    if (correct) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (isLast) {
      onDone({ correct: correctCount, total: data.questions.length });
      return;
    }
    setIdx((i) => i + 1);
    setPicked([]);
    setRevealed(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted">
        <span>Question {idx + 1} of {data.questions.length}</span>
        <span>{q.multi ? 'Pick all that apply' : 'Pick one'}</span>
      </div>

      <h2 className="font-serif text-lg leading-snug">{q.prompt}</h2>

      <ul className="flex flex-col gap-2">
        {q.options.map((o) => {
          const selected = picked.includes(o.id);
          const correctSet = Array.isArray(q.correct) ? q.correct : [q.correct];
          const showRight = revealed && correctSet.includes(o.id);
          const showWrong = revealed && selected && !correctSet.includes(o.id);
          return (
            <li key={o.id}>
              <button
                onClick={() => toggle(o.id)}
                disabled={revealed}
                className={[
                  'w-full text-left text-sm rounded-xl px-3 py-2 border transition',
                  selected ? 'border-ink' : 'border-black/15',
                  showRight ? 'bg-emerald-50 border-emerald-600' : '',
                  showWrong ? 'bg-rose-50 border-rose-600' : '',
                  !revealed ? 'hover:border-ink' : '',
                ].join(' ')}
              >
                {o.text}
              </button>
            </li>
          );
        })}
      </ul>

      {!revealed ? (
        <button
          onClick={reveal}
          disabled={picked.length === 0}
          className="mt-1 bg-ink text-paper rounded-full py-2.5 text-sm font-medium disabled:opacity-30"
        >
          Reveal answer
        </button>
      ) : (
        <div className="flex flex-col gap-3 fade-in">
          <div className="text-xs uppercase tracking-widest text-muted">
            {isCorrect ? '✓ You got it' : '✗ ' + data.outro.fallbackForWrong}
          </div>
          <div className="text-sm leading-relaxed">{q.why}</div>
          <div className="rounded-lg bg-black/[0.04] p-3 text-xs leading-relaxed flex flex-col gap-2">
            <div><span className="font-medium">🌍 Around the world: </span>{q.world}</div>
            <div><span className="font-medium">🇮🇳 In India today: </span>{q.india}</div>
            <div className="text-muted">{q.stat}</div>
          </div>
          <button
            onClick={next}
            className="bg-ink text-paper rounded-full py-2.5 text-sm font-medium"
          >
            {isLast ? 'See what comes next →' : 'Next question →'}
          </button>
        </div>
      )}
    </div>
  );
}
