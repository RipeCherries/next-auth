'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CardWrapper, Message } from '@/components/shared';
import { emailVerificationAction } from '@/actions/email-verification';

export default function EmailVerificationPage(): React.JSX.Element {
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    async function handleVerification() {
      if (statusMessage) return;

      if (!token) {
        setStatusMessage({ type: 'error', message: 'Missing token' });
        return;
      }

      const result = await emailVerificationAction(token);

      if (result.success) {
        setStatusMessage({ type: 'success', message: result.success });
      } else if (result.error) {
        setStatusMessage({ type: 'error', message: result.error });
      }
    }

    handleVerification();
  }, [token, statusMessage]);

  return (
    <CardWrapper
      headerTitle="Email Verification"
      headerDescription="Verification is underway"
      footerButtonText="Back to login"
      footerButtonHref="/auth/sign-in"
      showOAuthButtons={false}
    >
      {statusMessage && <Message type={statusMessage.type} message={statusMessage.message} />}
    </CardWrapper>
  );
}
