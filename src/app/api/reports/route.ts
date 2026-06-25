import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json();
  const dropId = String(body.dropId ?? "");
  const reason = String(body.reason ?? "").slice(0, 300);

  if (!dropId || !reason) {
    return NextResponse.json({ error: "dropId and reason are required." }, { status: 400 });
  }

  const { error } = await supabase
    .from("reports")
    .insert({ drop_id: dropId, reporter_id: user.id, reason });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
