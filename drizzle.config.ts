import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./backend/database/schema.ts",
  out: "./backend/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
