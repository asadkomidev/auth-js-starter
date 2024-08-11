import { Resend } from "resend";
import VerifyEmail from "./templates/verify-email";
import ResetPassword from "./templates/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_AUTH_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/forgot-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: ResetPassword({ link: resetLink }),
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const confirmLink = `${domain}/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: VerifyEmail({ link: confirmLink, name: name }),
  });
};
