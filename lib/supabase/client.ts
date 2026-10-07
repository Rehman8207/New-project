import { createBrowserClient } from "@supabase/ssr";
import { getClientEnv } from "../env";

export function createClient() {
  const env = getClientEnv();
  // Safe fallback if env vars are missing so the page doesn't crash during build
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );
}
