import SignUp from "@/modules/auth/sign-up/sign-up";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full px-4">
      <SignUp />
    </div>
  );
}
