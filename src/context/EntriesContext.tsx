import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { mockEntries } from "@/data/mockEntries";
import type { ListEntry } from "@/types/anime";

const STORAGE_KEY = "anitracker:entries";

type EntriesContextValue = {
  entries: ListEntry[];
  isLoading: boolean;
  error: string | null;
  addEntry: (entry: ListEntry) => void;
  updateEntry: (entry: ListEntry) => void;
  removeEntry: (animeId: string) => void;
};

const EntriesContext = createContext<EntriesContextValue | null>(null);

export function EntriesProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ListEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const didLoad = useRef(false);

  useEffect(() => {
    let active = true;

    async function loadEntries() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!active) return;

        setEntries(stored === null ? mockEntries : JSON.parse(stored));
        didLoad.current = true;
      } catch {
        if (active) setError("Could not load your list.");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadEntries();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    // A failed read must never overwrite the existing list with the initial empty array.
    if (isLoading || !didLoad.current) return;

    let active = true;

    async function saveEntries() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        if (active) setError(null);
      } catch {
        if (active) setError("Could not save your list.");
      }
    }

    void saveEntries();
    return () => {
      active = false;
    };
  }, [entries, isLoading]);

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
    <EntriesContext.Provider value={{ entries, isLoading, error, addEntry, updateEntry, removeEntry }}>
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
