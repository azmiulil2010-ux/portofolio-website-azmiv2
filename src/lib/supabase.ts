import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const normalizedSupabaseUrl = supabaseUrl?.replace(/\/$/, "").replace(/\/rest\/v1$/, "");

export const supabase =
	normalizedSupabaseUrl && supabaseKey
		? createClient(normalizedSupabaseUrl.trim(), supabaseKey.trim())
		: null;
