import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home(): React.JSX.Element {
  return (
    <main className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <Image src="/images/locked-with-key.png" width={60} height={60} alt="Locked with key" />
        <h1 className="text-6xl font-bold text-white uppercase">next-auth</h1>
      </div>
      <p className="text-xl text-white">A simple authentication service</p>
      <div className="flex gap-8">
        <Button size="lg" variant="outline" asChild>
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    </main>
  );
}
