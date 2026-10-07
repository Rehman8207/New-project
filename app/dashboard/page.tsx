import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto pt-24">
      <h1 className="text-4xl font-bold text-white mb-4">
        Dashboard
      </h1>
      <div className="glass p-6 rounded-2xl mb-8">
        <p className="text-slate-300 mb-2">Welcome back,</p>
        <p className="text-violet-400 font-mono text-sm">{user.email}</p>
      </div>
      
      <div className="glass p-6 rounded-2xl mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Your Roadmap</h2>
        <p className="text-slate-400">
          Abhi aapne koi roadmap generate nahi kiya. "Onboarding" flow complete karein.
        </p>
      </div>

      <LogoutButton />
    </main>
  );
}
