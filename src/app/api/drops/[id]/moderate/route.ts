import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateRegistryEntry } from "@/lib/registry";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "maintainer") {
    return NextResponse.json({ error: "Maintainer access required." }, { status: 403 });
  }

  const body = await request.json();
  const action = body.action === "approve" ? "approved" : body.action === "reject" ? "rejected" : null;
  if (!action) {
    return NextResponse.json({ error: "action must be 'approve' or 'reject'." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: drop, error } = await admin
    .from("drops")
    .update({ status: action })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (action === "approved") {
    await generateRegistryEntry(drop);
  }

  return NextResponse.json({ drop });
}
