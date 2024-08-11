import { db } from "@/backend/database";
import { verificationTokens } from "@/backend/database/schema";

import { eq } from "drizzle-orm";
import "server-only";

export async function getVerificationToken(
  token: (typeof verificationTokens.$inferSelect)["token"],
): Promise<typeof verificationTokens.$inferSelect | null> {
  const verificationToken = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .then((res) => res[0] ?? null);

  return verificationToken;
}
