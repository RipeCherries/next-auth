'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '@/schemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputField, Message } from '@/components/shared';
import { signInAction } from '@/actions/sign-in';

export function SignInForm(): React.JSX.Element {
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    startTransition(async () => {
      const result = await signInAction(values);

      if (result.success) {
        setStatusMessage({ type: 'success', message: result.success });
        redirect('/account');
      } else if (result.error) {
        setStatusMessage({ type: 'error', message: result.error });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <InputField
            control={form.control}
            name="email"
            label="E-mail:"
            type="email"
            placeholder="email@example.com"
            disabled={isPending}
          />
          <InputField
            control={form.control}
            name="password"
            label="Password:"
            type="password"
            placeholder="********"
            disabled={isPending}
          />
        </div>
        {statusMessage && <Message type={statusMessage.type} message={statusMessage.message} />}
        <div className="flex flex-col gap-2">
          <Button className="w-full" type="submit" disabled={isPending}>
            Sign In
          </Button>
          <Button className="flex px-0 font-normal" variant="link" size="sm" asChild>
            <Link href="/auth/forgot-password">
              Forgot password?
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}