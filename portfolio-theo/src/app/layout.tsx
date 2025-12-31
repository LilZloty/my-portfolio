import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Theo Daudebourg | Shopify Expert & AI Systems Developer',
  description: 'Shopify theme developer building fast, conversion-optimized stores. Specializing in Liquid, custom development, AI systems & CRO. 70+ stores built.',
  keywords: [
    'Shopify Developer',
    'Shopify Expert',
    'Liquid Developer',
    'E-commerce',
    'CRO',
    'AI Systems',
    'Custom Shopify Themes',
    'Conversion Optimization',
  ],
  authors: [{ name: 'Theo Daudebourg' }],
  creator: 'Theo Daudebourg',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theodaudebourg.com',
    siteName: 'Theo Daudebourg Portfolio',
    title: 'Theo Daudebourg | Shopify Expert & AI Systems',
    description: 'Building Shopify stores that actually sell. 70+ stores, AI-enhanced development, CRO optimization.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Theo Daudebourg - Shopify Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theo Daudebourg | Shopify Expert',
    description: 'Building Shopify stores that actually sell.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-gray-darker text-white antialiased">
        {children}
      </body>
    </html>
  );
}
