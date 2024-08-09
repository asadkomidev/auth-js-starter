import SignIn from "@/modules/auth/sign-in/sign-in";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full px-4">
      <SignIn />
    </div>
  );
}
