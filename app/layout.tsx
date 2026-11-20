import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: {
    default: 'Aurevia Estates — From Ground to Greatness',
    template: '%s | Aurevia Estates'
  },
  description:
    'An interactive, cinematic property development experience. Watch an ultra-luxury coastal residence unfold from empty ground to architectural icon through scroll-driven storytelling.',
  keywords: [
    'luxury real estate',
    'property development',
    'construction film',
    'architectural visualization',
    'coastal residences',
    'cinematic scroll experience'
  ],
  icons: { icon: '/images/favicon.svg' }
};

export const viewport: Viewport = {
  themeColor: '#0E1B24',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
