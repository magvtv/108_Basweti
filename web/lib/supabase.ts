import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
