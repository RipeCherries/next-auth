import React from 'react';
import { CardWrapper, ForgotPasswordForm } from '@/components/shared';

export default function ForgotPasswordPage(): React.JSX.Element {
  return (
    <CardWrapper
      headerTitle="Forgot your password?"
      headerDescription="Enter your email"
      footerButtonText="Back to sign in"
      footerButtonHref="/auth/sign-in"
      showOAuthButtons={false}
    >
      <ForgotPasswordForm />
    </CardWrapper>
  );
}