"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface CompareCtx {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  isComparing: (id: string) => boolean;
  clear: () => void;
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
}

const CompareContext = createContext<CompareCtx>({
  ids: [], add: () => {}, remove: () => {}, isComparing: () => false,
  clear: () => {}, modalOpen: false, setModalOpen: () => {},
});

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const add = useCallback((id: string) => {
    setIds(prev => prev.includes(id) || prev.length >= 3 ? prev : [...prev, id]);
  }, []);

  const remove = useCallback((id: string) => {
    setIds(prev => prev.filter(i => i !== id));
  }, []);

  const isComparing = useCallback((id: string) => ids.includes(id), [ids]);

  const clear = useCallback(() => { setIds([]); setModalOpen(false); }, []);

  return (
    <CompareContext.Provider value={{ ids, add, remove, isComparing, clear, modalOpen, setModalOpen }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
