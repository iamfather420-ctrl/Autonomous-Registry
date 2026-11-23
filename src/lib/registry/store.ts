import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ForgeStep, RegistryDocument } from "@/lib/registry/types";

export type ShelfEntry = {
  id: string;
  createdAt: number;
  sealedBy: "parser" | "grok";
  seal: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
  steps: ForgeStep[];
  registry: RegistryDocument;
};

type ShelfState = {
  entries: ShelfEntry[];
  add: (entry: ShelfEntry) => void;
  remove: (id: string) => void;
};

export const useShelf = create<ShelfState>()(
  persist(
    (set) => ({
      entries: [],
      add: (entry) =>
        set((state) => ({
          entries: [entry, ...state.entries.filter((item) => item.id !== entry.id)].slice(0, 4),
        })),
      remove: (id) => set((state) => ({ entries: state.entries.filter((item) => item.id !== id) })),
    }),
    { name: "kiln-shelf", skipHydration: true },
  ),
);

export function useShelfHydrated(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const finish = () => setReady(true);
    const unsub = useShelf.persist.onFinishHydration(finish);
    if (useShelf.persist.hasHydrated()) finish();
    else void useShelf.persist.rehydrate();
    return unsub;
  }, []);
  return ready;
}
