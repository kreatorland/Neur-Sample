import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import AuthProviders from '@/components/provider-auth';
import { ThemeProvider } from '@/components/provider-theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Numble',
    default:
      'Numble - The Intelligent AI Agents Engine to perform on-chain tasks on Solana',
  },
  description:
    'The Intelligent AI Agents Engine to perform on-chain tasks on Solana',

  icons: {
    icon: '/favicon.png',
  },
  twitter: {
    title: 'Numble - The Intelligent AI Agents Engine',
    description:
      'The Intelligent AI Agents Engine to perform on-chain tasks on Solana',
    images: ['/favicon.png'],
  },

  openGraph: {
    title: 'Numble - The Intelligent AI Agents Engine',
    description:
      'The Intelligent AI Agents Engine to perform on-chain tasks on Solana',
    // url: 'https://your-domain.com', // Replace with your domain
    siteName: 'Numble',
    images: [
      {
        url: '/favicon.png', // Ensure this path is correct
        width: 1200,
        height: 630,
        alt: 'Numble Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}`,
          'overflow-x-hidden antialiased',
        )}
      >
        <AuthProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="sticky bottom-0 overflow-hidden md:overflow-visible">
              {children}
              <Toaster />
            </main>
          </ThemeProvider>
        </AuthProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
