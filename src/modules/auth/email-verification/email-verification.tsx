import React from "react";
import AuthContainer from "../auth-container";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {};

export function ValidTokenState({}: Props) {
  return (
    <div className="w-full px-4">
      <AuthContainer>
        <div className="text-3xl font-bold tracking-tight">Verify Email</div>

        <div className="my-2 h-1 bg-muted" />
        <div className="rounded bg-green-100 p-4">
          <p>Email verified.</p>

          <span>
            Click{" "}
            <Button variant="link" size="sm" className="px-0" asChild>
              <Link href="/auth/signin">here</Link>
            </Button>{" "}
            to sign in.
          </span>
        </div>
      </AuthContainer>
    </div>
  );
}
export function InValidTokenState({}: Props) {
  return (
    <div className="w-full px-4">
      <AuthContainer className="flex items-center justify-start border-none bg-red-100">
        <div className="mt-6 rounded">
          <p className="font-bold text-red-700">Invalid token</p>

          <span className="text-sm text-red-500">
            Please request a new token by sign up again.
          </span>
          <div className="flex items-center gap-4">
            <Button asChild variant="link" className="p-0 text-red-700">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild variant="link" className="p-0 text-red-700">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </AuthContainer>
    </div>
  );
}
