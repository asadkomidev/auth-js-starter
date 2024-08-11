"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ForgotPasswordForm from "./forgot-password-form";
import { useState } from "react";

type Props = {};

export default function ForgotPasswordButton({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <span className="text-xs">Forgot password?</span>
      </DialogTrigger>
      <DialogContent>
        <ForgotPasswordForm setOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
