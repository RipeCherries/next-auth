'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { ResetPasswordSchema } from '@/schemas';
import { prisma } from '@/prisma/prisma-client';

export async function resetPasswordAction(values: z.infer<typeof ResetPasswordSchema>, token: string) {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid password' };
  }

  const { password } = validatedFields.data;

  try {
    const existingToken = await prisma.resetPasswordToken.findUnique({ where: { token } });
    if (!existingToken) {
      return { error: 'Invalid token' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: 'Token has expired' };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.email }
    });

    if (!existingUser) {
      return { error: 'Email does not exist' };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: await bcrypt.hash(password, 10)
      }
    });

    await prisma.resetPasswordToken.delete({ where: { id: existingToken.id } });

    return { success: 'Password updated successfully' };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}