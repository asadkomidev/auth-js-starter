"use server";

import { signIn } from "@/auth";
import { db } from "@/backend/database";
import { users } from "@/backend/database/schema";
import { and, eq, isNull } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function oAuthSignInAction(provider: "google" | "github") {
  try {
    await signIn(provider, { redirectTo: "/" });
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    console.error(err);
  }
}

export async function oauthVerifyEmailAction(email: string) {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(
      and(
        eq(users.email, email),
        isNull(users.password),
        isNull(users.emailVerified),
      ),
    )
    .then((res) => res[0] ?? null);

  if (existingUser?.id) {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));
  }
}
