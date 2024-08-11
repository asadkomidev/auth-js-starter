import AuthContainer from "../auth-container";
import AuthHeader from "../auth-header";
import OAuth from "../o-auth/o-auth";
import AuthDivider from "../auth-divider";
import SignInForm from "./sign-in-form";
import AuthFooter from "../auth-footer";
import ForgotPasswordButton from "../forgot-password/forgot-password-button";

type Props = {
  isVerified?: boolean;
};

export default function SignIn({ isVerified }: Props) {
  return (
    <AuthContainer>
      <AuthHeader
        title="Sign in to Finance"
        description="Welcome back! Please sign in to continue"
      />
      <OAuth />
      <AuthDivider />
      {isVerified && (
        <div className="mt-6 flex items-center justify-center rounded-lg bg-green-200 p-2">
          <p className="text-sm text-green-700">Email verified, Sign in now</p>
        </div>
      )}
      <SignInForm />
      <div className="flex items-center justify-center pt-4">
        <ForgotPasswordButton />
      </div>
      <AuthFooter
        text="Don't have an account?"
        label="Sign up"
        link="/sign-up"
      />
    </AuthContainer>
  );
}
