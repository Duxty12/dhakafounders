import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f7ff] via-white to-[#e8f3ff] pt-16">
      <SignIn />
    </div>
  );
}
