import OnboardingForm from "@/components/OnboardingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | PathWay",
  description: "Tell us about yourself so we can build your perfect roadmap.",
};

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 relative overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-[#05050f] to-cyan-900/10 z-0" />
      
      <div className="relative z-10 w-full max-w-2xl">
        <OnboardingForm />
      </div>
    </main>
  );
}
