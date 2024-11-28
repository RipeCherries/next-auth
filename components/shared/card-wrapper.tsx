'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CardWrapperProps {
  headerTitle: string;
  headerDescription: string;
  footerButtonText: string;
  footerButtonHref: string;
  showOAuthButtons: boolean;
  children: React.ReactNode;
}

export function CardWrapper(props: CardWrapperProps): React.JSX.Element {
  function onOAuthButtonClick(provider: 'github' | 'google') {
    signIn(provider, { redirectTo: '/account' });
  }

  return (
    <Card className="w-[450px]">
      <CardHeader className="flex items-center">
        <CardTitle className="flex items-center gap-2">
          <Image src="/images/locked-with-key.png" width={30} height={30} alt="Locked with key" />
          <p className="text-3xl">{props.headerTitle}</p>
        </CardTitle>
        <CardDescription>{props.headerDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {props.children}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {props.showOAuthButtons && (
          <div className="w-full flex items-center gap-2">
            <Button className="w-full" variant="outline" size="lg" onClick={() => onOAuthButtonClick('google')}>
              <FaGoogle />
            </Button>
            <Button className="w-full" variant="outline" size="lg" onClick={() => onOAuthButtonClick('github')}>
              <FaGithub />
            </Button>
          </div>
        )}
        <Button className="font-semibold" variant="link" asChild>
          <Link href={props.footerButtonHref}>
            {props.footerButtonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}