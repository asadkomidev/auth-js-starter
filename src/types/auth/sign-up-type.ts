import { z } from "zod";

export type SignUpResponse =
  | { success: true }
  | { success: false; error: z.ZodError; statusCode: 400 }
  | { success: false; error: string; statusCode: 409 | 500 };

export type SignInResponse =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 500 };
