export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-4">
      <a href="/" className="text-xs text-muted underline">← Back</a>
      <h1 className="font-serif text-3xl">Privacy policy</h1>
      <p className="text-sm text-muted">Compliant with India's DPDP Act, 2023.</p>
      <h2 className="font-serif text-xl mt-4">What we collect</h2>
      <p className="text-ink/80">Name, email, city, state, age bracket, and an optional comment.</p>
      <h2 className="font-serif text-xl mt-4">Why</h2>
      <p className="text-ink/80">To verify your signature (one person, one signature) and to submit a credible petition to Parliament. Nothing else.</p>
      <h2 className="font-serif text-xl mt-4">What we never do</h2>
      <ul className="list-disc pl-6 text-ink/80 flex flex-col gap-1">
        <li>Sell or share your data with third parties.</li>
        <li>Show your email or phone publicly.</li>
        <li>Track you across the web.</li>
      </ul>
      <h2 className="font-serif text-xl mt-4">Withdraw at any time</h2>
      <p className="text-ink/80">Email <a className="underline" href="mailto:privacy@zozimustechnologies.example">privacy@zozimustechnologies.example</a> and we'll remove your signature within 7 days.</p>
      <h2 className="font-serif text-xl mt-4">Children</h2>
      <p className="text-ink/80">Under-18 signatures require a parent or guardian to confirm consent at sign-up. We do not collect detailed data about children beyond what is needed to verify a signature.</p>
    </main>
  );
}
