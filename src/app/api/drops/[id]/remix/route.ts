import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Returns the parent drop's source so the submission form can pre-load it
// for forking. The actual remix is recorded as a new drop row via POST
// /api/drops with remixedFrom set, not here.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("drops")
    .select("id, name, category, source_code, status")
    .eq("id", id)
    .single();

  if (error || !data || data.status !== "approved") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ drop: data });
}
