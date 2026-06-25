"use client";

import { useState } from "react";
import { buttons } from "@/data/button";

interface ButtonPreviewWrapperProps {
  slug: string;
}

export default function ButtonPreviewWrapper({ slug }: ButtonPreviewWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);
  const item = buttons.find((b) => b.slug === slug);

  if (!item) return null;

  const Component = item.component;

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Component isHovered={isHovered} />
    </div>
  );
}
