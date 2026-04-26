import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StandUp — Make anti-bullying a law in India',
  description:
    'India still has no national anti-bullying law — only a guideline. Sign the petition. 100,000 signatures go to Parliament.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
