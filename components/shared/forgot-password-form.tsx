'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema } from '@/schemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputField, Message } from '@/components/shared';
import { forgotPasswordAction } from '@/actions/forgot-password';

export function ForgotPasswordForm(): React.JSX.Element {
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    startTransition(async () => {
      const result = await forgotPasswordAction(values);

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
            name="email"
            label="E-mail:"
            type="email"
            placeholder="email@example.com"
            disabled={isPending}
          />
        </div>
        {statusMessage && <Message type={statusMessage.type} message={statusMessage.message} />}
        <Button className="w-full" type="submit" disabled={isPending}>
          Send reset password link
        </Button>
      </form>
    </Form>
  );
}