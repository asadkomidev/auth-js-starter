import React from "react";
import AuthContainer from "../auth-container";
import AuthHeader from "../auth-header";
import ResetPasswordForm from "./reset-password-form";

type Props = {
  email: string;
  token: string;
};

export default function ResetPassword({ email, token }: Props) {
  return (
    <AuthContainer>
      <AuthHeader
        title="Reset Password"
        description="Please enter your new password"
      />
      <ResetPasswordForm email={email} token={token} />
    </AuthContainer>
  );
}
