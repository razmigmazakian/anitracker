import EntryList from "@/components/EntryList";
import { useEntries } from "@/context/EntriesContext";

export default function HomeScreen() {
  const { entries } = useEntries();

  return (
    <EntryList
      heading="Continue Watching"
      entries={entries.filter((entry) => entry.status === "watching")}
      emptyMessage="Anime marked Watching will appear here."
    />
  );
}
