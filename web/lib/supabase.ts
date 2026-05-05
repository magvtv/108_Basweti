import { createClient } from "@supabase/supabase-js";

function readSupabaseEnv() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_PROJECT_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_PROJECT_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return { supabaseUrl, supabaseAnonKey };
}

export function getSupabaseClient() {
  const env = readSupabaseEnv();
  if (!env) return null;
  return createClient(env.supabaseUrl, env.supabaseAnonKey);
}

export type TributeType = "Condolence" | "Memory" | "Prayer" | "Testimony";
export type TributeStatus = "pending" | "approved" | "rejected";

export interface Tribute {
  id: string;
  name: string;
  relationship: string;
  country: string;
  type: TributeType;
  message: string;
  consent: boolean;
  status: TributeStatus;
  created_at: string;
}

export interface TributeInsert {
  name: string;
  relationship: string;
  country: string;
  type: TributeType;
  message: string;
  consent: boolean;
}
