"use server";

import { SignInResponse } from "@/types/auth/sign-up-type";

export async function signInAction(value: unknown): Promise<SignInResponse> {
  return { success: true };
}
