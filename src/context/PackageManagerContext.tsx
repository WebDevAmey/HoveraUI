"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm", "bun", "yarn"];
const STORAGE_KEY = "hovera:package-manager";

interface PackageManagerContextType {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
}

const PackageManagerContext = createContext<PackageManagerContextType | null>(null);

export function PackageManagerProvider({ children }: { children: React.ReactNode }) {
  const [packageManager, setPackageManagerState] = useState<PackageManager>("npm");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && PACKAGE_MANAGERS.includes(stored as PackageManager)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing state from localStorage, an external system
        setPackageManagerState(stored as PackageManager);
      }
    } catch {
      // ignore
    }
  }, []);

  const setPackageManager = useCallback((pm: PackageManager) => {
    setPackageManagerState(pm);
    try {
      localStorage.setItem(STORAGE_KEY, pm);
    } catch {
      // ignore
    }
  }, []);

  return (
    <PackageManagerContext.Provider value={{ packageManager, setPackageManager }}>
      {children}
    </PackageManagerContext.Provider>
  );
}

export function usePackageManager() {
  const ctx = useContext(PackageManagerContext);
  if (!ctx) throw new Error("usePackageManager must be used within PackageManagerProvider");
  return ctx;
}
