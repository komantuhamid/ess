import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Super Mario TypeScript',
  description: 'Classic Mario game built with TypeScript and React',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
