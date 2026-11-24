import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import EntryList from "@/components/EntryList";
import StatusChip from "@/components/StatusChip";
import { listStatuses, listStatusLabels } from "@/constants/listStatus";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";
import type { ListEntry, ListStatus } from "@/types/anime";

type StatusFilter = "all" | ListStatus;

const emptyMessages: Record<StatusFilter, string> = {
  all: "Find anime in Discover to start your list.",
  watching: "Nothing in progress. Mark a title as Watching to track it here.",
  planned: "Nothing planned. Titles you want to watch will appear here.",
  completed: "No completed titles yet. Mark a title as Completed when you finish it.",
  onHold: "Nothing on hold. Titles you pause will appear here.",
  dropped: "No dropped titles. Titles you mark as Dropped will appear here.",
};

export default function ListsScreen() {
  const { entries, isLoading, error, updateEntry } = useEntries();
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const visibleEntries = selectedStatus === "all"
    ? entries
    : entries.filter((entry) => entry.status === selectedStatus);
  const episodesWatched = entries.reduce((total, entry) => total + entry.episodesWatched, 0);

  function incrementEpisode(entry: ListEntry, totalEpisodes: number) {
    updateEntry({ ...entry, episodesWatched: Math.min(entry.episodesWatched + 1, totalEpisodes) });
  }

  return (
    <EntryList
      entries={visibleEntries}
      emptyMessage={emptyMessages[selectedStatus]}
      onIncrement={incrementEpisode}
    >
      {!isLoading && (!error || entries.length > 0) && (
        <>
          <View style={styles.filters}>
            <StatusChip
              label={`All (${entries.length})`}
              selected={selectedStatus === "all"}
              onPress={() => setSelectedStatus("all")}
            />
            {listStatuses.map((status) => (
              <StatusChip
                key={status}
                label={`${listStatusLabels[status]} (${entries.filter((entry) => entry.status === status).length})`}
                selected={selectedStatus === status}
                onPress={() => setSelectedStatus(status)}
              />
            ))}
          </View>
          <Text style={styles.summary}>
            {entries.length} {entries.length === 1 ? "title" : "titles"} · {episodesWatched} {episodesWatched === 1 ? "episode" : "episodes"} watched
          </Text>
        </>
      )}
    </EntryList>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  summary: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
  },
});

