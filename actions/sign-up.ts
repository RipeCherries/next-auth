'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/prisma/prisma-client';
import { SignUpSchema } from '@/schemas';
import { generateEmailVerificationToken } from '@/lib/generate-tokens';
import { sendEmailVerificationLink } from '@/lib/send-email';

export async function signUpAction(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid sign-up credentials' };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: 'User already exists' };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10)
      }
    });

    const verificationToken = await generateEmailVerificationToken(email);
    await sendEmailVerificationLink(name, verificationToken.email, verificationToken.token);

    return { success: 'Please check your email' };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}