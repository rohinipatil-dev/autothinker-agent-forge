import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CollectionItem = {
  id: string;
  name: string;   // prompt or agent title
  url: string;    // agent URL
  createdAt: string;
};

type CollectionsCtx = {
  items: CollectionItem[];
  addItem: (name: string, url: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CollectionsContext = createContext<CollectionsCtx | undefined>(undefined);

const STORAGE_KEY = "collections_items_v1";

export function CollectionsProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CollectionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CollectionItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addItem = (name: string, url: string) => {
    if (!url) return;
    setItems((prev) => {
      // optional de-duplication by URL
      if (prev.some((i) => i.url === url)) return prev;
      const next: CollectionItem = {
        id: crypto.randomUUID(),
        name: name?.trim() || "Untitled Agent",
        url,
        createdAt: new Date().toISOString(),
      };
      return [next, ...prev];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setItems([]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear }),
    [items]
  );

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const ctx = useContext(CollectionsContext);
  if (!ctx) {
    throw new Error("useCollections must be used within CollectionsProvider");
  }
  return ctx;
}
