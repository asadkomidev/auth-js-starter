"use client";

import { oAuthSignInAction } from "@/actions/auth/o-auth-action";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/icons/google-icon";

type Props = {};

export default function GoogleButton({}: Props) {
  const handleClick = async (provider: "google" | "github") => {
    try {
      await oAuthSignInAction(provider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      variant="outline"
      className="w-full shadow-none"
      onClick={() => handleClick("google")}
    >
      <GoogleIcon className="mr-2 size-4" />
      <span>Continue with Google</span>
    </Button>
  );
}
