import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import EntryList from "@/components/EntryList";
import StatusChip from "@/components/StatusChip";
import { listStatuses, listStatusLabels } from "@/constants/listStatus";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";
import type { ListEntry, ListStatus } from "@/types/anime";

type StatusFilter = "all" | ListStatus;

const emptyMessages: Record<StatusFilter, string> = {
  all: "Your list is empty. Find anime in Discover to start tracking.",
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
  const countFor = (status: ListStatus) => entries.filter((entry) => entry.status === status).length;

  function incrementEpisode(entry: ListEntry, totalEpisodes: number) {
    updateEntry({ ...entry, episodesWatched: Math.min(entry.episodesWatched + 1, totalEpisodes) });
  }

  return (
    <EntryList
      entries={visibleEntries}
      emptyMessage={emptyMessages[selectedStatus]}
      emptyActionLabel={selectedStatus === "all" ? "Browse Discover" : undefined}
      onEmptyAction={() => router.push("/discover")}
      onIncrement={incrementEpisode}
    >
      {!isLoading && (!error || entries.length > 0) && (
        <>
          <View style={styles.summary} accessible accessibilityLabel={`${entries.length} titles, ${episodesWatched} episodes watched`}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{entries.length}</Text>
              <Text style={styles.summaryLabel}>{entries.length === 1 ? "Title" : "Titles"}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{episodesWatched}</Text>
              <Text style={styles.summaryLabel}>Episodes watched</Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroller}
            contentContainerStyle={styles.filters}
          >
            <StatusChip
              label={`All ${entries.length}`}
              accessibilityLabel={`All, ${entries.length}`}
              selected={selectedStatus === "all"}
              onPress={() => setSelectedStatus("all")}
            />
            {listStatuses.map((status) => (
              <StatusChip
                key={status}
                label={`${listStatusLabels[status]} ${countFor(status)}`}
                accessibilityLabel={`${listStatusLabels[status]}, ${countFor(status)}`}
                selected={selectedStatus === status}
                onPress={() => setSelectedStatus(status)}
              />
            ))}
          </ScrollView>
        </>
      )}
    </EntryList>
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.medium,
    borderRadius: radius.large,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xsmall,
  },
  summaryValue: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: fontSize.small,
  },
  divider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: colors.border,
  },
  filterScroller: {
    marginHorizontal: -spacing.medium,
  },
  filters: {
    paddingHorizontal: spacing.medium,
    gap: spacing.small,
  },
});
