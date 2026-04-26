import { SignForm } from '@/components/SignForm';
import { SignatureCounter } from '@/components/SignatureCounter';
import { SevenAsks } from '@/components/SevenAsks';

export default function SignPage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16 flex flex-col gap-8">
      <a href="/" className="text-xs text-muted underline">← Back</a>
      <header className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-muted">Sign the petition</p>
        <h1 className="font-serif text-3xl leading-tight">
          One signature is one parliamentarian harder to ignore.
        </h1>
        <p className="text-sm text-muted">
          Your details are never shared.
        </p>
      </header>
      <div className="rounded-2xl border border-black/10 p-4 bg-white/60">
        <SignatureCounter />
      </div>
      <SignForm />
      <SevenAsks />
    </main>
  );
}
