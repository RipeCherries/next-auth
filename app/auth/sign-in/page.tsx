import React from 'react';
import { CardWrapper, SignInForm } from '@/components/shared';

export default function SignInPage(): React.JSX.Element {
  return (
    <CardWrapper
      headerTitle="Sign In"
      headerDescription="Welcome back"
      footerButtonText="Don`t have an account?"
      footerButtonHref="/auth/sign-up"
      showOAuthButtons={true}
    >
      <SignInForm />
    </CardWrapper>
  );
}