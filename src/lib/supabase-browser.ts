import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase URL or Key is missing in browser environment variables."
    );
  }

  const normalizedUrl = supabaseUrl
    .replace(/\/$/, "")
    .replace(/\/rest\/v1$/, "")
    .trim();

  return createBrowserClient(normalizedUrl, supabaseKey.trim());
}
