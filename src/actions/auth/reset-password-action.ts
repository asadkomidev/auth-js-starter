"use server";

import { db } from "@/backend/database";
import argon2 from "argon2";
import { users, verificationTokens } from "@/backend/database/schema";
import { findUserByEmail } from "@/backend/helpers/users";
import { getVerificationToken } from "@/lib/auth/email/get-verification-token";
import { resetPasswordSchema } from "@/schema/auth/reset-password-schema";
import { ResetPasswordResponse } from "@/types/auth/auth-type";
import { eq } from "drizzle-orm";

export async function resetPasswordAction(
  email: (typeof users.$inferSelect)["email"],
  token: (typeof verificationTokens.$inferSelect)["token"],
  values: unknown,
): Promise<ResetPasswordResponse> {
  const parsedValue = resetPasswordSchema.safeParse(values);
  if (!parsedValue.success) {
    return {
      success: false,
      error: parsedValue.error,
      statusCode: 400,
    };
  }

  const { password } = parsedValue.data;
  const existingToken = await getVerificationToken(token);

  if (!existingToken?.expires) {
    return {
      success: false,
      error: "Token is invalid",
      statusCode: 401,
    };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return {
      success: false,
      error: "Token is expired",
      statusCode: 401,
    };
  }

  const existingUser = await findUserByEmail(email);

  if (
    !existingUser?.password ||
    existingUser.email !== existingToken.identifier
  ) {
    return {
      success: false,
      error: "Oops, something went wrong",
      statusCode: 401,
    };
  }

  try {
    const hashedPassword = await argon2.hash(password);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email));

    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.token, token));

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}
