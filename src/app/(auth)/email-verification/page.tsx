import { verifyVerificationTokenAction } from "@/actions/auth/verification-token-action";
import { getVerificationToken } from "@/lib/auth/email/get-verification-token";
import { InValidTokenState } from "@/modules/auth/email-verification/email-verification";
import SignIn from "@/modules/auth/sign-in/sign-in";

type Props = {
  searchParams: { token: string };
};

export default async function Page({ searchParams: { token } }: Props) {
  const verificationToken = await getVerificationToken(token);

  if (!verificationToken?.expires) return <InValidTokenState />;
  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <InValidTokenState />;

  const response = await verifyVerificationTokenAction(token);

  if (!response.success) return <InValidTokenState />;

  return (
    <div className="w-full px-4">
      <SignIn isVerified />
    </div>
  );
}
