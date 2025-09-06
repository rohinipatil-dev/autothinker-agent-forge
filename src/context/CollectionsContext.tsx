import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { generateAgentThumbnail } from "@/utils/imageGenerator";

export type CollectionItem = {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  thumbnail?: string;
  thumbnailStatus: 'loading' | 'success' | 'failed';
};

type CollectionsCtx = {
  items: CollectionItem[];
  addItem: (name: string, url: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  updateThumbnail: (id: string, thumbnail: string | null) => void;
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
      // Check for duplicates
      if (prev.some((i) => i.url === url)) return prev;
      
      const newItem: CollectionItem = {
        id: crypto.randomUUID(),
        name: name?.trim() || "Untitled Agent",
        url,
        createdAt: new Date().toISOString(),
        thumbnailStatus: 'loading' // Start with loading status
      };
      
      return [newItem, ...prev];
    });

    // Generate thumbnail in background
    generateThumbnailAsync(name, items.length);
  };

  const generateThumbnailAsync = async (prompt: string, currentLength: number) => {
    try {
      const thumbnail = await generateAgentThumbnail(prompt);
      
      // Find the item by checking the most recent item with loading status
      setItems((prev) => {
        const itemToUpdate = prev.find(item => item.thumbnailStatus === 'loading');
        if (!itemToUpdate) return prev;

        return prev.map(item => 
          item.id === itemToUpdate.id 
            ? { 
                ...item, 
                thumbnail: thumbnail || undefined,
                thumbnailStatus: thumbnail ? 'success' as const : 'failed' as const
              }
            : item
        );
      });
    } catch (error) {
      console.error('Thumbnail generation failed:', error);
      // Mark as failed
      setItems((prev) => {
        const itemToUpdate = prev.find(item => item.thumbnailStatus === 'loading');
        if (!itemToUpdate) return prev;

        return prev.map(item => 
          item.id === itemToUpdate.id 
            ? { ...item, thumbnailStatus: 'failed' as const }
            : item
        );
      });
    }
  };

  const updateThumbnail = (id: string, thumbnail: string | null) => {
    setItems((prev) => 
      prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              thumbnail: thumbnail || undefined,
              thumbnailStatus: thumbnail ? 'success' as const : 'failed' as const
            }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setItems([]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear, updateThumbnail }),
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
