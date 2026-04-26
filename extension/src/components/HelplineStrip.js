import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import helplines from '../data/helplines.json';
export function HelplineStrip() {
    const childline = helplines.lines[0];
    return (_jsx("footer", { className: "px-5 py-3 border-t border-black/10 bg-paper", children: _jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsxs("div", { className: "text-[11px] text-muted leading-tight", children: ["If anything here is hard to read,", _jsx("br", {}), "help is one tap away."] }), _jsxs("a", { href: childline.url, target: "_blank", rel: "noopener noreferrer", className: "text-xs font-medium bg-ink text-paper rounded-full px-3 py-1.5", children: [childline.name, " \u00B7 ", childline.number] })] }) }));
}
