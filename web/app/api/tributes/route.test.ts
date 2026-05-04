import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const { insertMock } = vi.hoisted(() => ({
  insertMock: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: insertMock,
    })),
  },
}));

describe("POST /api/tributes", () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
  });

  function jsonRequest(body: object) {
    return new NextRequest("http://localhost/api/tributes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  it("returns 422 when name missing", async () => {
    const res = await POST(
      jsonRequest({
        name: "   ",
        relationship: "",
        country: "",
        type: "Condolence",
        message: "Hi",
        consent: true,
      })
    );
    expect(res.status).toBe(422);
  });

  it("returns 422 when consent false", async () => {
    const res = await POST(
      jsonRequest({
        name: "A",
        relationship: "",
        country: "",
        type: "Condolence",
        message: "Hi",
        consent: false,
      })
    );
    expect(res.status).toBe(422);
  });

  it("returns 201 and inserts when valid", async () => {
    const res = await POST(
      jsonRequest({
        name: "Mary",
        relationship: "friend",
        country: "Kenya",
        type: "Condolence",
        message: "Thinking of you.",
        consent: true,
      })
    );
    expect(res.status).toBe(201);
    expect(insertMock).toHaveBeenCalledWith({
      name: "Mary",
      relationship: "friend",
      country: "Kenya",
      type: "Condolence",
      message: "Thinking of you.",
      consent: true,
      status: "pending",
    });
  });

  it("returns 500 when Supabase errors", async () => {
    insertMock.mockResolvedValue({ error: { message: "db down" } });
    const res = await POST(
      jsonRequest({
        name: "Mary",
        relationship: "",
        country: "",
        type: "Prayer",
        message: "Peace",
        consent: true,
      })
    );
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/couldn't save/i);
  });
});
