"use server";

import argon2 from "argon2";
import { signUpSchema } from "@/schema/auth/sign-up-schema";
import { SignUpResponse } from "@/types/auth/auth-type";
import { z } from "zod";
import { db } from "@/backend/database";
import { lower, users } from "@/backend/database/schema";
import { createVerificationTokenAction } from "./verification-token-action";
import { eq } from "drizzle-orm";
import { USER_ROLES } from "@/lib/auth/enums";
import { getAdminEmail } from "@/backend/helpers/admin-emails";
import { sendVerificationEmail } from "@/lib/auth/email/email";

export async function signUpAction(value: unknown): Promise<SignUpResponse> {
  const parsedValue = signUpSchema.safeParse(value);
  if (!parsedValue.success) {
    return {
      success: false,
      error: parsedValue.error,
      statusCode: 400,
    };
  }

  const { name, email, password } = parsedValue.data;

  try {
    const existingUser = await db
      .select({
        id: users.id,
        email: users.email,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .where(eq(lower(users.email), email.toLowerCase()))
      .then((res) => res[0] ?? null);

    if (existingUser?.id) {
      if (!existingUser.emailVerified) {
        const verificationToken = await createVerificationTokenAction(
          existingUser.email,
        );

        await sendVerificationEmail(
          existingUser.email,
          verificationToken.token,
          name,
        );

        return {
          success: false,
          error: "User exists but not verified. Verification link resent",
          statusCode: 409,
        };
      } else {
        return {
          success: false,
          error: "Email already exists",
          statusCode: 409,
        };
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error,
        statusCode: 400,
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        statusCode: 409,
      };
    } else {
      return {
        success: false,
        error: "Internal Server Error",
        statusCode: 500,
      };
    }
  }

  try {
    const hashedPassword = await argon2.hash(password);
    const adminEmails = await getAdminEmail();
    const isAdmin = adminEmails.includes(email.toLowerCase());

    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER,
      })
      .returning({
        id: users.id,
        email: users.email,
        emailVerified: users.emailVerified,
        name: users.name,
      })
      .then((res) => res[0]);

    const verificationToken = await createVerificationTokenAction(
      newUser.email,
    );

    await sendVerificationEmail(newUser.email, verificationToken.token, name);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error,
        statusCode: 400,
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        statusCode: 409,
      };
    } else {
      return {
        success: false,
        error: "An unexpected error occurred",
        statusCode: 500,
      };
    }
  }
}
