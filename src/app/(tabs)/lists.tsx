import EntryList from "@/components/EntryList";
import { useEntries } from "@/context/EntriesContext";

export default function ListsScreen() {
  const { entries } = useEntries();

  return <EntryList entries={entries} emptyMessage="Find anime in Discover to start your list." />;
}
