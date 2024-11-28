import React from 'react';
import { CardWrapper, ResetPasswordForm } from '@/components/shared';

export default function ResetPasswordPage(): React.JSX.Element {
  return (
    <CardWrapper
      headerTitle="Reset Password"
      headerDescription="Enter a new password"
      footerButtonText="Back to login"
      footerButtonHref="/auth/sign-in"
      showOAuthButtons={false}
    >
      <ResetPasswordForm />
    </CardWrapper>
  );
}