import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
