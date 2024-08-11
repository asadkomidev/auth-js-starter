import { getVerificationToken } from "@/lib/auth/email/get-verification-token";
import { InValidTokenState } from "@/modules/auth/email-verification/email-verification";
import ResetPassword from "@/modules/auth/forgot-password/reset-password";

type Props = {
  searchParams: { token: string };
};

export default async function Page({ searchParams: { token } }: Props) {
  const verificationToken = await getVerificationToken(token);

  if (!verificationToken?.expires) return <InValidTokenState />;
  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <InValidTokenState />;

  return (
    <div className="w-full px-4">
      <ResetPassword email={verificationToken.identifier} token={token} />
    </div>
  );
}
