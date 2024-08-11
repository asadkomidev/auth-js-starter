"use server";

import { db } from "@/backend/database";
import { users, verificationTokens } from "@/backend/database/schema";
import { findUserByEmail } from "@/backend/helpers/users";
import { VERIFICATION_TOKEN_EXP_MIN } from "@/lib/auth/constants";
import { getVerificationToken } from "@/lib/auth/email/get-verification-token";
import { eq } from "drizzle-orm";

export async function createVerificationTokenAction(
  identifier: (typeof verificationTokens.$inferSelect)["identifier"],
) {
  const expires = new Date(Date.now() + VERIFICATION_TOKEN_EXP_MIN * 60 * 1000);

  const token = Math.random().toString(36).substring(2);

  const newVerificationToken = await db
    .insert(verificationTokens)
    .values({ expires, identifier, token })
    .returning({ token: verificationTokens.token })
    .then((res) => res[0]);

  return newVerificationToken;
}

export async function verifyVerificationTokenAction(
  token: (typeof verificationTokens.$inferSelect)["token"],
) {
  const verificationToken = await getVerificationToken(token);

  if (!verificationToken?.expires) return { success: false };

  if (new Date(verificationToken.expires) < new Date()) {
    return { success: false };
  }

  const existingUser = await findUserByEmail(verificationToken.identifier);

  if (
    existingUser?.id &&
    !existingUser.emailVerified &&
    existingUser.email === verificationToken.identifier
  ) {
    const [done] = await db
      .update(users)
      .set({ emailVerified: new Date(), image: "" })
      .where(eq(users.id, existingUser.id))
      .returning({ id: users.id });

    await db
      .update(verificationTokens)
      .set({ expires: new Date() })
      .where(eq(verificationTokens.identifier, existingUser.email));

    return { success: true };
  } else {
    return { success: false };
  }
}
