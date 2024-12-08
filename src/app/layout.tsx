import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/ThemeProvider';

import './globals.css';
// import { Inter } from 'next/font/google';
import { Plus_Jakarta_Sans as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fontSans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Book_a_Doc | management system',
  description:
    'A patient management system simplifying patient registration, appointment scheduling, and medical  records for healthcare providers.',
  icons: { icon: '/assets/icons/logo-icon.svg' },
  authors: { name: 'CADR' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // console.log('font handling:', fontSans.className, fontSans.variable);

  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'h-screen min-h-screen  bg-dark-300 font-sans antialiased bg-background',
            fontSans.className
          )}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            // enableSystem
            // disableTransitionOnChange
          >
            {children}
            
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
