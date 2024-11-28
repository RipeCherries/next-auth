'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '@/schemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputField, Message } from '@/components/shared';
import { signUpAction } from '@/actions/sign-up';

export function SignUpForm(): React.JSX.Element {
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    startTransition(async () => {
      const result = await signUpAction(values);

      if (result.success) {
        setStatusMessage({ type: 'success', message: result.success });
      } else if (result.error) {
        setStatusMessage({ type: 'error', message: result.error });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <InputField
            control={form.control}
            name="name"
            label="Name:"
            type="text"
            placeholder="John Doe"
            disabled={isPending}
          />
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
        <Button className="w-full" type="submit" disabled={isPending}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}