import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  clearGuestbookDraft,
  DRAFT_VERSION,
  readGuestbookDraft,
  SESSION_DRAFT_KEY,
  writeGuestbookDraft,
} from "./guestbookDraft";

describe("guestbookDraft", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("returns null when empty", () => {
    expect(readGuestbookDraft()).toBeNull();
  });

  it("round-trips a valid draft", () => {
    writeGuestbookDraft({
      v: DRAFT_VERSION,
      selectedType: "Condolence",
      name: "Jane Doe",
      relationship: "friend",
      country: "Kenya",
      message: "Peace and comfort.",
      consent: true,
    });
    expect(readGuestbookDraft()).toEqual({
      v: DRAFT_VERSION,
      selectedType: "Condolence",
      name: "Jane Doe",
      relationship: "friend",
      country: "Kenya",
      message: "Peace and comfort.",
      consent: true,
    });
  });

  it("rejects wrong schema version", () => {
    sessionStorage.setItem(
      SESSION_DRAFT_KEY,
      JSON.stringify({
        v: 999,
        selectedType: "Condolence",
        name: "X",
        relationship: "",
        country: "",
        message: "Hi",
        consent: true,
      })
    );
    expect(readGuestbookDraft()).toBeNull();
  });

  it("normalizes invalid selectedType to null", () => {
    sessionStorage.setItem(
      SESSION_DRAFT_KEY,
      JSON.stringify({
        v: DRAFT_VERSION,
        selectedType: "NotAType",
        name: "",
        relationship: "",
        country: "",
        message: "",
        consent: false,
      })
    );
    expect(readGuestbookDraft()?.selectedType).toBeNull();
  });

  it("clearGuestbookDraft removes the key", () => {
    writeGuestbookDraft({
      v: DRAFT_VERSION,
      selectedType: null,
      name: "a",
      relationship: "",
      country: "",
      message: "",
      consent: false,
    });
    clearGuestbookDraft();
    expect(sessionStorage.getItem(SESSION_DRAFT_KEY)).toBeNull();
  });
});
