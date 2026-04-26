import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { TheWeight } from './TheWeight';
import { Learn } from './Learn';
import { FoundersStory } from './FoundersStory';
import { Helplines } from './Helplines';
import { HelplineStrip } from '../components/HelplineStrip';
export function SidePanel() {
    const [tab, setTab] = useState('weight');
    useEffect(() => {
        chrome.storage?.local.get('initialHash').then((r) => {
            const v = r?.initialHash;
            if (v === 'weight' || v === 'learn' || v === 'founder' || v === 'helplines') {
                setTab(v);
                chrome.storage.local.remove('initialHash');
            }
        });
    }, []);
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-paper text-ink", children: [_jsx("header", { className: "px-5 pt-5 pb-2", children: _jsx("div", { className: "font-serif text-xl tracking-tight", children: "StandUp" }) }), _jsxs("nav", { className: "px-5 pt-2 pb-3 flex gap-1 text-xs border-b border-black/10 overflow-x-auto", children: [_jsx(TabBtn, { cur: tab, v: "weight", onClick: setTab, children: "The Weight" }), _jsx(TabBtn, { cur: tab, v: "learn", onClick: setTab, children: "Around the world" }), _jsx(TabBtn, { cur: tab, v: "founder", onClick: setTab, children: "His story" }), _jsx(TabBtn, { cur: tab, v: "helplines", onClick: setTab, children: "Get help" })] }), _jsxs("main", { className: "flex-1 px-5 py-5", children: [tab === 'weight' && _jsx(TheWeight, { onGoFounder: () => setTab('founder') }), tab === 'learn' && _jsx(Learn, {}), tab === 'founder' && _jsx(FoundersStory, {}), tab === 'helplines' && _jsx(Helplines, {})] }), _jsx(HelplineStrip, {})] }));
}
function TabBtn({ cur, v, onClick, children, }) {
    const active = cur === v;
    return (_jsx("button", { onClick: () => onClick(v), className: [
            'px-3 py-1.5 rounded-full whitespace-nowrap',
            active ? 'bg-ink text-paper' : 'bg-black/[0.04] text-ink hover:bg-black/[0.08]',
        ].join(' '), children: children }));
}
