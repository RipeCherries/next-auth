import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/prisma/prisma-client';

export async function generateResetPasswordToken(email: string) {
  const existingToken = await prisma.resetPasswordToken.findFirst({
    where: { email: email }
  });

  if (existingToken) {
    await prisma.resetPasswordToken.delete({ where: { id: existingToken.id } });
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

  return prisma.resetPasswordToken.create({
    data: { email, token, expires }
  });
}

export async function generateEmailVerificationToken(email: string) {
  const existingToken = await prisma.emailVerificationToken.findFirst({
    where: { email: email }
  });

  if (existingToken) {
    await prisma.emailVerificationToken.delete({ where: { id: existingToken.id } });
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

  return prisma.emailVerificationToken.create({
    data: { email, token, expires }
  });
}