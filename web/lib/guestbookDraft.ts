import type { TributeType } from "@/lib/supabase";

export const TRIBUTE_TYPES: TributeType[] = ["Condolence", "Memory", "Prayer", "Testimony"];

export const SESSION_DRAFT_KEY = "basweti-guestbook-draft";
export const DRAFT_VERSION = 1 as const;

export type GuestbookDraft = {
  v: typeof DRAFT_VERSION;
  selectedType: TributeType | null;
  name: string;
  relationship: string;
  country: string;
  message: string;
  consent: boolean;
};

export function isTributeType(value: unknown): value is TributeType {
  return typeof value === "string" && (TRIBUTE_TYPES as readonly string[]).includes(value);
}

export function readGuestbookDraft(): GuestbookDraft | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_DRAFT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (data?.v !== DRAFT_VERSION) return null;
    const selectedType =
      data.selectedType === null || data.selectedType === undefined
        ? null
        : isTributeType(data.selectedType)
          ? data.selectedType
          : null;
    return {
      v: DRAFT_VERSION,
      selectedType,
      name: typeof data.name === "string" ? data.name : "",
      relationship: typeof data.relationship === "string" ? data.relationship : "",
      country: typeof data.country === "string" ? data.country : "",
      message: typeof data.message === "string" ? data.message : "",
      consent: data.consent === true,
    };
  } catch {
    return null;
  }
}

export function writeGuestbookDraft(draft: GuestbookDraft) {
  try {
    sessionStorage.setItem(SESSION_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Quota or private mode — ignore
  }
}

export function clearGuestbookDraft() {
  try {
    sessionStorage.removeItem(SESSION_DRAFT_KEY);
  } catch {
    // ignore
  }
}
