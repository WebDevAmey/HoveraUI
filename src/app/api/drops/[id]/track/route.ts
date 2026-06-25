import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const signal = body.signal === "use" ? "use" : body.signal === "copy" ? "copy" : null;

  if (!signal) {
    return NextResponse.json({ error: "signal must be 'copy' or 'use'." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("increment_drop_signal", { drop_id: id, signal });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
