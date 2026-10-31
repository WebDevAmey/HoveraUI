"use client";

import { PerforatedTicket } from "./perforated-ticket";

export default function Demo() {
  return (
    <PerforatedTicket
      style={{ width: "min(100%, 340px)" }}
      eyebrow="Hall B · Late programme"
      title={
        <>
          The Night <em>Garden</em>
        </>
      }
      serial="Nº 004127"
    >
      Row F · Seat 12 · 20:30
    </PerforatedTicket>
  );
}
