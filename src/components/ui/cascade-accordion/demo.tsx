"use client";

import { CascadeAccordion } from "./cascade-accordion";

const p = { margin: 0 } as const;
const meta = { margin: 0, font: "400 12px/1.5 var(--hv-font-mono)", color: "var(--hv-ink-3)" } as const;

export default function Demo() {
  return (
    <CascadeAccordion
      style={{ maxWidth: 520 }}
      defaultValue={["arrive"]}
      items={[
        {
          id: "arrive",
          title: "Arriving on the first morning",
          content: [
            <p key="a" style={p}>Collect your key from the front desk. The studio opens at nine and the kettle is always on.</p>,
            <p key="b" style={p}>Your desk is by the north window, with a monitor and a chair already set to a sensible height.</p>,
            <p key="c" style={meta}>Front desk · Ground floor · 08:45</p>,
          ],
        },
        {
          id: "first-week",
          title: "Your first week",
          content: [
            <p key="a" style={p}>Pair with a different person each day so you meet the whole team by Friday.</p>,
            <p key="b" style={p}>On Thursday you ship one small change to production, with someone beside you.</p>,
          ],
        },
        {
          id: "tools",
          title: "Tools and accounts",
          content: [
            <p key="a" style={p}>Accounts are created before you arrive. Sign in once and everything else follows.</p>,
            <p key="b" style={p}>Ask in the help channel if something is missing. Someone answers within the hour.</p>,
            <p key="c" style={meta}>Help channel · Weekdays 09:00–18:00</p>,
          ],
        },
      ]}
    />
  );
}
