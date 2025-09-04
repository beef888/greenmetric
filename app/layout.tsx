import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'GreenMetric - Malaysia\'s ESG Compliance Platform',
  description: 'Simplify Bursa Malaysia sustainability reporting with our ESG assessment tools, carbon calculator, and regulatory resources. Built for Malaysian businesses.',
  keywords: 'ESG Malaysia, Bursa sustainability, carbon calculator, ESG assessment, sustainability reporting, Malaysian compliance',
  authors: [{ name: 'GreenMetric' }],
  creator: 'GreenMetric',
  publisher: 'GreenMetric',
  openGraph: {
    title: 'GreenMetric - Malaysia\'s ESG Compliance Platform',
    description: 'Navigate Bursa Malaysia sustainability requirements with confidence. Complete ESG assessments and generate compliance-ready reports.',
    url: 'https://greenmetric.my',
    siteName: 'GreenMetric',
    locale: 'en_MY',
    type: 'website',
    images: [
      {
        url: 'https://greenmetric.my/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GreenMetric - Malaysia\'s ESG Compliance Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreenMetric - Malaysia\'s ESG Compliance Platform',
    description: 'Navigate Bursa Malaysia sustainability requirements with confidence',
    images: ['https://greenmetric.my/twitter-image.png'],
    creator: '@greenmetric',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <NavHeader />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}