"use server";

import argon2 from "argon2";
import { signUpSchema } from "@/schema/auth/sign-up-schema";
import { SignUpResponse } from "@/types/auth/sign-up-type";
import { z } from "zod";

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
    const hashedPassword = await argon2.hash(password);

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
