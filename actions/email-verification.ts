'use server';

import { prisma } from '@/prisma/prisma-client';

export async function emailVerificationAction(token: string) {
  try {
    const existingToken = await prisma.emailVerificationToken.findFirst({ where: { token } });
    if (!existingToken) {
      return { error: 'Token not found' };
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
        emailVerified: new Date()
      }
    });

    await prisma.emailVerificationToken.delete({ where: { id: existingToken.id } });

    return { success: 'Email verified successfully' };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}