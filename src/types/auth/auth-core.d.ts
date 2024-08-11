import { users } from "@/backend/database/schema";
import type { AdapterUser as DefaultAdapterUser } from "@auth/core/adapters";

declare module "@auth/core/adapters" {
  export interface AdapterUser extends DefaultAdapterUser {
    role: (typeof users.$inferSelect)["role"];
  }
}
