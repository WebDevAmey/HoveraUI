import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { validateDropSubmission, slugify } from "@/lib/validateDrop";

const PAGE_SIZE = 8;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(0, Number(searchParams.get("page") ?? 0));
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  // RLS restricts anonymous/authenticated selects to status = 'approved'.
  const { data, error } = await supabase
    .from("drops")
    .select(
      "id, name, slug, category, tags, source_code, maker_note, behavior_note, status, remixed_from, copies_count, used_count, remix_count, created_at, author_id, profiles(github_username, avatar_url)"
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ drops: data, hasMore: (data?.length ?? 0) === PAGE_SIZE });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json();
  const submission = {
    name: String(body.name ?? ""),
    category: String(body.category ?? ""),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    sourceCode: String(body.sourceCode ?? ""),
    makerNote: String(body.makerNote ?? ""),
    behaviorNote: String(body.behaviorNote ?? ""),
  };

  const validationError = validateDropSubmission(submission);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const remixedFrom = body.remixedFrom ? String(body.remixedFrom) : null;
  const slug = `${slugify(submission.name)}-${Math.random().toString(36).slice(2, 8)}`;

  const { data, error } = await supabase
    .from("drops")
    .insert({
      author_id: user.id,
      name: submission.name,
      slug,
      category: submission.category,
      tags: submission.tags,
      source_code: submission.sourceCode,
      maker_note: submission.makerNote,
      behavior_note: submission.behaviorNote,
      status: "pending",
      remixed_from: remixedFrom,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (remixedFrom) {
    await supabase.from("remixes").insert({
      drop_id: data.id,
      parent_drop_id: remixedFrom,
    });
  }

  return NextResponse.json({ drop: data }, { status: 201 });
}
