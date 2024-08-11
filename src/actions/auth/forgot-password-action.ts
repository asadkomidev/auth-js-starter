"use server";

import { findUserByEmail } from "@/backend/helpers/users";
import { forgotPasswordSchema } from "@/schema/auth/forgot-password-schema";
import { ForgotPasswordResponse } from "@/types/auth/auth-type";
import { createVerificationTokenAction } from "./verification-token-action";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/lib/auth/email/email";

export async function forgotPasswordAction(
  values: unknown,
): Promise<ForgotPasswordResponse> {
  const parsedValue = forgotPasswordSchema.safeParse(values);

  if (!parsedValue.success) {
    return {
      success: false,
      error: parsedValue.error,
      statusCode: 400,
    };
  }

  const { email } = parsedValue.data;

  try {
    // Send email to user with reset link
    const existingUser = await findUserByEmail(email);

    // this is a false positive, to deter malicious users
    if (!existingUser?.id) return { success: true };

    if (!existingUser.password) {
      return {
        success: false,
        error: "This user was created with OAuth, please sign in with OAuth",
        statusCode: 401,
      };
    }

    const verificationToken = await createVerificationTokenAction(
      existingUser.email,
    );

    await sendPasswordResetEmail(existingUser.email, verificationToken.token);

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
