import { NextResponse } from "next/server";

const REPO = "WebDevAmey/HoveraUI";
const FALLBACK_STARS = 128;

export async function GET() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ stars: FALLBACK_STARS });
    }

    const data = await res.json();
    const stars =
      typeof data?.stargazers_count === "number" ? data.stargazers_count : FALLBACK_STARS;

    return NextResponse.json({ stars });
  } catch {
    return NextResponse.json({ stars: FALLBACK_STARS });
  }
}
