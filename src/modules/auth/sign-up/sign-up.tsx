import AuthContainer from "../auth-container";
import AuthHeader from "../auth-header";
import OAuth from "../o-auth/o-auth";
import AuthDivider from "../auth-divider";
import SignUpForm from "./sign-up-form";
import AuthFooter from "../auth-footer";

type Props = {};

export default function SignUp({}: Props) {
  return (
    <AuthContainer>
      <AuthHeader
        title="Sign Up"
        description="Welcome back! Please sign in to continue"
      />
      <OAuth />
      <AuthDivider />
      <SignUpForm />
      <AuthFooter
        text="Already have an account?"
        label="Sign in"
        link="/sign-in"
      />
    </AuthContainer>
  );
}
