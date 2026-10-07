import { z } from "zod";

// ---------------------------------------------------------------------------
// Client-side env schema (NEXT_PUBLIC_ vars, safe to expose to the browser)
// ---------------------------------------------------------------------------
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Server-side env schema (secret vars, never sent to the browser)
// ---------------------------------------------------------------------------
const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Derived types
// ---------------------------------------------------------------------------
export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

// ---------------------------------------------------------------------------
// Client env — parsed lazily so missing vars don't crash the landing page.
// Call this on the client side when you actually need a var.
// ---------------------------------------------------------------------------
let _clientEnv: ClientEnv | null = null;

export function getClientEnv(): ClientEnv {
  if (_clientEnv) return _clientEnv;
  const result = clientEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  if (!result.success) {
    console.warn("[env] Client env validation warnings:", result.error.format());
    // Return empty defaults so the landing page still renders
    _clientEnv = {} as ClientEnv;
  } else {
    _clientEnv = result.data;
  }
  return _clientEnv;
}

// ---------------------------------------------------------------------------
// Server env — parsed lazily; call inside server actions / route handlers
// only, never at module-level (avoids crashing the landing page build when
// secrets are absent).
// ---------------------------------------------------------------------------
let _serverEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (_serverEnv) return _serverEnv;
  const result = serverEnvSchema.safeParse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  if (!result.success) {
    console.warn("[env] Server env validation warnings:", result.error.format());
    _serverEnv = {} as ServerEnv;
  } else {
    _serverEnv = result.data;
  }
  return _serverEnv;
}
