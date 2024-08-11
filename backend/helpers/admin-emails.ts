import "server-only";

import { db } from "../database";
import { adminEmails, lower } from "../database/schema";

export const getAdminEmail = async () => {
  const adminUserEmailAddress = await db
    .select({ email: lower(adminEmails.email) })
    .from(adminEmails);

  return adminUserEmailAddress.map((item) => item.email as string);
};
