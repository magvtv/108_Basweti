import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient, TributeInsert } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error("[tributes] missing Supabase environment variables");
    return NextResponse.json(
      { error: "Guestbook is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  let body: TributeInsert;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, relationship, country, type, message, consent } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Your name is required." }, { status: 422 });
  }
  if (!message?.trim()) {
    return NextResponse.json({ error: "A message is required." }, { status: 422 });
  }
  if (!type || !["Condolence", "Memory", "Prayer", "Testimony"].includes(type)) {
    return NextResponse.json({ error: "Please select a message type." }, { status: 422 });
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Please give consent to publish your message." },
      { status: 422 }
    );
  }

  const { error } = await supabase.from("tributes").insert({
    name: name.trim(),
    relationship: relationship?.trim() ?? "",
    country: country?.trim() ?? "",
    type,
    message: message.trim(),
    consent,
    status: "pending",
  });

  if (error) {
    console.error("[tributes] insert error:", error);
    return NextResponse.json(
      { error: "We couldn't save your tribute. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
