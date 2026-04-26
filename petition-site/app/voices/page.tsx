import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Comment = {
  signature_number: number | null;
  first_name: string;
  comment: string;
  created_at: string;
};

async function getComments(): Promise<Comment[]> {
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'https';
  const base = host ? `${proto}://${host}` : '';
  try {
    const res = await fetch(`${base}/api/comments?limit=200`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = (await res.json()) as { items?: Comment[] };
    return json.items ?? [];
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default async function VoicesPage() {
  const items = await getComments();
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-8">
      <a href="/" className="text-xs text-muted underline">← Back</a>
      <header className="flex flex-col gap-3">
        <h1 className="font-serif text-3xl">Voices.</h1>
        <p className="text-ink/80 leading-relaxed">
          Every signature is a voice. Below are the messages people left when
          they signed — first names only, nothing else.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-sm text-muted">
          No comments yet. <a className="underline" href="/sign">Be the first to add yours.</a>
        </p>
      ) : (
        <ul className="flex flex-col gap-6">
          {items.map((c, i) => (
            <li key={i} className="border-l-2 border-black/10 pl-4 flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium text-accent">
                  {c.signature_number != null ? `Signature #${c.signature_number}` : ''}
                </span>
                <time className="text-[11px] text-muted" dateTime={c.created_at}>
                  {formatDate(c.created_at)}
                </time>
              </div>
              <p className="text-ink/90 leading-relaxed whitespace-pre-line">
                {c.comment}
              </p>
              <div className="text-xs text-muted">
                — <span className="font-medium text-ink/70">{c.first_name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-black/10 pt-6 text-sm">
        <a href="/sign" className="underline">Add your voice →</a>
      </div>
    </main>
  );
}
