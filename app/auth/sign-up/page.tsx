import React from 'react';
import { CardWrapper, SignUpForm } from '@/components/shared';

export default function SignUpPage(): React.JSX.Element {
  return (
    <CardWrapper
      headerTitle="Sign Up"
      headerDescription="Create an account"
      footerButtonText="Already have an account?"
      footerButtonHref="/auth/sign-in"
      showOAuthButtons={true}
    >
      <SignUpForm />
    </CardWrapper>
  );
}