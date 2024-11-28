'use server';

import { z } from 'zod';
import { prisma } from '@/prisma/prisma-client';
import { ForgotPasswordSchema } from '@/schemas';
import { generateResetPasswordToken } from '@/lib/generate-tokens';
import { sendResetPasswordLink } from '@/lib/send-email';

export async function forgotPasswordAction(values: z.infer<typeof ForgotPasswordSchema>) {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email' };
  }

  const { email } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return { error: 'Email does not exist' };
    }

    const resetPasswordToken = await generateResetPasswordToken(existingUser.email);
    await sendResetPasswordLink(existingUser.name, existingUser.email, resetPasswordToken.token);

    return { success: 'Please check your email' };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}