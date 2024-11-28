import React from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { cn } from '@/lib/utils';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['cyrillic']
});

export const metadata: Metadata = {
  title: 'Next Auth',
  description: 'A simple authentication service'
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps): Promise<React.JSX.Element> {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
      <body className={cn(
        montserrat.className,
        'h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600'
      )}>
      {children}
      </body>
      </html>
    </SessionProvider>
  );
}
