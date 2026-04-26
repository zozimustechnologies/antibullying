import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import quiz from '../data/quiz.json';
import { Quiz } from '../components/Quiz';
import { HelplineStrip } from '../components/HelplineStrip';
import { openSidePanel } from '../lib/sidepanel';
import { PETITION_URL } from '../config';
export function Popup() {
    const [view, setView] = useState('home');
    const [score, setScore] = useState(null);
    return (_jsxs("div", { className: "flex flex-col min-h-[520px] bg-paper text-ink", children: [_jsxs("header", { className: "px-5 pt-5 pb-2 flex items-center justify-between", children: [_jsx("div", { className: "font-serif text-xl tracking-tight", children: "StandUp" }), _jsx("button", { className: "text-xs text-muted underline underline-offset-2", onClick: () => openSidePanel(), children: "Learn & Stories \u2192" })] }), _jsxs("main", { className: "flex-1 px-5 py-4", children: [view === 'home' && (_jsx(Home, { onStart: () => setView('quiz') })), view === 'quiz' && (_jsx(Quiz, { data: quiz, onDone: (s) => {
                            setScore(s);
                            setView('done');
                        } })), view === 'done' && (_jsx(Done, { score: score, onSign: () => {
                            window.open(PETITION_URL, '_blank');
                        }, onLearnMore: () => {
                            openSidePanel('weight');
                            window.close();
                        } }))] }), _jsx(HelplineStrip, {})] }));
}
function Home({ onStart }) {
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("h1", { className: "font-serif text-2xl leading-snug", children: ["Do you know bullying", _jsx("br", {}), "when you see it?"] }), _jsx("p", { className: "text-sm text-muted", children: "7 short questions. Most people get at least 3 wrong \u2014 including the ones that matter most." }), _jsx("button", { onClick: onStart, className: "mt-2 bg-ink text-paper rounded-full py-3 text-sm font-medium hover:opacity-90", children: "Start the quiz" }), _jsx("div", { className: "text-[11px] text-muted leading-relaxed pt-2 border-t border-black/10", children: "India has no national anti-bullying law \u2014 only a guideline. This extension exists to change that." })] }));
}
function Done({ score, onSign, onLearnMore, }) {
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("p", { className: "text-xs uppercase tracking-widest text-muted", children: "You're done" }), _jsxs("h2", { className: "font-serif text-2xl leading-snug", children: [score.correct, " of ", score.total, " right.", _jsx("br", {}), "That's not the point."] }), _jsxs("div", { className: "rounded-2xl bg-ink text-paper p-4 flex flex-col gap-2 fade-in", children: [_jsx("p", { className: "text-[11px] uppercase tracking-widest text-paper/60", children: "Here's the good news" }), _jsx("p", { className: "font-serif text-base leading-snug", children: "Every country with a law today started without one." }), _jsxs("p", { className: "text-xs text-paper/80 leading-relaxed", children: ["Norway passed \u00A79A after parents, teachers, and students refused to stay quiet. Japan legislated in 2013 after a single community said ", _jsx("em", { children: "enough" }), ". South Korea strengthened its law after children, not politicians, led the call.", _jsx("br", {}), _jsx("br", {}), "Laws don't change because Parliament wakes up one morning. They change because ", _jsx("strong", { children: "100,000 ordinary people" }), " made one MP's inbox impossible to ignore.", _jsx("br", {}), _jsx("br", {}), "That's all this is. One signature. One share. One conversation tonight at dinner. A 13-year-old started this campaign while still being bullied. You finishing this quiz means he is no longer doing it alone."] })] }), _jsxs("p", { className: "text-sm text-ink/80 leading-relaxed", children: ["India has no national anti-bullying law \u2014 only a guideline. We need ", _jsx("strong", { children: "100,000 signatures" }), " to take this to Parliament."] }), _jsx("button", { onClick: onSign, className: "mt-1 bg-accent text-paper rounded-full py-3 text-sm font-medium hover:opacity-90", children: "Sign the petition \u2192" }), _jsx("button", { onClick: onLearnMore, className: "text-xs text-muted underline underline-offset-2", children: "Read more first" })] }));
}
