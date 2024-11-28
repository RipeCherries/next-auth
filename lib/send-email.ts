import { Resend } from 'resend';
import VerifyEmail from '@/emails/verify-email';
import ResetPassword from '@/emails/reset-password';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendEmailVerificationLink(name: string, email: string, token: string) {
  const verifyLink = `${domain}/auth/email-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email address',
    react: VerifyEmail({ name, verifyLink })
  });
}

export async function sendResetPasswordLink(name: string, email: string, token: string) {
  const resetPasswordLink = `${domain}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    react: ResetPassword({ name, resetPasswordLink })
  });
}