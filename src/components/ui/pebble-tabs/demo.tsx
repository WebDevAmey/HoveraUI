"use client";

import { PebbleTabs } from "./pebble-tabs";

export default function Demo() {
  return (
    <PebbleTabs
      label="File type"
      defaultValue="documents"
      tabs={[
        { value: "all", label: "All" },
        { value: "photos", label: "Photos" },
        { value: "videos", label: "Videos" },
        { value: "documents", label: "Documents" },
        { value: "other", label: "Other" },
      ]}
    />
  );
}
