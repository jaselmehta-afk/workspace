"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface FavouritesCtx {
  ids: string[];
  toggle: (id: string) => void;
  isFav: (id: string) => boolean;
}

const FavouritesContext = createContext<FavouritesCtx>({
  ids: [],
  toggle: () => {},
  isFav: () => false,
});

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("ws_favourites");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const toggle = useCallback((id: string) => {
    setIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      try { localStorage.setItem("ws_favourites", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isFav = useCallback((id: string) => ids.includes(id), [ids]);

  return (
    <FavouritesContext.Provider value={{ ids, toggle, isFav }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);
