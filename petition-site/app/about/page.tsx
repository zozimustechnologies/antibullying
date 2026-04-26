export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-6">
      <a href="/" className="text-xs text-muted underline">← Back</a>
      <h1 className="font-serif text-3xl">Why we need a law, not a guideline.</h1>
      <p className="leading-relaxed text-ink/80">
        India already has the <strong>UGC Anti-Ragging Regulations (2009)</strong> for higher
        education, and <strong>POCSO</strong> for sexual offences against children. School-level
        bullying — verbal, social, physical, cyber — sits in a regulatory gap. CBSE circulars and
        NCPCR guidelines exist, but they are <em>advisory</em>. A school can follow them, or not.
      </p>
      <p className="leading-relaxed text-ink/80">
        A guideline tells a school what would be nice. A law tells a school what is required.
        That single difference is why a child in Oslo, Stockholm, Tokyo, Seoul, London, or
        Sydney has legal protections that a child in Delhi or Bengaluru does not.
      </p>
      <h2 className="font-serif text-2xl mt-4">What we are asking Parliament to do</h2>
      <ul className="list-disc pl-6 leading-relaxed text-ink/80 flex flex-col gap-2">
        <li>A statutory definition of school bullying — including cyber.</li>
        <li>A duty on every school (public and private) to prevent, investigate, and act.</li>
        <li>A national reporting standard, with annual public data.</li>
        <li>Mandatory teacher training and counsellor access.</li>
        <li>Independent escalation route for families, beyond the school itself.</li>
      </ul>
    </main>
  );
}
