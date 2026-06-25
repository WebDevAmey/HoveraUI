import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
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

  const admin = createAdminClient();

  const [pendingRes, reportsRes] = await Promise.all([
    admin
      .from("drops")
      .select(
        "id, name, slug, category, source_code, maker_note, behavior_note, status, created_at, profiles!drops_author_id_fkey(github_username)"
      )
      .eq("status", "pending")
      .order("created_at", { ascending: true }),
    admin
      .from("reports")
      .select("id, reason, created_at, drop_id, drops(name, slug, status)")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return NextResponse.json({
    pending: pendingRes.data ?? [],
    reports: reportsRes.data ?? [],
  });
}
