"use client";

import { GlideTabs } from "./glide-tabs";

export default function Demo() {
  return (
    <GlideTabs
      label="Billing period"
      tabs={[
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Yearly" },
        { value: "lifetime", label: "Lifetime" },
      ]}
      defaultValue="yearly"
    />
  );
}
