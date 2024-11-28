'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { SignInSchema } from '@/schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function signInAction(values: z.infer<typeof SignInSchema>) {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid sign-in credentials' };
  }

  const { email, password } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: 'Email does not exist' };
    }

    if (!existingUser.emailVerified) {
      return { error: 'Please verify your email' };
    }

    await signIn('credentials', { email, password, redirect: false });

    return { success: 'Successfully sign-in' };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return { error: 'Invalid sign-in credentials' };
    }

    return { error: 'Something went wrong' };
  }
}