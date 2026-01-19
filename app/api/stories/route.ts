import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("stories")
    .select("id, created_at, title, body, outcome, game_type, stakes, anonymous_name")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { title, story, outcome, gameType, stakes, name } = body;

  if (!title || !story || !outcome) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await supabase.from("stories").insert({
    title,
    body: story,
    outcome,
    game_type: gameType || null,
    stakes: stakes || null,
    anonymous_name: name || "Anonymous",
    approved: true
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
