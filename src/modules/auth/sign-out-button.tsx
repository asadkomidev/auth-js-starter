"use client";

import { signOutAction } from "@/actions/auth/sign-out-action";
import { Button } from "@/components/ui/button";

type Props = {};

export default function SignOutButton({}: Props) {
  const handleClick = async () => {
    await signOutAction();
    window.location.href = "/";
  };

  return (
    <div>
      <Button onClick={handleClick}>Sign Out</Button>
    </div>
  );
}
