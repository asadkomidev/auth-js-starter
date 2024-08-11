import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import argon2 from "argon2";

import { authConfig } from "@/auth.config";
import { signInSchema } from "@/schema/auth/sign-in-schema";
import { findUserByEmail } from "./backend/helpers/users";
import { OAuthAccountAlreadyLinkedError } from "@/lib/auth/custom-errors";

const { providers: authConfigProviders, ...authConfigRest } = authConfig;

const nextAuth = NextAuth({
  ...authConfigRest,
  providers: [
    ...authConfigProviders,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await findUserByEmail(email);
          if (!user) return null;

          if (!user.password) throw new OAuthAccountAlreadyLinkedError();

          const passwordsMatch = await argon2.verify(user.password, password);

          if (passwordsMatch) {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }

        return null;
      },
    }),
  ],
});

export const { signIn, signOut, auth, handlers } = nextAuth;
