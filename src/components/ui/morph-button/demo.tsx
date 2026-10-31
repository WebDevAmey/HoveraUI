"use client";

import { useEffect, useRef, useState } from "react";
import { MorphButton, type MorphButtonState } from "./morph-button";

function useCycle() {
  const [state, setState] = useState<MorphButtonState>("idle");
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const run = () => {
    if (state !== "idle") return;
    setState("loading");
    timers.current.push(
      window.setTimeout(() => setState("done"), 1400),
      window.setTimeout(() => setState("idle"), 3000),
    );
  };
  return [state, run] as const;
}

const plus = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M8 3.5v9M3.5 8h9" />
  </svg>
);

export default function Demo() {
  const [deploy, runDeploy] = useCycle();
  const [invite, runInvite] = useCycle();
  return (
    <div style={{ display: "grid", gap: 20, justifyItems: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <MorphButton state={deploy} onClick={runDeploy} loadingLabel="Deploying" doneLabel="Deployed">
          Deploy
        </MorphButton>
        <MorphButton variant="outline" icon={plus} state={invite} onClick={runInvite} loadingLabel="Sending" doneLabel="Invite sent">
          Invite
        </MorphButton>
        <MorphButton variant="ghost">Cancel</MorphButton>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center" }}>
        <MorphButton size="sm" variant="outline">
          Small
        </MorphButton>
        <MorphButton size="md" variant="outline">
          Medium
        </MorphButton>
        <MorphButton size="lg" variant="outline">
          Large
        </MorphButton>
        <MorphButton size="md" disabled>
          Disabled
        </MorphButton>
      </div>
    </div>
  );
}
