export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ======================
// GET — only approved stories (no cache)
// ======================
export async function GET() {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { data },
    { headers: { "Cache-Control": "no-store" } }
  );
}

// ======================
// POST — create UNapproved story
// ======================
export async function POST(req: Request) {
  const body = await req.json();

  const { title, story, outcome, name } = body;

  if (!title || !story || !outcome) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const { error } = await supabase.from("stories").insert({
    title,
    body: story,
    outcome,
    anonymous_name: name || "Anonymous",
    approved: false,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}
