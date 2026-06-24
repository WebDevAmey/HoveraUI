"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type FilterCategory = "all" | "gradient" | "pattern" | "buttons" | "loaders" | "navbars" | "favorites";

interface AppContextType {
  category: FilterCategory;
  setCategory: (c: FilterCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCommandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCommandOpen, setCommandOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pl:favorites");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing state from localStorage, an external system
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem("pl:favorites", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  return (
    <AppContext.Provider
      value={{
        category,
        setCategory,
        searchQuery,
        setSearchQuery,
        isCommandOpen,
        setCommandOpen,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
