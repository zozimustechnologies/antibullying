import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import data from '../data/the-weight.json';
import { PETITION_URL, SHARE_TEXT, SITE_URL } from '../config';
export function TheWeight({ onGoFounder }) {
    const [i, setI] = useState(0);
    const [hardNumbers, setHardNumbers] = useState(false);
    const screen = data.screens[i];
    const isLast = i === data.screens.length - 1;
    function handleCta(to) {
        if (to === 'founder')
            return onGoFounder();
        if (to === 'petition')
            return window.open(PETITION_URL, '_blank');
        if (to === 'share') {
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT + ' ' + SITE_URL)}`;
            return window.open(url, '_blank');
        }
    }
    return (_jsxs("div", { className: "flex flex-col items-center text-center gap-6 py-4", children: [_jsxs("div", { className: "text-[10px] uppercase tracking-widest text-muted", children: [i + 1, " / ", data.screens.length] }), _jsx("div", { className: "fade-in font-serif text-lg leading-relaxed max-w-md whitespace-pre-line", children: screen.lines.join('\n') }, screen.id), screen.source && (_jsxs("div", { className: "text-[11px] text-muted", children: ["\u2014 ", screen.source] })), screen.hasHardNumbersToggle && !hardNumbers && (_jsx("button", { onClick: () => setHardNumbers(true), className: "text-xs underline underline-offset-2 text-muted", children: "Show me the hard numbers" })), screen.hasHardNumbersToggle && hardNumbers && (_jsx("div", { className: "text-xs text-muted max-w-md leading-relaxed fade-in", children: "Children bullied for prolonged periods can have a multi-fold higher risk of suicidal ideation compared to peers, and elevated rates of clinical depression and anxiety into adulthood (Yale meta-analyses; multiple longitudinal cohorts)." })), _jsxs("div", { className: "flex flex-col gap-2 w-full max-w-xs pt-2", children: [screen.ctaPrimary && (_jsx("button", { onClick: () => handleCta(screen.ctaPrimary.to), className: "bg-ink text-paper rounded-full py-2.5 text-sm font-medium", children: screen.ctaPrimary.label })), screen.ctaSecondary && (_jsx("button", { onClick: () => handleCta(screen.ctaSecondary.to), className: "text-sm text-ink underline underline-offset-2", children: screen.ctaSecondary.label }))] }), _jsxs("div", { className: "flex items-center justify-between w-full pt-6", children: [_jsx("button", { onClick: () => setI((n) => Math.max(0, n - 1)), disabled: i === 0, className: "text-xs text-muted disabled:opacity-30", children: "\u2190 Back" }), !isLast && (_jsx("button", { onClick: () => setI((n) => Math.min(data.screens.length - 1, n + 1)), className: "text-xs text-ink underline underline-offset-2", children: "Continue \u2192" }))] })] }));
}
