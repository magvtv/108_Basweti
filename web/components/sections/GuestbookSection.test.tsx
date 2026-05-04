import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SESSION_DRAFT_KEY, DRAFT_VERSION } from "@/lib/guestbookDraft";
import GuestbookSection from "./GuestbookSection";

vi.mock("framer-motion", () => {
  const React = require("react") as typeof import("react");
  const passthrough = (Tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
      (props, ref) => React.createElement(Tag, { ...props, ref } as object, props.children)
    );
  return {
    motion: {
      div: passthrough("div"),
      p: passthrough("p"),
      h2: passthrough("h2"),
      form: passthrough("form"),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("GuestbookSection", () => {
  beforeEach(() => {
    sessionStorage.clear();
    const fetchMock = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 201 }))
    );
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
  });

  /** Prefer latest mount when AnimatePresence or dev double-render leaves multiple roots */
  function guestbookForm() {
    const roots = screen.getAllByTestId("guestbook-form");
    return within(roots[roots.length - 1]!);
  }

  it("requires message type", async () => {
    const user = userEvent.setup();
    render(<GuestbookSection />);
    const form = guestbookForm();

    await user.type(form.getByLabelText(/Your name/i), "Test User");
    await user.type(form.getByLabelText(/Your message/i), "Hello");
    await user.click(form.getByLabelText(/consent/i));
    await user.click(form.getByRole("button", { name: /Submit Tribute/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Please select a message type.");
  });

  it("requires consent", async () => {
    const user = userEvent.setup();
    render(<GuestbookSection />);
    const form = guestbookForm();

    await user.click(form.getByRole("button", { name: "Condolence" }));
    await user.type(form.getByLabelText(/Your name/i), "Test User");
    await user.type(form.getByLabelText(/Your message/i), "Hello");
    await user.click(form.getByRole("button", { name: /Submit Tribute/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Please give consent before submitting.");
  });

  it("submits and shows success", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 201, statusText: "Created" })
    );

    render(<GuestbookSection />);
    const form = guestbookForm();

    await user.click(form.getByRole("button", { name: "Condolence" }));
    await user.type(form.getByLabelText(/Your name/i), "Test User");
    await user.type(form.getByLabelText(/Your message/i), "With sympathy");
    await user.click(form.getByLabelText(/consent/i));
    await user.click(form.getByRole("button", { name: /Submit Tribute/i }));

    expect(
      await screen.findByRole("heading", { name: /Thank you for your tribute/i })
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/tributes",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
    const call = fetchMock.mock.calls[0];
    const body = JSON.parse((call[1] as RequestInit).body as string);
    expect(body).toMatchObject({
      name: "Test User",
      type: "Condolence",
      message: "With sympathy",
      consent: true,
    });

    expect(sessionStorage.getItem(SESSION_DRAFT_KEY)).toBeNull();
  });

  it("shows API error message", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "Server busy" }), { status: 500, statusText: "Error" })
    );

    render(<GuestbookSection />);
    const form = guestbookForm();

    await user.click(form.getByRole("button", { name: "Prayer" }));
    await user.type(form.getByLabelText(/Your name/i), "A");
    await user.type(form.getByLabelText(/Your message/i), "B");
    await user.click(form.getByLabelText(/consent/i));
    await user.click(form.getByRole("button", { name: /Submit Tribute/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Server busy");
  });

  it("restores draft from sessionStorage after hydrate", async () => {
    sessionStorage.setItem(
      SESSION_DRAFT_KEY,
      JSON.stringify({
        v: DRAFT_VERSION,
        selectedType: "Memory",
        name: "Restored",
        relationship: "friend",
        country: "USA",
        message: "Draft text",
        consent: false,
      })
    );

    render(<GuestbookSection />);
    const form = guestbookForm();

    await waitFor(() => {
      expect(form.getByLabelText(/Your name/i)).toHaveValue("Restored");
    });
    expect(form.getByLabelText(/Your message/i)).toHaveValue("Draft text");
    expect(form.getByLabelText(/Country/i)).toHaveValue("USA");
    expect(form.getByRole("button", { name: "Memory" })).toHaveAttribute("aria-pressed", "true");
  });

  it("persists edits to sessionStorage", async () => {
    const user = userEvent.setup();
    render(<GuestbookSection />);
    const form = guestbookForm();

    await waitFor(() => {
      expect(form.getByLabelText(/Your name/i)).toBeInTheDocument();
    });

    await user.type(form.getByLabelText(/Your name/i), "Persist");

    await waitFor(() => {
      const raw = sessionStorage.getItem(SESSION_DRAFT_KEY);
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw!);
      expect(parsed.name).toContain("Persist");
    });
  });
});
