import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Content Generator - Create Stunning Social Media Content',
  description: 'Design professional social media posts, stories, and banners with our powerful editor and extensive template library.',
  keywords: ['content creation', 'social media', 'design', 'templates', 'graphics'],
  authors: [{ name: 'Content Generator Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Content Generator - Create Stunning Social Media Content',
    description: 'Design professional social media posts, stories, and banners with our powerful editor and extensive template library.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content Generator - Create Stunning Social Media Content',
    description: 'Design professional social media posts, stories, and banners with our powerful editor and extensive template library.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
