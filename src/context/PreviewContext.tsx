"use client";

import { createContext, useContext, useState } from "react";

interface PreviewContextType {
  activeSlug: string | null;
  setActiveSlug: (slug: string | null) => void;
}

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <PreviewContext.Provider value={{ activeSlug, setActiveSlug }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);

  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }

  return context;
}
