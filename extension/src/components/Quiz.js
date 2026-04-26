import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
export function Quiz({ data, onDone, }) {
    const [idx, setIdx] = useState(0);
    const [picked, setPicked] = useState([]);
    const [revealed, setRevealed] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const q = data.questions[idx];
    const isLast = idx === data.questions.length - 1;
    const isCorrect = useMemo(() => {
        if (!revealed)
            return false;
        if (q.multi && Array.isArray(q.correct)) {
            const a = [...q.correct].sort().join(',');
            const b = [...picked].sort().join(',');
            return a === b;
        }
        return picked[0] === q.correct;
    }, [revealed, picked, q]);
    function toggle(id) {
        if (revealed)
            return;
        if (q.multi) {
            setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
        }
        else {
            setPicked([id]);
        }
    }
    function reveal() {
        setRevealed(true);
        const correct = q.multi && Array.isArray(q.correct)
            ? [...q.correct].sort().join(',') === [...picked].sort().join(',')
            : picked[0] === q.correct;
        if (correct)
            setCorrectCount((c) => c + 1);
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
    return (_jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] uppercase tracking-widest text-muted", children: [_jsxs("span", { children: ["Question ", idx + 1, " of ", data.questions.length] }), _jsx("span", { children: q.multi ? 'Pick all that apply' : 'Pick one' })] }), _jsx("h2", { className: "font-serif text-lg leading-snug", children: q.prompt }), _jsx("ul", { className: "flex flex-col gap-2", children: q.options.map((o) => {
                    const selected = picked.includes(o.id);
                    const correctSet = Array.isArray(q.correct) ? q.correct : [q.correct];
                    const showRight = revealed && correctSet.includes(o.id);
                    const showWrong = revealed && selected && !correctSet.includes(o.id);
                    return (_jsx("li", { children: _jsx("button", { onClick: () => toggle(o.id), disabled: revealed, className: [
                                'w-full text-left text-sm rounded-xl px-3 py-2 border transition',
                                selected ? 'border-ink' : 'border-black/15',
                                showRight ? 'bg-emerald-50 border-emerald-600' : '',
                                showWrong ? 'bg-rose-50 border-rose-600' : '',
                                !revealed ? 'hover:border-ink' : '',
                            ].join(' '), children: o.text }) }, o.id));
                }) }), !revealed ? (_jsx("button", { onClick: reveal, disabled: picked.length === 0, className: "mt-1 bg-ink text-paper rounded-full py-2.5 text-sm font-medium disabled:opacity-30", children: "Reveal answer" })) : (_jsxs("div", { className: "flex flex-col gap-3 fade-in", children: [_jsx("div", { className: "text-xs uppercase tracking-widest text-muted", children: isCorrect ? '✓ You got it' : '✗ ' + data.outro.fallbackForWrong }), _jsx("div", { className: "text-sm leading-relaxed", children: q.why }), _jsxs("div", { className: "rounded-lg bg-black/[0.04] p-3 text-xs leading-relaxed flex flex-col gap-2", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "\uD83C\uDF0D Around the world: " }), q.world] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "\uD83C\uDDEE\uD83C\uDDF3 In India today: " }), q.india] }), _jsx("div", { className: "text-muted", children: q.stat })] }), _jsx("button", { onClick: next, className: "bg-ink text-paper rounded-full py-2.5 text-sm font-medium", children: isLast ? 'See what comes next →' : 'Next question →' })] }))] }));
}
