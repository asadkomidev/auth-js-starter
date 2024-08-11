import "server-only";

import { lower, users } from "@/backend/database/schema";
import {
  desc,
  eq,
  getTableColumns,
  //  getTableColumns
} from "drizzle-orm";
import { USER_ROLES } from "@/lib/auth/enums";

import { db } from "../database";
import { auth } from "@/auth";
// import { auth } from "@/auth";

/* ADMIN QUERIES - THESE QUERIES REQUIRE ADMIN ACCESS */
export async function findAllUsers() {
  const session = await auth();

  if (session?.user?.role !== USER_ROLES.ADMIN) {
    throw new Error("Unauthorized");
  }

  const { password, ...rest } = getTableColumns(users);

  const allUsers = await db
    .select({ ...rest })
    .from(users)
    .orderBy(desc(users.role));

  return allUsers;
}
/* -------------------------------------------------- */

export const findUserByEmail = async (
  email: string,
): Promise<typeof users.$inferSelect | null> => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()));

  return user;
};
