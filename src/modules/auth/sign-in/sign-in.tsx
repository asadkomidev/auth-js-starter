import AuthContainer from "../auth-container";
import AuthHeader from "../auth-header";
import OAuth from "../o-auth/o-auth";
import AuthDivider from "../auth-divider";
import SignInForm from "./sign-in-form";
import AuthFooter from "../auth-footer";

type Props = {};

export default function SignIn({}: Props) {
  return (
    <AuthContainer>
      <AuthHeader
        title="Sign in to Finance"
        description="Welcome back! Please sign in to continue"
      />
      <OAuth />
      <AuthDivider />
      <SignInForm />
      <AuthFooter
        text="Don't have an account?"
        label="Sign up"
        link="/sign-up"
      />
    </AuthContainer>
  );
}
