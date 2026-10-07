import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | PathWay",
  description: "Log in to your PathWay account to continue your journey.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-[#05050f] to-cyan-900/20 z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] -z-10" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back to <span className="gradient-text">PathWay</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Log in to continue building your future roadmap.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
