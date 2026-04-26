import Link from 'next/link';
import { SignatureCounter } from '@/components/SignatureCounter';
import { SevenAsks } from '@/components/SevenAsks';

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-10">
      <header className="flex items-center justify-between">
        <div className="font-serif text-2xl">StandUp</div>
        <nav className="flex gap-4 text-sm text-muted">
          <Link href="/about">Why a law</Link>
          <Link href="/world">Around the world</Link>
          <Link href="/voices">Voices</Link>
          <Link href="/founder">His story</Link>
        </nav>
      </header>

      <section className="flex flex-col gap-6">
        <p className="text-xs uppercase tracking-widest text-muted">A petition to Parliament</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          India still has no anti-bullying law.<br />
          <span className="text-accent">Only a guideline.</span>
        </h1>
        <p className="text-lg text-ink/80 leading-relaxed">
          Norway, Sweden, Japan, South Korea, the UK, Australia, the United States — all of them
          legally protect children from bullying. India does not. Schools are advised. They are
          not bound.
        </p>
        <p className="text-lg text-ink/80 leading-relaxed">
          1 in 3 Indian school children are bullied. More than 70% never tell anyone. We are asking
          Parliament to change that.
        </p>

        <div className="rounded-2xl border border-black/10 p-6 flex flex-col gap-4 bg-white/60">
          <SignatureCounter />
          <Link
            href="/sign"
            className="bg-ink text-paper rounded-full py-3 text-center font-medium hover:opacity-90"
          >
            Sign the petition →
          </Link>
          <p className="text-xs text-muted">
            We will not share your details.
            Read the <Link className="underline" href="/privacy">privacy policy</Link>.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-t border-black/10 pt-10">
        <h2 className="font-serif text-2xl">Started by a 13-year-old.</h2>
        <p className="text-ink/80 leading-relaxed">
          The founder of this campaign is a 13-year-old who has been bullied for the last
          4 years. He decided that waiting until he was an adult to fix this was too long
          for the next kid. <Link className="underline" href="/founder">Read his story →</Link>
        </p>
      </section>

      <SevenAsks />

      <section className="flex flex-col gap-4 border-t border-black/10 pt-10 items-start">
        <h2 className="font-serif text-2xl">You've read what we're asking for.</h2>
        <p className="text-ink/80 leading-relaxed">
          Now sign. Then send this to one person. That's how 100,000 happens.
        </p>
        <Link
          href="/sign"
          className="bg-ink text-paper rounded-full px-6 py-3 font-medium hover:opacity-90"
        >
          Sign the petition →
        </Link>
      </section>

      <footer className="border-t border-black/10 pt-8 text-xs text-muted flex flex-col gap-2">
        <div>
          Open source · <a className="underline" href="https://github.com/zozimustechnologies/antibullying">github.com/zozimustechnologies/antibullying</a>
        </div>
        <div>
          If you need to talk to someone: CHILDLINE 1098 · iCall +91 9152987821 · KIRAN 1800-599-0019
        </div>
      </footer>
    </main>
  );
}
