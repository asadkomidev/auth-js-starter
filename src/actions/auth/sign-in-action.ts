"use server";

import { signIn } from "@/auth";
import { SignInResponse } from "@/types/auth/auth-type";
import { AuthError } from "next-auth";

export async function signInAction(values: unknown): Promise<SignInResponse> {
  try {
    if (
      typeof values !== "object" ||
      values === null ||
      Array.isArray(values)
    ) {
      throw new Error("Invalid JSON Object");
    }

    await signIn("credentials", { ...values, redirect: false });

    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            success: false,
            error: "Invalid credentials",
            statusCode: 401,
          };
        case "AccessDenied":
          return {
            success: false,
            error:
              "Please verify your email, sign up again to resend verification email",
            statusCode: 401,
          };
        // custom error
        case "OAuthAccountAlreadyLinked" as AuthError["type"]:
          return {
            success: false,
            error: "Login with your Google or Github account",
            statusCode: 401,
          };
        default:
          return {
            success: false,
            error: "Oops. Something went wrong",
            statusCode: 500,
          };
      }
    }

    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
