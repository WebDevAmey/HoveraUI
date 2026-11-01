"use client";

import { useEffect, useRef, useState } from "react";
import { MorphButton, type MorphButtonState } from "./morph-button";

export default function Demo() {
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

  return (
    <MorphButton state={state} onClick={run} loadingLabel="Deploying" doneLabel="Deployed">
      Deploy
    </MorphButton>
  );
}
