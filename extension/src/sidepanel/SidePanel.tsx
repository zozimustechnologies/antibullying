import { useEffect, useState } from 'react';
import { TheWeight } from './TheWeight';
import { Learn } from './Learn';
import { FoundersStory } from './FoundersStory';
import { Helplines } from './Helplines';
import { HelplineStrip } from '../components/HelplineStrip';

type Tab = 'weight' | 'learn' | 'founder' | 'helplines';

export function SidePanel() {
  const [tab, setTab] = useState<Tab>('weight');

  useEffect(() => {
    chrome.storage?.local.get('initialHash').then((r) => {
      const v = r?.initialHash as Tab | undefined;
      if (v === 'weight' || v === 'learn' || v === 'founder' || v === 'helplines') {
        setTab(v);
        chrome.storage.local.remove('initialHash');
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <header className="px-5 pt-5 pb-2">
        <div className="font-serif text-xl tracking-tight">StandUp</div>
      </header>

      <nav className="px-5 pt-2 pb-3 flex gap-1 text-xs border-b border-black/10 overflow-x-auto">
        <TabBtn cur={tab} v="weight" onClick={setTab}>The Weight</TabBtn>
        <TabBtn cur={tab} v="learn" onClick={setTab}>Around the world</TabBtn>
        <TabBtn cur={tab} v="founder" onClick={setTab}>His story</TabBtn>
        <TabBtn cur={tab} v="helplines" onClick={setTab}>Get help</TabBtn>
      </nav>

      <main className="flex-1 px-5 py-5">
        {tab === 'weight' && <TheWeight onGoFounder={() => setTab('founder')} />}
        {tab === 'learn' && <Learn />}
        {tab === 'founder' && <FoundersStory />}
        {tab === 'helplines' && <Helplines />}
      </main>

      <HelplineStrip />
    </div>
  );
}

function TabBtn({
  cur, v, onClick, children,
}: {
  cur: string; v: Tab; onClick: (t: Tab) => void; children: React.ReactNode;
}) {
  const active = cur === v;
  return (
    <button
      onClick={() => onClick(v)}
      className={[
        'px-3 py-1.5 rounded-full whitespace-nowrap',
        active ? 'bg-ink text-paper' : 'bg-black/[0.04] text-ink hover:bg-black/[0.08]',
      ].join(' ')}
    >
      {children}
    </button>
  );
}
