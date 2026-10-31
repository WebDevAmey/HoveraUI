"use client";

import { useState } from "react";
import { SteppedOtp } from "./stepped-otp";

export default function Demo() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const message =
    status === "error"
      ? "That code does not match. Check the message and try again."
      : status === "success"
        ? "Code accepted. Signing you in."
        : "Sent to the phone ending 0142. Try 246810.";

  return (
    <div style={{ display: "grid", gap: 16, width: "min(100%, 320px)" }}>
      <p style={{ margin: 0, font: "400 24px/1.1 var(--hv-font-serif)", letterSpacing: "-0.01em", color: "var(--hv-ink)" }}>
        Confirm it is you
      </p>
      <SteppedOtp
        value={code}
        status={status}
        message={message}
        onValueChange={(next) => {
          setCode(next);
          if (status !== "idle") setStatus("idle");
        }}
        onComplete={(full) => setStatus(full === "246810" ? "success" : "error")}
      />
    </div>
  );
}
