'use client';

import React, { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/schemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputField, Message } from '@/components/shared';
import { resetPasswordAction } from '@/actions/reset-password';

export function ResetPasswordForm(): React.JSX.Element {
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    if (!token) {
      setStatusMessage({ type: 'error', message: 'Missing token' });
      return;
    }

    startTransition(async () => {
      const result = await resetPasswordAction(values, token);

      if (result.success) {
        setStatusMessage({ type: 'success', message: result.success });
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
            name="password"
            label="Password:"
            type="password"
            placeholder="********"
            disabled={isPending}
          />
        </div>
        {statusMessage && <Message type={statusMessage.type} message={statusMessage.message} />}
        <Button className="w-full" type="submit" disabled={isPending}>
          Reset Password
        </Button>
      </form>
    </Form>
  );
}