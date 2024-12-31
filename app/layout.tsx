import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3nRaya',
  description: 'Creado por Ulises y v0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
