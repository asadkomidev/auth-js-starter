import SignOutButton from "@/modules/auth/sign-out-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignOutButton />
    </main>
  );
}
