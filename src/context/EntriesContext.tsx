import { createContext, useContext, useState, type ReactNode } from "react";

import { mockEntries } from "@/data/mockEntries";
import type { ListEntry } from "@/types/anime";

type EntriesContextValue = {
  entries: ListEntry[];
  addEntry: (entry: ListEntry) => void;
  updateEntry: (entry: ListEntry) => void;
  removeEntry: (animeId: string) => void;
};

const EntriesContext = createContext<EntriesContextValue | null>(null);

export function EntriesProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ListEntry[]>(mockEntries);

  function addEntry(entry: ListEntry) {
    setEntries((previous) =>
      previous.some((item) => item.animeId === entry.animeId)
        ? previous
        : [...previous, entry],
    );
  }

  function updateEntry(entry: ListEntry) {
    setEntries((previous) =>
      previous.map((item) => (item.animeId === entry.animeId ? entry : item)),
    );
  }

  function removeEntry(animeId: string) {
    setEntries((previous) => previous.filter((item) => item.animeId !== animeId));
  }

  return (
    <EntriesContext.Provider value={{ entries, addEntry, updateEntry, removeEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error("useEntries must be used within EntriesProvider");
  }
  return context;
}
