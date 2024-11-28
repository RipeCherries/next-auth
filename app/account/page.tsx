'use client';

import React from 'react';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountInfoItem, UserAvatar } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/actions/sign-out';

export default function AccountPage(): React.JSX.Element {
  const user = useCurrentUser();

  function onSignOutButtonClick() {
    signOutAction();
  }

  return (
    <Card className="w-[600px]">
      <CardHeader className="flex items-center">
        <UserAvatar image={user?.image || ''} />
        <CardTitle className="flex items-center gap-2">
          <Image src="/images/locked-with-key.png" width={30} height={30} alt="Locked with key" />
          <p className="text-3xl">Account Info</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <AccountInfoItem name="Id" value={user?.id || ''} />
        <AccountInfoItem name="Name" value={user?.name || ''} />
        <AccountInfoItem name="Email" value={user?.email || ''} />
        <AccountInfoItem name="Role" value={user?.role || ''} />
        <Button onClick={onSignOutButtonClick}>Sign Out</Button>
      </CardContent>
    </Card>
  );
}