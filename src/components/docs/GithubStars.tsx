"use client";

import { useEffect, useState } from "react";

const FALLBACK_STARS = 128;
const REPO = "WebDevAmey/HoveraUI";

export default function GithubStars() {
  const [stars, setStars] = useState<number>(FALLBACK_STARS);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // keep fallback, no need to surface an error for a non-critical badge
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span className="ml-1.5 rounded-full bg-secondary px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-muted-foreground">
      {stars.toLocaleString()}
    </span>
  );
}
